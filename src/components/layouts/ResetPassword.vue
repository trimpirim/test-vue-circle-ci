<template>
    <div class="forgot-password full-screen">
        <div class="row">
            <form @submit.prevent="validatePassword()" novalidate>
                <div class="col-sm-10 col-sm-offset-1">
                    <h2> Reset Password</h2>
                </div>
                <div class="col-sm-10 col-sm-offset-1 description">
                    <h5>Password*</h5>
                    <input class="form-control" v-model="password" name="password" type="password" v-validate="'required|min:6'" :class="{'is-danger': errors.has('password')}"
                    />
                    <button type="submit" class="form-control btn-primary next_btn"> Reset </button>
                </div>
            </form>
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
    name:"resetPassword",
    beforeCreate() {
      
    },
    created() {
        this.reset_token = this.$route.params.reset_token;
    },
    data: function () {
        return {
            password:"",
            reset_token:""
        }
    },
    computed: {
    },
    methods: {
        validatePassword: function() {
            this.$validator.validateAll().then(() => {
                this.resetPassword();
            }).catch(() => {
            });
        },
        resetPassword: function() {
            var formData = {};
            formData.password = this.password;
            formData.token = this.reset_token;
            this.$store.dispatch("resetPassword",formData).then(data=>{
                this.$router.push("/medi");
            }).catch(() => {
            });
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
</style>