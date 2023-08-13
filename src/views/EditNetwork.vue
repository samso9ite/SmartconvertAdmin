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
                                        <h4 class="card-title">Edit {{ networkName }} Network</h4>
                                    </div>
                                    <div class="card-body">
                                          <form @submit.prevent="editNetwork">
                                            <div class="row">
                                                <div class="mb-3 col-xl-6">
                                                    <label class="me-sm-2">Coin</label>
                                                    <input type="text" class="form-control" :value="coin" disabled>
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
import { defineComponent, onMounted, ref } from 'vue';
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue'
import Api from './Api'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
    name: "EditNetwork",
    components: {Footer, NavBar},
    setup() {
        const store = useStore()
        const route = useRoute()
        const id = route.params.id
        const networkName = route.params.network
        const coin = route.params.coin

        const network = ref({
            coin: 0 as number,
            network_name: '' as string,
            first_address: '' as string,
            second_address: '' as string,
            third_address: '' as string,
        })
        const allCoin = ref<any>(store.state.all_coin)

        const editNetwork = () => {
            const formData = {
                network_name: network.value.network_name,
                first_address: network.value.first_address,
                second_address: network.value.second_address,
                third_address: network.value.third_address
            }
            Api.axios_instance.patch(Api.baseUrl+('api/v1/update-network/'+id), formData)
            .then(res => {
                alert("Network Has Been Updated")
            })
        }

        const getNetwork = () => {
            Api.axios_instance.get(Api.baseUrl+'api/v1/retrieve-network/'+id)
            .then(res => {
                network.value.first_address = res.data.first_address
                network.value.second_address = res.data.second_address
                network.value.third_address = res.data.third_address
                network.value.network_name = res.data.network_name
            })
        }

        onMounted(() => {
            getNetwork()
        })
        return{network, editNetwork, allCoin, networkName, coin}
    },
})
</script>