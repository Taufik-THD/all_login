<template>
  <div>

    <div class="data">
        <img id="pic" class="img-circle" width="100" height="100"/>
        <p> email:</p>
        <p id="email" class="alert alert-info"></p>
        <a href="#" onclick="signOut()">Sign out</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {

    }
  },
  props: {

  },
  methods: {
    signOut () {
      let self = this
      let auth2 = gapi.auth2.getAuthInstance()
      auth2.signOut().then(function () {
        console.log('User signed out.')
        self.$router.push('/')
      })

      // $(".g-signin2").css("display", "block")
      // $(".data").css("display", "none")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
