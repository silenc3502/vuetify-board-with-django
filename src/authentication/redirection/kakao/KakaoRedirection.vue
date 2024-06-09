<template lang="">
  <div></div>
</template>

<script>
import { mapActions } from 'vuex';
import router from '@/router';

const authenticationModule = 'authenticationModule'

export default {
    name: "KakaoRedirection",
    methods: {
        ...mapActions(authenticationModule, ['getAccessTokenFromDjangoRedirection', 'requestUserInfoToDjango']),
        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },

        async setRedirectData() {
            const code = this.$route.query.code;
            console.log('code:', code);

            // 3초 대기
            // await this.delay(3000);

            await this.getAccessTokenFromDjangoRedirection({ code });
            await this.delay(1000);
        },
        async getUserInfo() {
            const accessToken = localStorage.getItem("accessToken");
            console.log('accessToken:', accessToken);

            await this.requestUserInfoToDjango({ accessToken })
            this.$router.push('/');
        }
    },
    async created () {
        await this.setRedirectData()
        await this.getUserInfo()
    }
}
</script>

<style lang="">

</style>
