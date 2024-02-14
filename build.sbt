import com.typesafe.sbt.SbtScalariform._

import scalariform.formatter.preferences._

name := "play-silhouette-react-seed"

version := "9.0.0"

scalaVersion := "2.13.12"

resolvers += Resolver.jcenterRepo

resolvers += "Sonatype snapshots" at "https://oss.sonatype.org/content/repositories/snapshots/"

val versions = new Object {
  val silhouette = "9.0.0"
  val playMailer = "9.0.0"
}
val deps = new Object {
  def silhouette(post: String) = "org.playframework.silhouette" %% s"play-silhouette$post" % versions.silhouette
}

libraryDependencies ++= Seq(
  deps.silhouette(""),
  deps.silhouette("-password-bcrypt"),
  deps.silhouette("-persistence"),
  deps.silhouette("-crypto-jca"),
  deps.silhouette("-totp"),
  "net.codingwell" %% "scala-guice" % "5.1.1",
  "com.iheart" %% "ficus" % "1.5.2",
  "com.typesafe.play" %% "play-mailer" % versions.playMailer,
  "com.typesafe.play" %% "play-mailer-guice" % versions.playMailer,
  "com.enragedginger" %% "akka-quartz-scheduler" % "1.9.3-akka-2.6.x",
  deps.silhouette("-testkit") % "test",
  specs2 % Test,
  ehcache,
  guice,
  filters
)

lazy val root = (project in file(".")).enablePlugins(PlayScala)

routesImport += "utils.route.Binders._"

// https://github.com/playframework/twirl/issues/105
TwirlKeys.templateImports := Seq()

scalacOptions ++= Seq(
  "-deprecation", // Emit warning and location for usages of deprecated APIs.
  "-feature", // Emit warning and location for usages of features that should be imported explicitly.
  "-unchecked", // Enable additional warnings where generated code depends on assumptions.
  "-Xfatal-warnings", // Fail the compilation if there are any warnings.
  //"-Xlint", // Enable recommended additional warnings.
  "-Ywarn-dead-code", // Warn when dead code is identified.
  "-Ywarn-numeric-widen", // Warn when numerics are widened.
  // Play has a lot of issues with unused imports and unsued params
  // https://github.com/playframework/playframework/issues/6690
  // https://github.com/playframework/twirl/issues/105
  "-Xlint:-unused,_"
)

//********************************************************
// Scalariform settings
//********************************************************

scalariformAutoformat := true

ScalariformKeys.preferences := ScalariformKeys.preferences.value
  .setPreference(FormatXml, false)
  .setPreference(DoubleIndentConstructorArguments, false)
  .setPreference(DanglingCloseParenthesis, Preserve)

Compile / herokuAppName := "play-silhouette-react-seed"