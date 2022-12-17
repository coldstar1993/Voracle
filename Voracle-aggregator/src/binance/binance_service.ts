import { Inject, Service } from 'typedi';
import * as axios from "axios";
import config from '../../config';
import { AccountResonseList } from './models/response';

@Service()
export class BinanceApiService {
  public async obtainAccount(apiKey: string, asset: string, queryParamSegment: string): Promise<AccountResonseList> {
    let accountResonseList: AccountResonseList = {data:[]};
    for (const url of config.fetchers) {
      await axios.default.get(url.concat('/binance').concat('/'+asset).concat('?apiKey='+apiKey).concat('&queryParamSegment='+queryParamSegment)).then(rs => {
        console.log(rs);
        accountResonseList.data.push(rs.data);
      }).catch((e) => {
        console.log(`${url}`, e);
      });
    }

    return accountResonseList;
  }
}
