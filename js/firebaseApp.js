// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyATEeGHAB6lAZVdcjehf-Ra32hsGBY7Dpo",
    authDomain: "smilingacroocal.firebaseapp.com",
    projectId: "smilingacroocal",
    storageBucket: "smilingacroocal.appspot.com",
    messagingSenderId: "510152443969",
    appId: "1:510152443969:web:e5959cb7dec1fdd22c1ec0",
};
// Initialize Firebase
const fbApp = initializeApp(firebaseConfig)
const auth = firebase.auth()
const db = firebase.database()

function register(){
    //get all inputs
    email = document.getElementById('userEmail')
    password = document.getElementById('pwd1')
    confirmPwd = document.getElementById('cfmPwd')

    //validate input fields
    if (validateEmail(email) == false){
        alert("Email is invalid!")
        return
    } else if(validatePassword(password, confirmPwd) == false ){
        alert ("Password is invalid/does not match !")
        return
    }else if(validate(field) == false){
        alert ("Fill in all fields !")
        return
    } else {
        auth.createUserWithEmailAndPassword(email, confirmPwd)
        .then(function(){
            var user = auth.currentUser

            var database_ref = database.ref()

            var user_data={
                email:email,
                points:0
            }
            database_ref.child('users/' + user.uid).set(user_data)

        })
        .catch(function(error){
            var error_code = error.code
            var error_message = error.message
        })

    }


}

function validateEmail(email){
    expression = '/^[^@]+@\w+(\.\w+)+\w$/'
    if (expression.test(email) == true){
        return true
    } else {
        return false
    }
}

function validatePassword(password,confirmPwd){
    if (password < 6 || confirmPwd <6 || password !== confirmPwd){
        return false
    } else {
        return true
    }
}

function validate_field(field){
    if (field == null || field == '' || field.length <= 0){
        return false
    } else {
        return true
    }
}