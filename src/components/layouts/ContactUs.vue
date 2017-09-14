<template>
    <div class="container-fluid">
        <div class="row">
            <div v-if="contactSucced" class="col-sm-8 col-sm-offset-2 contact-succed">
                <h3>Thank you for submitting the contact form! We will be in touch shortly.</h3>
                <button class="btn"><router-link :to="{path: '/index'}">Return Home</router-link></button>
            </div>
            <div v-else class="col-sm-8 col-sm-offset-2 contact-container">
                <h3>CONTACT US</h3>
                <p>Email<a href="mailto:info@elitemedicalprep.com?Subject=Question" target="_top"> Medilern </a> or call us
                    at
                    <a href="tel:508-928-7737">508-928-7737</a></p>
                <p class=""> Fill out the form to learn more, or inquire about an <b>online   <u>free trial session</u></b></p>
                <form @submit.prevent="validateContactRequest()" novalidate>
                    <div class="contact-form">
                        <div class="row">
                            <label>Your Name <span class="required">*</span></label>
                            <div>
                                <input type="text" name="first_name" v-model="contactData.firstname" v-validate="'required'" class="col-sm-3" placeholder="First"
                                    :class="{'is-danger': errors.has('first_name')}"></input>
                                <input type="text" name="last_name" v-model="contactData.lastname" v-validate="'required'" class="col-sm-3 col-sm-offset-1"
                                    placeholder="Last" :class="{'is-danger': errors.has('last_name')}"></input>
                            </div>
                        </div>
                        <div class="row">
                            <label>Email Address <span class="required">*</span></label>
                            <input type="text" name="email_adress" v-model="contactData.email" v-validate="'required|email'" :class="{'is-danger': errors.has('email_adress')}"
                                class="col-sm-4"></input>
                        </div>
                        <div class="row">
                            <label>Phone Number <span class="required">*</span></label>
                            <input type="text" name="phone_number" v-model="contactData.phone" v-validate="'required'" :class="{'is-danger': errors.has('phone_number')}"
                                class="col-sm-4"></input>
                        </div>
                        <div class="row">
                            <label>Test Type <span class="required">*</span></label>
                            <select type="text" name="test_type" v-model="contactData.type" v-validate="'required'" :class="{'is-danger': errors.has('test_type')}"
                                class="col-sm-4">
                                <option v-for="item in testtypes" v-bind:value="item.id">{{item.name}}</option>
                            </select>
                        </div>
                        <div class="row multicon">
                            <div class="col-sm-4">
                                <label>Your Medical School </label>
                                <input type="text" v-model="contactData.medicalschool"></input>
                            </div>
                            <div class="col-sm-3 col-sm-offset-1">
                                <label>Year in School </label>
                                <input type="text" v-model="contactData.schoolyear"></input>
                            </div>
                        </div>

                        <div class="row multicon">
                            <div class="col-sm-5">
                                <label>What is availability to speak by phone?  </label>
                                <input type="text" v-model="contactData.availability"></input>
                            </div>
                            <div class="col-sm-4 col-sm-offset-1">
                                <label>What time zone are you in? </label>
                                <input type="text" v-model="contactData.timezone"></input>
                            </div>
                        </div>
                        <div class="row">
                            <label>How did you hear about us? <span class="required">*</span></label>
                            <select type="text" class="col-sm-4" name="heard_about" v-validate="'required'" :class="{'is-danger': errors.has('heard_about')}">
                                <option v-for="item in whereheards" :value="item">{{item}}</option>
                            </select>
                        </div>
                        <div class="row">
                            <label>Questions & Comments <span class="required">*</span></label>
                            <textarea type="text" name="comments" v-model="contactData.message" v-validate="'required'" :class="{'is-danger': errors.has('comments')}"
                                rows="4" class="col-sm-5"></textarea>
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
    name:"contactus",
    data: function () {
        return {
            testtypes:[{"id":0,"name":"USMLE Step 1 "},
                       {"id":1,"name":"USMLE Step 2 CK "},
                       {"id":2,"name":"USMLE Step 3 "},
                       {"id":3,"name":"NBME "},
                       {"id":4,"name":"ABIM "},
                       {"id":5,"name":"Medical Coursework "},
                       {"id":6,"name":"Other "}],
            whereheards:["Facebook/Facebook Ad ","Google Search/Google Ad ","Referral/Other "],
            submitted:false,
            contactSucced:false,
            contactData:{}
        }
    },
    beforeCreate() {
      
    },
    created() {
        $(document).ready(function() {
            $("#templatemo_menu a ").removeClass("current");
            $("#contact_tab ").addClass("current");
        });
    },
    mounted() {
    },
    methods: {
        validateContactRequest() {
            this.submitted = true;
            this.$validator.validateAll().then(() => {
                this.sendContactRequest();
            }).catch(() => {
            });
        },
        sendContactRequest() {
            var me = this;
            Vue.axios
            .post(properties.contactUrl,this.contactData)
            .then( response => { 
              if(response.status==200) {
                  me.contactSucced = true;
              }else {

              }
            });
        }
    }
}
</script>

<style scoped>
    h3 {
        color: #106fb8;
    }
    
    p {
        margin-top: 15px;
        margin-bottom: 15px;
    }
    
    .contact-container {
        font-size: 15px;
        background: white;
        margin-top: 30px;
        margin-bottom: 30px;
        padding-left: 40px;
        padding-right: 30px;
    }
    
    .contact-bottom {
        height: 15px;
        background-image: url(../../asset/images/templatemo_sidebar_section_bottom.jpg);
        background-size: cover;
    }
    
    .contact-form {
        padding-top: 10px;
        padding-bottom: 20px;
    }
    
    .contact-form>div {
        margin: 10px 0px 10px 0px;
    }
    .contact-succed {
        padding:30px;
        margin-top:30px;
        margin-bottom:30px;
        background:white;
        text-align:center;
    }
    .multicon>div {
        padding-left: 0px;
    }
    
    .multicon>div input {
        width: 100%;
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