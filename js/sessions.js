    const displayUserName = document.querySelector('#UserName');
    const profileTab = document.querySelector('#profile');
    const signoutTab = document.querySelector('#signout');
    const loginSignupTab = document.querySelector('#LoginSignUp');
    // define the nameDisplayCheck() function
    function nameDisplayCheck() {
        // check whether the 'name' data item is stored in web Storage
        if(localStorage.getItem('user_name')&&localStorage.getItem('user_name')!==null) {
            // If it is, display name
            let name = localStorage.getItem('user_name');
            displayUserName.textContent =  name;
            profileTab.style.display = "block"
            signoutTab.style.display = "block"
            loginSignupTab.style.display = "none"

        } else {
            // if not just login/sign up
            loginSignupTab.style.display = "block"
            signoutTab.style.display = "none"
            profileTab.style.display = "none"

        }
    }
    document.body.onload = nameDisplayCheck;
