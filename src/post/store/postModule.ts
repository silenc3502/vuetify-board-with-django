import mutations, { PostMutations } from '@/post/store/mutations'
import actions, { PostActions } from './actions'
import state, { PostState } from "@/post/store/states";

export interface PostModule {
    namespaced: true
    state: PostState
    actions: PostActions
    mutations: PostMutations
}

const postModule: PostModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}

export default postModule