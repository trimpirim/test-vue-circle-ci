<template>
    <div class="form sign-in">
        <h2>Welcome To Medilern</h2>
        <div class="signin-form">
            <input type="email" placeholder="EMAIL" />
            <input type="password" placeholder="PASSWORD" />
        </div>
        <p class="forgot-pass"><a>Forgot password?</a></p>
        <button type="button" class="submit">Sign In</button>
        <button class="loginBtn loginBtn--facebook">Signin with Facebook </button>
        <button class="loginBtn loginBtn--google">Signin with Google</button>
    </div>
</template>

<script>


export default {
    name:"signin",
    beforeCreate() {
      
    },
    created() {
           
    }
}
</script>

<style>
    
</style>