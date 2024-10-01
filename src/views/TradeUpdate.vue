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
                                        <h4 class="card-title">Update {{ tradeDetails.coin }} {{ tradeDetails.trade_type }} Trade  
                                            <span style="margin-left: 12em;" v-if="expiration_wallet">Time Left : 
                                                <span style="color:red" v-if="timeRemaining > 0">{{ formattedTime }}</span> 
                                                <span style="color:red" v-else-if="timeRemaining < 0">{{ "Expired" }}</span> 
                                            </span> 
                                            </h4><br>
                                        <h5> 
                                            <span  v-if="tradeDetails.trade_type == 'SELL' && tradeDetails.coin != 'Perfect Money'"> ({{ bankDetails.bank_name }} {{ bankDetails.account_number }}  {{ bankDetails.account_name }})</span>
                                            <span  v-if="tradeDetails.trade_type == 'BUY' && tradeDetails.campaign_bonus == true"> ({{ bonusBankDetails.bank_name }} {{ bonusBankDetails.account_number }}  {{ bonusBankDetails.account_name }})</span>
                                        </h5>
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
                                                    <label class="me-sm-2">Asset</label>
                                                    <input type="text" class="form-control" v-model="tradeDetails.coin" disabled>
                                                </div>
                                                <div class="mb-3 col-xl-6" v-if="tradeDetails.trade_type == 'SELL'">
                                                    <div class="mb-3 col-xl-6" v-if="tradeDetails.coin != 'Perfect Money'">
                                                        <label class="me-sm-2">Wallet Used</label>
                                                        <input type="text" class="form-control" v-model="tradeDetails.coin_address" disabled/>
                                                    </div>
                                                </div>
                                                <div class="mb-3 col-xl-6" v-if="tradeDetails.trade_type == 'BUY'">
                                                    <div class="mb-3 col-xl-6" v-if="tradeDetails.coin != 'Perfect Money'">
                                                        <label class="me-sm-2">Fund Wallet</label>
                                                        <input type="text" class="form-control" v-model="tradeDetails.coin_address" disabled/>
                                                    </div>
                                                </div>
                                                 <div class="mb-3 col-xl-6"  v-if="tradeDetails.coin === 'Perfect Money'">
                                                    <label class="me-sm-2" >PM Account</label>
                                                    <input type="text" class="form-control" v-model="tradeDetails.pm_account" :disabled="tradeDetails.editable"/>
                                                </div>
                                                <div class="mb-3 col-xl-6"  v-else>
                                                    <label class="me-sm-2" >Coin Amount</label>
                                                    <input type="text" class="form-control" v-model="tradeDetails.coin_amount" disabled/>
                                                </div>
                                                <div class="mb-3 col-xl-6" v-if="tradeDetails.trade_type == 'SELL'">
                                                    <label class="me-sm-2"  v-if="tradeDetails.coin === 'Perfect Money'">PM Amount Received </label>
                                                    <label class="me-sm-2" v-else>Coin Amount Received</label>
                                                    <input type="text" class="form-control" v-model="tradeDetails.amount_received" :disabled="tradeDetails.editable"/>
                                                </div>
                                                 <div class="mb-3 col-xl-6">
                                                    <label class="me-sm-2">Naira Amount</label>
                                                    <input type="text" class="form-control" v-model="tradeDetails.naira_amount" disabled/>
                                                </div>
                                                <div class="mb-3 col-xl-6" v-if="tradeDetails.trade_type == 'SELL'">
                                                    <label class="me-sm-2">Naira Amount Received</label>
                                                    <input type="text" class="form-control" v-model="tradeDetails.paid_naira_amount" :disabled="tradeDetails.editable"/>
                                                </div>
                                                
                                               
                                                <div class="mb-3 col-xl-6">
                                                    <label class="me-sm-2">Dollar Amount</label>
                                                    <input type="text" class="form-control" v-model="tradeDetails.dollar_amount" disabled />
                                                </div>
                                                <div class="mb-3 col-xl-6" v-if="tradeDetails.trade_type == 'SELL'">
                                                    <label class="me-sm-2">Dollar Amount Received</label>
                                                    <input type="text" class="form-control" v-model="tradeDetails.paid_dollar_amount" :disabled="tradeDetails.editable"/>
                                                </div>
                                                  <div class="mb-3 col-xl-6">
                                                    <label class="me-sm-2">Transaction Status</label>
                                                    <select class="form-control" v-model="tradeDetails.transaction_status" :disabled="tradeDetails.editable"> 
                                                        <option value="">Select Status</option>
                                                        <option value="1">PENDING</option>
                                                        <option value="2">FUNDED</option>
                                                        <option value="7">PAID</option>
                                                        <option value="5">ON-HOLD</option>
                                                        <option value="4">FAILED</option>
                                                        <option value="3">RECEIVED</option>
                                                    </select>
                                                </div>
                                                <div class="mb-3 col-xl-6" >
                                                    <label class="me-sm-2"  >Hash Key</label>
                                                    <input type="text" class="form-control" v-model="tradeDetails.hash_key" :disabled="tradeDetails.editable"/>
                                                </div>
                                                <div class="mb-3 col-xl-6">
                                                    <label class="me-sm-2">Hash Key Type</label>
                                                    <select class="form-control" v-model="tradeDetails.hash_key_type"  :disabled="tradeDetails.editable"> 
                                                        <option value="">Select Status</option>
                                                        <option value="1">Link</option>
                                                        <option value="2">Text</option>
                                                    </select>
                                                </div>
                                                <div class="mb-3 col-xl-6" >
                                                    <label class="me-sm-2">Campaign Bonus</label>
                                                    <input type="text" class="form-control" v-model="tradeDetails.campaign_bonus" disabled/>
                                                </div>
                                            
                                                <div class="mb-3 col-xl-12">
                                                    <label class="me-sm-2">Comment</label>
                                                    <textarea  class="form-control" v-model="tradeDetails.comment" :disabled="tradeDetails.editable"/>
                                                </div>
    
                                                <div v-if="tradeDetails.editable == false">
                                                    <button class="btn btn-success waves-effect">Save </button>
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
    import { defineComponent,ref,onMounted, onBeforeUnmount, computed } from 'vue'
    import NavBar from '../components/NavBar.vue'
    import Footer from '../components/Footer.vue'
    import { useRoute , useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    import Api from '../views/Api'
    import axios from 'axios'
    
    export default defineComponent({
        name: "TradeUpdate",
        components: {Footer, NavBar},
        setup() {
            const route = useRoute()
            const router = useRouter()
            const tradeDetails = ref({
                coin: '' as string,
                coin_address: '' as string,
                first_name: '' as string,
                last_name: '' as string,
                coin_amount: 0 as number,
                naira_amount: 0 as number,
                dollar_amount: 0 as number,
                transaction_status:0 as number,
                hash_key: '' as string,
                comment: 'No Comment' as string,
                member_id: '' as string,
                trade_type: '' as string,
                amount_received: 0 as number,
                paid_dollar_amount: 0 as number,
                paid_naira_amount: 0 as number,
                hash_key_type: '2' as string,
                editable: false as boolean,
                pm_account: '' as string,
                campaign_bonus: false as boolean,
                bonus_bank: {},
                updating: false as boolean
            })
            const reference = ref<any>("")
            const expiration_time = ref<any>('')
            const expiration_wallet = ref<boolean>(false)
            const transaction = ref<any>(null)
            let transaction_time = ref<any>()
            const bankDetails = ref({
                bank_name: '' as string,
                account_number: '' as string,
                account_name: '' as string
            })
            const bonusBankDetails = ref({
                bank_name: '' as string,
                account_number: '' as string,
                account_name: '' as string
            })
           let timeRemaining = ref<number>(0) // in seconds
            let intervalId = ref<any>(null)
            
            const setTradeValues = () => {
                tradeDetails.value.coin = transaction.value?.coin.coin_name
                tradeDetails.value.coin_address = transaction.value?.coin_address
                tradeDetails.value.first_name = transaction.value?.user.first_name
                tradeDetails.value.last_name = transaction.value?.user.last_name
                tradeDetails.value.coin_amount = transaction.value?.coin_amount
                tradeDetails.value.naira_amount = transaction.value?.naira_amount
                tradeDetails.value.dollar_amount = transaction.value?.dollar_amount
                tradeDetails.value.hash_key = transaction.value?.hash_key
                tradeDetails.value.hash_key_type = transaction.value?.hash_key_type
                tradeDetails.value.comment = transaction.value?.comment
                tradeDetails.value.transaction_status = transaction.value?.transaction_status
                tradeDetails.value.member_id = transaction.value?.user.member_id
                tradeDetails.value.trade_type = transaction.value?.trade_type
                tradeDetails.value.pm_account = transaction.value?.pm_account
                tradeDetails.value.editable = transaction.value?.editable
                tradeDetails.value.campaign_bonus = transaction.value?.campaign_bonus
                tradeDetails.value.updating = transaction.value?.updating
                bonusBankDetails.value.bank_name = transaction.value?.bonus_bank.bank_name
                bonusBankDetails.value.account_number = transaction.value?.bonus_bank.account_number
                bonusBankDetails.value.account_name = transaction.value?.bonus_bank.account_name
                
                expiration_time.value = transaction.value?.expiration_time
                expiration_wallet.value = transaction.value?.expiration_wallet
                transaction_time.value = transaction.value?.date
                if (tradeDetails.value.trade_type == 'SELL' && tradeDetails.value.coin != "Perfect Money") {
                    bankDetails.value.bank_name = transaction.value?.bank.bank_name
                    bankDetails.value.account_name = transaction.value?.bank.account_name
                    bankDetails.value.account_number = transaction.value?.bank.account_number
                    tradeDetails.value.amount_received = transaction.value?.amount_received
                    tradeDetails.value.paid_dollar_amount = transaction.value?.paid_dollar_amount
                    tradeDetails.value.paid_naira_amount = transaction.value?.paid_naira_amount
                }
            }
    
            const getTransactionDetails = async () => {
                await Api.axios_instance.get(Api.baseUrl+"api/v1/trade-detail/"+route.params.reference)
                .then(res => {
                    transaction.value = res.data
                }).finally(() => {
                    setTradeValues()
                    updateBtcTrade()
                    if (expiration_time.value !== undefined) {
                    timeRemaining.value = parseFloat(expiration_time.value.toFixed(1));
                        startCountdown()
                    }
                })
            }
    
            /* Update Trade Details */
            const updateTransaction = async () => {
                if(tradeDetails.value.transaction_status == 2 || tradeDetails.value.transaction_status == 4 
                    || tradeDetails.value.transaction_status == 7){
                    tradeDetails.value.editable = true 
                }else{
                    tradeDetails.value.editable = false
                }
                const sellFormData = {
                    coin_amount:tradeDetails.value.coin_amount,
                    naira_amount:tradeDetails.value.naira_amount,
                    dollar_amount: tradeDetails.value.dollar_amount,
                    comment: tradeDetails.value.comment,
                    transaction_status: tradeDetails.value.transaction_status,
                    paid_dollar_amount: tradeDetails.value.paid_dollar_amount,
                    paid_naira_amount: tradeDetails.value.paid_naira_amount,
                    amount_received: tradeDetails.value.amount_received,
                    hash_key: tradeDetails.value.hash_key,
                    hash_key_type: tradeDetails.value.hash_key_type,
                    editable: tradeDetails.value.editable
                }
                const buyFormData = {
                    coin_amount:tradeDetails.value.coin_amount,
                    naira_amount:tradeDetails.value.naira_amount,
                    dollar_amount: tradeDetails.value.dollar_amount,
                    comment: tradeDetails.value.comment,
                    transaction_status: tradeDetails.value.transaction_status,
                    hash_key: tradeDetails.value.hash_key,
                    hash_key_type: tradeDetails.value.hash_key_type,
                    editable: tradeDetails.value.editable
                }
                  
                try {
                    if(tradeDetails.value.trade_type == 'SELL'){
                        await Api.axios_instance.patch(Api.baseUrl+'api/v1/approve-dissapprove-trade/'+route.params.reference, sellFormData)
                        .then(res => {
                            Api.axios_instance.get(Api.baseUrl+'api/v1/send_mail/'+route.params.reference)
                            router.push({path:'/'})
                            alert('Transaction Updated Successfully')
                        })
                        .catch(error => {
                            console.log(error);
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
                    alert('An error occured please contact admin') 
                } 
            }
    
            const disableEdit = async (val:boolean) => {
                setTimeout(() => {
                    Api.axios_instance.patch(Api.baseUrl+'api/v1/approve-dissapprove-trade/'+reference.value, {updating:val})
                }, 3000)
            }
    
            const updateBtcTrade = () => {
                axios.get("https://blockchain.info/address/"+tradeDetails.value.coin_address+"?format=json")
                .then(res => {
                    if(res?.data){
                        tradeDetails.value.hash_key = res.data.txs[0].hash
                        let btc_convert_rate = tradeDetails.value.dollar_amount / tradeDetails.value.coin_amount
                        let naira_rate = tradeDetails.value.naira_amount / tradeDetails.value.dollar_amount
                        let satoshi_btc = res.data.total_received / 100000000
                        let satoshi_usd = satoshi_btc * btc_convert_rate
                        let converted_naira_amount = satoshi_usd * naira_rate
                        tradeDetails.value.amount_received = satoshi_btc
                        tradeDetails.value.paid_dollar_amount = satoshi_usd
                        tradeDetails.value.paid_naira_amount = converted_naira_amount
                    
                        let data = {
                            paid_dollar_amount: satoshi_usd,
                            paid_naira_amount: converted_naira_amount,
                            amount_received: satoshi_btc,
                            hash_key: tradeDetails.value.hash_key
                        }
                        Api.axios_instance.patch(Api.baseUrl+'api/v1/approve-dissapprove-trade/'+route.params.reference, data)
                    }
                   
                })
            } 
            
    
    let formattedTime:any = computed(() => {
        const minutes = Math.floor(timeRemaining.value / 60);
        const seconds = Math.floor(timeRemaining.value % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    });
    
    const startCountdown = () => {
        if (!expiration_wallet.value && tradeDetails.value.transaction_status !== 1) return;
        const transactionTime = new Date(transaction_time.value).getTime() / 1000; // Convert ISO string to Unix timestamp in seconds
        const countdownDuration = expiration_time.value * 60; // Convert expiration_time to seconds
        
        timeRemaining.value = countdownDuration - (Date.now() / 1000 - transactionTime); // Calculate remaining time
        // Clear any existing intervals
        if (intervalId) {
            clearInterval(intervalId.value);
        }
    
        // Start a new interval
        intervalId.value = setInterval(() => {
                if(tradeDetails.value.transaction_status == 1){
                if (timeRemaining.value > 0) {
                    timeRemaining.value = parseFloat((timeRemaining.value - 0.1).toFixed(1)); // decrement by 0.1 seconds for more granular control
                } else {
                    // Perform actions when countdown reaches zero
                    formattedTime = "Expired"
                    Api.axios_instance.get(Api.baseUrl + "api/v1/send_expiry_mail/" + reference.value)
                        .then((res) => {
                            alert("Customer has been requested to send a new wallet address via mail ")
                        })
                    clearInterval(intervalId.value);
                }
            }
        }, 100); // Adjust interval time for smoother countdown (100 ms)
    };
    
            onBeforeUnmount(() => {disableEdit(false)})
            onMounted(() => {
                getTransactionDetails()
                reference.value = route.params.reference
                disableEdit(true)
               
            })
    
            return {setTradeValues, tradeDetails, updateTransaction, bankDetails,
                bonusBankDetails, expiration_time, expiration_wallet, startCountdown,
                formattedTime, timeRemaining, getTransactionDetails, transaction }
          },
    })
    </script>