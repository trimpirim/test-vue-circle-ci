<template>
    <div id="main">
        <splashview></splashview>
        <headerbar></headerbar>
        <router-view></router-view>
        <footerbar></footerbar>
    </div>
    <!-- end of container -->
</template>
<script>
    
import FooterBar from './public/FooterBar.vue';
import HeaderBar from './public/HeaderBar.vue';
import SplashView from './public/SplashView.vue';
import { facebookInit } from '../utility/faceBookUtility.js';

export default {
    name:"mainlayout",
    components: {
        footerbar:FooterBar,
        headerbar:HeaderBar,
        splashview:SplashView
    },
    beforeCreate() {
      
    },
    created() {
        facebookInit();
    }
}
</script>

<style>
    #main {
        background: #3e464d;
    }
    
    .full-screen {
        width: 100%;
        height: 100%;
        position: absolute;
    }
    
    .is-danger {
        border-color: red!important;
    }
</style>