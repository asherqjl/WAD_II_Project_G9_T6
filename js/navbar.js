
const app = Vue.createApp({
});
    // DO NOT EDIT - start
    app.component('include-navbar',{
        data(){
            return {
                home: "home.html",
                attractions: "KaiWei.html",
                travelHistory: "zenyu.html",
                maps: "DongHyun.html",
                rewards: "FangTing.html"

            };
    },
    template: ` 
        <div><nav class="navbar navbar-expand-md">
            <div class="container-fluid">
                <a class="navbar-brand">SmilingAcrossLocal<span style="font-size: 11px;"> SG</span></a> 
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item active"> 
                            <a class="nav-link" aria-current="page" href="#"> LOGIN </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{home}}}">HOME</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{attractions}}">ATTRACTIONS</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{maps}}">MAPS</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{travelHistory}}">TRAVEL HISTORY</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{rewards}}">REWARDS</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav></div>
    `    
});

const vm = app.mount("#navdiv");