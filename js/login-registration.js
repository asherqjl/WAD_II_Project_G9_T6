
const app = Vue.createApp({
    data(){
        return {
            userEmail:'',
            cfmPwd:'',
            loginPwd:'',
            loginEmail:''
        };
    }
});
// DO NOT EDIT - start
app.component('include-navbar',{
    template: ` 
        <div><nav class="navbar navbar-expand-md">
            <div class="container-fluid">
                <a href="home.html" class="navbar-brand">SmilingAcrossLocal<span style="font-size: 11px;"> SG</span></a> 
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item active"> 
                            <a class="nav-link" aria-current="page" href="login.html"> LOGIN/SIGNUP </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="home.html">HOME</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="KaiWei.html">ATTRACTIONS</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="DongHyun.html">MAPS</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="zenyu.html">TRAVEL HISTORY</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="FangTing.html">REWARDS</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav></div>
    `    
});

const vm = app.mount("#navdiv");