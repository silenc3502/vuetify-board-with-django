<template>
    <v-container>
        <v-card class="login-card" flat>
            <div class="login-title"></div>
            <v-img class="mx-auto" height="300" :src="require('@/assets/images/image-453.png')">
            </v-img>
            <div class="login-icons">
                <v-img class="icon" :src="require('@/assets/images/kakao_login.png')" height="50" @click="onKakaoLogin"></v-img>
            </div>
        </v-card>
    </v-container>
</template>

<script>
import { useStore } from "vuex";

export default {
    setup() {
        const store = useStore();

        const onKakaoLogin = async () => {
            await store.dispatch("accountModule/requestKakaoOauthRedirectUrlToDjango");
        };

        return {
            onKakaoLogin,
        };
    }
}
</script>

<style>
.login-card {
    margin-top: 6rem;
    padding: 18px;
    width: 900px;
    background-color: rgba(0, 0, 0, 0.4) !important;
}

.login-title {
    font-size: 22px;
    color: #ffffff;
}

.login-icons {
    margin-top: 20px;
}

.icon {
    cursor: pointer;
}
</style>