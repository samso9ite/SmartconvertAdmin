<template>
    <div>
        <NavBar />
        <div class="content-body">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xl-12">
                        <div class="card">
    
                            <div class="card-header border-0">
                                <h4 class="card-title">Campaign</h4>
                            </div>

                         
                                <div class="row col-lg-6 mt-5">
                                    <div class="mb-3 col-xl-12">
                                        <label class="me-sm-2">Promo Name</label>
                                        <input type="text" class="form-control" placeholder="Christmas Give Away" v-model="bonusData.name">
                                    </div>
                                    <div class="mb-3 col-xl-12">
                                        <label class="me-sm-2">Promo Code</label>
                                        <input type="text" class="form-control"
                                            placeholder="SABINUS-01" v-model="bonusData.code">
                                    </div>
                                    <div class="mb-3 col-xl-12">
                                        <label class="me-sm-2">Amount</label>
                                        <input type="text" class="form-control" placeholder="1000" v-model="bonusData.amount">
                                    </div>
                                    <div class="mb-3 col-xl-12">
                                        <label class="me-sm-2">Status</label>
                                        <select v-model="bonusData.status">
                                            <option value="true">Active</option>
                                            <option value="false">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                        
                            <div class="col-12">
                               <button class="btn btn-success waves-effect" type="submit" @click="updateBonus">Update Campaign</button> 
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
    import {defineComponent, ref} from 'vue'
    import NavBar from '../components/NavBar.vue'
    import Footer from '../components/Footer.vue'
    import Api from './Api'
    import { useRoute, useRouter } from 'vue-router'
    import { onMounted } from 'vue'

    export default defineComponent({
        name: "Bonus",
        components: {Footer, NavBar},
        setup() {
            const route = useRoute

            const bonusData = ref({
                name: '' as string,
                amount: '' as string,
                code: '' as string,
                status: false as boolean
            })
            const all_bonus = ref<any>([])
            const getBonus = () => {
                Api.axios_instance.get(Api.baseUrl+'api/v1/list-campaign')
                .then(res => {
                    all_bonus.value = res.data[0]
                    bonusData.value.name = res.data[0].name
                    bonusData.value.code = res.data[0].code
                    bonusData.value.amount = res.data[0].amount
                    bonusData.value.status = res.data[0].status
                })
            }

            const updateBonus = () => {
                const formData = {
                    name: bonusData.value.name,
                    amount: bonusData.value.amount,
                    status: bonusData.value.status,
                    code: bonusData.value.code
                }
                Api.axios_instance.patch(Api.baseUrl+'api/v1/update-campaign/1', formData)
                .then(res => {
                    alert("Campaign Updated Successfully")
                    console.log(res.data);
                    getBonus()
                })
            }
            onMounted( () => {
                getBonus()
            })

            return {getBonus, all_bonus, updateBonus, bonusData}
        },
    })
</script>