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
    cache: false,
    plugins: [
        peerDepsExternal(),
        resolve({
            rootDir: packageRoot
        }),
        commonjs(),
        typescript({
            verbosity: 3,
            useTsconfigDeclarationDir: true,
            clean: true,
            tsconfigOverride: {
                include: [
                    packageRoot + 'src/**/*.ts+(|x)',
                    packageRoot + 'src/*.ts+(|x)',
                    packageRoot + 'src/*.d.ts',
                ],
                baseUrl: packageRoot,
                compilerOptions: {
                    declaration: true,
                    declarationDir: packageRoot + 'dist'
                }
            }
        }),
        terser(),
        postcss({
            modules: true,
        }),
    ],
})

const getPackageTypesConfig = (packageRoot) => ({
    input: packageRoot + 'dist/types/index.d.ts',
    output: [
        {
            file: packageRoot + 'dist/index.d.ts',
            format: 'es'
        }
    ],
    cache: false,
    plugins: [
        dts({
            compilerOptions: {
                isolatedModules: false
            }
        })
    ]
})

const primitivesDir = 'packages/primitives/';
const coreDir = 'packages/core/';

export default [
    getPackageConfig(primitivesDir),
    // getPackageTypesConfig(primitivesDir),
    getPackageConfig(coreDir),
    // getPackageTypesConfig(coreDir),
];