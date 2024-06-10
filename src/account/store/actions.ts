import { ActionContext, ActionTree } from 'vuex';
import axiosInst from '@/utility/axiosInstance';
import {
    REQUEST_ACCOUNT_TO_SPRING,
    SET_ACCOUNT,
    SET_LOGGED_IN,
} from './mutations-types';
import {AuthState} from "@/authentication/store/states";

export interface AccountActions extends ActionTree<any, any> {
    requestAccountInfoToDjango(context: ActionContext<any, any>): Promise<void>;
    requestUserLogoutToDjango(context: ActionContext<any, any>): Promise<void>;
    requestKakaoOauthRedirectUrlToDjango(): Promise<void>;
    requestExistUserInfoKakaoToDjango(context: ActionContext<any, any>): Promise<void>;
    requestUserInfoKakaoToDjango(context: ActionContext<any, any>, payload: any): Promise<void>;
    requestCheckKaKaoEmailToDjango(checkPayload: any): Promise<boolean>;
    requestCheckNicknameToDjango(context: ActionContext<any, any>, payload: any): Promise<boolean>;
}

const actions: AccountActions = {
    async requestAccountInfoToDjango({ commit }) {
        const userToken = localStorage.getItem('userToken');
        return axiosInst.djangoAxiosInst
            .get('account/info', { headers: { Authorization: userToken } })
            .then((res) => {
                commit(REQUEST_ACCOUNT_TO_SPRING, res.data);
                console.log(res.data);
            });
    },

    async requestUserLogoutToDjango({ commit }) {
        const userToken = localStorage.getItem('userToken');
        return axiosInst.djangoAxiosInst
            .get('/account/logout', { params: { userToken: userToken } })
            .then(async (res) => {
                await commit(SET_LOGGED_IN, false);
            });
    },

    async requestKakaoOauthRedirectUrlToDjango() {
        return axiosInst.djangoAxiosInst.get('/oauth/kakao').then((res) => {
            console.log('res.data.url:', res.data.url)
            window.location.href = res.data.url;
        });
    },

    async requestExistUserInfoKakaoToDjango({ commit }) {
        return axiosInst.djangoAxiosInst
            .get('/oauth/kakao-login')
            .then(async (res) => {
                await commit(SET_ACCOUNT, res.data);
                localStorage.setItem('userToken', res.data.userToken);
                await commit(SET_LOGGED_IN, true);
            });
    },

    async requestUserInfoKakaoToDjango({ commit }, payload) {
        const { nickname, profileImageName } = payload;
        const reqForm = {
            nickname,
            profileImageName,
        };
        console.log(nickname);
        return axiosInst.djangoAxiosInst
            .post('/oauth/kakao-new-login', reqForm)
            .then(async (res) => {
                await commit(SET_ACCOUNT, res.data);
                localStorage.setItem('userToken', res.data.userToken);
                await commit(SET_LOGGED_IN, true);
            });
    },

    async requestCheckKaKaoEmailToDjango(checkPayload) {
        const { code } = checkPayload;
        return axiosInst.djangoAxiosInst
            .get('/oauth/kakao-check-exist', { params: { code: code } })
            .then((res) => {
                if (res.data) {
                    return res.data;
                } else {
                    return false;
                }
            });
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
                        return true;
                    } else {
                        alert('중복된 닉네임입니다!');
                        return false;
                    }
                });
        } else {
            alert('닉네임 조건을 만족하지 않습니다!');
            return false;
        }
    },

};

export default actions;
