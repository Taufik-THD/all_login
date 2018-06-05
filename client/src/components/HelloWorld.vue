<template>
  <div class="hello">
    <!-- button github login -->
    <button id="github-button" class="btn-github" style="cursor: pointer" @click='loginGithub'>
      <i class="fa fa-github"></i> Sign in with Github
    </button>
    <br>
    <hr>
    <br>
    <a id="facebook-button" class="btn btn-block btn-social btn-facebook">
      <i class="fa fa-facebook"></i> Sign in with Facebook
    </a>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data () {
    return {
      user_id: '',
      user_name: '',
      user_email: ''
    }
  },
  props: {

  },
  methods: {
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
          axios({
            method: 'post',
            url: 'http://localhost:3000/users',
            data: userData
          }).then(response => {
            console.log('register success')
          }).catch(err => {
            console.log(err)
          })
        })
        github.get('/user').then(data => {
          console.log('self data:', data)
        })
      })
    },

    function() {
      // Initialize with your OAuth.io app public key
      OAuth.initialize('HwAr2OtSxRgEEnO2-JnYjsuA3tc');
      // Use popup for oauth
      OAuth.popup('facebook').then(facebook => {
        console.log('facebook:',facebook);
        // Prompts 'welcome' message with User's email on successful login
        // #me() is a convenient method to retrieve user data without requiring you
        // to know which OAuth provider url to call
        facebook.me().then(data => {
          console.log('me data:', data);
          alert('Facebook says your email is:' + data.email + ".\nView browser 'Console Log' for more details");
        })
        // Retrieves user data from OAuth provider by using #get() and
        // OAuth provider url
        facebook.get('/v2.5/me?fields=name,first_name,last_name,email,gender,location,locale,work,languages,birthday,relationship_status,hometown,picture').then(data => {
          console.log('self data:', data);
        })
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
</style>
