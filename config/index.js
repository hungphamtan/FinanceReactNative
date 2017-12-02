import {
	API_ENDPOINT,
	PROTOCOL,
	NODE_ENV
} from 'react-native-dotenv';

console.log('API_ENDPOINT', API_ENDPOINT);
const configs = {
	api: {
		apiEndpoint: API_ENDPOINT,
		protocol: PROTOCOL,
		rootPath: `${PROTOCOL}://${API_ENDPOINT}`
	},
	env: NODE_ENV
};

// a workaround to allow undefined environment variables
// in .env files. e.g: API_ENDPOINT=null
// known issue: https://github.com/zetachang/react-native-dotenv/issues/10
configs.api = Object.keys(configs.api).reduce((acc, key) => {
	const item = configs.api[key];
	acc[key] = item === 'null' ? '' : item; // eslint-disable-line no-param-reassign
	return acc;
}, {});

export default configs;