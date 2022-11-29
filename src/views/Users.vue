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
                                                <div class="col-lg-12" v-if="selected === '3' || selected ==='2'" style="width: 100% !important">
                                                    <span v-for="user in filteredUsers" :key="user">
                                                        <tr v-for="user in filteredUsers" :key="user">
                                                            <!-- <router-link :to="{name:'VerifyUser', params:{reference:user.id}}"> -->
                                                            <td>
                                                                {{user.user.member_id}}
                                                            </td>
                                                            <td>
                                                                {{user.user.first_name}} {{user.user.last_name}}
                                                            </td>
                                                            <td>
                                                                {{user.user.email}}
                                                            </td>
                                                            <td>
                                                                {{user.user.phone_number}}
                                                            </td>
                                                            <td >{{user.address}}</td>
                                                            <td>{{user.user.total_transactions}} Transactions</td>
                                                            <td>
                                                                <router-link :to="{name:'VerifyUser', params:{reference:user.id}}"><span><i class="la la-pen-alt"></i>Edit</span> </router-link>
                                                            </td>
                                                        </tr>
                                                    </span>
                                                </div>

                                                <div v-else>
                                                    <tr v-for="user in filteredUsers" :key="user" >
                                                            <td>
                                                                {{user.user.member_id}}
                                                            </td>
                                                            <td>
                                                                {{user.user.first_name}} {{user.user.last_name}}
                                                            </td>
                                                            <td>
                                                                {{user.user.email}}
                                                            </td>
                                                            <td>
                                                                {{user.user.phone_number}}
                                                            </td>
                                                            <td >{{user.address}}</td>
                                                            <td>{{user.user.total_transactions}} Transactions</td>
                                                    </tr>
                                                </div>
                                                
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
    .ps{
        /* height:300px; */
        /* width:600px */
    }
</style>