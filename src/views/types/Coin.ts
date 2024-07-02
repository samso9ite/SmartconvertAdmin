interface Coin {
    coin_name:string,
    coin_short_code: string,
    coin_description: string,
    coin_status:boolean,
    sell_rate:number,
    buy_rate:number,
    minimum_limit:number,
    maximum_limit:number,
    unique_id:string,
    image: any
    confirmation_fee:number
}

export default Coin