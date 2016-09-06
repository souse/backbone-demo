/*设置忽略文件*/
fis.set('project.ignore', ['static/**/*.less', 'package.json', 'fis-conf.js']);

fis.match('**.less', {
		parser: fis.plugin('less'),
		rExt: '.css'
	})
	.match('widget/modules/**/*.js', {
		isMod: false,
		useSameNameRequire: true
	})
	.match('widget/cpx_modules/**/*.js', {
		isMod: true,
		useSameNameRequire: true
	})
	.match(/(jquery|common|sea|seajs-text|json2|underscore|backbone)\.js$/, { //基础的js 合并到 global.js 中
		packTo: 'global.js'
	})
	.match('::package', {
		postpackager: [fis.plugin('loader', {
			useInlineMap: true // 资源映射表内嵌
		})]
	});

// 此配置 可以使js文件引用时减少书写引用
fis.hook('cmd', {
	baseUrl: './widget/',
	paths: {
		'home': 'cpx_modules/home/home',
		'router': 'cpx_modules/home/router'
	}
});

/**
 * 开发环境
 */
fis.media('dev')
	.match('*', {
		domain: 'http://127.0.0.1:8080',
		deploy: fis.plugin('local-deliver', {
			to: '../crm-dev'
		})
	});

/**
 * 发布
 *  压缩、合并、文件指纹
 */
fis.media('prod')
	.match('**.less', {
		parser: fis.plugin('less'),
		rExt: '.css',
		optimizer: fis.plugin('clean-css', {}),
		useHash: true
	})
	.match('**.js', {
		optimizer: fis.plugin('uglify-js'),
		useHash: true
	})
	.match('**.png', {
		optimizer: fis.plugin('png-compressor')
	})
	.match('::package', {
		postpackager: [fis.plugin('loader', {
			useInlineMap: false // 资源映射表内嵌
		})]
	})
	.match('*', {
		domain: 'http://127.0.0.1:5000/crm-dist',
		deploy: fis.plugin('local-deliver', {
			to: '../crm-dist'
		})
	});
