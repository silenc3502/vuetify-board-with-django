import KakaoRedirection from "@/authentication/redirection/kakao/KakaoRedirection.vue";

const AuthRoutes = [
    {
        path: "/oauth/kakao-login",
        name: "KakaoRedirection",
        component: KakaoRedirection,
    },
]

export default AuthRoutes