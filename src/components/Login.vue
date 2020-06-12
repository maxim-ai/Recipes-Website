<template>
  <div class="container">
    <label for="tryUsername"><b>Username</b></label>
    <input
      v-model="username"
      id="tryUsername"
      type="text"
      placeholder="Enter Username"
      name="uname"
      required
    />
    <br />
    <br />
    <label for="tryPassword"><b>Password</b></label>
    <input
      v-model="password"
      id="tryPassword"
      type="password"
      placeholder="Enter Password"
      name="psw"
      required
    />
    <br />
    <br />
    <button id="loginSubmit" type="button" @click="login">Login</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async login() {
      try {
        // this.axios.defaults.withCredentials = true;
        await this.axios.post("http://localhost:3000/auth/login", {
          username: this.username,
          password: this.password
        });
      } catch (error) {
        if (error.request.status == 401) {
          alert(error.response.data.message);
        } else console.log(error);
      }
      return true;
    }
  }
};
</script>

<style></style>
