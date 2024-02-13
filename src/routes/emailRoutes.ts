import Router from "koa-router";
import { fetchEmails } from '../services/graphAPIService';

const router = new Router();

/**
 * GET /emails
 * Fetches the last five emails from the authenticated user's Outlook inbox.
 * Requires an authenticated session with a stored access token.
 */
router.get('/emails', async (ctx) => {
  if (!ctx.session || !ctx.session.accessToken) {
    ctx.status = 401;
    ctx.body = { error: 'Authentication required. Please login to access this endpoint.' };
    return;
  }

  try {
    const emails = await fetchEmails(ctx.session.accessToken);
    ctx.status = 200;
    ctx.body = { emails };
  } catch (error) {
    console.error(error);
		
    if (error instanceof Error) {
      if (error.message.includes('invalid') || error.message.includes('expired')) {
        ctx.status = 401;
        ctx.body = { error: 'Invalid or expired token. Please re-authenticate.' };
      } else {
        ctx.status = 500;
        ctx.body = { error: `Failed to fetch emails: ${error.message}` };
      }
    } else {
      ctx.status = 500;
      ctx.body = { error: 'An unknown error occurred while trying to fetch emails' };
    }
  }
});

export default router;
