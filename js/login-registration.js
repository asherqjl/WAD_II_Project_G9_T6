
const app2 = Vue.createApp({
    data(){
        return {
            userEmail:'',
            cfmPwd:'',
            loginPwd:'',
            loginEmail:'',
            showStatus: false,
            status: ''
        };
    },
    methods: {
        register() {
            const url = 'http://localhost:8888/WAD_II_Project_G9_T6/db/register.php'
            const data = { userEmail: this.userEmail,
                            cfmPwd: this.cfmPwd
                            
                        }
            // POST request
            /* axios.post(url, data
            )
            .then(response => {
                console.log(response.data)
                this.showStatus = true
                this.status = response.data
            })
            .catch(error => {
                this.showStatus = true
                this.status = 'There was an error: ' + error.message 
            })  */
            // GET request

            axios.get(url, {
                params: data
            })
            .then(response => {
                this.showStatus = true
                this.status = response.data
            })
            .catch(error => {
                this.showStatus = true
                this.status = 'There was an error: ' + error.message 
            }) 
            
        }
    }
})
const vm2 = app2.mount("#signup");

const app2 = Vue.createApp({
    data(){
        return {
            loginPwd:'',
            loginEmail:'',
            showStatus: false,
            status: ''
        };
    },
    methods: {
        register() {
            const url = 'http://localhost:8888/WAD_II_Project_G9_T6/db/register.php'
            const data = { loginEmail: this.loginEmail,
                            loginPwd: this.loginPwd
                            
                        }
            // POST request
            /* axios.post(url, data
            )
            .then(response => {
                console.log(response.data)
                this.showStatus = true
                this.status = response.data
            })
            .catch(error => {
                this.showStatus = true
                this.status = 'There was an error: ' + error.message 
            })  */
            // GET request
            axios.get(url, {
                params: data
            })
            .then(response => {
                this.showStatus = true
                this.status = response.data
            })
            .catch(error => {
                this.showStatus = true
                this.status = 'There was an error: ' + error.message 
            }) 
            
        }
    }
})
const vm2 = app2.mount("#login");
