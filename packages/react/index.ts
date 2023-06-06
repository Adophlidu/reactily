import packageJson from './package.json';
import { jsx } from './src/jsx';

export default {
	version: packageJson.version,
	createElement: jsx
};
