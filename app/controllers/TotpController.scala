package controllers

import play.silhouette.api._
import play.silhouette.api.exceptions.ProviderException
import play.silhouette.impl.exceptions.IdentityNotFoundException
import play.silhouette.impl.providers._
import forms.{ TotpForm, TotpSetupForm }
import play.silhouette.api.util.PasswordInfo

import javax.inject.Inject
import play.api.i18n.Messages
import play.api.libs.json._
import play.api.mvc.{ Action, AnyContent }

import scala.concurrent.{ ExecutionContext, Future }

/**
 * The `TOTP` controller.
 */
class TotpController @Inject() (
  scc: SilhouetteControllerComponents
)(implicit ex: ExecutionContext) extends AbstractAuthController(scc) {

  implicit val passwordInfoFormat: Format[PasswordInfo] = Json.format[PasswordInfo]
  implicit val totpInfoFormat: Format[GoogleTotpInfo] = Json.format[GoogleTotpInfo]
  implicit val totpSetupFormat: Format[TotpSetupForm.Data] = Json.format[TotpSetupForm.Data]

  /**
   * Gets current TOTP setup
   * @return The result to display.
   */
  def getTotpSetup: Action[AnyContent] = SecuredAction.async { implicit request =>
    val user = request.identity
    val credentials = totpProvider.createCredentials(user.email.get)
    val totpInfo = credentials.totpInfo
    authInfoRepository.find[GoogleTotpInfo](request.identity.loginInfo).map {
      case Some(value) => Ok(Json.obj("user" -> user, "totpInfo" -> value))
      case None => Ok(Json.obj(
        "user" -> user,
        "totpSetup" -> TotpSetupForm.Data(totpInfo.sharedKey, totpInfo.scratchCodes, credentials.scratchCodesPlain),
        "qrUrl" -> credentials.qrUrl
      ))

    }
  }

  /**
   * Disable TOTP.
   * @return The result to display.
   */
  def disableTotp: Action[AnyContent] = SecuredAction.async { implicit request =>
    val user = request.identity
    authInfoRepository.remove[GoogleTotpInfo](user.loginInfo) map { _ =>
      Ok(Json.obj("info" -> Messages("totp.disabling.info")))
    }
  }

  /**
   * Handles the submitted form with TOTP initial data.
   * @return The result to display.
   */
  def postTotpSetup: Action[AnyContent] = SecuredAction.async { implicit request =>
    val user = request.identity
    TotpSetupForm.form.bindFromRequest().fold(
      _ => Future.successful(BadRequest(Json.obj("error" -> Messages("invalid.request")))),
      data => {
        totpProvider.authenticate(data.sharedKey, data.verificationCode).flatMap {
          case Some(_: LoginInfo) => {
            authInfoRepository.add[GoogleTotpInfo](user.loginInfo, GoogleTotpInfo(data.sharedKey, data.scratchCodes)) map {
              _ => Ok(Json.obj("success" -> Messages("totp.enabling.info")))
            }
          }
          case _ => Future.successful(BadRequest(Json.obj("error" -> Messages("invalid.verification.code"))))
        }.recover {
          case _: ProviderException =>
            BadRequest(Json.obj("error" -> Messages("invalid.unexpected.totp")))
        }
      }
    )
  }

  /**
   * Handles the submitted form with TOTP verification key.
   * @return The result to display.
   */
  def submit: Action[AnyContent] = UnsecuredAction.async { implicit request =>
    TotpForm.form.bindFromRequest().fold(
      _ => Future.successful(BadRequest(Json.obj("error" -> Messages("invalid.request")))),
      data => {
        userService.retrieve(data.userID).flatMap {
          case Some(user) =>
            totpProvider.authenticate(data.sharedKey, data.verificationCode).flatMap {
              case Some(_) => authenticateUser(user, data.rememberMe)
              case _ => Future.successful(BadRequest(Json.obj("error" -> Messages("invalid.verification.code"))))
            }.recover {
              case _: ProviderException =>
                BadRequest(Json.obj("error" -> Messages("invalid.unexpected.totp")))
            }
          case None => Future.failed(new IdentityNotFoundException("Couldn't find user"))
        }
      }
    )
  }
}
