function signout(){
    var signout = confirm("Are You sure you want to sign out?");
    if(signout){
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_email');
        localStorage.removeItem('user_points');

        window.location.href='home.html';
    }
}