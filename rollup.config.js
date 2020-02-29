import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: 'src/index.ts',
    output: {
        file: 'static/bundle.js',
        format: 'iife'
    },
    plugins: [
        typescript({
            typescript: require('typescript'),
        }),
        resolve({
            browser: true,
        }),
        commonjs(),
    ]
};