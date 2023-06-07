import packageJson from './package.json';
import { jsxDEV } from './src/jsx';

export default {
	version: packageJson.version,
	createElement: jsxDEV
};
