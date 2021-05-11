<template>
  <v-app dark>
    <Nav />
    <router-view />
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import Nav from '../components/Nav.vue'

interface Item {
  icon: string
  title: string
  to: string
}

const useMenus = () => {
  const clipped = ref<boolean>(false)
  const drawer = ref<boolean>(false)
  const fixed = ref<boolean>(false)
  const items = ref<Item[]>([
    {
      icon: 'mdi-apps',
      title: 'Welcome',
      to: '/',
    },
    {
      icon: 'mdi-chart-bubble',
      title: 'Inspire',
      to: '/inspire',
    },
  ])
  const miniVariant = ref<boolean>(false)
  const right = ref<boolean>(false)
  const rightDrawer = ref<boolean>(false)

  return {
    clipped,
    drawer,
    fixed,
    items,
    miniVariant,
    right,
    rightDrawer,
  }
}

export default defineComponent({
  components: {
    Nav,
  },
  setup() {
    const menus = useMenus()
    const title = ref<string>('Vuetify.js')

    return {
      ...menus,
      title,
    }
  },
})
</script>
