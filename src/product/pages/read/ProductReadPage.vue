<template lang="">
  <v-container>
    <v-card v-if="product">
      <v-card-title>제품 정보</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="product.name" readonly label="제목"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="product.description" readonly label="설명"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="product.price" readonly label="가격" type="number"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-img :src="getImageUrl(product.image_name)" aspect-ratio="1" class="grey lighten-2">
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="grey lighten-5"/>
                  </v-row>
                </template>
</v-img>
</v-col>
</v-row>
</v-container>
</v-card-text>
<v-card-actions>
<!--<router-link :to="{ name: 'ProductModifyPage', params: { productId: product.productId }}">-->
<!--    <v-btn color="primary">수정하기</v-btn>-->
<!--</router-link>-->
<router-link :to="{ name: 'ProductListPage' }">
    <v-btn color="secondary">목록으로 돌아가기</v-btn>
</router-link>
</v-card-actions>
</v-card>
<v-alert v-else type="info">제품이 없습니다.</v-alert>
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
        ...mapActions(
            productModule, ['requestProductToSpring', 'requestDeleteProductToSpring']
        ),
        async onDelete () {
            await this.requestDeleteProductToSpring(this.productId)
            await this.$router.push({ name: 'ProductListPage' })
        },
        getImageUrl(imageName) {
            console.log('ProductReadPage imageName:', imageName)
            return require('@/assets/uploadImgs/' + imageName);
        }
    },
    created () {
        console.log('ProductReadPage created')
        this.requestProductToSpring(this.productId)
    }
}
</script>

<style lang="">

</style>
