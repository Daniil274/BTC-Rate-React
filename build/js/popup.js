
        var progressbar = {
            el : document.getElementById('progress-bar'),
            div:document.getElementsByClassName('progress'), 
            visible(prop){
                if(prop === true){
                    this.div[0].classList.remove('d-none');
                }
                if(prop === false){
                    this.div[0].classList.add('d-none');
                }
            },
            progress(props){
                this.el.style.width=props+'%';
            }
        }
        async function usd() {
            const response = await fetch('https://api.cryptonator.com/api/ticker/btc-usd');
            const data = await response.json();
            let ret = document.getElementById('response-usd');
            ret.innerText = Math.round(data.ticker.price);
            console.log(data);
            if(data.ticker.change>0){
                let arrow = document.getElementById('usd-up');
                arrow.style.display="inline";
            }else{
                let arrow = document.getElementById('usd-down');
                arrow.style.display="inline";
            }
        }
        async function rub() {
            const response = await fetch('https://api.cryptonator.com/api/ticker/btc-rub');
            const data = await response.json();
            let ret = document.getElementById('response-rub');
            ret.innerText = Math.round(data.ticker.price);
            console.log(data);
            if(data.ticker.change>0){
                let arrow = document.getElementById('rub-up');
                arrow.style.display="inline";
            }else{
                let arrow = document.getElementById('rub-down');
                arrow.style.display="inline";
            }
        }
        usd();
        progressbar.progress(50);
        rub();
        progressbar.progress(75);
        document.getElementById('doc').classList.remove('d-none');
        progressbar.visible(false);
         
