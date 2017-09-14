<template>
    <div class="forgot-password full-screen">
        <div v-if="!sendSucced" class="row">
            <form @submit.prevent="validateEmail()" novalidate>
                <div class="col-sm-10 col-sm-offset-1">
                    <h2> Forgot your password?</h2>
                </div>
                <div class="col-sm-10 col-sm-offset-1 description">
                    <span>To reset your password,type the full email address  you used to sign up
                        and we'll send you an e-mail to walk you through resetting your password.
                    </span>
                </div>
                <div class="col-sm-10 col-sm-offset-1">
                    <h5>Email*</h5>
                    <input class="form-control" v-model="submitData.email" name="email" type="email" v-validate="'required|email'" :class="{'is-danger': errors.has('email')}"
                    />
                    <button type="submit" class="form-control btn-primary next_btn"> Next </button>
                </div>
            </form>
        </div>
        <div v-else class="row">
            <div class="col-sm-10 col-sm-offset-1">
                <h5 class="text-center"> An e-mail has been sent to  {{verifyEmailAddress}}</h5>
            </div>
        </div>
    </div>
</template>

<script>

import Vue from "vue";
import VeeValidate from "vee-validate";
import { mapGetters , mapState } from 'vuex';
import * as properties from '../../properties'

Vue.use(VeeValidate);

export default {
    name:"forgotPassword",
    beforeCreate() {
      
    },
    created() {
    },
    data: function () {
        return {
            submitData:{},
            sendSucced:false
        }
    },
    computed: {
        ...mapState({verifyEmailAddress: state => state.verifyEmailAddress})
    },
    methods: {
        validateEmail: function() {
            this.$validator.validateAll().then(() => {
                this.submitEmailAddress();
            }).catch(() => {
            });
        },
        submitEmailAddress: function() {
            this.$store.dispatch("submitEmailForPassword",this.submitData).then(data=>{
                this.sendSucced = true;
               // this.$router.push("/verify/reset_password");
            }).catch(() => {
            });;
        }
    }
}

</script>

<style scoped>
    .forgot-password {
        background: #ededed;
    }
    
    .forgot-password>div {
        margin-top: 100px;
        width: 520px;
        margin-left: auto;
        margin-right: auto;
        background: white;
        border-radius: 5px;
        box-shadow: 3px 3px 3px 3px #eeeaea;
        padding: 10px;
    }
    
    .description {
        margin-bottom: 5px;
    }
    
    .description>span {
        font-size: 14px;
        line-height: 1.8em;
    }
    
    .next_btn {
        margin-top: 15px;
        margin-bottom: 30px;
        height: 40px;
    }
    a {
        cursor:pointer;
        margin-left:5px;
    }
</style>