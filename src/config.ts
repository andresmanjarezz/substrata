import dotenv from 'dotenv';

dotenv.config();

export const msalConfig = {
	auth: {
		clientId: process.env.MS_CLIENT_ID,
		authority: `https://login.microsoftonline.com/${process.env.MS_TENANT_ID}`,
		clientSecret: process.env.MS_CLIENT_SECRET,
		redirectUri: process.env.MS_REDIRECT_URI,
	}
};

export const SESSION_CONFIG = {
	key: 'koa:sess',
	maxAge: 86400000,
	autoCommit: true,
	overwrite: true,
	httpOnly: true,
	signed: true,
	rolling: false,
	renew: false,
};
