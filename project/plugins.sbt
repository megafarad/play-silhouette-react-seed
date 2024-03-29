// Comment to get more information during initialization
logLevel := Level.Warn

addSbtPlugin("org.playframework" % "sbt-plugin" % "3.0.1")

addSbtPlugin("com.heroku" % "sbt-heroku" % "2.1.4")

// can be removed when Play release 2.8.20
ThisBuild / libraryDependencySchemes += "org.scala-lang.modules" %% "scala-xml" % VersionScheme.Always


addSbtPlugin("org.scalariform" % "sbt-scalariform" % "1.8.3")
