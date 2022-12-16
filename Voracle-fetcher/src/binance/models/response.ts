export interface AccountResonse {
    fetcherPk: string,
    pkIdx: string,
    asset: string,
    free: string,
    locked: string,
    fetchSig: [string, string],
}
