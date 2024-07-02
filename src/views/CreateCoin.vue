<template>
    <div>
        <NavBar />
        <div class="content-body">
            <div class="container-fluid">
                <div class="row">
                    
                    <div class="col-xl-12 col-md-12">
                        <div class="row">
                            
                            <div class="col-xl-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h4 class="card-title">Coin Rate</h4>
                                    </div>
                                    <div class="card-body">
                                          <form @submit.prevent="createCoin" enctype="multipart/form-data">
                                            <div class="row">
                                                <div class="mb-3 col-xl-4">
                                                    <label class="me-sm-2">Coin Name</label>
                                                    <input type="text" class="form-control" v-model="coin.coin_name">
                                                </div>
                                                <div class="mb-3 col-xl-4">
                                                    <label class="me-sm-2">Coin Shortcode</label>
                                                    <input type="text" class="form-control" v-model="coin.coin_short_code">
                                                </div>
                                                <div class="mb-3 col-xl-4">
                                                    <label class="me-sm-2">Coin Description</label>
                                                    <input type="text" class="form-control" v-model="coin.coin_description">
                                                </div>
                                                <div class="mb-3 col-xl-4">
                                                    <label class="me-sm-2">Buy Rate</label>
                                                    <input type="text" class="form-control"
                                                       v-model="coin.buy_rate">
                                                </div>
                                                <div class="mb-3 col-xl-4">
                                                    <label class="me-sm-2">Sell Rate</label>
                                                    <input type="text" class="form-control"
                                                       v-model="coin.sell_rate">
                                                </div>

                                                <div class="mb-3 col-xl-4">
                                                    <label class="me-sm-2">Confirmation Fee</label>
                                                    <input type="text" class="form-control"
                                                       v-model="coin.confirmation_fee">
                                                </div>
                                              
                                                <div class="mb-3 col-xl-4">
                                                    <label class="me-sm-2">Minimum Buy Limit</label>
                                                    <input type="text" class="form-control" v-model="coin.minimum_buy_limit" required>
                                                </div>
                                                <div class="mb-3 col-xl-4">
                                                    <label class="me-sm-2">Minimum Sell Limit</label>
                                                    <input type="text" class="form-control" v-model="coin.minimum_sell_limit" required>
                                                </div>
                                                <div class="mb-3 col-xl-4">
                                                    <label class="me-sm-2">Maximum Buy Limit</label>
                                                    <input type="text" class="form-control" v-model="coin.maximum_buy_limit" required>
                                                </div>
                                                <div class="mb-3 col-xl-4">
                                                    <label class="me-sm-2">Maximum Sell Limit</label>
                                                    <input type="text" class="form-control" v-model="coin.maximum_sell_limit" required>
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
                                                    <label class="me-sm-2">Image</label>
                                                    <input type="file" class="form-control" ref="coinImgInput" @change="uploadImg">
                                                </div>
                                              

                                                <div class="card-header mb-4">
                                                    <h4 class="card-title">Networks</h4>
                                                </div>                                   
                                                <div class="mb-3 col-xl-4">
                                                    <label class="me-sm-2">Has Different Networks</label>
                                                    <input type="checkbox" class="form-check-input" v-model="coin.has_networks">
                                                </div>

                                                <span class="row" v-if="coin.has_networks  == false">
                                                <div class="mb-3 col-xl-4">
                                                    <label class="me-sm-2">First Address</label>
                                                    <input type="text" class="form-control" v-model="coin.first_address" >
                                                </div>
                                                <div class="mb-3 col-xl-4">
                                                    <label class="me-sm-2">Second Address</label>
                                                    <input type="text" class="form-control" v-model="coin.second_address" >
                                                </div>
                                                <div class="mb-3 col-xl-4">
                                                    <label class="me-sm-2">Third Address</label>
                                                    <input type="text" class="form-control" v-model="coin.third_address" >
                                                </div>
                                                <div class="mb-3 col-xl-4">
                                                    <label class="me-sm-2">Fourth Address</label>
                                                    <input type="text" class="form-control" v-model="coin.fourth_address">
                                                </div>
                                                <div class="mb-3 col-xl-4">
                                                    <label class="me-sm-2">Fifth Address</label>
                                                    <input type="text" class="form-control" v-model="coin.fifth_address">
                                                </div>
                                               
                                                </span>
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
        name: "CreateCoin",
        components: {Footer, NavBar},
        setup() {
            const store = useStore()
            const route = useRoute()
            const router = useRouter()
            const id = route.params.reference
            const coin = ref({
                coin_name:'' as string,
                coin_description: '' as string,
                buy_rate: 0 as any,
                sell_rate: 0 as any,
                coin_status: false as any,
                minimum_buy_limit: 0 as any,
                minimum_sell_limit: 0 as any,
                maximum_buy_limit: 0 as any,
                maximum_sell_limit: 0 as any,
                coin_short_code: '' as string,
                coin_sell_status: false as any,
                coin_buy_status: false as any,
                first_address: '' as string,
                second_address: '' as string,
                third_address: '' as string,
                fourth_address: '' as string,
                fifth_address: '' as string,
                has_networks: false as any,
                confirmation_fee: '' as string
            })
            const coinImgInput = ref<any>(null);
            const uploadImg = () => {
                if(coinImgInput.value){
                    coinImgInput.value = coinImgInput.value.files[0];
                }
            };
            const createCoin = async () => {
                const formData = new FormData()
                    formData.append("coin_name", coin.value.coin_name)
                    formData.append("coin_description", coin.value.coin_description)
                    formData.append("buy_rate", coin.value.buy_rate)
                    formData.append("sell_rate", coin.value.sell_rate)
                    formData.append("coin_status", coin.value.coin_status)
                    formData.append("minimum_buy_limit", coin.value.minimum_buy_limit)
                    formData.append("maximum_buy_limit", coin.value.maximum_buy_limit)
                    formData.append("minimum_sell_limit", coin.value.minimum_sell_limit)
                    formData.append("maximum_sell_limit", coin.value.maximum_sell_limit)
                    formData.append("short_code", coin.value.coin_short_code)
                    formData.append("buy_active_status", coin.value.coin_buy_status)
                    formData.append("sell_active_status", coin.value.coin_sell_status)
                    formData.append("first_address", coin.value.first_address)
                    formData.append("second_address", coin.value.second_address)
                    formData.append("third_address", coin.value.third_address)
                    formData.append("fourth_addres", coin.value.fourth_address)
                    formData.append("fifth_address", coin.value.fifth_address)
                    formData.append("has_networks", coin.value.has_networks)
                    formData.append("confirmation_fee", coin.value.confirmation_fee)
                    if(coinImgInput.value.type == 'image/jpeg'){
                        formData.append("image", coinImgInput.value )
                    }
                    
                try {
                    await Api.axios_instance.post(Api.baseUrl+('api/v1/create-coin'), formData)
                    .then(res => {
                        router.push({path:'/rates'})
                        alert("Coin Has Been Created")
                    })
                }catch(e){
                    console.log(e);
                    alert("An error occured, please contact admin")
                }
            }

         
        return {coin, createCoin, uploadImg, coinImgInput}
    },
})
</script>