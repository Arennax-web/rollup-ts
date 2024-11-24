import ts from 'rollup-plugin-typescript2'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import repacle from 'rollup-plugin-replace'
import postcss from 'rollup-plugin-postcss';

import path from 'path'
import { globSync } from 'glob';
import { fileURLToPath } from 'node:url';

console.log(process.env.NODE_ENV,'dev');

const isDev = () => {
    return process.env.NODE_ENV === 'development'
}

export default {
    // input: Object.fromEntries(
	// 	globSync('src/**/*.ts').map(file => [
	// 		// 这里将删除 `src/` 以及每个文件的扩展名。
	// 		// 因此，例如 src/nested/foo.js 会变成 nested/foo
	// 		path.relative(
	// 			'src',
	// 			file.slice(0, file.length - path.extname(file).length)
	// 		),
	// 		// 这里可以将相对路径扩展为绝对路径，例如
	// 		// src/nested/foo 会变成 /project/src/nested/foo.js
	// 		fileURLToPath(new URL(file, import.meta.url))
	// 	])
	// ),
    // output: {
	// 	format: 'es',
	// 	dir: 'dist'
	// },
    input:"./src/main.ts",
    
    output: {
        file: path.resolve(__dirname, './lib/index.js'),
        format: "cjs",
        sourcemap: true
    },
 
    plugins: [
        
        ts(),
        // terser({
        //     compress: {
        //         drop_console: !isDev()
        //     }
        // }),
        postcss({
            extract: true, // 将 CSS 提取到单独的文件中
            plugins: [
              require('postcss-import'),
              require('stylus'), // 使用 stylus 作为 CSS 处理器
            ],
            // 配置 Stylus 选项，如果需要的话
            // stylus: {
            //   // ...
            // },
        }),
        repacle({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        resolve({
            extensions:['.js', '.ts']
        }),
        isDev() && livereload(),
        isDev() && serve({
            open: true,
            openPage: "/public/index.html",
            port: 8080
        }),
        
    ]
}
