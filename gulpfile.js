const {src, dest, series, parallel} = require('gulp');

const pug = require('gulp-pug');
const stylus = require('gulp-stylus');

const hash = require('gulp-hash');
const rename = require('gulp-rename');
const htmlreplace = require('gulp-html-replace');

const IS_PROD = process.env.NODE_ENV === 'production';
const DEVDEST = './www/';
const DISTDEST = './dist/';
const DEST = IS_PROD ? DISTDEST : DEVDEST;

var hashedFiles = {
	js: {},
	css: {}
};

function digestJs () {
	return src('src/logic/index.js')
	.pipe(hash())
	.pipe(rename(function (path) {
		console.log(path);
		path.basename;
		path.basename += "-min";
		hashedFiles.js[path.basename] = path.basename + '.js';
		console.log("hashedJS = " + hashedJS);
		}))
	.pipe(dest(`${DEST}js`));
};

// task('css', () => {
// 	return src('src/style/*.styl')
// 		.pipe(stylus)
// 		.pipe(hash())
// 		// .pipe(sourcemaps.init())
// 		// .pipe(sass(sassOptions).on('error', sass.logError))
// 		// .pipe(sourcemaps.write('./'))
// 		// .pipe(autoprefixer(autoprefixerOptions))
// 		.pipe(rename(function (path) {
// 			path.basename += "-min";
// 			hashedCSS = path.basename + '.css';
// 			console.log("hashedCSS = " + hashedCSS);
// 		 }))
// 		.pipe(dest('./css'));
// });


function digestHtml () {
	return src('src/view/index.pug')
	.pipe(pug())
	.pipe(htmlreplace({
		// 'css': hashedCSS,
		js: {
			src: null,
			tpl: '<script src="%f".js></script>'
		}
	}))
	.pipe(rename('index.html'))
	.pipe(dest(DEST));
};
// task('htmlreplace', ['jsBuildDev', 'css'], digestHtml);

// TASK DEFINITIONS
var build;
if(IS_PROD){
	build = series(digestJs, digestHtml)
// 	series(
//   clean,
//   parallel(
//     cssTranspile,
//     series(jsTranspile, jsBundle)
//   ),
//   parallel(cssMinify, jsMinify),
//   publish
// );
} else {
	build = series(digestJs, digestHtml)
}
exports.default = build;