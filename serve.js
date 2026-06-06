import { createServer } from 'node:http';
import { readFileSync, statSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

const PORT = Number(process.env.PORT) || 3000;
const ROOT = new URL('./build', import.meta.url).pathname;

const MIME = {
	'.html': 'text/html; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.js': 'application/javascript; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.gif': 'image/gif',
	'.svg': 'image/svg+xml',
	'.ico': 'image/x-icon',
	'.avif': 'image/avif',
	'.webp': 'image/webp',
	'.txt': 'text/plain; charset=utf-8',
	'.xml': 'application/xml; charset=utf-8',
};

createServer((req, res) => {
	let path = new URL(req.url, `http://${req.headers.host}`).pathname;
	if (path.endsWith('/')) path += 'index.html';

	const filePath = join(ROOT, path);

	if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
		const fallback = join(ROOT, 'index.html');
		if (existsSync(fallback)) {
			res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
			res.end(readFileSync(fallback));
			return;
		}
		res.writeHead(404);
		res.end('Not Found');
		return;
	}

	const ext = extname(filePath);
	res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
	res.end(readFileSync(filePath));
}).listen(PORT, () => {
	console.log(`Static server running on port ${PORT}`);
});
