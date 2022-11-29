<template>
    <div class="transaction-table">
        <div class="table-responsive">
            <table class="table mb-0 table-responsive-sm">
                <tbody>
                    <tr>
                        <td><span class="sold-thumb"><i class="la la-arrow-down"></i></span></td>
                        <td>REFERENCE</td>
                        <td>STATUS</td>
                        <td>TRANSACTION TYPE</td>
                        <td>COIN</td>
                        <td>COIN AMOUNT</td>
                        <td>NAIRA AMOUNT</td>
                        <td>DATE</td>
                        <td>PAYMENT</td>
                        <td>ACTION</td>
                    </tr>
                    <tr v-for = "transaction in filteredTrades" :key="transaction.id">
                        <td><span class="sold-thumb"><i class="la la-arrow-down"></i></span>
                        </td>
                        <td>
                            <span class="badge badge-danger">{{transaction.transaction_reference}}</span>
                        </td>
                        <td class="text-warning"  v-if="transaction.transaction_status == '1'">PENDING</td>
                        <td class="text-danger"  v-else-if="transaction.transaction_status == '3'">RECEIVED</td>
                        <td class="text-success"  v-else-if="transaction.transaction_status == '2'">PAID</td>
                        <td class="text-danger"  v-else-if="transaction.transaction_status == '4'">FAILED</td>
                        <td class="text-warning"  v-else-if="transaction.transaction_status == '5'">ON-HOLD</td>
                        <td class="text-warning"  v-else-if="transaction.transaction_status == '6'">AWAITING CONFIRMATION</td>
                        <td>
                            <span class="badge badge-danger">{{transaction.trade_type}}</span>
                        </td>
                        <td>
                            <i class="cc BTC me-3" v-if="transaction.coin.coin_name == 'Bitcoin'"></i><img src="../../public/assets/images/perfect-money-logo.png" width="11%" v-if="transaction.coin.coin_name === 'Perfect Money'"/><i class="cc ETH" me-3 style="color:#5968ba" v-if="transaction.coin.coin_name == 'Ethereum'"></i><i class="cc LTC me-3"  v-if="transaction.coin.coin_name == 'Litecoin'"></i><i class="cc DOGE me-3"  v-if="transaction.coin.coin_name == 'DOGE'"></i><i class="cc USDT me-3" v-if="transaction.coin.coin_name == 'USDT' "></i><i class="cc XRP me-3" v-if="transaction.coin.coin_name == 'Ripple'"></i>{{transaction.coin.coin_name}}
                        </td>
                        <td>{{transaction.coin_amount}}</td>
                        <td>₦{{transaction.naira_amount}}</td>
                        <td> {{transaction.date}}</td>
                        <td v-if="transaction.trade_type === 'SELL'">
                            {{transaction.bank.account_number}} {{transaction.bank.account_name}}
                        </td>
                        <td v-else>
                            {{transaction.buy_payment_mode}}
                        </td>
                        <td>
                            <router-link :to="{name:'UpdateTrade', params:{reference:transaction.transaction_reference}}"><span><i class="la la-pen-alt"></i>Edit</span> </router-link>
                        </td>

                    </tr>
            
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import History from '../views/types/History'

export default defineComponent({
    props: {
        transactions:{
            required: true,
            type: Array as PropType<History[]>
        },
        filteredTrades: {
            required: true,
            type: Array as PropType<History[]>
        }
    },
    setup() {
        return {}
    },
})
</script>
