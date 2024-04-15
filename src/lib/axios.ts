import axios from 'axios'

export const api = axios.create({
  // Como o back e front estão na mesma URL, não é preciso do `http://localhost:3333`
  baseURL: '/api',
})
