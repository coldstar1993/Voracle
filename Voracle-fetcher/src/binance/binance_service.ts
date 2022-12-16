import { Inject, Service } from 'typedi';
import { Account } from './models/account';
import * as axios from "axios";
import config from '../../config';

@Service()
export class BinanceApiService {
  public async obtainAccount(apiKey: string, queryParamSegment: string): Promise<Account> {
    let url = config.binance.baseURL.concat('/v3/account').concat('?').concat(queryParamSegment);
    let account = null as any;
    await axios.default.get(url, { headers: { 'X-MBX-APIKEY': apiKey } }).then(rs => {
      console.log(rs);
      account = rs
    }).catch((e) => {
      console.log(e);
    });

    return account;
  }
}
