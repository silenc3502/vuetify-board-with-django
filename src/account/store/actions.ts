import { ActionContext, ActionTree } from 'vuex';
import axiosInst from '@/utility/axiosInstance';
import {
    REQUEST_ACCOUNT_TO_SPRING,
    SET_ACCOUNT,
    SET_LOGGED_IN,
} from './mutations-types';
import {AuthState} from "@/authentication/store/states";
import {AxiosResponse} from "axios/index";

export interface AccountActions extends ActionTree<any, any> {
    requestKakaoOauthRedirectUrlToDjango(): Promise<void>;
    requestCheckNicknameToDjango(context: ActionContext<any, any>, payload: any): Promise<boolean>;
    requestEmailDuplicationCheckToDjango(context: ActionContext<any, any>, email: string): Promise<boolean>
    requestNewAccountToDjango(context: ActionContext<any, any>, userData: { email: string; nickname: string }): Promise<void>;
}

const actions: AccountActions = {

    async requestKakaoOauthRedirectUrlToDjango() {
        return axiosInst.djangoAxiosInst.get('/oauth/kakao').then((res) => {
            console.log('res.data.url:', res.data.url)
            window.location.href = res.data.url;
        });
    },

    async requestEmailDuplicationCheckToDjango(context: ActionContext<any, any>, email: string): Promise<boolean> {
        try {
            console.log('requestEmailDuplicationCheckToDjango -> email:', email)
            const response = await axiosInst.djangoAxiosInst.post('/account/check-email-duplication', { email });
            return response.data.isDuplicate;
        } catch (error) {
            console.error('Email duplication check failed:', error);
            throw error;
        }
    },

    async requestCheckNicknameToDjango(context: ActionContext<any, any>, payload) {
        const { newNickname } = payload;
        const isValidNickname = /^[가-힣a-zA-Z0-9]{2,10}$/.test(newNickname);

        if (isValidNickname) {
            console.log('requestCheckNicknameToDjango() nickname 유효함');
            return axiosInst.djangoAxiosInst
                .post(`/account/check-nickname`, { nickname: newNickname }) // 수정: 닉네임을 POST 요청으로 전달
                .then((res) => {
                    if (res.data) {
                        alert('사용 가능한 닉네임입니다!');
                        return false;
                    } else {
                        alert('중복된 닉네임입니다!');
                        return true;
                    }
                });
        } else {
            alert('닉네임 조건을 만족하지 않습니다!');
            return false;
        }
    },

    async requestNewAccountToDjango({ commit }: ActionContext<any, any>, userData: { email: string; nickname: string }): Promise<void> {
        try {
            await axiosInst.djangoAxiosInst.post('/account/register/', userData);
        } catch (error) {
            console.error('Failed to create new account:', error);
            throw error;
        }
    }

};

export default actions;
