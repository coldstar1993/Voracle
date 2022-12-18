import { BlockSummary } from "./block_entity";

export interface BlockSummaryResponse {
  fetcherPk: string,
  pkIdx: string,
  data: BlockSummary
  fetchSig: any,
}

export interface NetworkSupplyStatusResponse {
  fetcherPk: string,
  pkIdx: string,
  data: { blockchainLength: number, circulatingSupply: string, lockedSupply: string },
  fetchSig: any,
}


export interface CommonResponse {
  fetcherPk: string,
  pkIdx: string,
  data: any,
  fetchSig: any,
}
