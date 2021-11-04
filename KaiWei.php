<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/navbar.css">

    <!-- Custom JavaScript -->
    <!-- <script src=screen2.js"></script> -->

    <!-- Axios -->
    <script src="https://unpkg.com/axios/dist/axios.js"></script>

    <!-- Vue -->
    <script src="https://unpkg.com/vue@next"></script>

    <title>Attractions</title>
</head>
<body>

    <!-- Navigation -->
    
    <div id="navdiv">
        <include-navbar></include-navbar>
    </div>
    
    <div class="container-fluid"  id='attraction'>
        <div class="searchbar">
            <div class="row g-2 my-2">
                <!--dropdown list category APIdynamically -->
                <div class="col-md-6 col-sm-6">
                    <div class="form-floating ">
                    <select class="form-select" id="floatingSelectGrid" aria-label="Floating label select example" >
                        <option selected></option>
                        <option value="1">Adventure</option>
                        <option value="2">Arts</option>
                        <option value="3">History & Culture</option>
                        <option value="4">Leisure & Recreation</option>
                        <option value="5">Nature & Wildlife</option>
                    </select>
                    <label for="floatingSelectGrid">Search by category</label>
                    </div>
                </div>

                <!--dropdown list location area -hard code -->
                <div class="col-md-6 col-sm-6">
                    <div class="form-floating ">
                        <select class="form-select" id="floatingSelectGrid" aria-label="Floating label select example" >
                        <option selected></option>
                        <option value="N">North</option>
                        <option value="S">South</option>
                        <option value="E">East</option>
                        <option value="W">West</option>
                        </select>
                        <label for="floatingSelectGrid">Search by area</label>
                    </div>
                </div>

            
            <div class="input-group mb-3 my-3">
                <input type="search" class="form-control me-2" aria-label="Search" v-model="searchField">
                <!-- button @click -- display the API keyword search item-->
                <button class="btn btn-danger" type="button" @click="getAttraction()">Search</button>
            </div>
            
        </div>

        <!-- if input search keyword and able to find, display API result list-->
        <div v-if="successfulSearch" :value="displayField">
            <h1>Successful search! {{displayField}}</h1>
            <div class="row"  >
                <div class="col-sm-12 col-md-6 col-lg-3 display: block" v-for="a_obj in attractionDict">
                    <div class="card mb-5 ">
                        <img :src="a_obj.photo" class="card-img-top mt-4 img-fluid" alt="item1">
                        <div class="card-body ">
                            <h5 class="card-title text-dark">{{a_obj.attraction}}</h5>
                            <p class="card-text text-dark">{{a_obj.desc}}</p>
                            <div class = "text-center">
                                <a href="#" class="btn btn-danger">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
            

        <!-- else, display default API attraction list && warning-->

        <div v-else>
            <span style="padding-top: 15px; font-size: small; color: red;">No record found!</span>
            <h1>Failed but display default</h1>

        </div>


        <!-- <form class="form-floating" style="margin-bottom: 20px;">
            <input type="email" class="form-control is-invalid" id="floatingInputInvalid">
            <label for="floatingInputInvalid">Invalid input</label>
          </form> -->

        
    <!-- Cards -->
    <!-- <div class="PhotoFrame"> -->

        <!-- <div class="row align-items-center"> -->
        <!-- <div class="row justify-content-center">
        <div class="col-md-6 col-xl-4">
            Add a card -->
            <!-- <div class="card h-100" style="width: 18rem; margin: auto;">
                <img src="/WAD2/krazyWomen/justin_bg.jpg" class="card-img-top">
                <div class="card-body">
                <h5 class="card-title">Justin House</h5>
                <p class="card-text">Ut fermentum condimentum semper. Sed pretium feugiat arcu, et fringilla neque.</p>
                <a href="#" class="btn btn-danger">Read More</a>
                </div>
            </div>
        </div>  -->


        <!-- Display attration in card -->

    </div>




        <!-- REFERENCE TO LOCAL EXTERNAL JAVASCRIPT-->
    <script src="js/attraction.js"></script>
    <script src="js/navbar.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>


</body>
</html>