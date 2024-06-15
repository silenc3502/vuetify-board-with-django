<template lang="">
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field v-model="title" label="제목"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-textarea v-model="content" label="내용" auto-grow/>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-right">
        <v-btn class="ml-2" color="primary" @click="onSubmit">작성 완료</v-btn>
        <v-btn class="ml-2" color="error" @click="onCancel">취소</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

const postModule = 'postModule'

export default {
  data () {
    return {
      title: '',
      content: '',
    }
  },
  methods: {
    ...mapActions(postModule, ['requestRegisterPostToFastapi']),
    async onSubmit () {
      const payload = {
        title: this.title,
        content: this.content
      }

      const post = await this.requestRegisterPostToFastapi(payload)
      await this.$router.push({
        name: 'FastapiPostReadPage',
        params: { id: post.id.toString() }
      })
    },
    onCancel () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="">

</style>