<template lang="">
  <v-container>
    <h2>상품 목록</h2>
    <div style="text-align: left; margin: 15px;">
      <router-link :to="{ name: 'ProductRegisterPage' }">
        상품 등록
      </router-link>
    </div>
    <v-row>
      <v-col v-for="(product, idx) in products" :key="idx" cols="12" sm="6" md="4" lg="3">
        <v-card>
          <v-img :src="getImageUrl(product.imagePath)" aspect-ratio="1" class="grey lighten-2">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5"/>
              </v-row>
            </template>
          </v-img>
          <v-card-title>{{ product.name }}</v-card-title>
          <v-card-subtitle>{{ product.price }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

const productModule = 'productModule';

export default {
    computed: {
        ...mapState(productModule, ['products']),
    },
    methods: {
        ...mapActions(productModule, ['requestProductListToSpring']),
        getImageUrl(imagePath) {
            return require('@/assets/uploadImgs/' + imagePath);
        }
    },
    async created() {
        await this.requestProductListToSpring();
    }
};
</script>

<style lang="">
</style>
