<template>
<div>
    <NavBar />
    <div class="content-body">
        <div class="container-fluid">
            <div class="row">
                
                <div class="col-xl-9 col-md-8">
                    <div class="row">
                        
                        <div class="col-xl-12">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">Coin Rate</h4>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="row">
                                            <div class="mb-3 col-xl-6">
                                                <label class="me-sm-2">Coin Name</label>
                                                <input type="text" class="form-control" v-model="coin.coin_name">
                                            </div>
                                            <div class="mb-3 col-xl-6">
                                                <label class="me-sm-2">Buy Rate</label>
                                                <input type="text" class="form-control"
                                                   v-model="coin.buy_rate">
                                            </div>
                                            <div class="mb-3 col-xl-6">
                                                <label class="me-sm-2">Sell Rate</label>
                                                <input type="text" class="form-control"
                                                   v-model="coin.sell_rate">
                                            </div>
                                            <div class="mb-3 col-xl-6">
                                                <label class="me-sm-2">Coin Shortcode</label>
                                                <input type="text" class="form-control" v-model="coin.coin_short_code">
                                            </div>
                                            <div class="mb-3 col-xl-6">
                                                <label class="me-sm-2">Minimum Buy Limit</label>
                                                <input type="text" class="form-control" v-model="coin.minimum_buy_limit">
                                            </div>
                                            <div class="mb-3 col-xl-6">
                                                <label class="me-sm-2">Minimum Sell Limit</label>
                                                <input type="text" class="form-control" v-model="coin.minimum_sell_limit">
                                            </div>
                                            <div class="mb-3 col-xl-6">
                                                <label class="me-sm-2">Maximum Buy Limit</label>
                                                <input type="text" class="form-control" v-model="coin.maximum_buy_limit">
                                            </div>
                                            <div class="mb-3 col-xl-6">
                                                <label class="me-sm-2">Maximum Sell Limit</label>
                                                <input type="text" class="form-control" v-model="coin.maximum_sell_limit">
                                            </div>
                                           
                                            <div class="mb-3 col-xl-4">
                                                <label class="me-sm-2">Sell Active Status</label>
                                                <input type="checkbox" class="form-check-input" v-model="coin.coin_sell_status">
                                            </div>
                                            <div class="mb-3 col-xl-4">
                                                <label class="me-sm-2">Buy Active Status</label>
                                                <input type="checkbox" class="form-check-input" v-model="coin.coin_buy_status">
                                            </div>
                                            <div class="mb-3 col-xl-4">
                                                <label class="me-sm-2">Has Different Networks</label>
                                                <input type="checkbox" class="form-check-input" v-model="coin.has_networks">
                                            </div>
                                            <div class="card-header mb-4">
                                                    <h4 class="card-title">Networks </h4>
                                            </div>   
                                           <span v-if="coin.has_networks">
                                            <div class="mb-3 col-xl-10" v-for="network in networks" :key="network">
                                                <h3> {{ network.network_name }} <router-link :to="'/edit-network/'+network.id+'/'+network.network_name+'/'+coin.coin_name"  v-if="adminEmail === 'info@smartconvert.ng'"> <i class="fa fa-pencil"></i></router-link></h3><br>   
                                                <div class="row">
                                                    <div class="mb-3 col-xl-4 col-md-4"> <label class="me-sm-2">{{ network.first_address }} </label></div>
                                                    <div class="mb-3 col-xl-4 col-md-4">  <label class="me-sm-2">{{ network.second_address }}</label> </div>
                                                    <div class="mb-3 col-xl-4 col-md-4"> <label class="me-sm-2">{{ network.third_address }}</label></div>
                                                </div>      
                                                <br>
                                            </div>
                                           </span>
                                              
                                            <span v-else>
                                                <div class="mb-3 col-xl-12">
                                                    <label class="me-sm-2">All Address</label>
                                                    <input type="text" class="form-control" v-model="coin.all_address"  v-if="adminEmail === 'info@smartconvert.ng'">
                                                    <!-- <div class="col-12"> -->
                                                        <button class="btn btn-success waves-effect mt-3" type="submit" @click="updateCoin">Update Coin Address</button>
                                                    <!-- </div> -->
                                                    <!-- <input type="text" class="form-control" v-model="coin.second_address" disabled v-else> -->
                                                </div>
                                                <div class="mb-3 col-xl-6" style="margin-top: 5em;">
                                                <label class="me-sm-2">First Address</label>
                                                <input type="text" class="form-control" v-model="coin.first_address"  v-if="adminEmail === 'info@smartconvert.ng'">
                                                <input type="text" class="form-control" v-model="coin.first_address"  v-else disabled>
                                                </div>
                                                <div class="mb-3 col-xl-6">
                                                    <label class="me-sm-2">Second Address</label>
                                                    <input type="text" class="form-control" v-model="coin.second_address"  v-if="adminEmail === 'info@smartconvert.ng'">
                                                    <input type="text" class="form-control" v-model="coin.second_address" disabled v-else>
                                                </div>
                                                <div class="mb-3 col-xl-6">
                                                    <label class="me-sm-2">Third Address</label>
                                                    <input type="text" class="form-control" v-model="coin.third_address" v-if="adminEmail === 'info@smartconvert.ng'">
                                                    <input type="text" class="form-control" v-model="coin.third_address" disabled v-else >
                                                </div>
                                                <div class="mb-3 col-xl-6">
                                                    <label class="me-sm-2">Fourth Address</label>
                                                    <input type="text" class="form-control" v-model="coin.fourth_address"  v-if="adminEmail === 'info@smartconvert.ng'">
                                                    <input type="text" class="form-control" v-model="coin.fourth_address" disabled v-else>
                                                </div>
                                                <div class="mb-3 col-xl-6">
                                                    <label class="me-sm-2">Fifth Address</label>
                                                    <input type="text" class="form-control" v-model="coin.fifth_address" v-if="adminEmail === 'info@smartconvert.ng'">
                                                    <input type="text" class="form-control" v-model="coin.fifth_address" disabled v-else>
                                                </div>
                                            </span>
                                            <div class="col-12">
                                                <button class="btn btn-success waves-effect" type="submit" @click="updateCoin">Save</button>
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
import { defineComponent, ref } from 'vue'
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import Api from './Api'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'

export default defineComponent({
    name: "EditRate",
    components: {Footer, NavBar},
    setup() {
        const store = useStore()
        const route = useRoute()
        const router = useRouter()
        const id = route.params.reference
        const networks = ref<any>([])
        let adminEmail = ref<any>('')

        const getAdminEmail = () => {
            adminEmail.value =  sessionStorage.getItem('email')
        }

        const coin = ref({
            coin_id: 0 as number,
            coin_name:'' as string,
            coin_description: '' as string,
            buy_rate: 0 as number,
            sell_rate: 0 as number,
            coin_status: false as boolean,
            minimum_buy_limit: 0 as number,
            minimum_sell_limit: 0 as number,
            maximum_buy_limit: 0 as number,
            maximum_sell_limit: 0 as number,
            coin_short_code: '' as string,
            coin_sell_status: false as boolean,
            coin_buy_status: false as boolean,
            first_address: '' as string,
            second_address: '' as string,
            third_address: '' as string,
            fourth_address: '' as string,
            fifth_address: '' as string,
            has_networks: false as boolean,
            all_address: "" as string
        })
        const network = ref({
            coin_id: 0 as number,
            network_name: '' as string,
            first_address: '' as string,
            second_address: '' as string,
            third_address: '' as string,
        })
        const fillDetails = () => {
            const allCoin = ref<any>(store.state.all_coin)
            const selectedCoin = allCoin.value.filter((coin:any) => coin.unique_id == id)
            network.value.coin_id = selectedCoin[0].id
            coin.value.coin_id = selectedCoin[0].id
            coin.value.coin_description = selectedCoin[0].coin_description
            coin.value.coin_name = selectedCoin[0].coin_name
            coin.value.buy_rate = selectedCoin[0].buy_rate
            coin.value.sell_rate = selectedCoin[0].sell_rate
            coin.value.coin_status = selectedCoin[0].coin_status
            coin.value.minimum_buy_limit = selectedCoin[0].minimum_buy_limit
            coin.value.maximum_buy_limit = selectedCoin[0].maximum_buy_limit
            coin.value.minimum_sell_limit = selectedCoin[0].minimum_sell_limit
            coin.value.maximum_sell_limit = selectedCoin[0].maximum_sell_limit
            coin.value.coin_short_code = selectedCoin[0].coin_short_code
            coin.value.coin_sell_status = selectedCoin[0].sell_active_status
            coin.value.coin_buy_status = selectedCoin[0].buy_active_status
            coin.value.first_address = selectedCoin[0].first_address
            coin.value.second_address = selectedCoin[0].second_address
            coin.value.third_address = selectedCoin[0].third_address
            coin.value.fourth_address = selectedCoin[0].fourth_address
            coin.value.fifth_address = selectedCoin[0].fifth_address
            coin.value.has_networks = selectedCoin[0].has_networks
           
        }
        const updateCoin = async (e:any) => {
            e.preventDefault()
            if (coin.value.all_address !== "null"){
                let items:string[] = [];
                coin.value.all_address.split(",").map((item:string) => {
                    items.push(item.trim())
                    if(items.length == 1){
                       coin.value.first_address = items[0] 
                    }else if(items.length == 2){
                        coin.value.second_address = items[1]
                    }else if(items.length == 3){
                        coin.value.third_address = items[2]
                    }else if(items.length == 4){
                        coin.value.fourth_address = items[3]
                    }else if(items.length == 5){
                        coin.value.fifth_address = items[4]
                    }
                })
            }
            const formData = {
                coin_name: coin.value.coin_name,
                coin_description: coin.value.coin_description,
                buy_rate: coin.value.buy_rate,
                sell_rate: coin.value.sell_rate,
                coin_status: coin.value.coin_status,
                minimum_buy_limit: coin.value.minimum_buy_limit,
                maximum_buy_limit: coin.value.maximum_buy_limit,
                minimum_sell_limit: coin.value.minimum_sell_limit,
                maximum_sell_limit: coin.value.maximum_sell_limit,
                short_code: coin.value.coin_short_code,
                buy_active_status: coin.value.coin_buy_status,
                sell_active_status: coin.value.coin_sell_status,
                first_address: coin.value.first_address,
                second_address: coin.value.second_address,
                third_address: coin.value.third_address,
                fourth_address: coin.value.fourth_address,
                fifth_address: coin.value.fifth_address,
                has_networks: coin.value.has_networks
            }
            try {
                await Api.axios_instance.patch(Api.baseUrl+('api/v1/update-coin/'+id), formData)
                .then(res => {
                    router.push({path:'/rates'})
                   alert("Rate Has Been Updated")
                })
            }catch(e){
               alert("An error occured, pleae contact admin")
            }
            updateNetwork()
        }
        const getNetwork = async () => {
            Api.axios_instance.get(Api.baseUrl+'api/v1/list-networks/'+network.value.coin_id)
            .then(res => {
                networks.value = res.data
            })
        }
        const updateNetwork = async () => {
            const formData = {
                network_name: network.value.network_name,
                first_address: network.value.first_address,
                second_address: network.value.second_address,
                third_address: network.value.third_address
            }
            Api.axios_instance.patch(Api.baseUrl+'api/v1/update-network/'+network.value.coin_id, formData)
            .then(res => {
                console.log(res.data); 
            })
        }

        onMounted(() => {
            fillDetails();
            getNetwork();
            getAdminEmail()
        })
        return {coin, updateCoin, updateNetwork, network, getNetwork, networks, adminEmail}
    },
})
</script>