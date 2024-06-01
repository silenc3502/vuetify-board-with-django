
import state, { ProductState } from './states'
import mutations from "@/product/store/mutations";
import {ProductMutations} from "@/product/store/mutations";
import actions, {ProductActions} from "@/product/store/actions";

export interface ProductModule {
    namespaced: true
    state: ProductState
    actions: ProductActions
    mutations: ProductMutations
}

const productModule: ProductModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}

export default productModule