<template>
    <v-container class="register-container" fill-height>
        <v-row align="center" justify="center">
            <v-col cols="12" md="8" lg="6">
                <v-card>
                    <v-card-title>
                        <span class="headline">Register</span>
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field
                                v-model="email"
                                label="Email"
                                required
                                :rules="emailRules"
                                :disabled="true"
                            ></v-text-field>
                            <v-row align="center">
                                <v-col cols="10">
                                    <v-text-field
                                        v-model="nickname"
                                        label="Nickname"
                                        required
                                        :rules="nicknameRules"
                                        :error-messages="nicknameErrorMessages"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn
                                        color="primary"
                                        @click="checkDuplicateNickname"
                                        class="check-button"
                                        small
                                    >
                                        중복 검사
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="submitForm" :disabled="!isValidForSubmission">
                            Register
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';

const accountModule = 'accountModule';
const authenticationModule = 'authenticationModule';

export default {
    data() {
        return {
            valid: false,
            email: '',
            nickname: '',
            emailRules: [
                v => !!v || 'Email is required',
                v => /.+@.+\..+/.test(v) || 'Email must be valid',
            ],
            nicknameRules: [v => !!v || 'Nickname is required'],
            nicknameErrorMessages: [],
            isNicknameValid: false,
        };
    },
    async created() {
        await this.requestUserInfo();
    },
    computed: {
        isValidForSubmission() {
            return this.valid && this.isNicknameValid;
        },
    },
    methods: {
        ...mapActions(authenticationModule, ['requestUserInfoToDjango']),
        ...mapActions(accountModule, ['requestCheckNicknameToDjango', 'requestNewAccountToDjango']),
        async requestUserInfo() {
            try {
                const userInfo = await this.requestUserInfoToDjango();
                console.log('User info received:', userInfo.kakao_account.email);
                this.email = userInfo.kakao_account.email;
            } catch (error) {
                console.error('Failed to request user info:', error);
                alert('사용자 정보를 가져오는 데 실패했습니다.');
            }
        },
        async checkDuplicateNickname() {
            try {
                console.log('nickname:', this.nickname);
                const isDuplicate = await this.requestCheckNicknameToDjango({
                    newNickname: this.nickname.trim(),
                });
                if (isDuplicate) {
                    this.nicknameErrorMessages = ['This nickname is already in use'];
                    this.isNicknameValid = false;
                } else {
                    this.nicknameErrorMessages = [];
                    this.isNicknameValid = true;
                }
            } catch (error) {
                console.error('Failed to check nickname duplicate:', error);
                alert('중복된 닉네임을 확인하는 데 실패했습니다.');
                this.isNicknameValid = false;
            }
        },
        async submitForm() {
            if (this.$refs.form.validate()) {
                const userData = {
                    email: this.email,
                    nickname: this.nickname,
                };

                await this.requestNewAccountToDjango(userData)
                console.log('User data submitted:', userData);
            }
        },
    },
};
</script>

<style scoped>
.register-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
}

.headline {
    font-weight: bold;
}

.check-button {
    width: auto;
}
</style>
