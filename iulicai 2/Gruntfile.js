module.exports = function(grunt) {

	// 任务配置,所有插件的配置信息
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		cssPath:'css/',
		cssDistPath:'release/css',
		jsDistPath:'release/js',
		imgDistPath:"release/imgs",
		concat: {
			options: {
				// 定义一个用于插入合并输出文件之间的字符
				separator: ';'
			},
			dist: {
				// 将要被合并的文件
				src: ['lib/global.js','lib/plugins/*.js','views/*.js','pages/*.js'],
				// 合并后的JS文件的存放位置
				dest: '<%= jsDistPath %>/pvp.js'
			},
			extra: {
				src: ['lib/zepto.js','lib/mustache.min.js','lib/md5.js','lib/basicModal.min.js'],
				dest: '<%= jsDistPath %>/base.js'
			}
		}
		,uglify: {
			options: {
				// 此处定义的banner注释将插入到输出文件的顶部
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'<%= jsDistPath %>/pvp.min.js': ['<%= concat.dist.dest %>'],
					'<%= jsDistPath %>/base.min.js': ['<%= concat.extra.dest %>'],
					'<%= jsDistPath %>/cfg.min.js': ['config.js'],
					'<%= jsDistPath %>/init.min.js': ['init.js']
				}
			}
		}
		//,rev: {
		//		options: {
		//			encoding: 'utf8',
		//			algorithm: 'md5',
		//			length: 8
		//		},
		//		assets: {
		//			files: [{
		//				src: [
		//					'<%= imgDistPath %>/*.{jpg,jpeg,gif,png}',
		//					'<%= cssDistPath %>/*.css',
		//					'<%= jsDistPath %>/*.js'
		//				]
		//			}]
		//		}
		//}
		,//压缩css
		cssmin: {
			//文件头部输出信息
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				//美化代码
				beautify: {
					//中文ascii化，防止中文乱码
					ascii_only: true
				}
			},
			my_target:{
				files:[{
					expand:true,
					cwd:'<%= cssPath %>',
					src:'*.css',
					dest:'<%= cssDistPath %>'
				}]
			}
		}
		,watch: {
			files: ['lib/global.js','lib/plugins/*.js','views/*.js','pages/*.js','config.js','init.js'],
			tasks: ['concat','uglify']
		}
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-rev');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	//grunt.loadNpmTasks('grunt-css-sprite');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// 默认任务
	grunt.registerTask('default', ['concat','uglify',"cssmin","watch"]);
	//grunt.registerTask('default', ['concat','uglify','cssmin']);

};