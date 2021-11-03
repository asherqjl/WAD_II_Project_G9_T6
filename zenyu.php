<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" 
        rel="stylesheet" 
        integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" 
        crossorigin="anonymous">
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/navbar.css">
        <script src="https://unpkg.com/vue@next"></script>
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        <title>Smiling Across Local SG</title>
        <title>Travel History</title>

    </head>

    <body>
        <!-- Navigation -->
        <div id="navdiv">
            <include-navbar></include-navbar>
        </div>
    

        <div class='row'>
            <div class='col-sm'>
            </div>
            <div class='col-sm '>
                <img src='sad.png' class='img-fluid'></img>
            </div>
            <div class='col-sm'>
            </div>
        </div>

            <div class='row'>
                <div class='col-sm'>
                </div>
                <div class='col-sm text-center'>
                    <h1>No History</h1>
                </div>
                <div class='col-sm'>
                </div>
            </div>

            <div class='row'>
                <div class='col'>
                </div>
                <div class='col text-center'>
                    <form action="https://google.com">
                        <input type="submit" value="New Journey" />
                    </form>
                </div>
                <div class='col'>
                </div>
            </div>

            <div id= "app3" ">
                <p v-html="axiosTest()"><p></p></p>
            </div>
        </div>
    </body>
    <script src="js/navbar.js"></script>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script>console.log({{travel_history}})</script>
    <script>
const app3 = Vue.createApp({
    data(){
        return {
            travel_history:'x'
        };
    },
    methods: {
        get_travel_history() {
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
            axios.get('http://localhost/WAD_II_Project_G9_T6/db/getTravelHistory.php')
            .then(response => {
                console.log(response.data)
                this.travel_history= response.data
                console.log(this.travel_history)
                this.showStatus = true
                this.status = response.data
            })
            .catch(error => {
                this.showStatus = true
                this.status = 'There was an error: ' + error.message 
            }) 
            
        },
        axiosTest() {
            this.travel_history= axios.get('http://localhost/WAD_II_Project_G9_T6/db/getTravelHistory.php').then(response => response.data)
            
        }
    }
})
const vm3 = app3.mount("#app3");

    </script>
</html>