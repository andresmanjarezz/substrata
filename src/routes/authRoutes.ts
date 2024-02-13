import Router from "koa-router";
import dotenv from "dotenv";
import { AuthenticationResult, AuthorizationUrlRequest, ConfidentialClientApplication, Configuration, AuthorizationCodeRequest } from '@azure/msal-node';
import { msalConfig } from '../config'

dotenv.config();

const router: Router = new Router();
const clientApp: ConfidentialClientApplication = new ConfidentialClientApplication(msalConfig as Configuration);

/**
 * GET /signin
 * Initiates the sign-in process by redirecting the user to the Microsoft sign-in page.
 * Upon successful authentication, the user is redirected to the /auth-response endpoint.
 */
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

/**
 * GET /auth-response
 * Handles the authentication response from Microsoft, extracting the code from the query parameters.
 * The code is then exchanged for an access token which is stored in the session.
 */
router.get("/auth-response", async (ctx) => {
  const code: string | string[] | undefined = ctx.query.code;

  if (typeof code !== 'string' || !code) {
    ctx.status = 400;
    ctx.body = 'Code is missing from the request';
    return;
  }

  const tokenRequest: AuthorizationCodeRequest = {
    code,
    scopes: ["https://graph.microsoft.com/Mail.Read"],
    redirectUri: process.env.AZURE_REDIRECT_URI || '',
  };

  try {
    const response: AuthenticationResult = await clientApp.acquireTokenByCode(tokenRequest);
    if (ctx.session) {
      ctx.session.accessToken = response.accessToken;
    } else {
      ctx.status = 500;
      ctx.body = "Session not initialized";
    }
    ctx.status = 200;
    ctx.body = 'Authentication successful. Token acquired and stored in session.';
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = 'Failed to acquire token';
  }
})

export default router;
