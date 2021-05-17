<template>
  <div id="app">
    <v-app>
      <v-dialog v-model="dialog" persistent max-width="500px" min-width="360px">
        <div>
          <v-tabs
            v-model="tab"
            show-arrows
            background-color="blue accent-4"
            icons-and-text
            dark
            grow
          >
            <v-tabs-slider color="purple darken-4"></v-tabs-slider>
            <v-tab>
              <v-icon large>mdi-account-plus</v-icon>
              <div class="caption py-1">signup</div>
            </v-tab>
            <v-tab-item>
              <v-card class="px-4">
                <v-card-text>
                  <v-form
                    v-if="step == steps.register"
                    ref="signupForm"
                    v-model="valid"
                    lazy-validation
                    @submit.prevent="register"
                  >
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="registerForm.email"
                          type="email"
                          :rules="EmailRules"
                          label="Email"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="registerForm.password"
                          :append-icon="show1 ? 'eye' : 'eye-off'"
                          :rules="[rules.required, rules.min]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Password"
                          hint="At least 8 characters"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>
                      <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
                      <v-spacer></v-spacer>
                      <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                        <v-btn
                          type="submit"
                          x-large
                          block
                          :disabled="!valid"
                          color="success"
                          @click="validate"
                        >
                          Signup
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                  <v-form
                    v-else
                    ref="signupForm"
                    v-model="valid"
                    lazy-validation
                    @submit.prevent="confirm"
                  >
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="confirmForm.email"
                          :rules="EmailRules"
                          label="Email"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="confirmForm.code"
                          label="Code"
                          type="code"
                        ></v-text-field>
                      </v-col>
                      <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
                      <v-spacer></v-spacer>
                      <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                        <v-btn
                          type="submit"
                          x-large
                          block
                          :disabled="!valid"
                          color="success"
                          @click="validate"
                        >
                          confirm
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                  <nuxt-link to="/login">Have an account? Login</nuxt-link>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </div>
      </v-dialog>
    </v-app>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  // computed,
  useContext,
  useStore,
  onMounted,
  ref,
} from '@nuxtjs/composition-api'
const steps = {
  register: 'REGISTER',
  confirm: 'CONFIRM',
}
export default defineComponent({
  setup() {
    const state = reactive({
      steps: { ...steps },
      step: steps.register,
      registerForm: {
        email: '',
        password: '',
        errors: [],
      },
      confirmForm: {
        email: '',
        code: '',
      },
      dialog: true,
      tab: 0,
      tabs: [{ name: 'Signup', icon: 'mdi-account-plus' }],
      valid: true,
      EmailRules: [
        (v) => !!v || 'Required',
        (v) => (v && v.length >= 8) || 'Min 8 characters',
      ],

      show1: false,
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => (v && v.length >= 8) || 'Min 8 characters',
      },
    })
    const {
      app: { router },
    } = useContext()
    const store = useStore()
    const signupForm: any = ref()
    onMounted(() => {
      // eslint-disable-next-line no-unused-expressions
      console.log(signupForm.value) // DOMノードが取得できる
    })
    // const passwordMatch = computed(() => {
    //   return () =>
    //     state.registerForm.password === this.verify || 'Password must match'
    // })
    const register = async () => {
      try {
        await store.dispatch('auth/register', state.registerForm)
        state.confirmForm.email = state.registerForm.email
        state.step = state.steps.confirm
      } catch (error) {
        console.log({ error })
      }
    }
    const confirm = async () => {
      try {
        await store.dispatch('auth/confirmRegistration', state.confirmForm)
        await store.dispatch('auth/login', state.registerForm)
        router?.push('/')
      } catch (error) {
        console.log({ error })
      }
    }
    const validate = () => {
      if (signupForm.value.validate()) {
        // submit form to server/API here...
      }
    }
    const reset = () => {
      signupForm.value.reset()
    }
    const resetValidation = () => {
      signupForm.value.resetValidation()
    }
    return {
      ...toRefs(state),
      // passwordMatch,
      validate,
      reset,
      resetValidation,
      register,
      confirm,
      signupForm,
    }
  },
})
</script>

<style></style>
