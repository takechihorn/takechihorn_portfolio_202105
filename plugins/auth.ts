import Vue from 'vue'

export class AuthService {
  $store: any
  constructor(store: any) {
    this.$store = store
  }

  get isAuthenticated() {
    return this.$store.state.auth.isAuthenticated
  }

  get user() {
    return this.$store.state.auth.user
  }

  get id() {
    if (!this.user) return
    return this.user.username
  }

  get email() {
    if (!this.user) return
    return this.user.attributes.email
  }
}

export default async ({ store }) => {
  const authService = new AuthService(store)
  Vue.prototype.$auth = authService
  await store.dispatch('auth/load')
}
