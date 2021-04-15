import React from "react";
import "./rate.css";
class Rate extends React.Component<any, any>{
    constructor(param: any) {
        super(param);
        this.state={
            usd:{
                base: "" as string,
                target: "" as string,
                price: null as number|null,
                volume: null as number|null,
                change: null as number|null
            }, rub:{
                base: "" as string,
                target: "" as string,
                price: null as number|null,
                volume: null as number|null,
                change: null as number|null,
            },
        };
        this.getData = this.getData.bind(this);
        this.getData();
    }
    private async getData(){
        const responseUSD = await fetch('https://api.cryptonator.com/api/ticker/btc-usd')
        let usd: valuteData = await responseUSD.json()
        const responseRub = await fetch('https://api.cryptonator.com/api/ticker/btc-rub')
        let rub: valuteData = await responseRub.json()
        if(rub.success && usd.success){
            this.setState({
                rub: rub.ticker,
                usd: usd.ticker
            })
            // @ts-ignore
            localStorage.setItem('RUB',rub.ticker.price.toString())
            localStorage.setItem('USD',usd.ticker.price.toString())

        }
    }
    render(){
        return(
            <div className="w-100 d-flex justify-content-center">
                <div className="d-block">
                <p className={"rate"}>USD:<span className="value">{Math.round(this.state.usd.price)}$</span></p>
                <p className={"rate"}>RUB:<span className="value">{ Math.round(this.state.rub.price)}₽</span></p>
                </div>
            </div>

        )
    }
}

interface valuteData {
    ticker: {
        base: string,
        target: string,
        price: number,
        volume: number,
        change: number
    },
    timestamp: number,
    success: boolean,
    error: string
}
export default Rate;