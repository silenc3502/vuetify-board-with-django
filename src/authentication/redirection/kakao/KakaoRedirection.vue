<template lang="">
  <div></div>
</template>

<script>
import { mapActions } from 'vuex';
import router from '@/router';

const authenticationModule = 'authenticationModule'
const accountModule = 'accountModule'

export default {
    name: "KakaoRedirection",
    methods: {
        ...mapActions(authenticationModule, ['getAccessTokenFromDjangoRedirection', 'requestUserInfoToDjango']),
        ...mapActions(accountModule, ['requestEmailDuplicationCheckToDjango']),
        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },

        async setRedirectData() {
            const code = this.$route.query.code;
            console.log('code:', code);

            // 3초 대기
            // await this.delay(3000);

            await this.getAccessTokenFromDjangoRedirection({ code });
            const userInfo = await this.requestUserInfoToDjango();
            const email = userInfo.kakao_account.email;
            console.log('email:', email)

            // 사용자 email 정보가 있는지 확인
            const isEmailDuplication = await this.requestEmailDuplicationCheckToDjango(email)
            console.log('isEmailDuplication:', isEmailDuplication)
            if (isEmailDuplication === true) {
                this.$router.push('/');
            } else {
                this.$router.push('/account/register')
            }
        },
        // async getUserInfo() {
        //     await this.requestUserInfoToDjango()
        //     this.$router.push('/');
        // }
    },
    async created () {
        await this.setRedirectData()
        // await this.getUserInfo()
    }
}
</script>

<style lang="">

</style>
