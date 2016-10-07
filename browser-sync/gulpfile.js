"use strict";

let gulp = require("gulp");
let bs = require("browser-sync").create();

gulp.task("start", function() {
    bs.init({
        proxy: "http://localhost:4000",
        serveStatic: [{
            route: '/public',
            dir: 'public'
        }],
        startPath: "/public",
        port: 3000
    });
});
