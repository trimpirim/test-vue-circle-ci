<template>
    <div class="email-verification full-screen">
        <div>
             <h2> Email Verification</h2>
             <div class="verification-body">
                 <img class="mail_icon" src="../../asset/images/email_verify.png"></img>
                 <div>
                     <h4>We've just sent email to your address:     {{verifyEmailAddress}}</h4>
                     <h5>Please check your email and click the link provided to verify your address.</h5>
                 </div> 
                 </br>
                 <a v-on:click="resendEmail()">Please re-send that verification email</a>
                 
             </div>
        </div>
    </div>
</template>

<script>

import Vue from "vue";
import VeeValidate from "vee-validate";
import { mapGetters , mapState } from 'vuex';

export default {
    name:"verification",
    beforeCreate() {
      
    },
    created() {
        if(this.verifyEmailAddress=="") {
            this.$router.push('/auth');
        }
    },
    computed: {
        ...mapState({verifyEmailAddress: state => state.verifyEmailAddress})
    },
    methods: {
        resendEmail: function() {
            this.$store.dispatch("resendEmailVerification",this.verifyEmailAddress);
        }
    }
}
</script>

<style scoped>
    .email-verification {
        background: #ededed;
    }
    .email-verification>div {
        margin-top: 100px;
        width:830px;
        margin-left:auto;
        margin-right:auto;
        height:280px;
        background:white;
        border-radius:5px;
        box-shadow: 3px 3px 3px 3px #eeeaea;
        padding:20px 30px 10px 30px;
    }
    .mail_icon {
        display:inline-block;
        width:120px;
    }
    .verification-body {
        margin-top:20px;
    }
    .verification-body>div {
        display:inline-block;
        margin-left:20px;
    }
    h5 {
        margin-top:20px;
        margin-bottom:20px;
    }
    h4 {
        font-size:17px;
    }
    a {
        font-size:16px;
        color:#46b9e8;
        margin-left:150px;
    }
</style>