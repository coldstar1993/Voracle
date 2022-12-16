import {
  Middleware,
  ExpressErrorMiddlewareInterface,
  HttpError,
} from 'routing-controllers';
import { ApiResp } from '../common/api_resp';

@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: (err: any) => any) {
    console.log(error);
    if (process.env.NODE_ENV === 'production') {
      if (error instanceof HttpError) {
        response.send(
          JSON.stringify(ApiResp.Err(error.httpCode, error.message))
        );
      } else {
        response.send(
          JSON.stringify(ApiResp.Err(500, 'Internal Server Error'))
        );
      }
    } else {
      const err = error as Error;
      response.status(500).send(err.message + '\n' + err.stack);
    }
  }
}
