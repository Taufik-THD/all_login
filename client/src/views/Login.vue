<template>
  <div>
    <g-signin-button
    :params="googleSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError">
    Sign in with Google
  </g-signin-button>

  <button @click="loginfb()" class="btn btn-info">Login with Facebook</button>
  </div>
</template>
 
<script>
import axios from 'axios'

export default {
  data () {
    return {
      googleSignInParams: {
        client_id: '108913565945-7db24779940ae01k701aniiue3cmj5se.apps.googleusercontent.com'
      }
    }
  },
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
          appId: '1369761109791179',
          cookie: true,
          xfbml: true,
          version: 'v2.8'
        })
      }
  },
  methods: {
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
      })
        .then((response) => {
          console.log('data dari server', response.data)
          localStorage.setItem('token', response.data.token)
          // this.$router.push('/todo')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script> 
 
<style>
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