import { ActionContext } from 'vuex';
import { ProductState, Product } from './states';
import { AxiosResponse } from 'axios';
import axiosInst from '../../utility/axiosInstance';
import {
    REQUEST_PRODUCT_TO_SPRING,
    REQUEST_PRODUCT_LIST_TO_SPRING,
} from './mutation-types';

export type ProductActions = {
    requestProductToSpring(context: ActionContext<ProductState, any>, productId: number): Promise<void>;
    requestProductListToSpring(context: ActionContext<ProductState, any>): Promise<void>;
    requestCreateProductToSpring(context: ActionContext<ProductState, any>, formData: FormData): Promise<AxiosResponse>;
};

const actions: ProductActions = {
    async requestProductToSpring(context: ActionContext<ProductState, any>, productId: number): Promise<void> {
        try {
            const res: AxiosResponse<Product> = await axiosInst.djangoAxiosInst.get(`/product/read/${productId}`);
            console.log('res:', res)
            context.commit(REQUEST_PRODUCT_TO_SPRING, res.data);
        } catch (error) {
            console.error('requestProductToSpring(): ' + error);
            throw error;
        }
    },
    async requestProductListToSpring(context: ActionContext<ProductState, any>): Promise<void> {
        try {
            const res: AxiosResponse<Product[]> = await axiosInst.djangoAxiosInst.get('/product/list');
            console.log('res:', res)
            context.commit(REQUEST_PRODUCT_LIST_TO_SPRING, res.data);
        } catch (error) {
            console.error('requestProductListToSpring(): ' + error);
            throw error;
        }
    },
    async requestCreateProductToSpring(context: ActionContext<ProductState, any>, formData: FormData): Promise<AxiosResponse> {
        try {
            console.log('requestCreateProductToSpring()', formData);
            const res: AxiosResponse = await axiosInst.djangoAxiosInst.post('/product/register/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('응답 데이터:', res.data);
            return res; // 응답 반환
        } catch (error) {
            console.error('requestCreateProductToSpring(): ' + error);
            throw error;
        }
    },
};

export default actions;
