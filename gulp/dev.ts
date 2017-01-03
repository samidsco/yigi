import * as gulp from 'gulp'

gulp.task('dev', ['build-typescript', 'dev-server'], () => {
  gulp.watch(TYPESCRIPT_FILES, ['build:typescript']);
  gulp.watch(STATIC_FILES, ['build:static']);
  gulp.watch(BUILD_SRC_FILES, ['test:mocha']);
  gulp.watch(['webpack/**/*'], ['dev:server']);
});