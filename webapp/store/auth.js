const getDefaultState = () => ({
  token: '',
  email: '',
})

const state = getDefaultState()

export const mutations = {
  set(state, { token, email }) {
    state.token = token
    state.email = email
  },
  reset(state) {
    Object.assign(state, getDefaultState())
  },
}
export default { state, mutations }
