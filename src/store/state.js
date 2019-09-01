const state = {
  loading: false,
  user: JSON.parse(localStorage.getItem('user') || '{}'),
  token: localStorage.getItem('token') || ''
}
export default state
