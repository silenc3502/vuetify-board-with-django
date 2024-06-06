import AccountOauthLoginPage from "@/account/pages/login/AccountOauthLoginPage.vue";
import KakaoRedirectionPage from "@/account/redirection/kakao/KakaoRedirectionPage.vue";

const AuthRoutes = [
    {
        path: "/oauth/kakao-login",
        name: "KakaoRedirectPage",
        component: KakaoRedirectionPage,
    },
]

export default AuthRoutes