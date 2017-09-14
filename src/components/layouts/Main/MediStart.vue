<template>
    <div id="wrapper">
        <!-- Sidebar -->
        <div id="sidebar-wrapper">
            <ul class="sidebar-nav">
                <li class="sidebar-brand">
                    <router-link :to="{path: 'schedule'}"> Start Medilern
                    </router-link>
                </li>
                <li>
                    <router-link :to="{path: 'schedule'}"> Set Availability</router-link>
                </li>
                <li>
                    <router-link :to="{path: 'settrial'}"> Set Trial Point</router-link>
                </li>
                <li>
                    <router-link :to="{path: 'booktrial'}"> Book Trial</router-link>
                </li>
                <li>
                    <router-link :to="{path: 'payment'}"> Payment</router-link>
                </li>
                <li>
                    <router-link :to="{path: 'conference'}"> Conference</router-link>
                </li>
                <li>
                    <router-link :to="{path: 'tutoring'}"> Tutoring</router-link>
                </li>
            </ul>
        </div>
        <!-- /#sidebar-wrapper -->

        <!-- Page Content -->
        <div id="page-content-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
        <!-- /#page-content-wrapper -->
    </div>
</template>

<script>

import Vue from 'vue';

export default {
    name:"medistart",
    beforeCreate() {
      
    },
    created() {
           
    }
}
</script>

<style scoped>
    #wrapper {
        padding-left: 0;
        -webkit-transition: all 0.5s ease;
        -moz-transition: all 0.5s ease;
        -o-transition: all 0.5s ease;
        transition: all 0.5s ease;
    }
    
    #wrapper.toggled {
        padding-left: 250px;
    }
    
    #sidebar-wrapper {
        z-index: 1000;
        position: fixed;
        left: 250px;
        width: 0;
        height: 100%;
        margin-left: -250px;
        overflow-y: auto;
        background: #3e464d;
        -webkit-transition: all 0.5s ease;
        -moz-transition: all 0.5s ease;
        -o-transition: all 0.5s ease;
        transition: all 0.5s ease;
    }
    
    #wrapper.toggled #sidebar-wrapper {
        width: 250px;
    }
    
    #page-content-wrapper {
        width: 100%;
        position: absolute;
        padding: 15px;
    }
    
    #wrapper.toggled #page-content-wrapper {
        position: absolute;
        margin-right: -250px;
    }
    /* Sidebar Styles */
    
    .sidebar-nav {
        position: absolute;
        top: 0;
        width: 250px;
        margin: 0;
        padding: 0;
        list-style: none;
        font-size: 14px;
    }
    
    .sidebar-nav li {
        text-indent: 20px;
        line-height: 40px;
    }
    
    .sidebar-nav li a {
        display: block;
        text-decoration: none;
        color: #cbcbcb;
    }
    
    .sidebar-nav li a:hover {
        text-decoration: none;
        color: #fff;
        background: rgba(255, 255, 255, 0.2);
    }
    
    .sidebar-nav li a:active,
    .sidebar-nav li a:focus {
        text-decoration: none;
    }
    
    .sidebar-nav > .sidebar-brand {
        height: 65px;
        font-size: 18px;
        line-height: 60px;
    }
    
    .sidebar-nav > .sidebar-brand a {
        color: #cbcbcb;
    }
    
    .sidebar-nav > .sidebar-brand a:hover {
        color: #fff;
        background: none;
    }
    
    @media(min-width:768px) {
        #wrapper {
            padding-left: 250px;
        }
        #wrapper.toggled {
            padding-left: 0;
        }
        #sidebar-wrapper {
            width: 250px;
        }
        #wrapper.toggled #sidebar-wrapper {
            width: 0;
        }
        #page-content-wrapper {
            padding: 20px;
            position: relative;
        }
        #wrapper.toggled #page-content-wrapper {
            position: relative;
            margin-right: 0;
        }
    }
</style>