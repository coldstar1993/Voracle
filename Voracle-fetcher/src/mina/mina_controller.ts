import { Get, JsonController, NotFoundError, Param, QueryParam } from 'routing-controllers';
import { Service } from 'typedi';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { MinaApiService } from "./mina_service";
import { Encoding, Poseidon, PrivateKey } from 'snarkyjs';

import { ApiResp } from '../common/api_resp';
import { BlockSummaryResponse, NetworkSupplyStatusResponse, CommonResponse } from './models/response';

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
  @ResponseSchema('BlockSummaryResponse')
  public async obtainBlockSummary(): Promise<ApiResp<BlockSummaryResponse>> {
    const blockSummary = await this.minaApiService.obtainBlockSummary();

    // get key
    const _privKey = process.env.FETCHER_PRIV_KEY as string;
    const pkIdx = process.env.FETCHER_PUB_KEY_IDX as string;
    const fetchPrivKey = PrivateKey.fromBase58(_privKey);
    const fetcherPk = fetchPrivKey.toPublicKey().toBase58();
    // hash
    let preimage = { blockSummary };
    let hash = Poseidon.hash(Encoding.stringToFields(JSON.stringify(preimage)));
    // sign
    // TODO
    const fetchSig = ['', ''];
    return ApiResp.Ok({ fetcherPk, pkIdx, data: blockSummary, fetchSig } as BlockSummaryResponse);
  }

  //curl --request GET \
  // --url 'https://api.minaexplorer.com/accounts/B62qpRzFVjd56FiHnNfxokVbcHMQLT119My1FEdSq8ss7KomLiSZcan'
  @OpenAPI({
    summary: 'Get network supply',
    description:''
  })
  @Get('/network/supply')
  @ResponseSchema('NetworkSupplyStatusResponse')
  public async obtainNetworkSupply(): Promise<ApiResp<NetworkSupplyStatusResponse>> {
    const blockSummary = await this.minaApiService.obtainBlockSummary();
    const lockedSupply = (blockSummary?.lockedSupply)??'0';
    const circulatingSupply = (blockSummary?.circulatingSupply)??'0';
    const blockchainLength = (blockSummary?.blockchainLength)??0;

    // get key
    const _privKey = process.env.FETCHER_PRIV_KEY as string;
    const pkIdx = process.env.FETCHER_PUB_KEY_IDX as string;
    const fetchPrivKey = PrivateKey.fromBase58(_privKey);
    const fetcherPk = fetchPrivKey.toPublicKey().toBase58();
    // hash
    let preimage = { blockchainLength, circulatingSupply, lockedSupply };
    let hash = Poseidon.hash(Encoding.stringToFields(JSON.stringify(preimage)));
    // sign
    // TODO
    const fetchSig = ['', ''];
    return ApiResp.Ok({ fetcherPk, pkIdx, data: { blockchainLength, circulatingSupply, lockedSupply }, fetchSig } as NetworkSupplyStatusResponse);
  }

  @OpenAPI({
    summary: 'Get latest N blocks',
    description:'maximum: 10, minimum: 1'
  })
  @Get('/block/latest/:num')
  @ResponseSchema('BlockSupplyStatusResponse')
  public async obtainBlockLatestN(
    @Param('num') num: number
  ): Promise<ApiResp<NetworkSupplyStatusResponse>> {
    const latestBlockN = await this.minaApiService.obtainLatestBlocks(num);

    // get key
    const _privKey = process.env.FETCHER_PRIV_KEY as string;
    const pkIdx = process.env.FETCHER_PUB_KEY_IDX as string;
    const fetchPrivKey = PrivateKey.fromBase58(_privKey);
    const fetcherPk = fetchPrivKey.toPublicKey().toBase58();
    // hash
    let preimage = latestBlockN;
    let hash = Poseidon.hash(Encoding.stringToFields(JSON.stringify(preimage)));
    // sign
    // TODO
    const fetchSig = ['', ''];
    return ApiResp.Ok({ fetcherPk, pkIdx, data: latestBlockN, fetchSig } as NetworkSupplyStatusResponse);
  }

  @OpenAPI({
    summary: 'Get block by blockHash',
  })
  @Get('/block/hash/:blockhash')
  @ResponseSchema('CommonResponse')
  public async obtainBlockByHash(
    @Param('blockhash') blockhash: string
  ): Promise<ApiResp<CommonResponse>> {
    const targetBlock = await this.minaApiService.obtainBlockByHash(blockhash);
    // get key
    const _privKey = process.env.FETCHER_PRIV_KEY as string;
    const pkIdx = process.env.FETCHER_PUB_KEY_IDX as string;
    const fetchPrivKey = PrivateKey.fromBase58(_privKey);
    const fetcherPk = fetchPrivKey.toPublicKey().toBase58();
    // hash
    let preimage = targetBlock;
    let hash = Poseidon.hash(Encoding.stringToFields(JSON.stringify(preimage)));
    // sign
    // TODO
    const fetchSig = ['', ''];
    return ApiResp.Ok({ fetcherPk, pkIdx, data: targetBlock} as CommonResponse);
  }
}
