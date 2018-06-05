<template>
  <div class="hello">
    <!-- button github login -->
    <button id="github-button" class="btn-github" style="cursor: pointer" @click='loginGithub'>
      <i class="fa fa-github"></i> Sign in with Github
    </button>
    <br><br>
    <g-signin-button
      :params="googleSignInParams"
      @success="onSignInSuccess"
      @error="onSignInError">
      Sign in with Google
    </g-signin-button>
    <br><br>
    <button @click="loginfb()" class="btn btn-info">Login with Facebook</button>
    <br><br>
    <a type="button" class="btn" name="button" @click='steamSignIn'>Sign In with Steam</a>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  created: function () {
    (function (d, s, id) {
      var js
      var fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s)
      js.id = id
      // js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=119308148780939"
      js.src = '//connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '223165648453545',
        cookie: true,
        xfbml: true,
        version: 'v2.8'
      })
    }
  },
  data () {
    return {
      user_id: '',
      user_name: '',
      user_email: '',
      googleSignInParams: {
        client_id: '108913565945-7db24779940ae01k701aniiue3cmj5se.apps.googleusercontent.com'
      }
    }
  },
  props: {

  },
  methods: {
    steamSignIn(){
      axios({
        method: 'get',
        url: 'http://localhost:5000/users/steam/authenticate'
      }).then(response => {

        var myWindow = window.open(response.data, "myWindow", "width=500, height=700");
        setTimeout(function(){ myWindow.close() }, 10000);


        // myWindow.close()
      }).catch(err => {
        console.log(err);
      })
    },
    loginGithub () {
      // ==>> Public key dari OAuth.io
      OAuth.initialize('5OU1Jyi98m-60jlbbcbmvHIAHug')
      OAuth.popup('github').then((github) => {
        github.me().then((data) => {
          const userData = {
            user_id: data.email,
            user_email: data.id,
            user_name: data.name
          }
          // axios({
          //   method: 'post',
          //   url: 'http://localhost:3000/users',
          //   data: userData
          // }).then(response => {
          //   console.log('register success')
          // }).catch(err => {
          //   console.log(err)
          // })
          console.log(userData);
        })
        github.get('/user').then(data => {
          console.log('self data:', data)
        })
      })
    },
    onSignInSuccess (googleUser) {
      const profile = googleUser.getBasicProfile()
      console.log('ID: ' + profile.getId())
      console.log('Name: ' + profile.getName())
      console.log('Image URL: ' + profile.getImageUrl())
      console.log('Email: ' + profile.getEmail())
    },

    onSignInError (error) {
      console.log('OH NOES', error)
    },
    loginfb () {
      window.FB.login((response) => {
        console.log('statusChangeCallback')
        console.log(response)
        if (response.status === 'connected') {
          localStorage.setItem('fb_access_token', response.authResponse.accessToken)
          this.testAPI()
        } else {
          alert('please login')
        }
      })
    },
    testAPI () {
      console.log('Welcome!  Fetching your information.... ')
      axios.get('http://localhost:3000/loginFb', {
        headers: { fb_access_token: localStorage.getItem('fb_access_token') }
      }).then((response) => {
        console.log('data dari server', response.data)
        localStorage.setItem('token', response.data.token)
        // this.$router.push('/todo')
      })  .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>
