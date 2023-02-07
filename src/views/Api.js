import axios from 'axios'
const axios_instance = axios.create();
axios_instance.defaults.timeout = 300000;
axios_instance.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
axios_instance.defaults.headers.post['Accept'] = 'application/json;';
axios_instance.interceptors.request.use(async function (config) {
let access = await sessionStorage.getItem('access') 
    if(!navigator.onLine){
        alert("Hello! Seems you're offline");
        return {
          headers: {},
          method: config.method,
          url: ""
        };
      };
  access ? config.headers.Authorization = `JWT ${access}` : null;
  return config;
});
// const baseUrl = 'https://api.smartconvert.ng/'
const baseUrl = 'http://127.0.0.1:8000/'
export default { 
  axios_instance,
  baseUrl,
}
