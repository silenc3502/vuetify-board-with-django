<template>
    <v-app-bar color="primary" app dark height="64">
        <v-btn @click="goToHome">
            <v-toolbar-title class="text-uppercase text--darken-4">
                <span>EDDI</span>
            </v-toolbar-title>
        </v-btn>
        <v-spacer></v-spacer>

        <v-menu>
            <template v-slot:activator="{ props }">
                <v-btn color="white" v-bind="props">
                    <b>Activator Slot</b>
                </v-btn>
            </template>
            <v-list>
                <v-list-item v-for="(item, index) in items" :key="index" :value="index" @click="item.action">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <v-btn text @click="callProductPage" class="btn-text">
            <v-icon left>mdi-store</v-icon>
            <span>상품 게시판</span>
        </v-btn>
        <v-btn text @click="callBoardPage" class="btn-text">
            <v-icon left>mdi-forum</v-icon>
            <span>자유 게시판</span>
        </v-btn>
        <v-btn v-if="isLogin" text @click="myPage" class="btn-text">
            <v-icon left>mdi-account-circle</v-icon>
            <span>마이 페이지</span>
        </v-btn>
        <v-btn v-if="!isLogin" text @click="signIn" class="btn-text">
            <v-icon left>mdi-login</v-icon>
            <span>로그인</span>
        </v-btn>
        <v-btn v-if="isLogin" text @click="signOut" class="btn-text">
            <v-icon left>mdi-logout</v-icon>
            <span>로그아웃</span>
        </v-btn>
    </v-app-bar>
</template>

<script>
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'
import 'vuetify/styles'
import router from "@/router";

export default {
    data() {
        return {
            navigation_drawer: false,
            links: [{ icon: 'mdi-home', text: 'Home', route: '/' }],
            userToken: null,
            isLogin: false,
            items: [
                { title: 'Profile', action: this.goToHome },
                { title: 'Settings', action: this.goToHome },
                { title: 'Sign out', action: this.signOut }
            ],
        };
    },
    methods: {
        callProductPage() {
            router.push('/product/list');
        },
        callBoardPage() {
            router.push('/board/list');
        },
        myPage() {
            router.push('/my-page');
        },
        signIn() {
            router.push('/sign-in');
        },
        signOut() {
            localStorage.removeItem("userToken");
            this.isLogin = false;
            router.push('/');
        },
        goToHome() {
            router.push('/');
        },
    },
    mounted() {
        this.userToken = localStorage.getItem("userToken");
        this.isLogin = !!this.userToken;
    }
};
</script>

<style scoped>
.btn-text {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    padding: 0.5rem;
    text-transform: none;
}

.v-btn__content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0;
}

.v-btn__content span {
    margin-left: 0.5rem;
    line-height: 1;
}
</style>
