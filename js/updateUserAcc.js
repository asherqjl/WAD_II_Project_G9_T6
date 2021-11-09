// Forms

const updateForm = document.querySelector("#updateForm");

// For Update
const userNameLoggedIn = document.querySelector('#UserName');
const newUserName = document.querySelector('#updateUserName');
const newUserEmail = document.querySelector('#updateUserEmail');
const newUserPassword = document.querySelector('#newPassword');
const cfmNewPassword = document.querySelector('#cfmNewPassword');



// Database creation
// Create an instance of a db object for us to store the open database in
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
    };
    
    // Update
    updateForm.onsubmit = update;
    
    function update(e){
        e.preventDefault();
        if((newUserPassword.value!=='' || cfmNewPassword.value!=='') && newUserPassword.value === cfmNewPassword.value){
            let transaction = db.transaction(['user_acc'], 'readwrite');
        
            // call an object store that's already been added to the database
            let objectStore = transaction.objectStore('user_acc');        
            let successCounter = 0;
            objectStore.openCursor().onsuccess = function(e){
                let cursor = e.target.result;
                if (cursor) {
                    if (cursor.value.user_name === userNameLoggedIn) {
                        const updateData = cursor.value;
                        console.log(updateData);
                        updateData.user_name = newUserName;
                        const request1 = cursor.update(updateData);

                        updateData.email = newUserEmail;
                        const request2 = cursor.update(updateData);
                        
                        updateData.password = cfmNewPassword;
                        const request3 = cursor.update(updateData);
                        
                        request1.onsuccess = function() {
                            successCounter++;
                        };
                        request2.onsuccess = function() {
                            successCounter++;
                        };
                        request3.onsuccess = function() {
                            successCounter++;
                        };
                        if (successCounter === 3){
                            alert("Update Successful");
                            localStorage.setItem('user_name', newUserName);
                            window.location.href="http://localhost:8888/WAD_II_Project_G9_T6/home.html"; 
                        } else{
                            alert("Update Failed")
                        }

                    }  
                    cursor.continue();

                } 
            }
            // else {
            // console.log('Entries displayed.');
            // }
        }
    };
    // Checking
    // to console.log data that's been added into the database see what is inside the database
    function displayData() {
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