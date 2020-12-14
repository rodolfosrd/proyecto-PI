import axios from "axios";
//import Vue from 'vue';
//import Toast from 'bootstrap-vue';
//Vue.use(Toast);
/**
 * Create a new Axios client instance
 * @see https://github.com/mzabriskie/axios#creating-an-instance
 * https://laravel-news.com/building-flexible-axios-clients
 */
const getClient = (baseUrl = null) => {
    //console.log(baseUrl);
    const options = {
        baseURL: (baseUrl === null) ? 'http://localhost:8080' : baseUrl,
        json: true
    };

    const client = axios.create(options);

    // Add a response interceptor
    client.interceptors.request.use(
        function(config) {
            let token = '';
            if (localStorage.getItem('user') != null) {
                let user = JSON.parse(localStorage.getItem("user"));
                //console.log(user.token);
                //console.log(user);

                token = user.token;
            }
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        function(err) {
            return Promise.reject(err);
        }
    );

    /*client.interceptors.response.use(r => r, (error) => {
      console.log(Vue.prototype);
      Vue.prototype.$bvToast.toast(`Server call returned error ${error.response.status}`, {
        title: 'Error',
        variant: 'error',
      });
      return Promise.reject(error);
    });*/


    return client;
};





/**
 * Base HTTP Client para ser usado con un 
 * import client from '../api';
 * client
        .get("/v1/persons")
        .then((res) => {
          this.list = res.data.r;
        })
 */
export default {
    // Provide request methods with the default base_url
    get(url, conf = {}) {
        return getClient().get(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    },

    delete(url, conf = {}) {
        return getClient().delete(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    },

    head(url, conf = {}) {
        return getClient().head(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    },

    options(url, conf = {}) {
        return getClient().options(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    },

    post(url, data = {}, conf = {}) {
        return getClient().post(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    },

    put(url, data = {}, conf = {}) {
        return getClient().put(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    },

    patch(url, data = {}, conf = {}) {
        return getClient().patch(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    },
};

/**
 * Si quieres hacer llamadas con otra baseUrl, es decir con otro microservicio
 * import { ApiClient } from '../api';
 * let client = new ApiClient('http://localhost:8082');
 * client
        .get("/v1/persons")
        .then((res) => {
          this.list = res.data.r;
        })
*/
class ApiClient {
    constructor(baseUrl = null) {
        this.client = getClient(baseUrl);
    }

    get(url, conf = {}) {
        return this.client.get(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }

    delete(url, conf = {}) {
        return this.client.delete(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }

    head(url, conf = {}) {
        return this.client.head(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }

    options(url, conf = {}) {
        return this.client.options(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }

    post(url, data = {}, conf = {}) {
        return this.client.post(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }

    put(url, data = {}, conf = {}) {
        return this.client.put(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }

    patch(url, data = {}, conf = {}) {
        return this.client.patch(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }
}

export { ApiClient };