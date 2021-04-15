var progressbar = {
    el : document.getElementById('progress-bar'),
     visible(prop){
        if(prop ==true){
            this.el.classList.remove('d-none');
        }
        else{
            this.el.classList.add('d-none')
        }
    },
    progressbar(prop){
        this.el.style.width=prop+'%';
    }
}