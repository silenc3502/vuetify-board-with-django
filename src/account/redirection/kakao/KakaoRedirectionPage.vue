<template>
    <div>

    </div>
</template>

<script>
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";

export default {
    name: "KakaoRedirectionPage",
    components: {

    },
    data() {
        return {
            loginType: 'Kakao'
        }
    },
    setup() {
        const store = useStore()
        const showModal = ref(false);
        const router = useRouter()

        const requestExistUserInfoKakaoToDjango = (payload) => {
            return store.dispatch(
                "accountModule/requestExistUserInfoKakaoToDjango",
                {
                    code: payload,
                }
            );
        };

        const requestCheckKaKaoEmailToDjango = (checkPayload) =>
            store.dispatch("accountModule/requestCheckKaKaoEmailToDjango", {
                code: checkPayload,
            });

        async function setRedirectData() {
            const route = useRoute();
            const code = route.query.code;
            const checkPayload = code;
            const isEmailValid = await requestCheckKaKaoEmailToDjango(checkPayload);

            if (isEmailValid === "NORMAL") {
                await requestExistUserInfoKakaoToDjango(checkPayload);
                router.push({ name: "home" });
            } else if (isEmailValid === 'BLACKLIST') {
                alert("회원님은 저희와 함께 할 수 없습니다.")
                router.push({ name: "home" });
            } else {
                showModal.value = true;
            }
        }

        onMounted(() => {
            setRedirectData();
        });

        return {
            requestExistUserInfoKakaoToDjango,
            showModal,
        };
    },
}
</script>

<style scoped>

</style>