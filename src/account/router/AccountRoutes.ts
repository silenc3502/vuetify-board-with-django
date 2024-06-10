import AccountOauthLoginPage from "@/account/pages/login/AccountOauthLoginPage.vue";
import AccountRegisterPage from "@/account/pages/register/AccountRegisterPage.vue";

const AccountRoutes = [
    {
        path: '/account/login',
        name: 'AccountOauthLoginPage',
        component: AccountOauthLoginPage
    },
    {
        path: '/account/register',
        name: 'AccountRegisterPage',
        component: AccountRegisterPage
    },
]

export default AccountRoutes