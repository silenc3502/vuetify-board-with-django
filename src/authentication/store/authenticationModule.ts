import mutations, { AuthMutations } from './mutations'
import actions, { AuthActions } from './actions'
import state, { AuthState } from './states'

export interface AuthModule {
    namespaced: true
    state: AuthState
    actions: AuthActions
    mutations: AuthMutations
}

const AuthenticationModule: AuthModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}

export default AuthenticationModule