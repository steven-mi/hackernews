const getDefaultState = () => ({
  token: '',
})

const state = getDefaultState()

export const mutations = {
  set(state, token) {
    state.token = token
    localStorage.setItem('token', token)
  },
  reset(state) {
    Object.assign(state, getDefaultState())
  },
}
export default { state, mutations }
