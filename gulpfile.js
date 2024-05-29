/*
 * @Author: xx
 * @Date: 2024-05-29 12:50:45
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-05-29 12:50:52
 * @Description: 
 * @FilePath: \reactProjects\react-waterfall\gulpfile.js
 */
// ...

/**
 * 编译脚本文件
 * @param {string} babelEnv babel环境变量
 * @param {string} destDir 目标目录
 */
 function compileScripts(babelEnv, destDir) {
    const { scripts } = paths;
    // 设置环境变量
    process.env.BABEL_ENV = babelEnv;
    return gulp
      .src(scripts)
      .pipe(babel()) // 使用gulp-babel处理
      .pipe(gulp.dest(destDir));
  }
  
  /**
   * 编译cjs
   */
  function compileCJS() {
    const { dest } = paths;
    return compileScripts('cjs', dest.lib);
  }
  
  /**
   * 编译esm
   */
  function compileESM() {
    const { dest } = paths;
    return compileScripts('esm', dest.esm);
  }
  
  // 串行执行编译脚本任务（cjs,esm） 避免环境变量影响
  const buildScripts = gulp.series(compileCJS, compileESM);
  
  // 整体并行执行任务
  const build = gulp.parallel(buildScripts);
  
  // ...
  