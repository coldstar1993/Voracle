import { Get, JsonController, NotFoundError, Param, QueryParam } from 'routing-controllers';
import { Service } from 'typedi';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { BinanceApiService } from "./binance_service";
import { Encoding, Poseidon, PrivateKey, Signature } from 'snarkyjs';
import { AccountResonse } from './models/response';
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
  ): Promise<ApiResp<AccountResonse>> {
    const account = await this.binanceService.obtainAccount(apiKey, queryParamSegment);
    let targetBalance = account?.balances?.filter((b) => b.asset == asset.toUpperCase())?.at(0);
    let free = (targetBalance?.free) ?? '0';
    let locked = (targetBalance?.locked) ?? '0';
    // get key
    const _privKey = process.env.FETCHER_PRIV_KEY as string;
    const pkIdx = process.env.FETCHER_PUB_KEY_IDX as string;
    const fetchPrivKey = PrivateKey.fromBase58(_privKey);
    const fetcherPk = fetchPrivKey.toPublicKey().toBase58();
    // hash
    let preimage = { apiKey, queryParamSegment, asset, free, locked };
    let hash = Poseidon.hash(Encoding.stringToFields(JSON.stringify(preimage)));

    // sign
    const fetchSig = Signature.create(fetchPrivKey, [hash]).toJSON();
    return ApiResp.Ok({ fetcherPk, pkIdx, asset, free, locked, fetchSig } as AccountResonse);
  }
}
