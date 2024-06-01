<template lang="">
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field v-model="name" label="상품명"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-textarea v-model="description" label="상품 설명" auto-grow/>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-text-field v-model="price" label="가격" type="number"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-text-field v-model="imageName" label="이미지"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-right">
        <v-btn class="ml-2" color="primary" @click="onSubmit">등록 완료</v-btn>
        <v-btn class="ml-2" color="error" @click="onCancel">취소</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

const productModule = 'productModule';

export default {
    data() {
        return {
            name: '',
            description: '',
            price: 0,
            imagePath: '',
        };
    },
    methods: {
        ...mapActions(productModule, ['requestCreateProductToSpring']),
        async onSubmit() {
            const payload = {
                name: this.name,
                description: this.description,
                price: this.price,
                imagePath: this.imagePath,
            };

            try {
                const product = await this.requestCreateProductToSpring(payload);
                await this.$router.push({
                    name: 'ProductReadPage',
                    params: { productId: product.productId.toString() },
                });
            } catch (error) {
                console.error('Error creating product:', error);
                alert('상품 등록에 실패했습니다.');
            }
        },
        onCancel() {
            this.$router.go(-1);
        },
    },
};
</script>

<style lang="">
</style>
