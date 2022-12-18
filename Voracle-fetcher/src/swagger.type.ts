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

export interface BlockSummary {
  blockchainLength: number;
  chainId: string;
  circulatingSupply: string;
  dateTime: string;
  epoch: number;
  globalSlot: number;
  lockedSupply: string;
  minWindowDensity: number;
  nextEpochLedgerHash: string;
  previousStateHash: string;
  slot: number;
  snarkedLedgerHash: string;
  stagedLedgerHash: string;
  stakingEpochLedgerHash: string;
  stateHash: string;
  totalCurrency: string;
}

export interface BlockSummaryResponse {
  fetcherPk: string,
  pkIdx: string,
  data: BlockSummary
  fetchSig: any,
}

export interface NetworkSupplyStatusResponse {
  fetcherPk: string,
  pkIdx: string,
  data: { blockchainLength: string, circulatingSupply: string, lockedSupply: string },
  fetchSig: any,
}

export interface CommonResponse {
  fetcherPk: string,
  pkIdx: string,
  data: any,
  fetchSig: any,
}
