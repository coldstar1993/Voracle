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
