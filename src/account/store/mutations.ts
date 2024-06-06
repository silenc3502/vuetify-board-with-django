import { MutationTree } from 'vuex'
import { AccountState } from './states'
import {
    SET_ACCOUNT,
    REQUEST_ACCOUNT_TO_SPRING,
    SET_LOGGED_IN
} from './mutations-types'

export interface AccountMutations extends MutationTree<AccountState> {
    [SET_ACCOUNT](state: AccountState, receiveData: Record<string, any>): void;
    [REQUEST_ACCOUNT_TO_SPRING](state: AccountState, receivedData: Record<string, any>): void;
    [SET_LOGGED_IN](state: AccountState, receiveData: boolean): void;
}

const mutations: MutationTree<AccountState> = {
    [SET_ACCOUNT](state, receiveData) {
        state.account = receiveData;
    },
    [REQUEST_ACCOUNT_TO_SPRING](state, receivedData) {
        state.account = receivedData;
    },
    [SET_LOGGED_IN](state, receiveData) {
        state.isLoggedIn = receiveData;
    }
};

export default mutations as AccountMutations