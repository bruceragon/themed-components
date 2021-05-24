import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import pkgCore from './packages/core/package.json';
import pkgPrimitives from './packages/primitives/package.json';

const getPackageConfig = (packageRoot, additionalConfig = {}) => ({
    ...additionalConfig,
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
        peerDepsExternal({
            packageJsonPath: packageRoot + 'package.json'
        }),
        resolve(),
        replace({
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify('production')
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
                exclude: [
                    "node_modules",
                    packageRoot + "node_modules",
                ],
                baseUrl: packageRoot,
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

const getExternals = (pkg) => ({
    external: [
        /node_modules/,
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.devDependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
        "react-jsx",
        "react-is",
    ]
})

const primitivesDir = 'packages/primitives/';
const coreDir = 'packages/core/';
export default [
    getPackageConfig(primitivesDir, {
        ...getExternals(pkgPrimitives)
    }),
    getPackageConfig(coreDir, {
        ...getExternals(pkgCore)
    }),
];