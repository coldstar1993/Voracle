import { Inject, Service } from 'typedi';
import { BlockSummary } from './models/block_entity';
import * as axios from "axios";
import config from '../../config';

@Service()
export class MinaApiService {
  public async obtainBlockSummary(): Promise<BlockSummary> {
    let url = config.minaexplorer.baseURL.concat('/summary');
    let summary = null as any;
    await axios.default.get(url).then(rs => {
      console.log(rs);
      summary = rs.data;
    }).catch((e) => {
      console.log(e);
    });

    return summary;
  }

  public async obtainLatestBlocks(count: number): Promise<any> {
    let url = config.minaexplorer.baseURL.concat('/blocks').concat('?limit=' + count);
    let summary = null as any;
    await axios.default.get(url).then(rs => {
      console.log(rs);
      summary = rs.data;
    }).catch((e) => {
      console.log(e);
    });

    return summary;
  }

  public async obtainBlockByHash(blockHash: string): Promise<any> {
    let url = config.minaexplorer.baseURL.concat('/blocks/').concat(blockHash);
    let summary = null as any;
    await axios.default.get(url).then(rs => {
      console.log(rs);
      summary = rs.data;
    }).catch((e) => {
      console.log(e);
    });

    return summary;
  }
}
