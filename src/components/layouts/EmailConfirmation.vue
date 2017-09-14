<template>
    <div>
    </div>
</template>

<script>

import Vue from "vue";
import VeeValidate from "vee-validate";
import { mapGetters , mapState } from 'vuex';
import * as properties from '../../properties'

export default {
    name:"confirmation",
    beforeCreate() {
      
    },
    created() {
        this.email_token = this.$route.params.email_token;
        this.continueLogin();
    },
    data: function () {
        return {
            email_token:""
        }
    },
    computed: {
    },
    methods: {
        continueLogin:function() {
            this.$store.dispatch("sendToken",this.email_token).then(data=>{
                this.$router.push("/medi");
            }).catch(() => {
            });
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
        width: 560px;
        margin-left: auto;
        margin-right: auto;
        height: 210px;
        background: white;
        border-radius: 5px;
        box-shadow: 3px 3px 3px 3px #eeeaea;
        padding: 20px 30px 10px 30px;
    }
    
    h4 {
        margin-top: 30px;
        margin-bottom: 20px;
    }
</style>