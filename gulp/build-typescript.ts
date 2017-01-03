import * as gulp from 'gulp'

gulp.task('build-typescript', ['build-clean', 'build-static', 'typescript-format', 'typescript-lint'], () =>
  gulp.src(TYPESCRIPT_FILES.concat(['typings/tsd.d.ts']))
    .pipe($.changed(BUILD_SRC_DIR, { extension: '.js' }))
    .pipe($.sourcemaps.init())
    .pipe(typescriptProject())
    .js
    .pipe($.sourcemaps.write({ sourceRoot: SRC_DIR }))
    .pipe($.print(filepath => `build:typescript ➡ ${filepath}`))
    .pipe(gulp.dest(BUILD_SRC_DIR))
);