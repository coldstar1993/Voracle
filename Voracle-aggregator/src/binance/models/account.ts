export interface Balance {
    asset: string;
    free: string;
    locked: string;
}

export interface Account {
    makerCommission: number;
    takerCommission: number;
    buyerCommission: number;
    sellerCommission: number;
    canTrade: boolean;
    canWithdraw: boolean;
    canDeposit: boolean;
    brokered: boolean;
    updateTime: number;
    accountType: string;
    balances: Balance[];
}
