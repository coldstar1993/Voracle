export interface AccountResonse {
  fetcherPk: string,
  pkIdx: string,
  asset: string,
  free: string,
  locked: string,
  fetchSig: [string, string],
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

export interface BlockSupplyStatusResponse {
  fetcherPk: string,
  pkIdx: string,
  data: { blockchainLength: string, circulatingSupply: string, lockedSupply: string },
  fetchSig: [string, string],
}

export interface CommonResponse {
  fetcherPk: string,
  pkIdx: string,
  data: any,
  fetchSig: [string, string],
}
