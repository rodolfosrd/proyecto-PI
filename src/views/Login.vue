<template>
    <div>
        <div class="container-fluid">
  <div class="row no-gutter">
    <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
    <div class="col-md-8 col-lg-6">
      <div class="login d-flex align-items-center py-5">
        <div class="container">
          <div class="row">
            <div class="col-md-9 col-lg-8 mx-auto">
              <h2 class="login-heading mb-4">Welcome back!</h2>
              <form @submit="onSubmit">
                <div class="form-label-group">
                  <input type="email" id="inputEmail" class="form-control p-2" placeholder="Email address" v-model="d.username" required autofocus>
                </div>

                <div class="form-label-group">
                  <input type="password" id="inputPassword" class="form-control p-2" placeholder="Password"  v-model="d.password" required>
                </div>

                <div class="custom-control custom-checkbox mb-3">
                  <input type="checkbox" class="custom-control-input" id="customCheck1">
                  <label class="custom-control-label" for="customCheck1">Remember password</label>
                </div>
                <button class="btn btn-dark btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Login</button>
                <div class="text-center">
                  <a class="small" href="#">Forgot password?</a></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
</template>


<script>
import client from "../api";
import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
Vue.use(VueToast);

export default {
  name: "Login",
  data: function () {
    return {
      d: {
        username: "",
        password: "",
      },
    };
  },
  components: {
  },
  methods: {
    makeToast: function (titulo, texto, tipo) {
      this.toastCount++;
      this.$bvToast.toast(texto, {
        title: titulo,
        variant: tipo,
        autoHideDelay: 5000,
        appendToast: true,
      });
    },
    back: function () {
      this.$router.push("/persons");
    },

    login: function (payload) {
      client
        .post("/v1/login", payload)
        .then((res) => {
          console.log(payload);

          // console.log('set');
          let credentials = {
            "token":res.data.token,
            "user":res.data,
          };
          //console.log(credentials.token);
          localStorage.setItem("user", JSON.stringify(credentials));

          //console.log('get');
          //let user = JSON.parse(localStorage.getItem("user"));
          //if (user != null) {
          //  console.log(user.token);
          //}
          Vue.$toast.open({
                        message: 'Login Correctamente',
                        type: 'default',
                        position: 'top-right'
                    });
          this.$router.push("/persons");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    initForm: function () {
      //this.d.ID = '';
      this.d.username = "";
      this.d.password = "";
    },
    onSubmit: function (evt) {
      evt.preventDefault();

      const payload = {
        email: this.d.username,
        password: this.d.password,
      };

      this.login(payload);

      this.initForm();
    },
    onReset: function (evt) {
      evt.preventDefault();
      //this.initForm();
      evt.target.reset();
    },
  },

  created: function () {
    this.d.ID = this.$route.params.id;
    if (this.d.ID > 0) {
      this.getById(this.d.ID);
    }
  },
};
</script>


<style scoped>
:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: 0.75rem;
}

.login,
.image {
  min-height: 100vh;
}

.bg-image{
  background-image: url('../assets/fondo.png');
  background-size: cover;
  background-position: center;
}

.login-heading {
  font-weight: 300;
}

.btn-login {
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
  padding: 0.75rem 1rem;
  border-radius: 2rem;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group>input,
.form-label-group>label {
  padding: var(--input-padding-y) var(--input-padding-x);
  height: auto;
  border-radius: 2rem;
}

.form-label-group>label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  /* Override default `<label>` margin */
  line-height: 1.5;
  color: #444e58;
  cursor: text;
  /* Match the input under the label */
  border: 1px solid transparent;
  border-radius: .25rem;
  transition: all .1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown)~label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: rgb(104, 100, 100);
}

/* Fallback for Edge
-------------------------------------------------- */

@supports (-ms-ime-align: auto) {
  .form-label-group>label {
    display: none;
  }
  .form-label-group input::-ms-input-placeholder {
      color: rgb(104, 100, 100);
  }
}

/* Fallback for IE
-------------------------------------------------- */

@media all and (-ms-high-contrast: none),
(-ms-high-contrast: active) {
  .form-label-group>label {
    display: none;
  }
  .form-label-group input:-ms-input-placeholder {
    color: #777;
  }
}



</style>