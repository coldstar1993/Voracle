import { Get, JsonController, NotFoundError, Param, QueryParam } from 'routing-controllers';
import { Service } from 'typedi';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { BinanceApiService } from "./binance_service";
import { Encoding, Poseidon, PrivateKey } from 'snarkyjs';
import { AccountResonse, AccountResonseList } from './models/response';
import { ApiResp } from '../common/api_resp';

@OpenAPI({
  security: [{ basicAuth: [] }],
  description: 'obtain your data within Binance CEX',
})
@JsonController('/binance')
@Service()
export class BinanceController {
  constructor(private readonly binanceService: BinanceApiService) { }

  @OpenAPI({
    summary: 'Get balance info by asset',
  })
  @Get('/account/:asset')
  @ResponseSchema('AccountResonse')
  public async getAccount(
    @Param("asset") asset: string,
    @QueryParam("apiKey") apiKey: string,
    @QueryParam("queryParamSegment") queryParamSegment: string
  ): Promise<ApiResp<AccountResonseList>> {
    const accountResonseList = await this.binanceService.obtainAccount(apiKey, asset, queryParamSegment);
    return ApiResp.Ok(accountResonseList);
  }
}
