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
