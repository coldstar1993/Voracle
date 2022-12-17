import { Get, JsonController, NotFoundError, Param, QueryParam } from 'routing-controllers';
import { Service } from 'typedi';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { MinaApiService } from "./mina_service";
import { Encoding, Poseidon, PrivateKey } from 'snarkyjs';

import { ApiResp } from '../common/api_resp';
import { BlockSummaryResponse, BlockSummaryResponseList, NetworkSupplyStatusResponse, CommonResponse, NetworkSupplyStatusResponseList, CommonResponseList } from './models/response';

@OpenAPI({
  security: [{ basicAuth: [] }],
  description: 'obtain your data within Mina Chain',
})
@JsonController('/mina')
@Service()
export class MinaController {
  constructor(private readonly minaApiService: MinaApiService) { }

  @OpenAPI({
    summary: 'Get block summary',
  })
  @Get('/block/summary')
  @ResponseSchema('BlockSummaryResponseList')
  public async obtainBlockSummary(): Promise<ApiResp<BlockSummaryResponseList>> {
    const blockSummaryResponseList = await this.minaApiService.obtainBlockSummary();
    return ApiResp.Ok(blockSummaryResponseList);
  }

  //curl --request GET \
  // --url 'https://api.minaexplorer.com/accounts/B62qpRzFVjd56FiHnNfxokVbcHMQLT119My1FEdSq8ss7KomLiSZcan'
  @OpenAPI({
    summary: 'Get network supply',
    description:''
  })
  @Get('/network/supply')
  @ResponseSchema('NetworkSupplyStatusResponseList')
  public async obtainNetworkSupply(): Promise<ApiResp<NetworkSupplyStatusResponseList>> {
    const networkSupplyStatusResponseList = await this.minaApiService.obtainNetworkSupply();
    return ApiResp.Ok(networkSupplyStatusResponseList);
  }

  @OpenAPI({
    summary: 'Get latest N blocks',
    description:'maximum: 10, minimum: 1'
  })
  @Get('/block/latest/:num')
  @ResponseSchema('CommonResponseList')
  public async obtainBlockLatestN(
    @Param('num') num: number
  ): Promise<ApiResp<CommonResponseList>> {
    const commonResponseList = await this.minaApiService.obtainLatestBlocks(num);
    return ApiResp.Ok(commonResponseList);
  }

  @OpenAPI({
    summary: 'Get block by blockHash',
  })
  @Get('/block/hash/:blockhash')
  @ResponseSchema('CommonResponseList')
  public async obtainBlockByHash(
    @Param('blockhash') blockhash: string
  ): Promise<ApiResp<CommonResponseList>> {
    const commonResponseList = await this.minaApiService.obtainBlockByHash(blockhash);
    return ApiResp.Ok(commonResponseList);
  }
}
