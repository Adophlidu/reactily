import json from '@rollup/plugin-json';
import genJson from 'rollup-plugin-generate-package-json';
import { getPackagePath, getPackageJson, getBasePlugins } from '../utils';

const { name } = getPackageJson('react');

const inputDir = getPackagePath(name);
const outputDir = getPackagePath(name, true);

export default [
	{
		input: `${inputDir}/index.ts`,
		output: {
			file: `${outputDir}/index.js`,
			name: 'index.js',
			format: 'umd'
		},
		plugins: [
			...getBasePlugins(),
			json(),
			genJson({
				inputFolder: inputDir,
				outputFolder: outputDir,
				baseContents: ({ name, version, description }) => ({
					name,
					version,
					description,
					main: 'index.js'
				})
			})
		]
	},
	{
		input: `${inputDir}/src/jsx.ts`,
		output: [
			{
				file: `${outputDir}/jsx-runtime.js`,
				name: 'jsx-runtime.js',
				format: 'umd'
			},
			{
				file: `${outputDir}/jsx-dev-runtime.js`,
				name: 'jsx-dev-runtime.js',
				format: 'umd'
			}
		],
		plugins: [...getBasePlugins()]
	}
];
