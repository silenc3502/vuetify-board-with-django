<template lang="">
</template>

<script>
import { mapActions } from 'vuex';
import router from '@/router';

const authenticationModule = 'authenticationModule'

export default {
    name: "KakaoRedirection",
    methods: {
        ...mapActions(authenticationModule, ['getAccessTokenFromDjangoRedirection']),
        async setRedirectData () {
            const code = this.$route.query.code
            await this.getAccessTokenFromDjangoRedirection({ code })
            router.push('/')
        }
    },
    created () {
        this.setRedirectData()
    }
}
</script>

<style lang="">

</style>
