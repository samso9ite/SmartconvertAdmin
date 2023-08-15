<template>
    <div >
        <div class="header">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xl-12">
                        <nav class="navbar navbar-expand-lg navbar-light px-0 justify-content-between">
                            <a class="navbar-brand" href="index-2.html"><img src="images/w_logo.png" alt="">
                                <span>SmartConvert</span></a>
                                <span style="font-size:30px; color:white">
                                    <router-link :to="'/change-password'" >  <i class="la la-lock"></i> </router-link>
                                    
                                    </span>
                            <div class="dashboard_log my-2">
                                <div class="d-flex align-items-center">
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>

        <div class="sidebar">
            <div class="menu">
                <ul>
                    <li>
                        <router-link :to="'/'">
                            <a title="Dashboard">
                                <span><i class="la la-igloo"></i></span>
                            </a>
                        </router-link>
                    </li>
                   
                    <li v-if="adminEmail === 'info@smartconvert.ng'">
                        <router-link :to="'/users'" >
                            <a title="All Users">
                                <span><i class="la la-user"></i> </span>
                            </a>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'/rates'">
                            <a  title="All Rates">
                                <span><i class="las la-coins"></i></span>
                            </a>
                        </router-link>
                    </li>
                    <li >
                        <router-link :to="'/add-bank'" v-if="adminEmail === 'info@smartconvert.ng'">
                            <a  title="Banks">
                                <span><i class="fa fa-bank" style="font-size: 18px"></i></span>
                            </a>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'/testimonials'">
                            <a  data-toggle="tooltip" data-placement="right" title="Testimonials">
                                <span><i class="las la-thumbs-up"></i></span>
                            </a>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'/bonus'" v-if="adminEmail === 'info@smartconvert.ng'">
                            <a  data-toggle="tooltip" data-placement="right" title="Campaign">
                                <span><i class="fa fa-check"></i></span>
                            </a>
                        </router-link>
                    </li>
                    
                    <li style="margin-top:7px; margin-left:4px">
                        <a  data-toggle="tooltip" data-placement="right" title="Logout" @click="logout()">
                                <span><i class="las la-power-off"></i></span>
                        </a>
                </li>
                </ul>
            </div>
        </div>

        <div class="page_title">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xl-12">
                        <div class="page_title-content">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';

export default defineComponent({
    name: "NavBar",
    setup() {
        const router = useRouter()
        const logout = () => {
            sessionStorage.clear();
            window.localStorage.clear();
            router.push({path:'/sign-in'})
        }
        let adminEmail = ref<any>('')
        const getAdminEmail = () => {
            adminEmail.value = sessionStorage.getItem('email')
        }
        onMounted(() => {
          getAdminEmail()
        })
        return{logout, adminEmail}
    },
})
</script>
