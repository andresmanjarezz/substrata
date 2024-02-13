import Koa from 'koa';
import session from 'koa-session';
import dotenv from 'dotenv';
import { router } from './routes';
import { SESSION_CONFIG } from './config'

dotenv.config();

const app: Koa = new Koa();
const port: number | string = process.env.PORT || 3000;

app.use(router.routes());
app.use(router.allowedMethods());
app.use(session(SESSION_CONFIG, app));

app.listen(port, () => {
	console.log(`🚀 Server is running on port http://localhost:${port}/`);
});
