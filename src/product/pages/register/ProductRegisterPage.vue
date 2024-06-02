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
        <v-file-input v-model="image" label="이미지 파일" prepend-icon="mdi-camera"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <p v-if="uploadedFileName">업로드된 파일: {{ uploadedFileName }}</p>
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
            price: 0,
            description: '',
            image: null,
            uploadedFileName: '', // 추가된 상태
        };
    },
    methods: {
        ...mapActions(productModule, ['requestCreateProductToSpring']),
        async onSubmit() {
            try {
                if (this.image) {
                    const formData = new FormData();
                    formData.append('name', this.name);
                    formData.append('price', this.price);
                    formData.append('description', this.description);
                    formData.append('image', this.image);

                    const response = await this.requestCreateProductToSpring(formData);
                    this.uploadedFileName = response.data.imageName;
                    this.$router.push({ name: 'ProductListPage' });
                } else {
                    alert('이미지 파일을 선택해 주세요.');
                }
            } catch (error) {
                console.error('Error registering product:', error);
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
