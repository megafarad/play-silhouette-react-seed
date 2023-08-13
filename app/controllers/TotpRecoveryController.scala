package controllers

import java.util.UUID
import io.github.honeycombcheesecake.play.silhouette.api.exceptions.ProviderException
import io.github.honeycombcheesecake.play.silhouette.impl.exceptions.IdentityNotFoundException
import io.github.honeycombcheesecake.play.silhouette.impl.providers._
import forms.TotpRecoveryForm

import javax.inject.Inject
import play.api.i18n.Messages
import play.api.libs.json.Json
import play.api.mvc.{ Action, AnyContent }

import scala.concurrent.{ ExecutionContext, Future }

/**
 * The `TOTP` controller.
 */
class TotpRecoveryController @Inject() (
  scc: SilhouetteControllerComponents
)(implicit ex: ExecutionContext) extends AbstractAuthController(scc) {

  /**
   * Handles the submitted form with TOTP verification key.
   * @return The result to display.
   */
  def submit: Action[AnyContent] = UnsecuredAction.async { implicit request =>
    TotpRecoveryForm.form.bindFromRequest().fold(
      _ => Future.successful(BadRequest),
      data => {
        userService.retrieve(data.userID).flatMap {
          case Some(user) => {
            authInfoRepository.find[GoogleTotpInfo](user.loginInfo).flatMap {
              case Some(totpInfo) =>
                totpProvider.authenticate(totpInfo, data.recoveryCode).flatMap {
                  case Some(updated) => {
                    authInfoRepository.update[GoogleTotpInfo](user.loginInfo, updated._2)
                    authenticateUser(user, data.rememberMe)
                  }
                  case _ => Future.successful(BadRequest(Json.obj("error" -> Messages("invalid.recovery.code"))))
                }.recover {
                  case _: ProviderException =>
                    BadRequest(Json.obj("error" -> Messages("invalid.unexpected.totp")))
                }
              case _ => Future.successful(BadRequest(Json.obj("error" -> Messages("invalid.unexpected.totp"))))
            }
          }
          case None => Future.failed(new IdentityNotFoundException("Couldn't find user"))
        }
      }
    )
  }
}
