var fs = require("fs");
var del = require("del");
var gulp = require("gulp");
var eslint = require("gulp-eslint");
var less = require("gulp-less");
var concat = require("gulp-concat-sourcemap");
var replace = require("gulp-replace-task");
var browserSync = require("browser-sync");
var proxy = require("proxy-middleware");
var url = require("url");
var args = require("yargs").argv;
var autoprefixer = require("gulp-autoprefixer");
var shell = require("gulp-shell");

var sourcePath = require("./config/paths/source-path");
var libPath = require("./config/paths/lib-path");
var libCssFiles = require("./config/paths/lib-css-list.js");
var appPath = libPath.concat(sourcePath);
var pkg = require("./package");

gulp.task("clean", function (cb) {
    del([
        "dev"
    ], cb);
});

gulp.task("lint", function () {
    return gulp.src(sourcePath, ["config/**/*.js"])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task("concat-sources", function () {
    var env = args.env || "dev";
    var filename = env + ".json";
    var settings = JSON.parse(fs.readFileSync("./config/" + filename, "utf8"));

    return gulp.src(appPath)
        .pipe(replace({
            patterns: [
                {
                    match: "apiHost",
                    replacement: settings.apiHost
                }
            ]
        }))
        .pipe(concat("sources.js"))
        .pipe(gulp.dest("./dev/src"));
});

gulp.task("build-less", function () {
    return gulp.src("./src/style/app.less")
        .pipe(less())
        .pipe(gulp.dest("dev/src"));
});

gulp.task("copy-lib-css", function () {
    return gulp.src(libCssFiles)
        .pipe(concat("bootstrap.css"))
        .pipe(gulp.dest("./dev/src"));
});

gulp.task("autoprefixer", function () {
    return gulp.src("dev/src/app.css")
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest("dev/src"))
});

gulp.task("copy-template", function () {
    return gulp.src("src/template/**/*")
        .pipe(gulp.dest("dev/src/template/"));
});

gulp.task("copy-index", function () {
    return gulp.src("./index.html")
        .pipe(gulp.dest("dev/src/"));
});

gulp.task("copy-asset", function () {
    return gulp.src("./asset/**")
        .pipe(gulp.dest("./dev/src/asset/"));
});

gulp.task("copy", ["copy-index", "copy-template", "copy-asset"]);

gulp.task("browser-sync", function () {
    browserSync.init(
        ["./dev/src/app.css", "./dev/src/sources.js"],
        {
            "server": {
                "baseDir": "./dev/src",
                "index": "index.html"
            },
            logConnections: true,
            ghostMode: {
                links: false,
                forms: false,
                scroll: false,
                click: false
            },
            open: true
        })
});

gulp.task("watch", function () {
    gulp.watch("./src/js/**", ["concat-sources"]);
    gulp.watch("./index.html", ["copy-index"]);
    gulp.watch("./src/template/**/*", ["copy-template"]);
    gulp.watch("./src/style/**/*.less", ["build-less"]);
});

gulp.task("dev-live", ["concat-sources", "build-less", "copy-lib-css", "copy", "autoprefixer", "browser-sync", "watch"]);
gulp.task("dist-test", ["lint", "concat-sources", "build-less", "copy-lib-css", "copy"]);

gulp.task("build", ["concat-sources", "build-less", "copy-lib-css", "copy", "autoprefixer"]);

gulp.task("docker", ["lint", "clean", "build"], function () {
    var email = process.env.DOCKER_EMAIL;
    var username = process.env.DOCKER_USERNAME;
    var password = process.env.DOCKER_PASSWORD;
    var imageName = process.env.DOCKER_IMAGE_NAME || "gerritdashboard-web";
    var version = pkg.version;

    if (!email) {
        throw new Error("DOCKER_EMAIL undefined!");
    }

    if (!username) {
        throw new Error("DOCKER_USERNAME undefined!");
    }

    if (!password) {
        throw new Error("DOCKER_PASSWORD undefined!");
    }

    return shell.task([
        `docker build -t ${imageName}:${version} .`,
        `docker tag ${imageName}:${version} ${imageName}:latest`,
        `docker login -e="${email}" -u="${username}" -p="${password}"`,
        `docker push ${imageName}:${version}`,
        `docker push ${imageName}:latest`
    ], {
        "verbose": true
    })();
});

gulp.task("default", ["clean", "build"]);
