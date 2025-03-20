import ts from 'rollup-plugin-typescript2'
import path from 'path'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import repacle from 'rollup-plugin-replace'
import postcss from 'rollup-plugin-postcss';


console.log(process.env.NODE_ENV,'dev');

const isDev = () => {
    return process.env.NODE_ENV === 'development'
}
export default {
    input: "./src/main.ts",
    output: {
        file: path.resolve(__dirname, './lib/index.js'),
        format: "cjs",
        sourcemap: true
    },
 
    plugins: [
        
        ts(),
        terser({
            compress: {
                drop_console: !isDev()
            }
        }),
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
        resolve(['.js', '.ts']),
        isDev() && livereload(),
        isDev() && serve({
            open: true,
            openPage: "/public/index.html",
            port: 8020
        }),
        
    ]
}
