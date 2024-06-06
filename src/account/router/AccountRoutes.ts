import AccountOauthLoginPage from "@/account/pages/login/AccountOauthLoginPage.vue";
import KakaoRedirectionPage from "@/account/redirection/kakao/KakaoRedirectionPage.vue";

const AccountRoutes = [
    {
        path: '/account/login',
        name: 'AccountOauthLoginPage',
        component: AccountOauthLoginPage
    },
]

export default AccountRoutes