import { Context, Hono } from 'hono';
import { cors } from 'hono/cors';
import { verifyRequestOrigin } from 'oslo/request';

// TODO: Adjust as needed
const devDomains = ['http://localhost:5173'];
const prodDomains = ['https://mysite.pages.dev'];

const app = new Hono();

// HELPERS
// -------

// MIDDLEWARE
// ----------

// OPTIONS handler for preflight requests (before CORS middleware)
app.options('*', async (c) => {
	return new Response(null, {
		headers: {
			'Access-Control-Allow-Origin': c.req.header('Origin') as string,
			'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Access-Control-Max-Age': '86400',
			'Access-Control-Allow-Credentials': 'true',
		},
	});
});


// CORS policy
app.use('*', async (c: Context, next) => {
	const corsMiddleware = cors({
		origin: c.env.environment === "development" ? devDomains : prodDomains,
		credentials: true,
	})
	await corsMiddleware(c, next)
});

// Cross Site Request Forgery Protection (CSRF)
app.use('*', async (c: Context, next) => {
	// Only apply CSRF protection to non-GET requests.
	if (c.req.method === 'GET') {
		return next();
	}

	// Get the origin and host headers from the request.
	const originHeader = c.req.header('Origin'); // May need to use X-Forwarded Host instead
	const hostHeader = c.req.header('Host');

	// Allow requests from your frontend domain and subdomains.
	const allowedHosts = c.env.environment === "development" ? devDomains : prodDomains;

	// Verify the request origin against the allowed hosts.
	if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, allowedHosts)) {
		// If the origin is invalid, return a 403 Forbidden response.
		return c.body(null, 403);
	}
	// If the origin is valid, continue to the next middleware.
	return next();
});


// ROUTES
// ------

app.all("*", (c: Context) => {
	return c.text("Test");
})

export default app;
