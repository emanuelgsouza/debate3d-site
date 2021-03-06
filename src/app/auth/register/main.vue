<script>
import { isEmpty } from 'lodash'

import LogoGlasses from '@/components/logo-glasses.vue'
import register from './register'
import loginWithFacebook from '../facebook/main.vue'
import AppNickname from '@/domains/user/view/app-nickname/main.vue'
import OfflineAlert from '@/support/mixins/offline-alert'

export default {
  components: { LogoGlasses, loginWithFacebook, AppNickname },
  mixins: [ OfflineAlert ],
  data () {
    return {
      nickname: '',
      email: '',
      newPassword: '',
      password: '',
      name: '',
      nicknameValid: false
    }
  },
  computed: {
    isValid () {
      return !isEmpty(this.name) && !isEmpty(this.email) && this.isEqualPwd
    },
    isEqualPwd () {
      return this.password === this.newPassword && this.password !== '' && this.newPassword !== ''
    }
  },
  methods: {
    register () {
      if (!this.nicknameValid) {
        this.openSnackbar('Nickname inválido')
        return
      }

      if (this.isValid && this.isEqualPwd) {
        const loading = this.$loading.open()
        const { name, email, password, nickname } = this

        const payload = {
          name,
          email,
          password,
          nickname
        }
        return register(this, payload, loading, this.$router)
      }

      this.openSnackbar('Senhas não iguais')
    },
    openSnackbar (message) {
      this.$snackbar.open({
        message,
        type: 'is-warning',
        position: 'is-top-left',
        actionText: 'Ok'
      })
    }
  },
  mounted () {
    const body = document.body
    body.classList.add('register')
  },
  beforeDestroy () {
    const body = document.body
    body.classList.remove('register')
  }
}
</script>

<template>
  <div class="container">
    <div class="notification offline is-warning" v-if="!online">
      Ops, você está sem conexão
    </div>
    <logo-glasses />
    <section class="form-section">
      <h1 class="title is-3 has-text-centered"> Login </h1>

      <login-with-facebook />

      <hr>

      <form @submit.prevent="register">
        <b-field>
          <b-input
            placeholder="Nome"
            icon="user"
            size="is-medium"
            type="text"
            ref="inputName"
            v-model="name"></b-input>
        </b-field>

        <app-nickname v-model="nickname" :nicknameValid.sync="nicknameValid" />

        <b-field>
          <b-input
            placeholder="Email"
            icon="envelope"
            size="is-medium"
            type="email"
            v-model="email"></b-input>
        </b-field>

        <b-field>
          <b-input
            placeholder="Senha"
            icon="key"
            size="is-medium"
            type="password"
            v-model="password"></b-input>
        </b-field>

        <b-field>
          <b-input
            placeholder="Repita a senha"
            icon="key"
            size="is-medium"
            type="password"
            v-model="newPassword"></b-input>
        </b-field>

        <button :disabled="!isValid" class="button is-success is-medium is-outlined is-fullwidth"> Cadastre-se </button>
      </form>

      <p> Já possui uma conta? <router-link to="/auth/login"> Acesse </router-link> </p>
    </section>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../../assets/sass/extend.sass";

  .container {
    padding: $space * 2 0;

    .image {
      max-width: 150px;
      margin: $space auto;
    }
  }

  .form-section {
    max-width: 450px;
    margin: 0 auto;
    padding: $space;
    background-color: $white;
    border-radius: 2px;
    box-shadow: 0px 0px 6px 0px #363636;
  }

  form {
    margin: $space / 2 0;
  }
</style>
