interface Transaction {
    id: number,
    amount_received: number,
    bank: {account_name:string, account_number?:string, bank_name:string},
    buy_payment_mode: string,
    coin: {'coin_name':string, 'coin_code':string, 'image':any},
    coin_address: string,
    coin_amount: string,
    comment: string,
    date: string,
    dollar_amount: number,
    naira_amount: number,
    paid_naira_amount: number,
    pm_account: string,
    trade_type: string,
    transaction_reference: string,
    hash_key: string,
    transaction_status: string,
    address_account_id: string,
    wallet_address_id: string
}

export default Transaction
