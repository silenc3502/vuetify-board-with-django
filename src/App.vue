<template>
  <v-app>
    <navigation-menu-bar-page/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationMenuBarPage from "@/navigationBar/pages/NavigationMenuBarPage.vue";

export default defineComponent({
  name: 'App',
  components: {
      NavigationMenuBarPage
  },
  data () {
    return {
      //
    }
  },
})
</script>
