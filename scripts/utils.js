import fs from 'fs';
import path from 'path';
import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';

const packagePath = path.resolve(__dirname, '../../packages');
const distPath = path.resolve(__dirname, '../../dist/node_modules');

export const getPackagePath = (name, isDist = false) => {
	if (isDist) {
		return `${distPath}/${name}`;
	}
	return `${packagePath}/${name}`;
};

export const getPackageJson = (name) => {
	const jsonPath = `${getPackagePath(name)}/package.json`;
	const jsonString = fs.readFileSync(jsonPath, { encoding: 'utf-8' });
	return JSON.parse(jsonString);
};

export const getBasePlugins = ({ typescript = {} } = {}) => {
	return [cjs(), ts(typescript)];
};
