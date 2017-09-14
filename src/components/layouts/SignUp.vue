<template>
    <div class="form sign-up">
        <h2>Welcome To Medilern</h2>
        <input type="text" />
        <input type="email" />
        <input type="password" />
        <button type="button" class="submit">Sign Up</button>
        <button class="loginBtn loginBtn--facebook">
                        Login with Facebook
                    </button>
        <button class="loginBtn loginBtn--google">
                        Login with Google
                </button>
    </div>
</template>

<script>


export default {
    name:"signup",
    beforeCreate() {
      
    },
    created() {
           
    }
}
</script>

<style class="scoped"></style>