import { login } from '../../../services/auth'

export default (context, model) => {
  context.$q.loading.show()
  return login(model, context.$store, context.$router)
    .then(() => {
      context.reset()
      return context.$q.notify({
        message: 'Você está logado',
        type: 'positive'
      })
    })
    .catch(err => {
      console.error(err)
      return context.$q.notify({
        message: 'Usuário inválido',
        type: 'negative'
      })
    })
    .then(() => {
      context.$q.loading.hide()
    })
}
