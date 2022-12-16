import { boot } from 'quasar/wrappers'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'http://localhost:8080' })
// service requist config
api.interceptors.request.use((config: AxiosRequestConfig) => {
  //get token from session storage
  const token = sessionStorage.getItem('token');
  if (token) { config.headers['Authorization'] = 'Bearer ' + token }
  return config
}, (err: any) => {
  return Promise.reject(err)
});

api.interceptors.response.use((res: AxiosResponse) => {
  console.log(res);
  if (res.status === 200) {
    if (res.data.code === 200) {
      return res.data
    }
    else {
      return new Promise((resolve, reject) => {
        return reject(res.data.code + ':' + res.data.msg)
      })
    }
  }
},
  (err: any) => {
    if (err.response === undefined) {
      console.log('-------' + err);
      return new Promise((resolve, reject) => {
        return reject(err.message)
      })
    }

    return Promise.reject(err.response)
  }
)


export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
