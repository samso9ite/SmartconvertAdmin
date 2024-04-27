<template>
    <div id="" style="background: linear-gradient(to right, rgba(50, 70, 80, 0.7), rgba(0, 0, 0, 0.7)), url('../images/main_bg.jpg')  !important;s">
        <div class="authincation section-padding"
          >
            <div class="container h-100">
                <div class="row justify-content-center h-100 align-items-center">
                    <div class="col-xl-5 col-md-6">
                        <div class="mini-logo text-center my-5">
                            <img src="../../public/assets/images/main_logo.png"  alt="">
                        </div>
                        <div class="auth-form card">
                            <div class="card-header justify-content-center">
                                <h4 class="card-title">Sign in</h4>
                            </div>
                            <div class="card-body">
                                <form  class="signin_validate">
                                    <div class="mb-3">
                                        <label>Email</label>
                                        <input type="email" class="form-control" placeholder="" v-model="email">
                                    </div>
                                    <div class="mb-3">
                                        <label>Password</label>
                                        <input type="password" class="form-control" placeholder="Password" v-model="password"/>
                                    </div>
                                    <div class="row d-flex justify-content-between mt-4 mb-2">
                                        <div class="mb-3 mb-0">
                                            <a href="reset.html">Forgot Password?</a>
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <button class="btn btn-success btn-block" style="background-color:rgb(122 21 61); border: none;" @click="callApi" :disabled="loading">Sign in</button>
                                    </div>
                                </form>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template> 

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { toRefs } from 'vue'
import {ref} from 'vue'  
import Api from './Api.js'
import { booleanLiteral } from '@babel/types'


export default defineComponent({
    name: 'Signin',
    setup() {
        const password = ref<string>('')
        const email = ref<string>('')
        let loading = ref<boolean>(false)
        // let isAuthenticated =  ref<any>(true)
        let isAuthenticated:boolean = true;
        const router = useRouter()
       
        const callApi = async () => {
            // loading = true
             const formData = {email: email.value, password:password.value}
            
             try{
                    await  Api.axios_instance.post(Api.baseUrl+'auth/jwt/create/', formData)
                    .then(res => {
                        const access = res.data.access
                        sessionStorage.setItem('access', access)
                        sessionStorage.setItem('isAuthenticated', 'true')
                        console.log(email.value);
                        
                        sessionStorage.setItem('email', email.value)
                        router.push("/")
                    })
                } catch(e){
                    alert("Email or Password not correct")
                }
                finally{
                    () => {
                        loading.value = false 
                    }
                }
            }
        return {callApi, loading, password, email}
    },
})
</script>

<style>
.VuePassword__Toggle{
    padding-left: 9rem !important;
}
</style>

