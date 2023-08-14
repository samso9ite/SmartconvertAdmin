<template>
<div>
    <NavBar />
        <div class="content-body">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xl-3 col-lg-3 col-xxl-3">
                        <div class="card balance-widget">
                            <div class="card-header border-0 py-0">
                                <h4 class="card-title">Welcome Back, Admin </h4>
                            </div>
                            <div class="card-body pt-0">
                                <div class="balance-widget">
                                    <div class="total-balance">
                                        <h3>₦ {{total_transacted}}</h3>
                                        <h6>Total Transacted Amount</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-3 col-lg-3 col-xxl-3">
                            <div class="widget-card">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="widget-stat">
                                        <div class="coin-title">
                                            <span><i class="cc BTC-alt"></i></span>
                                            <h5 class="d-inline-block ms-2 mb-3">Total  Active Users
                                            </h5>
                                        </div>
                                        <h4 style="margin-left: 40px;"> {{users.length}} <span class="badge badge-success ms-2"></span>
                                        </h4>
                                    </div>
                                    <!-- <div id="btcChart"></div> -->
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-xxl-3">
                        <!-- <div class="col-xl-12 col-lg-6 col-xxl-6"> -->
                            <div class="widget-card">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="widget-stat">
                                        <div class="coin-title">
                                            <span><i class="cc BTC-alt"></i></span>
                                            <h5 class="d-inline-block ms-2 mb-3">Pending Trades
                                            </h5>
                                        </div>
                                        <h4 style="margin-left: 40px;">  {{pendingTransactions}} <span class="badge badge-success ms-2"> </span> </h4>
                                       
                                    </div>
                                    <div id="btcChart"></div>
                                <!-- </div> -->
                            </div>
                            
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-xxl-3">
                        <!-- <div class="col-xl-12 col-lg-6 col-xxl-6"> -->
                            <div class="widget-card">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="widget-stat">
                                        <div class="coin-title">
                                            <span><i class="cc BTC-alt"></i></span>
                                            <h5 class="d-inline-block ms-2 mb-3">Paid Trades </h5>
                                        </div>
                                        <h4 style="margin-left: 40px;"> {{paidTransactions}} <span class="badge badge-success ms-2"></span>
                                        </h4>
                                    </div>
                                    <div id="btcChart"></div>
                                <!-- </div> -->
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-xxl-12">
                        <div class="card">
                            <div class="card-header border-0 py-0">
                                <h4 class="card-title">Recent Trades</h4>
                                
                            </div>
                            <div class="buy-sell-widget">
                                <br>
                                <ul class="nav nav-tabs">
                                   <li class="nav-item col-lg-3" @click="handleClick('2')"><a class="nav-link" data-toggle="tab"
                                        >Funded Trades</a>
                                    </li>
                                    <li class="nav-item col-lg-3" @click="handleClick('7')"><a class="nav-link" data-toggle="tab"
                                        >Paid Trades</a>
                                    </li>
                                    <li class="nav-item"  @click="handleClick('1')">
                                        <a class="nav-link " data-toggle="tab"
                                           >Pending Trades
                                        </a>
                                    </li>
                                    <li class="nav-item" @click="handleClick('3')"><a class="nav-link" data-toggle="tab"
                                       >Confirmed Trades</a>
                                    </li>
                                     <li class="nav-item col-lg-3" @click="handleClick('5')"><a class="nav-link" data-toggle="tab"
                                        >ON HOLD</a>
                                    </li>
                                    <li class="nav-item mt-3"  @click="handleClick('4')"><a class="nav-link" data-toggle="tab"
                                       >Failed Trades</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="card-body">
                                <perfect-scrollbar>
                                    <Transactions :transactions="transactions" :filteredTrades="filteredTrades"/>
                                </perfect-scrollbar>
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
import { defineComponent, ref, onMounted, computed } from 'vue'
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import Api from './Api.js'
import { useRoute } from 'vue-router'
import Transaction from './types/History'
import Transactions from '../components/Transactions.vue'
import { useStore } from 'vuex'

export default defineComponent({
    name: "Home",
    components: { Footer, NavBar, Transactions },
    setup() {
        const transactions = ref<Transaction[]>([])
        let filteredTrades = ref<Transaction[]>([])
        const route = useRoute()
        const store = useStore()
        const users = ref([])
        const total_transacted = ref<number>(0)
        const selected = ref<string>('')
        let mycelium_transaction_amount = ref<any>()
        let paid_naira_amount = ref<any>()

        /* Getting all transaction details from the server */
        const getTransactions = async () => {
            try{ 
                await  Api.axios_instance.get(Api.baseUrl+'api/v1/list-all-transactions')
                    .then(res => { 
                        let transacted_amount = 0
                        const all_transactions = transactions.value = res.data
                        store.commit('storeTransactions', {all_transactions:res.data})
                        all_transactions.forEach((transaction: { naira_amount: number, transaction_status:string }) => {
                            if (transaction.transaction_status  === '2' || transaction.transaction_status === '7'){
                                transacted_amount += transaction.naira_amount}
                        })
                        total_transacted.value = transacted_amount
                    })
            }catch(e){
                alert("There's an error, please contact admin")
            }
        }
        
        /* This updates the status of transactions based on the coinbase status */
        // const coinbaseTransactionStatusUpdate = async () =>{
        //     await getTransactions()
        //     const all_transactions:any = transactions.value
        //     let pending_transactions =  all_transactions.filter((transaction:any) => transaction.transaction_status == '1' && transaction.trade_type == 'SELL')
        //     let awaiting_confirmation = all_transactions.filter((transaction:any) => transaction.transaction_status == '6' && transaction.trade_type == 'SELL')
        //     let uncomplete_transactions = pending_transactions.concat(awaiting_confirmation)
            
        //     if (uncomplete_transactions){
                
        //         for (let i =0; i < uncomplete_transactions.length; i++){
        //                 let transactionCoinbase = uncomplete_transactions[i];
        //                 let transaction_reference:string = transactionCoinbase.transaction_reference
        //                 let coin_sell_rate = transactionCoinbase.coin.sell_rate
        //                 let transaction_status:any
        //                 let coinbase_transaction_status:any
        //                 let coinbase_transaction_amount:any
        //                 let coinbase_transaction_dollar_amount:any
        //                 let coinbase_transaction_currency:any
        //                 let coinbase_transaction_hash:any
        //                 await Api.axios_instance.get(Api.baseUrl+'api/v1/get-coinbase-transaction-detail/'+transactionCoinbase.wallet_address_id+'/'+transactionCoinbase.address_account_id)
        //                     .then(
        //                         response => {
        //                             if(response.data.data.length){
        //                                 coinbase_transaction_status = response.data.data[0].status
        //                                 coinbase_transaction_amount = response.data.data[0].amount.amount
        //                                 coinbase_transaction_currency = response.data.data[0].amount.currency
        //                                 coinbase_transaction_hash = response.data.data[0].network.hash
        //                                 coinbase_transaction_dollar_amount = response.data.data[0].native_amount.amount
        //                             }
        //                         }   
        //                     )
        //                     if (coinbase_transaction_status === 'completed'){
        //                         transaction_status =  "3"
        //                     } else if(coinbase_transaction_status === 'pending'){
        //                         transaction_status = "6"
        //                     }
                            
        //                     /* Recalculate Naira & Dollar Amount based on Coin Amount Received */
        //                         let recalculated_naira_amount = coin_sell_rate * coinbase_transaction_dollar_amount
        //                         let formData= {
        //                             coin_amount: coinbase_transaction_amount,
        //                             hash_key: coinbase_transaction_hash,
        //                             transaction_status: transaction_status,
        //                             paid_dollar_amount: coinbase_transaction_dollar_amount,
        //                             paid_naira_amount: recalculated_naira_amount,
                                    
        //                         }
        //                         await Api.axios_instance.patch(Api.baseUrl+'api/v1/approve-dissapprove-trade/'+transaction_reference, formData)
        //             }
        //     }
        // }
    /* End of Coinbase Transaction */

    / * This section updates the status of transaction based on Mycelium Transaction status */
        const myceliumStatusUpdate = async () =>  {
            await getTransactions()
            let btc_coin_value:any = null
            await Api.axios_instance.get("https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD&api_key=f72b59432fb04a56c30fee2cc24adfdca9cda19c8a50b49c7bddba4cc0a469b6")
            .then(res =>{
                btc_coin_value = res.data.BTC.USD
                
            })
            const all_transactions:any = transactions.value
            let pending_transactions =  all_transactions.filter((transaction:any) => transaction.transaction_status == '1' && transaction.trade_type == 'SELL' && transaction.coin.coin_name == 'Bitcoin')
            let awaiting_confirmation = all_transactions.filter((transaction:any) => transaction.transaction_status == '6' && transaction.trade_type == 'SELL' && transaction.coin.coin_name == 'Bitcoin')
            let uncomplete_transactions = pending_transactions.concat(awaiting_confirmation)
            
            // if (uncomplete_transactions.length){
            //     for (let i =0; i < uncomplete_transactions.length; i++){
            //             let myceliumTransactions = uncomplete_transactions[i];
            //             let transaction_reference:string = myceliumTransactions.transaction_reference
            //             let coin_sell_rate = myceliumTransactions.coin.sell_rate
            //             let transaction_status:any
            //             let mycelium_transaction_status:any
            //             let mycelium_payment_id:any = myceliumTransactions.wallet_address_id
            //             let mycelium_transaction_dollar_amount:any
            //             let coinbase_transaction_currency:any
            //             let mycelium_transaction_hash:any  
            //             console.log(mycelium_payment_id);
                        
                       
            //             / * Get transaction status using mycelium API * /
            //             Api.axios_instance.get('https://gateway.gear.mycelium.com/gateways/b31f6babde01f965c84a3e82e11d4b1c04d06536397cdef303f449565e0caa9b/orders/'+mycelium_payment_id)
            //             .then(response => {
            //                         mycelium_transaction_status = response.data.status
                                    
            //                         mycelium_transaction_amount.value = parseFloat(response.data.amount_paid_in_btc)
            //                     }
            //                 )
            //                 if (mycelium_transaction_status === 2){
            //                     transaction_status =  "3"
            //                     Api.axios_instance.get(Api.baseUrl+'api/v1/send_mail/'+transaction_reference)
            //                 } else if(mycelium_transaction_status === 1){
            //                     transaction_status = "6"
            //                     Api.axios_instance.get(Api.baseUrl+'api/v1/send_mail/'+transaction_reference)
            //                 }
                            
            //                 /* Recalculate Naira & Dollar Amount based on Coin Amount Received */
            //                     let paid_dollar_amount:any = mycelium_transaction_amount.value * btc_coin_value
                            
            //                     let recalculated_naira_amount = coin_sell_rate * paid_dollar_amount
                               
            //                     let formData = {
            //                         amount_received: mycelium_transaction_amount.value,
            //                         transaction_status: transaction_status,
            //                         paid_dollar_amount: paid_dollar_amount,
            //                         paid_naira_amount: recalculated_naira_amount,
            //                     }
            //                     await Api.axios_instance.patch(Api.baseUrl+'api/v1/approve-dissapprove-trade/'+transaction_reference, formData)
                        
            //             }
            //         }
                }

        /* This function gets all users from the database */
        const getAllUsers = async () => {
            try{
                await Api.axios_instance.get(Api.baseUrl+'api/v1/list-users')
                .then(res => {
                    users.value = res.data
                })
            } catch(e){
                console.log("There's an error");
            }
        }
        const handleClick = (status:string) => {
            selected.value = status
        }
        /* Filter transactions */
        const pendingTransactions = computed(() => {
            return transactions.value.filter((transaction:any) => transaction.transaction_status == '1').length
        })

        const paidTransactions = computed(() => {
            return transactions.value.filter((transaction:any) => transaction.transaction_status == '2' || transaction.transaction_status == '7').length
        })

        filteredTrades = computed(() => {
            return transactions.value.filter((transaction:any) => transaction.transaction_status.includes(selected.value)).reverse()
            
        })

        onMounted(() => {
            getTransactions()
            getAllUsers()
            // myceliumStatusUpdate()
            // setInterval(myceliumStatusUpdate, 10000)
        })

        return {getTransactions, transactions, getAllUsers, users, total_transacted, selected, filteredTrades,
                pendingTransactions, paidTransactions, handleClick}
    },
})
</script>

<style scoped>
    .ps {
  height: 800px;
}
</style>