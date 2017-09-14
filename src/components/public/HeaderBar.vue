<template>
    <div id="templatemo_menu_wrapper">
        <div id="templatemo_menu">
            <ul>
                <li><router-link :to="{path: '/index'}" id="home_tab" class="current">HOME</router-link></li>
                <li><router-link :to="{path: '/tutor_registration'}" id="tutor_tab">TUTORS</router-link></li>
                <li><router-link :to="{path: '/teach'}" id="teach_tab">HOW WE TEACH</router-link></li>
                <li><router-link :to="{path: '/faq'}" id="faq_tab">FAQ</router-link></li>
                <li><router-link :to="{path: '/contact'}" id="contact_tab">CONTACT</router-link></li>
                <li><router-link :to="{path: '/auth'}" id="auth_tab">SIGN IN</router-link></li>
            </ul>

        </div>
        <!-- end of templatemo_menu -->
    </div>
</template>

<script>
import Vue from "vue";

export default {
    name:"headerbar",
    beforeCreate() {
      
    },
    created:function() {
        $(document).ready(function() {
            $("#templatemo_menu li").click(function(e){
                $("#templatemo_menu a").removeClass("current");
                $(this).find("a").addClass("current");
            });
        });
        
    },
    mounted() {
    },
    watch: {
    }
}
</script>

<style class="scoped">
    
</style>