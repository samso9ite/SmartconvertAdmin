<template>
<div>
    <NavBar />
    <div class="content-body">
        <div class="container-fluid">
            <div class="row">
              
                <div class="col-xl-10 col-md-12">
                    <div class="row">
                        
                        <div class="col-xl-12">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">Update Trade</h4>
                                </div>
                                <div class="card-body">
                                    <form @submit.prevent="updateTransaction">
                                        <div class="row">
                                             <div class="mb-3 col-xl-6">
                                                <label class="me-sm-2">Customer Name</label>
                                                <input type="text" class="form-control"
                                               :value=" tradeDetails.first_name  + ' ' +  tradeDetails.last_name" disabled>
                                            </div>
                                            <div class="mb-3 col-xl-6">
                                                <label class="me-sm-2">Customer ID</label>
                                                <input type="text" class="form-control" v-model="tradeDetails.member_id" disabled>
                                            </div>
                                            <div class="mb-3 col-xl-6">
                                                <label class="me-sm-2">Coin</label>
                                                <input type="text" class="form-control" v-model="tradeDetails.coin" disabled>
                                            </div>
                                            <div class="mb-3 col-xl-6">
                                                <label class="me-sm-2">Coin Address</label>
                                                <input type="text" class="form-control" v-model="tradeDetails.coin_address" />
                                            </div>
                                             <div class="mb-3 col-xl-6">
                                                <label class="me-sm-2"  v-if="tradeDetails.coin === 'Perfect Money'">PM Amount</label>
                                                <label class="me-sm-2" v-else>Coin Amount</label>
                                                <input type="text" class="form-control" v-model="tradeDetails.coin_amount" />
                                            </div>
                                            <div class="mb-3 col-xl-6" v-if="tradeDetails.trade_type == 'SELL'">
                                                <label class="me-sm-2"  v-if="tradeDetails.coin === 'Perfect Money'">PM Amount Received </label>
                                                <label class="me-sm-2" v-else>Coin Amount Received</label>
                                                <input type="text" class="form-control" v-model="tradeDetails.amount_received" />
                                            </div>
                                             <div class="mb-3 col-xl-6">
                                                <label class="me-sm-2">Naira Amount</label>
                                                <input type="text" class="form-control" v-model="tradeDetails.naira_amount" />
                                            </div>
                                            <div class="mb-3 col-xl-6" v-if="tradeDetails.trade_type == 'SELL'">
                                                <label class="me-sm-2">Naira Amount Received</label>
                                                <input type="text" class="form-control" v-model="tradeDetails.paid_naira_amount" />
                                            </div>
                                            
                                            <div class="mb-3 col-xl-6" v-if="tradeDetails.trade_type == 'SELL'">
                                                <label class="me-sm-2">Dollar Amount Received</label>
                                                <input type="text" class="form-control" v-model="tradeDetails.paid_dollar_amount" />
                                            </div>
                                            <div class="mb-3 col-xl-6">
                                                <label class="me-sm-2">Dollar Amount</label>
                                                <input type="text" class="form-control" v-model="tradeDetails.dollar_amount" />
                                            </div>
                                              <div class="mb-3 col-xl-6">
                                                <label class="me-sm-2">Transaction Status</label>
                                                <select class="form-control" v-model="tradeDetails.transaction_status"  > 
                                                    <option value="">Select Status</option>
                                                    <option value="1">PENDING</option>
                                                    <option value="2">PAID</option>
                                                    <option value="5">ON-HOLD</option>
                                                    <option value="4">FAILED</option>
                                                    <option value="3">RECEIVED</option>
                                                </select>
                                            </div>
                                            <div class="mb-3 col-xl-6">
                                                <label class="me-sm-2">Hash Key</label>
                                                <input type="text" class="form-control" v-model="tradeDetails.hash_key"/>
                                            </div>
                                            <div class="mb-3 col-xl-6" v-if="tradeDetails.trade_type == 'SELL'">
                                                <label class="me-sm-2">Bank Name</label>
                                                <input type="text" class="form-control" v-model="bankDetails.bank_name"/>
                                            </div>
                                            <div class="mb-3 col-xl-6" v-if="tradeDetails.trade_type == 'SELL'">
                                                <label class="me-sm-2">Account Number</label>
                                                <input type="text" class="form-control" v-model="bankDetails.account_number"/>
                                            </div>
                                            <div class="mb-3 col-xl-6" v-if="tradeDetails.trade_type == 'SELL'">
                                                <label class="me-sm-2">Account Name</label>
                                                <input type="text" class="form-control" v-model="bankDetails.bank_name"/>
                                            </div>
                                            <div class="mb-3 col-xl-12">
                                                <label class="me-sm-2">Comment</label>
                                                <textarea  class="form-control" v-model="tradeDetails.comment"/>
                                            </div>
                                            <div class="col-12">
                                                <button class="btn btn-success waves-effect">Save</button>
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
import { defineComponent,ref,onMounted } from 'vue'
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import { useRoute , useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Api from '../views/Api'

export default defineComponent({
    name: "TradeUpdate",
    components: {Footer, NavBar},
    setup() {
        const route = useRoute()
        const store = useStore()
        const router = useRouter()
        const tradeDetails = ref({
            coin: '' as string,
            coin_address: '' as string,
            first_name: '' as string,
            last_name: '' as string,
            coin_amount: 0 as number,
            naira_amount: 0 as number,
            dollar_amount: 0 as number,
            transaction_status:'' as string,
            hash_key: '' as string,
            comment: 'No Comment' as string,
            member_id: '' as string,
            trade_type: '' as string,
            amount_received: 0 as number,
            paid_dollar_amount: 0 as number,
            paid_naira_amount: 0 as number
        })

        const bankDetails = ref({
            bank_name: '' as string,
            account_number: '' as string,
            account_name: '' as string
        })
        
        const setTradeValues = () => {
            const reference = route.params.reference
            const transactions = ref<any>(store.state.all_transactions)
            const selected = transactions.value.filter((transaction:any) => transaction.transaction_reference == reference)
            
            tradeDetails.value.coin = selected[0].coin.coin_name
            tradeDetails.value.coin_address = selected[0].coin_address
            tradeDetails.value.first_name = selected[0].user.first_name
            tradeDetails.value.last_name = selected[0].user.last_name
            tradeDetails.value.coin_amount = selected[0].coin_amount
            tradeDetails.value.naira_amount = selected[0].naira_amount
            tradeDetails.value.dollar_amount = selected[0].dollar_amount
            tradeDetails.value.hash_key = selected[0].hash_key
            tradeDetails.value.comment = selected[0].comment
            tradeDetails.value.transaction_status = selected[0].transaction_status
            tradeDetails.value.member_id = selected[0].user.member_id
            tradeDetails.value.trade_type = selected[0].trade_type
            if (tradeDetails.value.trade_type == 'SELL'){
                bankDetails.value.bank_name = selected[0].bank.bank_name
                bankDetails.value.account_name = selected[0].bank.account_name
                bankDetails.value.account_number = selected[0].bank.account_number
                tradeDetails.value.amount_received = selected[0].amount_received
                tradeDetails.value.paid_dollar_amount = selected[0].paid_dollar_amount
                tradeDetails.value.paid_naira_amount = selected[0].paid_naira_amount
            }
        }

        /* Update Trade Details */
        const updateTransaction = async () => {
            const sellFormData = {
                coin_amount:tradeDetails.value.coin_amount,
                naira_amount:tradeDetails.value.naira_amount,
                dollar_amount: tradeDetails.value.dollar_amount,
                comment: tradeDetails.value.comment,
                transaction_status: tradeDetails.value.transaction_status,
                paid_dollar_amount: tradeDetails.value.paid_dollar_amount,
                paid_naira_amount: tradeDetails.value.paid_naira_amount,
                amount_received: tradeDetails.value.amount_received
            }
            const buyFormData = {
                coin_amount:tradeDetails.value.coin_amount,
                naira_amount:tradeDetails.value.naira_amount,
                dollar_amount: tradeDetails.value.dollar_amount,
                comment: tradeDetails.value.comment,
                transaction_status: tradeDetails.value.transaction_status,
            }
            console.log(sellFormData, buyFormData);
            
            try {
                if(tradeDetails.value.trade_type == 'SELL'){
                    await Api.axios_instance.patch(Api.baseUrl+'api/v1/approve-dissapprove-trade/'+route.params.reference, sellFormData)
                    .then(res => {
                        Api.axios_instance.get(Api.baseUrl+'api/v1/send_mail/'+route.params.reference)
                        router.push({path:'/'})
                        alert('Transaction Updated Successfully')
                    })
                } else {
                    await Api.axios_instance.patch(Api.baseUrl+'api/v1/approve-dissapprove-trade/'+route.params.reference, buyFormData)
                    .then(res => {
                        Api.axios_instance.get(Api.baseUrl+'api/v1/send_mail/'+route.params.reference)
                        router.push({path:'/'})
                        alert('Transaction Updated Successfully')
                    })
                }
              
            }catch(e){
                console.log(e);
                
                alert('An error occured please contact admin') 
            } 
        }

        onMounted(() => {
            setTradeValues()
        })

        return {setTradeValues, tradeDetails, updateTransaction, bankDetails}
      },
})
</script>