package controllers

import play.silhouette.api.util.PasswordInfo
import play.silhouette.impl.providers.GoogleTotpInfo
import play.api.libs.json._
import play.api.mvc.{ Action, AnyContent }

import javax.inject.Inject
import scala.concurrent.ExecutionContext

class UserController @Inject() (scc: SilhouetteControllerComponents)(implicit ex: ExecutionContext)
  extends AbstractAuthController(scc) {

  implicit val passwordInfoFormat: Format[PasswordInfo] = Json.format[PasswordInfo]
  implicit val totpInfoFormat: Format[GoogleTotpInfo] = Json.format[GoogleTotpInfo]

  def get: Action[AnyContent] = SecuredAction.async { implicit request =>
    authInfoRepository.find[GoogleTotpInfo](request.identity.loginInfo).map {
      case Some(value) => Ok(Json.obj("user" -> Json.toJson(request.identity), "totpInfo" -> Json.toJson(value)))
      case None => Ok(Json.obj("user" -> Json.toJson(request.identity)))
    }
  }
}
