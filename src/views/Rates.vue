<template>
<div>
    <NavBar />
    <div class="content-body">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-12">
                    <div class="card">

                        <div class="card-header border-0">
                            <h4 class="card-title">Rates</h4>
                        </div>
                        <div class="card-body pt-0">
                                <div class="balance-widget">
                                <ul class="list-unstyled">
                                    <div class="row">
                                        <div class="col-lg-4" v-for="rate in rates" :key="rate.unique_id">
                                            
                                                <li class="d-flex" >
                                                    <i class="cc BTC" v-if="rate.coin_name === 'Bitcoin'"></i> <i class="cc TX" v-if="rate.coin_name === 'TRON'"></i> <img src="../../public/assets/images/perfect-money-logo.png" width="38px" v-if="rate.coin_name === 'Perfect Money'"/><i class="cc ETH"  v-if="rate.coin_name == 'Ethereum'"></i><i class="cc LTC"  v-if="rate.coin_name == 'LiteCoin'"></i><i class="cc DOGE"  v-if="rate.coin_name == 'Doge Coin'">
                                                    </i><i class="cc USDT-alt" v-if="rate.coin_name == 'USDT' "></i><i class="cc XRP-alt" v-if="rate.coin_name == 'Ripple'"></i>
                                                    <img :src=rate.image width="40" class="rounded-circle" v-else/>
                                                    <div class="flex-grow-1">
                                                        <router-link :to="{name:'EditRate', params:{reference:rate.unique_id}}"> <h5 class="m-0" style="margin-left:10px !important"> {{rate.coin_name}}</h5></router-link>
                                                    </div>
                                                    <div class="text-end">
                                                      
                                                        <h5 @click="setBuyToEdit(rate.unique_id, rate.buy_rate, rate.sell_rate)" v-if="buyCoinToEdit !== rate.unique_id">₦{{rate.buy_rate}} BUY</h5>
                                                        <span  v-else-if="buyCoinToEdit == rate.unique_id"><input type="text" @change="updateRate(rate.unique_id, 'buy')" v-model="rateEditVal.buy_rate"/><br /></span>
                                                        <span @click="setSellToEdit(rate.unique_id, rate.buy_rate, rate.sell_rate)" v-if="sellCoinToEdit !== rate.unique_id">₦{{rate.sell_rate}} SELL</span>
                                                        <span  v-else-if="sellCoinToEdit == rate.unique_id"><input type="text" v-model="rateEditVal.sell_rate" @change="updateRate(rate.unique_id, 'sell')"/><br /></span>
                                                    </div>
                                                </li>
                                           
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>

                        <div class="col-12">
                           <router-link :to="'/add-coin'"><button class="btn btn-success waves-effect" type="submit">Create New Coin</button> </router-link>
                           <router-link :to="'/add-network'" style="padding-left:5%" v-if="adminEmail === 'info@smartconvert.ng'"><button class="btn btn-success waves-effect" type="submit">Create New Network</button> </router-link>
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
import Coin from './types/Coin'
import Api from './Api'
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'

export default defineComponent({
    name: "Rate",
    components: { Footer, NavBar},
    setup() {
        const rates = ref<Coin[]>([])
        const buyCoinToEdit = ref<string>("")
        const sellCoinToEdit = ref<string>("")
        const rateEditVal = ref<any>({
            buy_rate: '' as string,
            sell_rate: '' as string
        })
        const store = useStore()
        let adminEmail = ref<any>('')

        const getAdminEmail = () => {
            adminEmail.value =  sessionStorage.getItem('email')
        }
        
        /* Get all coins from the database */
        const getCoins = async() => {
        try {
            await  Api.axios_instance.get(Api.baseUrl+'api/v1/list-coin')
                .then(res => {
                    rates.value = res.data
                    store.commit('storeCoins', {all_coin:res.data})
                    })
        } catch(e){
            console.log("There's an error");
        }
    }

    // Set Edit Coin
    const setBuyToEdit = (id: string, buy_rate:number, sell_rate:number) => {
        buyCoinToEdit.value = id;
        rateEditVal.value.buy_rate = buy_rate;
        rateEditVal.value.sell_rate = sell_rate
    };
      
    const setSellToEdit = (id:string, buy_rate:number, sell_rate:number) => {
        sellCoinToEdit.value = id
        rateEditVal.value.buy_rate = buy_rate;
        rateEditVal.value.sell_rate = sell_rate
    }

    const updateRate = async (id:string, type:string) => {
        const formData = {
           buy_rate: rateEditVal.value.buy_rate,
           sell_rate:rateEditVal.value.sell_rate
        }
        try {
                await Api.axios_instance.patch(Api.baseUrl+('api/v1/update-coin/'+id), formData)
                .then(res => {
                    router.push({path:'/rates'})
                    if(type == "buy"){
                        buyCoinToEdit.value = ""
                    }else{
                        sellCoinToEdit.value = ""
                    }
                    getCoins()
                })
            }catch(e){
               alert("An error occured, pleae contact admin")
            }
    }
    onMounted (() => {
        getCoins();
        getAdminEmail()
    })

    return {getCoins, rates, adminEmail, sellCoinToEdit, buyCoinToEdit, rateEditVal, setBuyToEdit, setSellToEdit, updateRate }
    },

})
</script>

