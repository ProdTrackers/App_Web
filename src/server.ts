/*
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine, isMainModule } from '@angular/ssr/node';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './main.server';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');

const app = express();
const commonEngine = new CommonEngine();
*/
/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
/*
app.get(
  '**',
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html'
  }),
);
*/
/**
 * Handle all other requests by rendering the Angular application.
 */
/*
app.get('**', (req, res, next) => {
  const { protocol, originalUrl, baseUrl, headers } = req;

  commonEngine
    .render({
      bootstrap,
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: browserDistFolder,
      providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
    })
    .then((html) => res.send(html))
    .catch((err) => next(err));
});
*/
/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
/*
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export default app;
    */


import { CommonEngine } from '@angular/ssr/node';
// Asegúrate de que esta importación sea exactamente como se muestra, con el .mjs
import { render } from '@netlify/angular-runtime/common-engine.mjs';

const commonEngine = new CommonEngine();

/**
 * Esta función es el punto de entrada que Netlify espera para el renderizado SSR.
 * Reemplaza completamente la lógica del servidor Express.
 *
 * @param request El objeto de solicitud HTTP.
 * @param context El contexto de la función serverless de Netlify.
 * @returns Una promesa que resuelve en una respuesta HTTP.
 */
export async function netlifyCommonEngineHandler(request: Request, context: any): Promise<Response> {
  // Puedes definir endpoints de API aquí si necesitas funciones serverless personalizadas
  // que no sean el renderizado SSR de Angular.
  // Por ejemplo, si tuvieras una API en /api/hello:
  // const pathname = new URL(request.url).pathname;
  // if (pathname === '/api/hello') {
  //   return Response.json({ message: 'Hello from the API' });
  // }

  // La función `render` de @netlify/angular-runtime se encarga de:
  // 1. Cargar tu aplicación Angular (main.server.ts).
  // 2. Renderizar la página solicitada utilizando commonEngine.
  // 3. Devolver el HTML resultante.
  return await render(commonEngine);
}
