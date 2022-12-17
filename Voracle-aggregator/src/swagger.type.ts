export interface AccountResonse {
  fetcherPk: string,
  pkIdx: string,
  asset: string,
  free: string,
  locked: string,
  fetchSig: [string, string],
}

export interface AccountResonseList {
  data: AccountResonse[]
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

