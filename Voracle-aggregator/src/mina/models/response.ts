import { BlockSummary } from "./block_entity";

export interface BlockSummaryResponse {
    fetcherPk: string,
    pkIdx: string,
    data: BlockSummary
    fetchSig: [string, string],
}

export interface BlockSupplyStatusResponse {
    fetcherPk: string,
    pkIdx: string,
    data: { blockchainLength: number, circulatingSupply: string, lockedSupply: string },
    fetchSig: [string, string],
}


export interface CommonResponse {
    fetcherPk: string,
    pkIdx: string,
    data: any,
    fetchSig: [string, string],
}
