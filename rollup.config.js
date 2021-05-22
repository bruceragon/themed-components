import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss'
import dts from 'rollup-plugin-dts';

const getPackageConfig = (packageRoot) => ({
    input: packageRoot + 'index.ts',
    output: [
        {
            file: packageRoot + "dist/index.js",
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: packageRoot + "dist/index.esm.js",
            format: 'esm',
            sourcemap: true,
        },
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({
            include: [
                packageRoot + 'src/**/*.ts+(|x)',
                packageRoot + 'src/*.ts+(|x)'
            ],
            useTsconfigDeclarationDir: true,
            clean: true,
            tsconfigOverride: {
                include: [
                    packageRoot + 'src/**/*',
                ],
                compilerOptions: {
                    declaration: true,
                    declarationDir: packageRoot + 'dist/types'
                }
            }
        }),
        terser(),
        postcss({
            modules: true,
        }),
    ],
})

getPackageTypesConfig = (packageRoot) => ({
    input: packageRoot + 'dist/types/index.d.ts',
    output: [
        {
            file: packageRoot + 'dist/index.d.ts',
            format: 'es'
        }
    ],
    plugins: [
        dts()
    ]
})

export default [
    getPackageConfig('packages/core/'),
    getPackageConfig('packages/primitives/'),
    getPackageTypesConfig('packages/core/'),
    getPackageTypesConfig('packages/primitives/'),
];