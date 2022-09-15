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
                                    <a href="settings-security.html" class="nav-link">
                                        <i class="la la-lock"></i>
                                        <span>Change Password</span>
                                        {{old_pass}}
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
                                    <form action="#">
                                        <div class="row">
                                            <div class="mb-3 col-xl-12">
                                                <label class="me-sm-2">Old Password</label>
                                                <input type="email" class="form-control" placeholder="Email">
                                            </div>
                                            <div class="mb-3 col-xl-12">
                                                <label class="me-sm-2">New Password</label>
                                                <input type="password" class="form-control"
                                                    placeholder="**********">
                                            </div>
                                            <div class="mb-3 col-xl-12">
                                                <label class="me-sm-2">Confirm New Password</label>
                                                <input type="email" class="form-control" placeholder="Email">
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
export default defineComponent({
    name: "ChangePassword",
    components: {Footer, NavBar},
    setup() {
        const old_pass = ref<string>('kjdskfjdl')
        const new_password = ref<string>('')

        return(old_pass)
    },
})
</script>