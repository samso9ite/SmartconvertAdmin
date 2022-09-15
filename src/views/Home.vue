<template>
<div>
    <NavBar />
        <div class="content-body">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xl-3 col-lg-4 col-xxl-4">
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

                    <div class="col-xl-3 col-lg-3 col-xxl-4">
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
                    <div class="col-xl-3 col-lg-3 col-xxl-4">
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
                    <div class="col-xl-3 col-lg-3 col-xxl-4">
                        <!-- <div class="col-xl-12 col-lg-6 col-xxl-6"> -->
                            <div class="widget-card">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="widget-stat">
                                        <div class="coin-title">
                                            <span><i class="cc BTC-alt"></i></span>
                                            <h5 class="d-inline-block ms-2 mb-3">Paid Trades
                                            </h5>
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
                                    <li class="nav-item" @click="handleClick('4')"><a class="nav-link" data-toggle="tab"
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

        /* Getting all transaction details from the server */
        const getTransactions = async () => {
            try{
                await  Api.axios_instance.get(Api.baseUrl+'api/v1/list-all-transactions')
                    .then(res => { 
                        let transacted_amount = 0
                        const all_transactions = transactions.value = res.data
                        store.commit('storeTransactions', {all_transactions:res.data})
                        all_transactions.forEach((transaction: { naira_amount: number, transaction_status:string }) => {
                            if (transaction.transaction_status  == '2'){
                                transacted_amount += transaction.naira_amount}
                        })
                        total_transacted.value = transacted_amount
                    })
            }catch(e){
                alert("There's an error, plese contact admin")
            }
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
            return transactions.value.filter((transaction:any) => transaction.transaction_status == '2').length
        })

        filteredTrades = computed(() => {
            return transactions.value.filter((transaction:any) => transaction.transaction_status.includes(selected.value))
        })

        onMounted(() => {
            getTransactions()
            getAllUsers()
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