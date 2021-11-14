const addingPoints = localStorage.getItem('user_points');
const userName = localStorage.getItem('user_name');
const userEmail = localStorage.getItem('user_email');

// Database creation
// Create an instance of a db object for us to store the open database in
let db;
// window.onload = function() {
    
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
        if(localStorage.getItem('add')==='false'){
            console.log('No addtion yet');
        }else{
            addPoints();
        }
    };
    
    function addPoints(){
        let transaction = db.transaction(['user_acc'], 'readwrite');
    
        // call an object store that's already been added to the database
        let objectStore = transaction.objectStore('user_acc');        
        objectStore.openCursor().onsuccess = function(e){
            let cursor = e.target.result;
            if (cursor) {
                if (cursor.value.user_name == userName) {
                    const updateData = cursor.value;
                    console.log(updateData);
                    updateData.points = addingPoints;
                    const request = cursor.update(updateData);

                    request.onerror = function() {
                        alert("Update Failed");
                    };

                    request.onsuccess = function() {
                        // console.log("Redeem Successful");
                        window.location.href = "donghyun_trial.html"; 
                        localStorage.setItem("add",false);
                    };

                }  
                cursor.continue();

            } 
        }
    }
    // Checking
    // to console.log data that's been added into the database see what is inside the database
    function displayData() {
        let objectStore = db.transaction('user_acc').objectStore('user_acc');

        objectStore.openCursor().onsuccess = function(e) {
            // Get a reference to the cursor
            let cursor = e.target.result;

            // If there is still another data item to iterate through, keep running this code
            if(cursor) {
                
                if (cursor.value.user_name == userName) {
                    console.log(cursor.value)
                }
                
                cursor.continue();
            } else {
                // if there are no more cursor items to iterate through, say so
                console.log('Cursor is empty / Table is empty')
            }
        };
    }
// }