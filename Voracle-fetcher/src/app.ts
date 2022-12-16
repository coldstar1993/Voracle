import 'reflect-metadata';
import express from 'express';
import {
  getMetadataArgsStorage,
  useContainer,
  useExpressServer as useServer,
} from 'routing-controllers';
import { Container } from 'typedi';
import * as binanceControllers from './binance';
import * as minaControllers from "./mina";
import * as middlewares from './middlewares';
import Config from '../config';
import { routingControllersToSpec } from 'routing-controllers-openapi';

import * as swaggerUiExpress from 'swagger-ui-express';

import morgan from 'morgan';
import schemas from './swagger_schemas.json';
import { isReady } from 'snarkyjs';

const app = express();
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);

// init snarkyjs
await isReady;
// use di container
useContainer(Container);

const routingControllersOptions = {
  routePrefix: '/api',
  cors: true,
  defaultErrorHandler: false,
  controllers: [...Object.values(binanceControllers), ...Object.values(minaControllers)],
  middlewares: [...Object.values(middlewares)],
};
useServer(app, routingControllersOptions);

// Parse routing-controllers classes into OpenAPI spec
const storage = getMetadataArgsStorage();

const spec = routingControllersToSpec(storage, routingControllersOptions, {
  components: {
    // @ts-ignore
    schemas,
    securitySchemes: {
      basicAuth: {
        scheme: 'basic',
        type: 'http',
      },
    },
  },
  info: {
    description: 'Generated with `voracle`',
    title: 'voracle Service Open API',
    version: '0.1.0',
  },
});
console.log(JSON.stringify(spec));

// add swagger docs access
app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));

console.log('process.env.NODE_ENV: ' + process.env.NODE_ENV);
app.listen(process.env.SERVER_PORT, () =>
  console.log(`Started on http://localhost:${process.env.SERVER_PORT}`)
);
