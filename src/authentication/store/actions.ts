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
    requestUserInfoToDjango(context: ActionContext<AuthState, any>, accessToken: string): Promise<void>;
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
            console.log('getAccessTokenFromDjangoRedirection() -> code:', code);
            const response: AxiosResponse<any> = await axiosInst.djangoAxiosInst.post('/oauth/kakao/oauth-code', { code });
            console.log('getAccessTokenFromDjangoRedirection() -> accessToken:', response.data.access_token.access_token);
            localStorage.setItem("accessToken", response.data.access_token.access_token);
            context.commit(KAKAO_LOGIN_COMPLETE, true);
        } catch (error) {
            alert('문제 발생!');
            throw error;
        }
    },

    async requestUserInfoToDjango(context: ActionContext<AuthState, any>, accessToken: string): Promise<void> {
        try {
            const userInfoResponse: AxiosResponse<any> = await axiosInst.djangoAxiosInst.post('/oauth/kakao/user-info', { access_token: accessToken });
            console.log('User Info:', userInfoResponse.data.user_info);
        } catch (error) {
            alert('사용자 정보 가져오기 실패!');
            throw error;
        }
    }
}

export default actions;
