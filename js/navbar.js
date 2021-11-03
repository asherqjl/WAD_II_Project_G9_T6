
const app = Vue.createApp({
    
});
// DO NOT EDIT - start
app.component('include-navbar',{
    template: ` 
        <div><nav class="navbar navbar-expand-md">
            <div class="container-fluid">
                <a href="home.php" class="navbar-brand">SmilingAcrossLocal<span style="font-size: 11px;"> SG</span></a> 
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item active"> 
                            <a class="nav-link" aria-current="page" href="login.php"> LOGIN/SIGNUP </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="home.php">HOME</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="KaiWei.php">ATTRACTIONS</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="DongHyun.php">MAPS</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="zenyu.php">TRAVEL HISTORY</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="FangTing.php">REWARDS</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav></div>
    `    
});

const vm = app.mount("#navdiv");