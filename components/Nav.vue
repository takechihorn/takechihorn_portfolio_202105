<template>
  <div>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
    >
      <!--      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />-->

      <v-toolbar-title style="width: 350px">
        <a to="/" class="white--text" style="text-decoration: none"
          ><v-icon>mdi-headphones</v-icon>&nbsp;HeadGears</a
        >
      </v-toolbar-title>
      <v-spacer />
      <div v-if="$accessor.auth.isAuthenticated">
        You're logged in as {{ $accessor.auth }}
      </div>
      <div v-if="$accessor.auth.isAuthenticated">
        <v-btn to="/login" icon>
          <v-icon>mdi-login</v-icon>
        </v-btn>
        <v-btn to="/signup" icon>
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
        <v-btn to="/cart" icon>
          <v-badge content="2" value="2" color="green" overlap>
            <v-icon>mdi-cart</v-icon>
          </v-badge>
          <!-- <v-badge content="2" value="2" color="green" overlap> -->
          <!-- </v-badge> -->
        </v-btn>
      </div>
      <div v-else>
        <v-btn icon @click="$store.dispatch('auth/logout')">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-account-check</v-icon>
        </v-btn>
        <v-btn to="/checkout" icon>
          <v-icon>mdi-credit-card-check-outline</v-icon>
        </v-btn>
        <v-btn to="/cart" icon>
          <!-- <v-badge content="2" value="2" color="green" overlap> -->
          <v-badge content="2" value="2" color="green" overlap>
            <v-icon>mdi-cart</v-icon>
          </v-badge>
          <!-- </v-badge> -->
        </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <v-bottom-navigation color="primary" horizontal>
        <v-btn to="/" class="v-btn">
          <span>Home</span>
        </v-btn>
        <v-btn to="/shop" class="v-btn">
          <span>Shop</span>
        </v-btn>
        <v-btn to="/product" class="v-btn">
          <span>Product</span>
        </v-btn>
        <v-btn to="/blog" class="v-btn">
          <span>Blog</span>
        </v-btn>
      </v-bottom-navigation>
    </v-main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Nav',
  setup() {},
})
</script>

<style scoped></style>
