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
                                    <h4 class="card-title">Coin Rate</h4>
                                </div>
                                <div class="card-body">
                                    <form @submit.prevent="updateCoin">
                                        <div class="row">
                                            <div class="mb-3 col-xl-12">
                                                <label class="me-sm-2">Coin Name</label>
                                                <input type="text" class="form-control" v-model="coin.coin_name">
                                            </div>
                                            <div class="mb-3 col-xl-12">
                                                <label class="me-sm-2">Buy Rate</label>
                                                <input type="text" class="form-control"
                                                   v-model="coin.buy_rate">
                                            </div>
                                            <div class="mb-3 col-xl-12">
                                                <label class="me-sm-2">Sell Rate</label>
                                                <input type="text" class="form-control"
                                                   v-model="coin.sell_rate">
                                            </div>
                                            <div class="mb-3 col-xl-12">
                                                <label class="me-sm-2">Coin Shortcode</label>
                                                <input type="text" class="form-control" v-model="coin.coin_short_code">
                                            </div>
                                            <div class="mb-3 col-xl-12">
                                                <label class="me-sm-2">Minimum Limit</label>
                                                <input type="text" class="form-control" v-model="coin.minimum_limit">
                                            </div>
                                            <div class="mb-3 col-xl-12">
                                                <label class="me-sm-2">Active</label>
                                                <input type="checkbox" class="form-check-input" v-model="coin.coin_status">
                                            </div>
                                            <div class="col-12">
                                                <button class="btn btn-success waves-effect" type="submit">Save</button>
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
import Coin from './types/Coin'
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
        const coin = ref({
            coin_name:'' as string,
            coin_description: '' as string,
            buy_rate: 0 as number,
            sell_rate: 0 as number,
            coin_status: false as boolean,
            minimum_limit: 0 as number,
            coin_short_code: '' as string
        })
        const fillDetails = () => {
            const allCoin = ref<any>(store.state.all_coin)
            const selectedCoin = allCoin.value.filter((coin:any) => coin.unique_id == id)
            coin.value.coin_description = selectedCoin[0].coin_description
            coin.value.coin_name = selectedCoin[0].coin_name
            coin.value.buy_rate = selectedCoin[0].buy_rate
            coin.value.sell_rate = selectedCoin[0].sell_rate
            coin.value.coin_status = selectedCoin[0].coin_status
            coin.value.minimum_limit = selectedCoin[0].minimum_limit
            coin.value.coin_short_code = selectedCoin[0].coin_short_code
        }
        const updateCoin = async () => {
            const formData = {
                coin_name: coin.value.coin_name,
                coin_description: coin.value.coin_description,
                buy_rate: coin.value.buy_rate,
                sell_rate: coin.value.sell_rate,
                coin_status: coin.value.coin_status,
                minimum_limit: coin.value.minimum_limit,
                short_code: coin.value.coin_short_code
            }
            try {
                await Api.axios_instance.put(Api.baseUrl+('api/v1/update-coin/'+id), formData)
                .then(res => {
                    router.push({path:'/rates'})
                   alert("Rate Has Been Updated")
                })
            }catch(e){
               alert("An error occured, pleae contact admin")
            }
        }

        onMounted(() => {
            fillDetails()
        })
        return {coin, updateCoin}
    },
})
</script>