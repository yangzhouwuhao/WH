/*
	gulpfile.js主配置文件，用于定义任务
	此处代码由Node执行
*/

//加载模块
var gulp=require('gulp');
var concat=require("gulp-concat");//js的合并
var uglify=require("gulp-uglify");//js的压缩混淆
// var cssnano=require("gulp-cssnano");//css压缩
var cssmin=require("gulp-cssmin");//css压缩
var imagemin=require("gulp-imagemin");//图片压缩
var clean=require("gulp-clean");//清空
var browserSync=require("browser-sync").create();
//定义一个简单的任务
gulp.task('hello',function(){
	console.log("hello  world");
});

// html复制文件的任务
gulp.task('html',function(){
	gulp.src('src/**/*.html')//读取文件
	.pipe(gulp.dest('dist/'));//通过管道再次操作，写入到目标位置
});

//js合并混淆的任务
gulp.task('js',function(){
	gulp.src('src/js/*.js')
	.pipe(concat('all.js'))//合并
	.pipe(uglify())//压缩混淆
	.pipe(gulp.dest('dist/js'));
});
//css的压缩任务
gulp.task("css",function(){
	gulp.src('src/css/*.css')//读取文件
	.pipe(cssmin())//压缩
	.pipe(gulp.dest('dist/css'));//通过管道再次操作，写入到目标位置
});

//image压缩任务
gulp.task("image",function(){
	gulp.src('src/images/*')//读取文件
	.pipe(imagemin())//压缩对于png有效
	.pipe(gulp.dest('dist/images'));//通过管道再次操作，写入到目标位置
});
//清空之前的内容
gulp.task("clean",function(){
	gulp.src('dist')//读取文件
	.pipe(clean());//清空整个dist目录文件
});
//合并任务
gulp.task('dist',['html','js','css','image']);

//定义一个监视任务，监视文件的变化
gulp.task('watch',function(){
	//监视src目录下所有的文件，当发生变化时自动去执行对应的任务
	gulp.watch('src/**/*.html',['html']);
	gulp.watch('src/js/*.js',['js']);
	gulp.watch('src/images/*',['image']);

});

//启动browser-sync静态服务器，实现浏览器同步
// gulp.task('serve',['html','js','css','image','watch'],function(){
// 	browserSync.init({
// 		server:{
// 			baseDir:"dist"
// 		}
// 	})
// });
//如果gulp任务名称是 default ，直接运行gulp
gulp.task('default',['html','js','css','image','watch'],function(){
	browserSync.init({
		server:{
			baseDir:"dist",
			index:"index1.html"
		}
	})
});



