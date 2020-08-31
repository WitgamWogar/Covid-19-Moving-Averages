<template>
  <v-app dark id="main-app">
    
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>

<style>
  #main-app {
    background: linear-gradient(180deg, #1D1C1C 27%,#2D2D2D 75%), linear-gradient(45deg, #1F4B77 32%,#2980b9 75%);
  }
</style>
