import React from "react";

class Calculator extends React.Component {
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

    constructor(p: any) {
        super(p);
        this.state = {
            RUB:localStorage.getItem('RUB'),
            USD:localStorage.getItem('USD'),
            result:{
                RUB:"",
                USD:""
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
                RUB:Math.round(parseFloat(this.state.RUB) * inputValue),
                // @ts-ignore
                USD:Math.round(parseFloat(this.state.USD) * inputValue),
            }
            this.setState({result:{USD:resultFromBTC.USD.toString()+' $',RUB:resultFromBTC.RUB.toString()+' ₽'}})
        }if (this.inBTCRadio.current?.checked){
            if (this.frUSDRadio.current?.checked){
                // @ts-ignore
                let result:number = (inputValue/this.state.USD).toFixed(10);
                this.setState({result:{RUB:"",USD:result.toString()+'₿'}})
            }else{
                // @ts-ignore
                let result:number = (inputValue/this.state.RUB).toFixed(10);
                this.setState({result:{RUB:result.toString()+'₿',USD:""}})
            }
        }
        // @ts-ignore
        console.log(this.state.result)
    }
    CalcEvent(event: any) {
        event.preventDefault();
        console.log(event.target.id)
        switch (event.target.id) {
            case this.CalcOpenBtn.current?.id:
                console.log('open calc')
                this.CalcContainer.current?.classList.remove('d-none');
                this.CalcContainer.current?.classList.add('show-down');

                event.target.classList.add('d-none');
                break;
            case "close-calc":
                this.CalcContainer.current?.classList.add('d-none');
                this.CalcOpenBtn.current?.classList.remove('d-none');
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
                        className="btn btn-warning w-100 text-white rounded-0">Калькулятор
                </button>
                <div ref={this.CalcContainer} className="container radio_buttons d-none" id="calculator">
                    <hr/>
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
                                    type="submit">Расчёт
                            </button>
                        </div><div className={"mt-3"}><p ref={this.resultUSD} className="text-center mb-1">{
                        // @ts-ignore

                        this.state.result.USD}</p>
                        <p ref={this.resultRUB} className="text-center mb-1">{
                            // @ts-ignore

                            this.state.result.RUB}</p></div>
                        <button id={"close-calc"} onClick={this.CalcEvent} className="btn w-100 text-center">Скрыть
                        </button>


                    </form>

                </div>

            </div>
        );
    }
}
interface frBTCOut{
    RUB:number,
    USD:number
}
export default Calculator;