import React from "react";
import "./rate.css";
let state:any;
export class Rate extends React.Component<any, any>{
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
            state = {
                rub: rub.ticker,
                usd: usd.ticker
            };
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
export class Calculator extends React.Component {
    private CalcContainer: React.RefObject<HTMLDivElement>;
    private CalcOpenBtn: React.RefObject<HTMLButtonElement>;
    private inBTCRadio: React.RefObject<HTMLInputElement>;
    private outBTCRadio: React.RefObject<HTMLInputElement>;
    private frUSDRadio: React.RefObject<HTMLInputElement>;
    private frRUBRadio: React.RefObject<HTMLInputElement>;
    private radioExt: React.RefObject<HTMLDivElement>;
    private toCalculate: React.RefObject<HTMLButtonElement>;
    private resultRUB: React.RefObject<HTMLParagraphElement>;
    private calculatorInput: React.RefObject<HTMLInputElement>;
    private resultUSD: React.RefObject<HTMLParagraphElement>;
    readonly state:stateType;
    public constructor(p: any) {
        super(p);

        this.state= {
            result:{
                RUB:"" as string,
                USD:"" as string
            },
        };
        this.resultRUB = React.createRef();
        this.resultUSD = React.createRef();
        this.toCalculate = React.createRef();
        this.CalcContainer = React.createRef();
        this.CalcOpenBtn = React.createRef();
        this.inBTCRadio = React.createRef();
        this.outBTCRadio = React.createRef();
        this.frUSDRadio = React.createRef();
        this.frRUBRadio = React.createRef();
        this.radioExt = React.createRef();
        this.calculatorInput = React.createRef();
        this.calculation = this.calculation.bind(this)
        this.CalcEvent = this.CalcEvent.bind(this);
        this.RadioBoxChange = this.RadioBoxChange.bind(this);

    }
    calculation(event:any){
        event.preventDefault();
        let inputValue:number = parseFloat(this.calculatorInput.current?.value as string)
        if (this.outBTCRadio.current?.checked){
            if (isNaN(inputValue)) inputValue=1;
            // @ts-ignore
            let resultFromBTC:frBTCOut;

            resultFromBTC = {
                // @ts-ignore
                RUB:Math.round(parseFloat(state.rub.price) * inputValue),
                // @ts-ignore
                USD:Math.round(parseFloat(state.usd.price) * inputValue),
            }
            this.setState({result:{USD:resultFromBTC.USD.toString()+' $',RUB:resultFromBTC.RUB.toString()+' ₽'}})
        }if (this.inBTCRadio.current?.checked){
            if (this.frUSDRadio.current?.checked){
                // @ts-ignore
                let result:number = (inputValue/state.usd.price).toFixed(10);
                this.setState({result:{RUB:"",USD:result.toString()+'₿'}})
            }else{
                // @ts-ignore
                let result:number = (inputValue/state.rub.price).toFixed(10);
                this.setState({result:{RUB:result.toString()+'₿',USD:""}})
            }
        }
    }
    CalcEvent(event: any) {
        event.preventDefault();
        switch (event.target.id) {
            case this.CalcOpenBtn.current?.id:
                this.CalcContainer.current?.classList.remove('d-none');
                this.CalcContainer.current?.classList.add('show-down');

                event.target.classList.add('d-none');
                break;
            case "close-calc":
                this.CalcContainer.current?.classList.add('d-none');
                this.CalcOpenBtn.current?.classList.remove('d-none');
                this.setState({result:{RUB:"",USD:""}})
                break;
            default:
                break;
        }
    }

    RadioBoxChange(event: any) {
        if(this.inBTCRadio.current?.checked){
            this.radioExt.current?.classList.remove('d-none');
        }
        if (this.outBTCRadio.current?.checked){
            this.setState({inBTCRadio: false, outBTCRadio: true})
            this.radioExt.current?.classList.add('d-none');
        }
    }

    render() {

        // @ts-ignore
        return (
            <div>
                <button onClick={this.CalcEvent} ref={this.CalcOpenBtn} id={"open-calc"}
                        className="btn btn-warning w-100 text-white rounded-0">Calculator
                </button>
                <div ref={this.CalcContainer} className="container radio_buttons d-none" id="calculator">
                    <form onChange={this.RadioBoxChange} onSubmit={this.calculation}>
                        <div className="d-block">
                            <div className="form-check"><input ref={this.outBTCRadio} className="form-check-input radio"
                                                               id="fr-btc" name="r1"
                                                               type="radio" defaultChecked={true}/><label
                                className="form-check-label" htmlFor="fr-btc">Из
                                Биткоина</label></div>

                            <div className="form-check">
                                <input className="form-check-input radio" id={"out-btc"} name="r1" ref={this.inBTCRadio} type="radio"/><label
                                className="form-check-label" htmlFor="out-btc">В Биткоин</label>
                            </div>
                        </div>
                        <div className="m-l-30">
                            <div className="d-none d-block" id="radioExt" ref={this.radioExt}>
                                <div className="form-check"><input ref={this.frRUBRadio}
                                                                   className="form-check-input radio" id="fr-rub"
                                                                   name="r2" type="radio" value="3"
                                                                   defaultChecked={true}/><label
                                    className="form-check-label" htmlFor="fr-rub">Из
                                    рубля</label></div>
                                <div className="form-check">
                                    <input ref={this.frUSDRadio} className="form-check-input radio" id="fr-usd"
                                           name="r2" type="radio"
                                           value="4" defaultChecked={false}/>
                                    <label className="form-check-label" htmlFor="fr-usd">Из Доллара</label>
                                </div>
                            </div>
                        </div>
                        <div className="container mt-2">
                            <input className="dark  form-control bg-dark" ref={this.calculatorInput} id="calculator-input" type="number"/>
                            <button className="calc dark form-control btn btn-warning btn-sm" onClick={this.calculation} ref={this.toCalculate} id="calculate-button"
                                    type="submit">Calculate
                            </button>
                        </div><div className={"mt-3"}><p ref={this.resultUSD} className="text-center mb-1">{
                        this.state.result.USD }</p>
                        <p ref={this.resultRUB} className="text-center mb-1">{
                            this.state.result.RUB}</p></div>
                        <button id={"close-calc"} onClick={this.CalcEvent} className="btn w-100 text-center">Hide
                        </button>


                    </form>

                </div>

            </div>
        );
    }
}
type stateType = {
    result:{
        USD:string,
        RUB:string
    }
}
type frBTCOut = {
    RUB:number,
    USD:number
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