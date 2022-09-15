<template>
<div>
    <NavBar />
    <div class="content-body">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-12">
                    <div class="card">
                        <div class="card-header border-0">
                            <h4 class="card-title">All Users {{users.length}}</h4>
                        </div>
                        <div class="card-body pt-0">
                            <div class="transaction-table">
                                <div class="table-responsive">
                                    <table class="table mb-0 table-responsive-sm col-lg-12">
                                            <tbody>
                                                <!-- <perfect-scrollbar> -->

                                                <tr v-for="user in users" :key="user">
                                                    <td>
                                                        {{user.member_id}}
                                                    </td>
                                                    <td>
                                                        {{user.first_name}} {{user.last_name}}
                                                    </td>
                                                    <td>
                                                        {{user.email}}
                                                    </td>
                                                    <td>
                                                        {{user.phone_number}}
                                                    </td>
                                                    <td >{{user.address}}</td>
                                                    <td>{{user.total_transactions}} Transactions</td>
                                                </tr>
                                                <!-- </perfect-scrollbar> -->
                                            </tbody>
                                        </table>
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
import { defineComponent, ref } from 'vue'
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import Api from '../views/Api'
import { onMounted } from 'vue'

export default defineComponent({
    name: "Home",
    components: {Footer, NavBar},
    setup() {
        const users = ref<any>([])
        const getUsers = () => {
            try{
                Api.axios_instance.get(Api.baseUrl+'api/v1/list-users')
                .then(res => {
                    console.log("All retrieved");
                    users.value = res.data
                    console.log(users.value);
                })
            }catch(e){
                console.log("Error Occured");
                
            }
        }

        onMounted(() => {
            getUsers()
        })
        return {getUsers, users}
    },
})
</script>

<style scoped>
    .ps{
        /* height:300px; */
        /* width:600px */
    }
</style>