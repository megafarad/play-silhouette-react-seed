package modules

import jobs.{ AuthTokenCleaner, Scheduler }
import net.codingwell.scalaguice.ScalaModule
import play.api.libs.concurrent.PekkoGuiceSupport

/**
 * The job module.
 */
class JobModule extends ScalaModule with PekkoGuiceSupport {

  /**
   * Configures the module.
   */
  override def configure() = {
    bindActor[AuthTokenCleaner]("auth-token-cleaner")
    bind[Scheduler].asEagerSingleton()
  }
}
