<template>
    <v-container>
        <v-card v-if="product">
            <v-card-title>제품 정보</v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="product.name" readonly label="제목" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="product.description" readonly label="설명" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="product.price" readonly label="가격" type="number" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-img :src="getImageUrl(product.image_name)" aspect-ratio="1" class="grey lighten-2">
                                <template v-slot:placeholder>
                                    <v-row class="fill-height ma-0" align="center" justify="center">
                                        <v-progress-circular indeterminate color="grey lighten-5" />
                                    </v-row>
                                </template>
                            </v-img>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
        <v-alert v-else type="info">제품이 없습니다.</v-alert>
        <!-- v-card 외부에 버튼 배치 -->
        <div class="button-container">
            <v-btn color="primary" @click="onPurchase" class="action-button">
                <v-icon>mdi-cart</v-icon>
                <span class="button-text">구매하기</span>
            </v-btn>
            <router-link :to="{ name: 'ProductListPage' }" class="router-link no-underline">
                <v-btn color="secondary" class="action-button">
                    <v-icon>mdi-arrow-left</v-icon>
                    <span class="button-text">목록으로 돌아가기</span>
                </v-btn>
            </router-link>
        </div>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

const productModule = 'productModule';

export default {
    props: {
        productId: {
            type: Number,
            required: true
        }
    },
    computed: {
        ...mapState(productModule, ['product'])
    },
    methods: {
        ...mapActions(productModule, ['requestProductToSpring', 'requestDeleteProductToSpring']),
        async onDelete() {
            await this.requestDeleteProductToSpring(this.productId);
            await this.$router.push({ name: 'ProductListPage' });
        },
        async onPurchase() {
            // 구매 로직을 여기에 추가하세요
            console.log('구매하기 버튼 클릭');
        },
        getImageUrl(imageName) {
            console.log('ProductReadPage imageName:', imageName);
            return require('@/assets/uploadImgs/' + imageName);
        }
    },
    created() {
        console.log('ProductReadPage created');
        this.requestProductToSpring(this.productId);
    }
}
</script>

<style scoped>
.action-button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    font-weight: bold;
    padding: 0.75rem 1rem;
    margin: 0.5rem;
    border-radius: 8px;
}

.button-text {
    margin-left: 0.5rem;
}

.button-container {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
}

/* 하이퍼링크 스타일 제거 */
.no-underline {
    text-decoration: none;
}

/* router-link 스타일 재정의 */
.router-link {
    text-decoration: none;
    color: inherit;
}
</style>
