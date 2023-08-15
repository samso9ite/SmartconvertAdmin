<template>
<div>
    <NavBar />
    <div class="content-body">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-3 col-md-4">
                    <div class="card settings_menu">
                        <div class="card-header">
                            <h4 class="card-title">Settings</h4>
                        </div>
                        <div class="card-body">
                            <ul>
                                <li class="nav-item">
                                    <a href="" class="nav-link">
                                        <i class="la la-lock"></i>
                                        <span>Change Password</span>
                                    </a>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-xl-9 col-md-8">
                    <div class="row">
                        
                        <div class="col-xl-6">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">Change Password</h4>
                                </div>
                                <div class="card-body">
                                    <form @submit.prevent="changePassword">
                                        <div class="row">
                                            <div class="mb-3 col-xl-12">
                                                <label class="me-sm-2">Current Password</label>
                                                <input type="text" class="form-control" placeholder="*******" v-model="current_pass">
                                            </div>
                                            <div class="mb-3 col-xl-12">
                                                <label class="me-sm-2">New Password</label>
                                                <input type="text" class="form-control"
                                                    placeholder="**********" v-model="new_pass">
                                            </div>
                                            <div class="mb-3 col-xl-12">
                                                <label class="me-sm-2">Confirm Password</label>
                                                <input type="text" class="form-control" placeholder="*****" v-model="confirm_pass">
                                            </div>
                                            <div class="col-12">
                                                <button class="btn btn-success waves-effect">Save</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer />
</div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import Api from './Api'
import {useRouter} from 'vue-router'

export default defineComponent({
    name: "ChangePassword",
    components: {Footer, NavBar},
    setup() {
        const confirm_pass = ref<any>('')
        const new_pass = ref<any>('')
        const current_pass = ref <any>('')
        const router = useRouter()
        
        const changePassword = () => {
        if(new_pass.value === confirm_pass.value){
            let formData = {
                new_password: new_pass.value,
                re_new_password: confirm_pass.value,
                current_password: current_pass.value
            }
            try{ Api.axios_instance.post(Api.baseUrl+'auth/users/set_password/', formData)
                .then(res=> {
                    alert("Password Changed Successfully")
                    router.push({path:'/'})
                })
            } catch(e){
                alert("Current Password not Correct")
            }
        }
            else{
                alert("Password Mismatch")
            }
        }

        return{new_pass, confirm_pass, current_pass, changePassword}
    },
})
</script>