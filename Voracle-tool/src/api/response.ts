
import { BlockSummary } from "./block_entity";
export interface AccountResonse {
  fetcherPk: string,
  pkIdx: string,
  fetchSig: any,
  account:{
    apiKey: string,
    asset: string,
    free: string,
    locked: string,
    timestamp:number
  }
}


export interface AccountResonseList {
  data: AccountResonse[]
}


export interface BlockSummaryResponse {
    fetcherPk: string,
    pkIdx: string,
    data: BlockSummary
    fetchSig: [string, string],
}
export interface BlockSummaryResponseList {
    data: BlockSummaryResponse[]
}

export interface NetworkSupplyStatusResponse {
    fetcherPk: string,
    pkIdx: string,
    data: { blockchainLength: number, circulatingSupply: string, lockedSupply: string },
    fetchSig: [string, string],
}
export interface NetworkSupplyStatusResponseList {
  data: NetworkSupplyStatusResponse[]
}

export interface CommonResponse {
    fetcherPk: string,
    pkIdx: string,
    data: any,
    fetchSig: [string, string],
}
export interface CommonResponseList {
    data: CommonResponse[]
}

