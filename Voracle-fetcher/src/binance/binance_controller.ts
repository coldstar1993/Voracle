import { Get, JsonController, NotFoundError, Param, QueryParam } from 'routing-controllers';
import { Service } from 'typedi';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { BinanceApiService } from "./binance_service";
import { CircuitString, Encoding, Field, Poseidon, PrivateKey, Signature, UInt64 } from 'snarkyjs';
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
    // fetch account from binance
    const account = await this.binanceService.obtainAccount(apiKey, queryParamSegment);
    let targetBalance = account?.balances?.filter((b) => b.asset == asset.toUpperCase())?.at(0);
    let free = (Number.parseFloat((targetBalance?.free) ?? '0')* 1e8).toFixed(0);
    let locked = (Number.parseFloat((targetBalance?.locked) ?? '0')* 1e8).toFixed(0);
    let timestamp = Number.parseInt(queryParamSegment.split('&').filter(v=>v.startsWith('timestamp'))[0].split('=')[0]);
    // get fetcher key
    const _privKey = process.env.FETCHER_PRIV_KEY as string;
    const pkIdx = process.env.FETCHER_PUB_KEY_IDX as string;
    const fetchPrivKey = PrivateKey.fromBase58(_privKey);
    const fetcherPk = fetchPrivKey.toPublicKey().toBase58();
    // hash
    let apiKey1 = Poseidon.hash(CircuitString.fromString(apiKey).toFields());
    let asset1 = CircuitString.fromString(asset);
    let free1 = Field(free);
    let locked1 = Field(locked);
    let timestamp1 = UInt64.from(timestamp);
    let hash = Poseidon.hash([apiKey1, ...asset1.toFields(), free1, locked1, ...timestamp1.toFields()]);
    // sign
    const fetchSig = Signature.create(fetchPrivKey, [hash]).toJSON();

    return ApiResp.Ok({ fetcherPk, pkIdx, account:{apiKey, asset, free, locked, timestamp}, fetchSig } as AccountResonse);
  }
}
