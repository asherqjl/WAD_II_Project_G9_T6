// Forms
const signupForm = document.querySelector('#signupForm'); 
const updateForm = document.querySelector("#updateForm");
const loginForm = document.querySelector('#loginForm'); 

// For Sign Up
const userName = document.querySelector('#userName');
const userEmail = document.querySelector('#userEmail');
const pwd1 = document.querySelector('#pwd1');
const cfmPwd = document.querySelector('#cfmPwd');

// For Log In
const loginEmail = document.querySelector('#loginEmail');
const loginPwd = document.querySelector('#loginPwd');

// For Update
const userNameLoggedIn = document.querySelector('#UserName');
const newUserName = document.querySelector('#updateUserName');
const newUserEmail = document.querySelector('#updateUserEmail');
const newUserPassword = document.querySelector('#newPassword');
const cfmNewPassword = document.querySelector('#cfmNewPassword');


let db;

window.onload = function() {
    nameDisplayCheck();
    // Open our database; it is created if it doesn't already exist
    // (see onupgradeneeded below)
    let request = window.indexedDB.open('smilingAcrossLocal', 2);
    // onerror handler signifies that the database didn't open successfully
    request.onerror = function() {
        console.log('Database failed to open');
    };
    request.onsuccess = function() {
        console.log('Database opened successfully');
        db = request.result;
        displayData();
    }
    
    // Setup the database tables if this has not already been done Usually only need to do this once it's like innit like that
    request.onupgradeneeded = function(e) {
        // Grab a reference to the opened database
        let db = e.target.result;

        //Create an objectStore to store our notes in (basically like a single table)
        //including a auto-incrementing key
        let objectStore = db.createObjectStore('user_acc', { keyPath: 'id', autoIncrement:true });

        // Define what data items the objectStore will contain
        objectStore.createIndex('user_name', 'user_name', { unique: false });
        objectStore.createIndex('email', 'email', { unique: false });
        objectStore.createIndex('password', 'password', { unique: false });
        objectStore.createIndex('points', 'points', { unique: false });

        let objectStoreNew = db.createObjectStore('travel_history', { keyPath: 'id', autoIncrement:true });

        // Define what data items the objectStore will contain
        objectStoreNew.createIndex('email', 'email', { unique: false });
        objectStoreNew.createIndex('location_name', 'location_name', { unique: false });
        objectStoreNew.createIndex('time_visited', 'time_visited', { unique: false });
        objectStoreNew.createIndex('category', 'category', { unique: false });
        
        // console.log('Database setup complete');
    };
    
    // Registration 
    if(signupForm!== null){
        signupForm.onsubmit = register;
    }

    // Login 
    if(loginForm!== null){
        loginForm.onsubmit = login;
    }

    // Define the register() function 
    function register(e) {
        // prevent default - we don't want the form to submit in the conventional way
        e.preventDefault();
        // validate the forms first before allowing registration
        if ( (cfmPwd.value!=='' || pwd1.value!=='') && pwd1.value === cfmPwd.value){
            // grab the values entered into the form fields and store them in an object ready for being inserted into the DB
            let newItem = { user_name: userName.value, 
                            email: userEmail.value, 
                            password: cfmPwd.value, 
                            points:0 };
        
            // open a read/write db transaction, ready for registration
            let transaction = db.transaction(['user_acc'], 'readwrite');
        
            // call an object store that's already been added to the database
            let objectStore = transaction.objectStore('user_acc');

            // Make a request to add our newItem object to the object store
            let request = objectStore.add(newItem);
            
            request.onsuccess = function() {
                // Clear the form, ready for adding the next entry
                
                userEmail.value = '';
                cfmPwd.value='';
                pwd1.value='';
            };
            // Report on the success of the transaction completing, when everything is done
            transaction.oncomplete = function() {
                var usernamee = userName.value;
                alert('Registration Successful '+usernamee+' !');
                // Session
                localStorage.setItem('user_name', userName.value);
                localStorage.setItem('user_points', 0);
                localStorage.setItem('user_email', userEmail.value);
                localStorage.setItem("redeemed",false);
                window.location.href="home.html";                
                userName.value = '';
                // update the display of data to show the newly added item, by running displayData() again.
                displayData();
            };
            transaction.onerror = function() {
            console.log('Transaction not opened due to error');
            };
        } else {
            alert("Invalid Password!")
        }
    };
    // Admin Account
    function createAdmin_Once() {
        const foundAdmin = [];
         
        let newItem = { user_name: 'Admin', 
            email: 'Admin@admin.com', 
            password: '654321', 
            points:1500 };
        let transaction = db.transaction(['user_acc'], 'readwrite');
        let objectStore = transaction.objectStore('user_acc');
        objectStore.openCursor().onsuccess = function(e) {
            // Get a reference to the cursor
            let cursor = e.target.result;
            if(cursor) {
                
                foundAdmin.push(cursor.value.user_name); 
                
                cursor.continue();
            }
        }
        console.log(foundAdmin.includes("Admin"));
        if (foundAdmin.includes("Admin")){
            objectStore.add(newItem);
        } 
    }
    // Login Function 
    function login(e){
        e.preventDefault();
        let transaction = db.transaction(['user_acc'], 'readwrite');
        
        // call an object store that's already been added to the database
        let objectStore = transaction.objectStore('user_acc');

        objectStore.openCursor().onsuccess = function(e) {
            // Get a reference to the cursor
            let cursor = e.target.result;

            // If there is still another data item to iterate through, keep running this code
            if(cursor) {
                if( (loginEmail.value == cursor.value.email||loginEmail.value == cursor.value.user_name) && loginPwd.value == cursor.value.password){
                    var currentUserName = cursor.value.user_name;
                    var currentEmail = cursor.value.email;
                    var currentPoints = cursor.value.points;
                    alert(currentUserName + ' Login Successful!');
                    
                    // Session
                    localStorage.setItem('user_name', currentUserName);
                    localStorage.setItem('user_points', currentPoints);
                    localStorage.setItem('user_email', currentEmail);
                    
                    window.location.href="home.html";                
                    
                } 
                
                cursor.continue();
            } else {
                
                // if there are no more cursor items to iterate through, say so
                console.log('No more accounts are found');
            }
        }
    };
    
    // Checking
    // to console.log data that's been added into the database see what is inside the database
    function displayData() {
        createAdmin_Once();
        let objectStore = db.transaction('user_acc').objectStore('user_acc');

        objectStore.openCursor().onsuccess = function(e) {
            // Get a reference to the cursor
            let cursor = e.target.result;

            // If there is still another data item to iterate through, keep running this code
            if(cursor) {
                console.log(cursor.value)

                
                cursor.continue();
            } else {
                // if there are no more cursor items to iterate through, say so
                console.log('Cursor is empty / Table is empty')
            }
        };
    }
}
// }