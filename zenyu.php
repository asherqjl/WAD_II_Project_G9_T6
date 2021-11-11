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

    </head>

    <body>
        <!-- Navigation -->
        <div id="navdiv">
            <include-navbar></include-navbar>
        </div>
    
        <div id="app3">
            <div class='row'>
                <div class='col-sm d-flex justify-content-center' >
                    <img  v-if="travel_history.length===0" src='./images/sad.png' class='img-fluid d-flex justify-content-center '></img>
                    <img  v-else src='./images/happy.png' class='img-fluid d-flex justify-content-center'></img>
                </div>
            </div>

            <div class='row'>
                <div class='col-sm d-flex justify-content-center'>
                    <h1 v-if="travel_history.length===0">No History</h1>
                    <h1 v-else> Your Travel History</h1>
                </div>
            </div>

            <div class='row'>
                <div class='col'>
                </div>
                <div class='col text-center'>
                    <form action="./DongHyun.html">
                        <input type="submit" class="btn btn-secondary" value="New Journey" />
                    </form>
                </div>
                <div class='col'>
                </div>
            </div>

            <!-- <div class="d-flex justify-content-center "> -->
                <!-- <table class="table bg-white w-75"> -->
                    <!-- <tr v-for="travel in travel_history"> -->
                        <!-- <td><h2>{{travel.location_name}}</h2><br/>{{travel.category}}</td> -->
                        <!-- <td>{{travel.time_visited}}</td> -->
                    <!-- </tr> -->
                <!-- </table> -->
            <!-- </div> -->

            <div class="row" >
                <div class="d-flex justify-content-center" >
                    <table class="table bg-white w-75" id="listingTable">
                    </table> 
                <div>
            
                
                <button v-on:click="prevPage" id="btn_prev">Prev</button>
                <button v-on:click="nextPage" id="btn_next">Next</button>
                page: <span id="page"></span>  
            </div>   
        </div>
    </body>
    <script type="text/javascript" src="js/navbar.js"></script>
    <script type="text/javascript" src="js/sessions.js"></script>
    <script type="text/javascript" src="js/signOutPopUp.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script>

        const app3 = Vue.createApp({
            data(){
                return {
                    travel_history:'',
                    current_page: 1,
                    records_per_page: 1,

                }
            },
            mounted:function()  {
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
                    url="http://localhost/WAD_II_Project_G9_T6/db/getTravelHistory.php"
                    axios.get(url)
                    .then(response => { 
                        console.log(response.data)
                        this.travel_history= response.data.reverse()
                        console.log(this.travel_history)
                        this.status = response.data
                        this.changePage(1)
                    })
                    .catch(error => {
                        this.status = 'There was an error: ' + error.message 
                    }) 
                    
                },
                methods:{
                    prevPage(){
                        if (this.current_page > 1) {
                            this.current_page--
                            this.changePage(this.current_page)
                        }
                    },
                    nextPage(){
                        if(this.current_page < this.numPages()){ 
                            console.log(this.numPages())
                            this.current_page++
                            this.changePage(this.current_page)
                        }
                    },
                    changePage(page){
                        var btn_next = document.getElementById("btn_next")
                        var btn_prev = document.getElementById("btn_prev")
                        var listing_table = document.getElementById("listingTable")
                        var page_span = document.getElementById("page")

                        // Validate page
                        if (page < 1) page = 1
                        if (page > this.numPages()) page = this.numPages()  

                        listing_table.innerHTML = ""
                        for (var i = (page-1) * this.records_per_page; i < (page * this.records_per_page); i++) {
                            console.log(this.travel_history[i])
                            listing_table.innerHTML+= `<tr><td><h2>${this.travel_history[i].location_name}</h2><br/>${this.travel_history[i].category}</td>
                                <td>${this.travel_history[i].time_visited}</td></tr>`
                        }

                        page_span.innerHTML = page

                        if (page == 1) {
                            btn_prev.style.visibility = "hidden"
                        } else {
                            btn_prev.style.visibility = "visible"
                        }

                        if (page == this.numPages()) {
                            btn_next.style.visibility = "hidden"
                        } else {
                            btn_next.style.visibility = "visible"
                        }
                    },
                    numPages(){
                        return Math.ceil(this.travel_history.length / this.records_per_page )
                    }       
                }
        })
        const vm3 = app3.mount("#app3");

    </script>
</html>