const gulp = require('gulp');
const esbuild = require('esbuild');
const sass = require('gulp-sass')(require('sass'));
const flatten = require('gulp-flatten');
const concat = require('gulp-concat');
const lint = require('gulp-eslint');
const gls = require('gulp-live-server');
const ts = require('gulp-typescript');

const config = {
	paths: {
		styles: ['./src/frontend/**/*.css', './src/frontend/**/*.scss'],
		types: './src/types/**/*.ts',
		backend: './src/backend/**/*.ts',
		frontend_tsx: './src/frontend/**/*.tsx',
		frontend_json: './src/frontend/**/*.json'
	},
	dist: {
		scripts: './dist/scripts',
		backend: './dist',
		css: './dist/css'
	}
};

// TypeScript check for frontend
const tsFrontendProject = ts.createProject('./src/frontend/tsconfig.json', {
	noEmit: true
});
gulp.task('ts-frontend', () => {
	return gulp.src([config.paths.frontend_tsx, config.paths.types])
		.pipe(tsFrontendProject())
		.pipe(gulp.dest('DUMMY')); // w/o dest the task fails and exits gulp
});

// TypeScript check for backend
const tsBackendProject = ts.createProject('./src/backend/tsconfig.json', {
	noEmit: true
});
gulp.task('ts-backend', () => {
	return gulp.src([config.paths.backend, config.paths.types])
		.pipe(tsBackendProject())
		.pipe(gulp.dest('DUMMY')); // w/o dest the task fails and exits gulp
});

// Build frontend with esbuild
gulp.task('frontend', gulp.series('ts-frontend', done => {
	esbuild.build({
		entryPoints: ['./src/frontend/app.tsx'],
		bundle: true,
		outfile: `${config.dist.scripts}/bundle-frontend.js`,
		sourcemap: true,
		minify: true,
		loader: { '.tsx': 'tsx' }
	}).then(() => {
		console.log('Frontend build complete');
		done();
	}).catch(error => {
		console.error('Frontend build error:', error);
		done();
	});
}));

// Build backend with esbuild
gulp.task('backend', gulp.series('ts-backend', done => {
	esbuild.build({
		entryPoints: ['./src/backend/server.ts'],
		bundle: true,
		outfile: `${config.dist.backend}/bundle-backend.js`,
		platform: 'node',
		sourcemap: true,
		minify: false
	}).then(() => {
		console.log('Backend build complete');
		done();
	}).catch(error => {
		console.error('Backend build error:', error);
		done();
	});
}));


// Compile styles
gulp.task('styles', () => {
	return gulp.src(config.paths.styles)
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(flatten())
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.dist.css));
});

// Lint tasks
gulp.task('lint-backend', () => {
	return gulp.src(config.paths.backend)
	.pipe(lint({ configFile: './src/backend/eslint.config.json' }))
	.pipe(lint.format());
});

gulp.task('lint-frontend', () => {
	return gulp.src([ config.paths.frontend_tsx, config.paths.frontend_json ])
		.pipe(lint({ configFile: './src/frontend/eslint.config.json' }))
		.pipe(lint.format());
});

gulp.task('lint', gulp.parallel('lint-backend', 'lint-frontend'));

// Watch files for changes
gulp.task('watch', () => {
	gulp.watch([ config.paths.frontend_tsx, config.paths.frontend_json ], gulp.series('frontend', 'lint-frontend'));
	gulp.watch(config.paths.backend, gulp.series('backend', 'lint-backend'));
	gulp.watch(config.paths.styles, gulp.series('styles'));
});

// Serve backend
gulp.task('serve', done => {
	const server = gls(`${config.dist.backend}/bundle-backend.js`);
	server.start();

	gulp.watch(`${config.dist.backend}/**/*`, gulp.series(done => {
		console.log('... restarting server');
		server.start();
		done();
	}));
	done();
});

// Default task
gulp.task('default', gulp.parallel('backend', 'frontend', 'styles', 'lint', 'serve', 'watch'));
