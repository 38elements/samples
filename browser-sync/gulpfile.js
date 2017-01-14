"use strict";

let gulp = require("gulp");
let bs = require("browser-sync").create();

gulp.task("start", function() {
    bs.init({
        proxy: "http://localhost:4000",
        serveStatic: [{
            // http://localhost:4000/publicをpublicディレクトリにマッピング
            route: '/public',
            dir: 'public'
        }],
        // 最初にhttp://localhost:3000/publicにアクセス
        startPath: "/public",
        port: 3000
    });
});
