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
                <div class="col-md-6 col-sm-6" >
                    <div class="form-floating" >
                        <select class="form-select" id="floatingSelectGrid" aria-label="Floating label select example" v-model="selected_cat" @change="displaySelected" >
                            <option >All</option>
                            <option v-for="cat_obj in attractionCat">{{cat_obj}}</option>
                            
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
                    <!-- input @keyup--display the API keyword search item-->
                    <input type="search" id="attractionSearch" class="form-control me-2" aria-label="Search" :placeholder=[[displayPlaceholder]] v-model="searchField"  @keyup.enter ="searchAttraction()">
                    <!-- button @click -- display the API keyword search item-->
                    <button class="btn btn-danger" type="button" @click="searchAttraction()">Search</button>
                </div>
                
                
                <!-- not v accurate yet, when user enter invalid input, the list will not update to default hais-->
                <div v-html ="errorMsg" @click='buttonDisplay()'>
                    {{errorMsg}}</div>
                </div>
                
                <div :value="displayField">
                    <!-- <button class="btn btn-danger" type="button" @click="getImage()">image</button> -->
                    <p style="color:brown">Displaying lists of: {{displayField}}   ({{FilteredAttByCat.length}} results)</p>
                </div>
 
                    
                <div class="row"  >
                    <div class="col-sm-12 col-md-6 col-lg-3 display: block" v-for="a_obj in FilteredAttByCat">
                        <div class="card mb-5 ">
                        <img :src="a_obj.photo" class="card-img-top mt-4 img-fluid" alt="item1">
                        <div class="card-body ">
                            <h6 class="card-title text-dark fw-bolder text-center">{{a_obj.attraction}}</h6><br>

                            <p><strong>{{a_obj.mrt}}</strong></p>

                            

                            <p class="card-text text-dark">{{a_obj.desc}}</p>
                            <div class = "text-center">
                                <a href="./indAttractionPage.php" class="btn btn-danger">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="text-center mb-5" v-html ="displaySeeMore" v-model='buttonCount'  @click='buttonDisplay()' >
                    {{displaySeeMore}}</div>
                </div>
                
            </div>
        </div>


        <!-- <form class="form-floating" style="margin-bottom: 20px;">
            <input type="email" class="form-control is-invalid" id="floatingInputInvalid">
            <label for="floatingInputInvalid">Invalid input</label>
          </form> -->

 

    </div>




    <!-- Custom JS-->
    <script src="js/attraction.js"></script>
    <script src="js/navbar.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>


</body>
</html>