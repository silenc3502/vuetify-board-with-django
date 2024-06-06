import { ActionContext, ActionTree } from 'vuex';
import axiosInst from '@/utility/axiosInstance';
import { AuthState } from './states';
import {
    KAKAO_LOGIN_COMPLETE,
} from './mutations-types';
import { AxiosResponse } from 'axios';

export type AuthActions = {
    requestGithubLoginToDjango(context: ActionContext<AuthState, any>): Promise<any>;
    getAccessTokenFromDjangoRedirection(context: ActionContext<AuthState, any>, payload: { code: string }): Promise<void>;
}

const actions: ActionTree<AuthState, any> & AuthActions = {
    async requestGithubLoginToDjango(context: ActionContext<AuthState, any>): Promise<any> {
        try {
            const response: AxiosResponse<any> = await axiosInst.djangoAxiosInst.get('/authentication/github/login');
            return response.data;
        } catch (error) {
            alert("문제 발생!");
            throw error;
        }
    },

    async getAccessTokenFromDjangoRedirection(context: ActionContext<AuthState, any>, payload: { code: string }): Promise<void> {
        const { code } = payload;

        try {
            const response: AxiosResponse<any> = await axiosInst.djangoAxiosInst.get(`/authentication/github/oauth-code?code=${code}`);
            localStorage.setItem("userToken", response.data);
            context.commit(KAKAO_LOGIN_COMPLETE, true);
        } catch (error) {
            alert('문제 발생!');
            throw error;
        }
    }
}

export default actions;
