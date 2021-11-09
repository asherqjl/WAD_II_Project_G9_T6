function signout(){
    var signout = confirm("Are You sure you want to logout?");
    if(signout){
        localStorage.removeItem('user_name');
        window.location.href='home.html';
    }
}