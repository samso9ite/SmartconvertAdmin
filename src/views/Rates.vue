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
                                            <router-link :to="{name:'EditRate', params:{reference:rate.unique_id}}">
                                                <li class="d-flex" >
                                                    <i class="cc BTC" v-if="rate.coin_name === 'Bitcoin'"></i> <i class="cc TX" v-if="rate.coin_name === 'TRON'"></i> <img src="../../public/assets/images/perfect-money-logo.png" width="38px" v-if="rate.coin_name === 'Perfect Money'"/><i class="cc ETH"  v-if="rate.coin_name == 'Ethereum'"></i><i class="cc LTC"  v-if="rate.coin_name == 'LiteCoin'"></i><i class="cc DOGE"  v-if="rate.coin_name == 'Doge Coin'">
                                                    </i><i class="cc USDT-alt" v-if="rate.coin_name == 'USDT' "></i><i class="cc XRP-alt" v-if="rate.coin_name == 'Ripple'"></i>
                                                    <div class="flex-grow-1">
                                                        <h5 class="m-0" style="margin-left:10px !important"> {{rate.coin_name}}</h5>
                                                    </div>
                                                    <div class="text-end">
                                                        <h5>₦{{rate.buy_rate}} BUY</h5>
                                                        <span>₦{{rate.sell_rate}} SELL</span>
                                                    </div>
                                                </li>
                                            </router-link>
                                        </div>
                                    </div>
                                </ul>
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
import Coin from './types/Coin'
import Api from './Api'
import { onMounted } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
    name: "Rate",
    components: { Footer, NavBar},
    setup() {
        const rates = ref<Coin[]>([])
        const store = useStore()
        /* Get all coins from the database */
        const getCoins = async() => {
        try {
            await  Api.axios_instance.get(Api.baseUrl+'api/v1/list-coin')
                .then(res => {
                    rates.value = res.data
                    store.commit('storeCoins', {all_coin:res.data})
                    console.log(store.state.all_coin);
                    })
        } catch(e){
            console.log("There's an error");
            
        }
    }

    onMounted (() => {
        getCoins()
    })
    return {getCoins, rates}
    },

})
</script>

