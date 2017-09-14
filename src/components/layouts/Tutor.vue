<template>
    <div class="container-fluid">
        <div class="row">
            <div  class="col-sm-8 col-sm-offset-2 tutor-container">
                <h3>APPLY AS TUTOR</h3>
                <form @submit.prevent="validateRegisterRequest()" novalidate>
                    <div class="tutor-form">
                        <div class="row">
                            <label>Your Name <span class="required">*</span></label>
                            <div>
                                <input type="text" name="name" v-model="regData.name" v-validate="'required'" class="col-sm-5" :class="{'is-danger': errors.has('name')}"></input>
                            </div>
                        </div>
                        <div class="row">
                            <label>Email Address <span class="required">*</span></label>
                            <input type="text" name="email" v-model="regData.email" v-validate="'required|email'" :class="{'is-danger': errors.has('email')}"
                                class="col-sm-5"></input>
                        </div>
                        <div class="row">
                            <label>Password <span class="required">*</span></label>
                            <input type="password" name="password" v-model="regData.password" v-validate="'required|min:6'" :class="{'is-danger': errors.has('password')}"
                                class="col-sm-5"></input>
                        </div>
                        <div class="row">
                            <label>Medical School <span class="required">*</span></label>
                            <input type="text" name="school" v-model="regData.profile.medical_school" v-validate="'required'" :class="{'is-danger': errors.has('school')}"
                                class="col-sm-5"></input>
                        </div>
                        <div class="row">
                            <label>Test Scores</label>
                            <select type="text" name="test_score" v-model="regData.profile.test_score" v-validate="'required'" :class="{'is-danger': errors.has('test_score')}"
                                class="col-sm-5">
                                <option v-for="item in testtypes" v-bind:value="item.id">{{item.name}}</option>
                            </select>
                        </div>

                        <div class="row">
                            <label>Prior tutoring experience </label>
                            <textarea type="text" name="prio_experience" v-model="regData.profile.prio_experience" rows="3" class="col-sm-5"></textarea>
                        </div>
                        <div class="row">
                            <label>Unique skills to mention </label>
                            <textarea type="text" name="unique_skills" v-model="regData.profile.unique_skills" rows="3" class="col-sm-5"></textarea>
                        </div>
                        <div class="row">
                            <input class="btn" value="Submit" type="submit" />
                        </div>
                    </div>

                </form>
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
    name:"tutor",
    data: function () {
        return {
            testtypes:[{"id":0, "name":""},
                       {"id":1,"name":"USMLE Step 1 "},
                       {"id":2,"name":"USMLE Step 2 CK "},
                       {"id":3,"name":"USMLE Step 3 "},
                       {"id":4,"name":"NBME "}],
            submitted:false,
            regData:{
                "user_type":"tutor",
                "profile": {
                    "test_score": 1,
                    "medical_school": "",
                    "prio_experience": "",
                    "unique_skills": ""
                }
            }
        }
    },
    beforeCreate() {
      
    },
    created() {
        $(document).ready(function() {
            $("#templatemo_menu a").removeClass("current");
            $("#tutor_tab").addClass("current");
        });
    },
    methods: {
        validateRegisterRequest:function() {
            this.submitted = true;
            this.$validator.validateAll().then(() => {
                this.registerTutor();
            }).catch(() => {
            });
        },
        registerTutor() {
            var me = this;
            this.$store.dispatch("registerUser",this.regData).then(data=>{
                this.$router.push("/verify/email_verification");
            }).catch(() => {
            });
        }
    }
}
</script>

<style scoped>
    h3 {
        color: #106fb8;
    }
    
    .tutor-container {
        font-size: 15px;
        background: white;
        margin-top: 30px;
        margin-bottom: 30px;
        padding-left: 40px;
        padding-right: 30px;
    }
    
    .tutor-form {
        padding-top: 10px;
        padding-bottom: 20px;
    }
    
    .tutor-form>div {
        margin: 10px 0px 10px 0px;
    }
    
    .tutor-succed {
        padding: 30px;
        margin-top: 30px;
        margin-bottom: 30px;
        background: white;
        text-align: center;
    }
    
    label {
        display: block;
        font-size: 14px;
    }
    
    label .required {
        color: red;
        font-size: 10px;
    }
    
    input {
        height: 34px;
        border: 1px solid #ddd;
        padding-left: 15px;
    }
    
    select {
        height: 38px;
        border: 1px solid #ddd;
    }
    
    input:focus {
        outline: 1px solid #0066CC
    }
    
    textarea {
        border: 1px solid #ddd
    }
</style>