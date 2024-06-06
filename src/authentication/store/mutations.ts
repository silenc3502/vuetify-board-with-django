import { MutationTree } from 'vuex'
import { AuthState } from './states'
import {
    KAKAO_LOGIN_COMPLETE,
} from './mutations-types'
import {AccountMutations} from "@/account/store/mutations";

export interface AuthMutations extends MutationTree<AuthState> {
    [KAKAO_LOGIN_COMPLETE](state: AuthState, receivedData: boolean): void;
}

const mutations: MutationTree<AuthState> = {
    [KAKAO_LOGIN_COMPLETE](state, receivedData: boolean) {
        state.isAuthenticated = receivedData;
    },
};

export default mutations as AuthMutations