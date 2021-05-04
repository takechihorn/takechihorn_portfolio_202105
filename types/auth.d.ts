import { AuthService } from '../plugins/auth'

// vueインスタンス用
declare module 'vue/types/vue' {
  interface Vue {
    readonly $auth: AuthService
  }
}

// store用
declare module 'vuex' {
  interface Store<S> {
    readonly $logger: Logger
  }
}
