import {
	API_ENDPOINT,
	PROTOCOL,
	NODE_ENV
} from 'react-native-dotenv';

const apiEndpoint = API_ENDPOINT || 'api.coinmarketcap.com/v1/';
const protocol = PROTOCOL || 'https';
const env = NODE_ENV || 'prod';

const configs = {
	api: {
		apiEndpoint,
		protocol,
		rootPath: `${protocol}://${apiEndpoint}`
	},
	env
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