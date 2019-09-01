export default {
  SET_AUTH (state, object) {
    state.accessToken = object.accessToken
    state.user = object.phone
    localStorage.setItem('accessToken', object.accessToken)
    localStorage.setItem('phone', object.phone)
  },
  setState (state, object) {
    for (let key in object) {
      state[key] = object[key]
    }
  }
}
