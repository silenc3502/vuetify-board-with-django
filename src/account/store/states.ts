export interface AccountState {
    account: Record<string, any>;
    isLoggedIn: boolean;
}

const state: AccountState = {
    account: {},
    isLoggedIn: false,
};

export default state