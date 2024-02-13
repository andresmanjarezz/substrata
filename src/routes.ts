import Router from "koa-router";
import dotenv from "dotenv";
import { AuthorizationUrlRequest, ConfidentialClientApplication, Configuration } from '@azure/msal-node';
import { msalConfig } from './config'

dotenv.config();

export const router: Router = new Router();

const clientApp: ConfidentialClientApplication = new ConfidentialClientApplication(msalConfig as Configuration);

router.get("/signin", async (ctx) => {
  const authUrlParameters = {
    scopes: [`https://graph.microsoft.com/${process.env.MS_SCOPE}`],
		redirectUri: process.env.MS_REDIRECT_URI
  };

  try {
    const authUrl = await clientApp.getAuthCodeUrl(authUrlParameters as AuthorizationUrlRequest);
    ctx.redirect(authUrl);
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = "Error generating sign-in URL";
  }
});
