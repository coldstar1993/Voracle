import { BlockSummary } from "./block_entity";

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

