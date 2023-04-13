<template>
<div>
    <NavBar />
    <div class="content-body">
        <div class="container-fluid">
            <div class="row">
                
                <div class="col-xl-9 col-md-8">
                    <div class="row">
                        
                        <div class="col-xl-6">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">Verify User</h4>
                                </div>
                                <div class="card-body">
                                   <h4>Front of ID</h4>
                                   <img :src="userData.front_id"  :width="1000"/>
                                 </div>
                                <h4>Back of ID</h4>
                                    <img :src="userData.back_id" :width="1000"/>
                                </div>
                                <div>
                                    <button class="btn btn-success waves-effect"  @click="approval('2')">Approve</button>
                                    <button class="btn btn-success waves-effect" type="submit" style="margin-left:20px" @click="approval('3')">Disapprove</button>
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
import { defineComponent, ref } from 'vue'
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import Api from './Api'
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'

export default defineComponent({
    name: "VerifyUser",
    components: {Footer, NavBar},
    setup(){
        const route = useRoute()
        const router = useRouter()
        const reference = route.params.reference
        let userData = ref<any>({})
        let id = ref<string>('')

        const User = async () => {
            try{
                Api.axios_instance.get(Api.baseUrl+('api/v1/profile/get/'+reference))
                .then(res => {
                    userData.value = res.data
                })
            }
            catch{
                console.log("There's an error, please contact admin");
            }
        }

        const approval = async (status:string) => {
            try{
                Api.axios_instance.patch(Api.baseUrl+('api/v1/id-approval-dissaproval/'+reference), {transaction_status:status})
                .then(res => {
                    alert("You request has been processed")
                    router.push('/users')
                })
            }catch{
                console.log("There's an error please contact admin");
            }
        }

        onMounted(() => {
            User()
        })
        return {userData, approval, id}
    }
})
</script>