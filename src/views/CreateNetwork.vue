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
                                        <h4 class="card-title">Create Network</h4>
                                    </div>
                                    <div class="card-body">
                                          <form @submit.prevent="createNetwork">
                                            <div class="row">
                                                <div class="mb-3 col-xl-6">
                                                    <label class="me-sm-2">Coin Name</label>
                                                    <select class="form-control" v-model="network.coin"> 
                                                        <option :value="''">Click to select network</option>
                                                        <option :value="coin.id" v-for="coin in allCoin" :key="coin"> {{coin.coin_name}} </option>
                                                    </select>
                                                </div>
                                                <div class="mb-3 col-xl-6">
                                                    <label class="me-sm-2">Network Name</label>
                                                    <input type="text" class="form-control" v-model="network.network_name">
                                                </div>
                                                <div class="mb-3 col-xl-6">
                                                    <label class="me-sm-2">First Address</label>
                                                    <input type="text" class="form-control" v-model="network.first_address">
                                                </div>
                                                <div class="mb-3 col-xl-6">
                                                    <label class="me-sm-2">Second Address</label>
                                                    <input type="text" class="form-control" v-model="network.second_address">
                                                </div>
                                                <div class="mb-3 col-xl-6">
                                                    <label class="me-sm-2">Third Address</label>
                                                    <input type="text" class="form-control" v-model="network.third_address">
                                                </div>
                                                <div class="col-12">
                                                    <button class="btn btn-success waves-effect" type="submit">Save</button>
                                                </div>
                                            </div>
                                          </form>
                                        </div>
                                    </div>
                                </div>
                            <div>
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
import { defineComponent, ref } from 'vue';
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue'
import Api from './Api'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
    name: "createNetwork",
    components: {Footer, NavBar},
    setup() {
        const store = useStore()
        const route = useRoute()
        const router = useRouter()

        const network = ref({
            coin: 0 as number,
            network_name: '' as string,
            first_address: '' as string,
            second_address: '' as string,
            third_address: '' as string,
        })
        const allCoin = ref<any>(store.state.all_coin)

        const createNetwork = () => {
            const formData = {
                coin: network.value.coin,
                network_name: network.value.network_name,
                first_address: network.value.first_address,
                second_address: network.value.second_address,
                third_address: network.value.third_address
            }
            Api.axios_instance.post(Api.baseUrl+('api/v1/create-network'), formData)
            .then(res => {
                alert("Network Has Been Created")
                network.value.network_name = ''
                network.value.first_address = ''
                network.value.second_address = ''
                network.value.third_address = ''
            })
        }
        return{network, createNetwork, allCoin}
    },
})
</script>