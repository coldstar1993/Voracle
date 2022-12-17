import * as axios from "axios";
import config from "./config";

import { BlockSummaryResponseList, CommonResponseList, NetworkSupplyStatusResponse, NetworkSupplyStatusResponseList } from './response';

export class MinaApiService {

  public async obtainBlockSummary(): Promise<BlockSummaryResponseList> {
    let blockSummaryResponseList: BlockSummaryResponseList = { data: [] };
    let url = config.VORACLE_AGGREGATOR;

    await axios.default.get(url.concat('/api/mina/block/summary')).then(rs => {
      console.log(rs);
      blockSummaryResponseList.data.push(rs.data.data);
    }).catch((e) => {
      console.log(`${url}`, e);
    });

    return blockSummaryResponseList;
  }

  public async obtainNetworkSupply() {
    let networkSupplyStatusResponseList: NetworkSupplyStatusResponseList = { data: new Array<NetworkSupplyStatusResponse>() };
    let url = config.VORACLE_AGGREGATOR;
    await axios.default.get(url.concat('/api/mina/network/supply')).then(rs => {
      console.log(rs);
      networkSupplyStatusResponseList.data.push(rs.data.data);
    }).catch((e) => {
      console.log(`${url}`, e);
    });

    return networkSupplyStatusResponseList;
  }

  public async obtainLatestBlocks(count: number): Promise<CommonResponseList> {
    let commonResponseList: CommonResponseList = { data: [] };
    let url = config.VORACLE_AGGREGATOR;
    await axios.default.get(url.concat('/api/mina/block/latest/' + count)).then(rs => {
      console.log(rs);
      commonResponseList.data.push(rs.data.data);
    }).catch((e) => {
      console.log(`${url}`, e);
    });

    return commonResponseList;
  }

  public async obtainBlockByHash(blockHash: string): Promise<CommonResponseList> {
    let commonResponseList: CommonResponseList = { data: [] };
    let url = config.VORACLE_AGGREGATOR;
    await axios.default.get(url.concat('/api/mina/block/hash/' + blockHash)).then(rs => {
      console.log(rs);
      commonResponseList.data.push(rs.data.data);
    }).catch((e) => {
      console.log(`${url}`, e);
    });

    return commonResponseList;
  }
}
