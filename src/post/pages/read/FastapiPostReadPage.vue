<template lang="">
  <v-container>
    <h2>Vue3 + TypeScript + Vuetify3 + Spring + JPA</h2>
    <v-card v-if="post">
      <v-card-title>포스팅 내용</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="post.title" readonly label="제목"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea v-model="post.content" readonly label="내용"/>
            </v-col>
          </v-row>
          <v-row justify="end">
            <v-col cols="auto">
              <router-link :to="{ name: 'FastapiPostListPage' }">
                <v-btn color="secondary">돌아가기</v-btn>
              </router-link>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

const postModule = 'postModule'

export default {
    props: {
        id: {
            type: String,
            required: true,
        }
    },
    computed: {
        ...mapState(postModule, ['post'])
    },
    methods: {
        ...mapActions(
            postModule, ['requestPostToFastapi']
        ),
    },
    created () {
        this.requestPostToFastapi(this.id)
    }
}
</script>

<style lang="">

</style>