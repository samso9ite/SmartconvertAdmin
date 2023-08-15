<template>
<div>
    <NavBar />
    <div class="content-body">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-12">
                    <div class="card">
                        <div class="card-header border-0">
                            <h4 class="card-title">All Users {{users.length}} <span style="float:right"> <a href="" class="nav-link">
                                    <i class="la la-lock"></i>
                                     </a></span> </h4>
                        </div>
                        <div class="buy-sell-widget" width="30%">
                                <br>
                                <ul class="nav nav-tabs">
                                    <li class="nav-item col-lg-4"><a class="nav-link" data-toggle="tab"  @click="handleClick('')"
                                        >All Users</a>
                                    </li>
                                   <li class="nav-item col-lg-4"><a class="nav-link" data-toggle="tab"  @click="handleClick('2')"
                                        >Verified Users</a>
                                    </li>
                                    <li class="nav-item ">
                                        <a class="nav-link" data-toggle="tab"  @click="handleClick('1')"
                                           >Unverified Users
                                        </a>
                                    </li>
                                    <li class="nav-item"> <a class="nav-link" data-toggle="tab"  @click="handleClick('3')"> Awaiting Confirmation </a> </li>
                                </ul>
                            </div>
                        <div class="card-body pt-0">
                            <div class="transaction-table">
                                <div class="table-responsive">
                                    <table class="table mb-0 table-responsive-sm col-lg-12">
                                    
                                            <tbody>
                                                <!-- <perfect-scrollbar> -->
                                             <div v-if="filteredUsers.length > 0">
                                                <div class="col-lg-12" v-if="selected === '3' || selected ==='2'" style="width: 100% !important">
                                                   
                                                            <tr v-for="account in filteredUsers" :key="account">
                                                                <td>
                                                                    {{account.user.member_id}}
                                                                </td>
                                                                <td>
                                                                    {{account.user.first_name}} {{account.user.last_name}}
                                                                </td>
                                                                <td>
                                                                    {{account.user.email}}
                                                                </td>
                                                                <td>
                                                                    {{account.user.phone_number}}
                                                                </td>
                                                                <td >{{account.address}}</td>
                                                                <td>{{account.user.total_transactions}} Transactions</td>
                                                                <td>
                                                                    <router-link :to="'verify-user/'+account.id"><span><i class="la la-pen-alt"></i>Edit</span> </router-link>
                                                                </td>
                                                                <!-- <td>
                                                                    <a :href="'/?#/verify-user/'+account.id"> <span><i class="la la-pen-alt"></i>Edit</span> </a>
                                                                </td> -->
                                                            </tr>
                                                    </div>
                                                

                                                <div v-else>
                                                        <tr v-for="account in filteredUsers" :key="account" >
                                                            <td>
                                                                {{account.user.member_id}}
                                                            </td>
                                                            <td>
                                                                {{account.user.first_name}} {{account.user.last_name}}
                                                            </td>
                                                            <td>
                                                                {{account.user.email}}
                                                            </td>
                                                            <td>
                                                                {{account.user.phone_number}}
                                                            </td>
                                                            <td >{{account.address}}</td>
                                                            <td>{{account.user.total_transactions}} Transactions</td>
                                                        </tr>
                                                    </div>
                                                </div>
                                                <div v-else>
                                                    <h5><center>No Registered User</center></h5>
                                                </div>
                                                
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
import { defineComponent, ref, computed } from 'vue'
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import Api from '../views/Api'
import { onMounted } from 'vue'

export default defineComponent({
    name: "Home",
    components: {Footer, NavBar},
    setup() {
        const users = ref<any>([])
        let filteredUsers = ref<any>([])
        let selected = ref<string>('')

        const handleClick = (status:string) => {
            selected.value = status
        }
        const getUsers = () => {
            try{
                Api.axios_instance.get(Api.baseUrl+'api/v1/list-users-profile')
                .then(res => {
                    users.value = res.data
                    console.log(users.value);
                    
                })
            }catch(e){
                console.log("Error Occured");
                
            }
        }
        /* Filter Users based on verification status */
        filteredUsers = computed(() => {
            return users.value.filter((user:any) => user.transaction_status.includes(selected.value))
        })
        /* End of Filter */
        onMounted(() => {
            getUsers()
        })
        return {getUsers, users, filteredUsers, selected, handleClick}
    },
})
</script>

<style scoped>
    .buy-sell-widget .nav-tabs .nav-item {
    width: 25% !important;
    text-align: center;
}
    
</style>