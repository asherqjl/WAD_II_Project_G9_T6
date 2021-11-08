<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossorigin="anonymous">
    <script src="https://kit.fontawesome.com/f6d34cc2a5.js" crossorigin="anonymous"></script>

    <title>Smiling Across Local</title>
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/navbar.css">
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://unpkg.com/vue@next"></script>

    <title>Rewards</title>

</head>

<body >
    
    <!-- Navigation -->
    <div id="navdiv">
        <include-navbar></include-navbar>
    </div>


    

    <div class="p-3 text-white main" id='reward'>
        
        <div class= "myborder">
            <h1>Points: XXX</h1>
            <hr class="my-4">
            <h5>Terms and Conditions</h5>
            <ul style="font-size: 12px;">
                <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas vitae scelerisque enim ligula venenatis dolor.
                </li>
                <li>
                    Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac.
                </li>
            </ul>
        </div>
        
        <hr class="my-4">
        <h2>Products:</h2>
        <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores perspiciatis labore
            illo pariatur qui, quod, consequuntur, perferendis iure explicabo et tenetur quae non
            inventore veritatis repellat eius laborum unde eaa
        </p>
        
        <div class="container-fluid">
            <div class="row">
                <div class="col" id = "sidebar">
                    
                        <div class=" pt-2 clear">
                            <div class="text-muted filter-label">Applied Filters:</div>
                            <div class="brand-label font-weight-bold p-0 px-1 mx-sm-1 mx-0 my-sm-0 my-2">Example 2<span class=" px-1 close">&times;</span> </div>
                            <div class="brand-label font-weight-bold p-0 px-1 mx-sm-1 mx-0">Example 3<span class=" px-1 close">&times;</span> </div>
                        </div>
                        <h5 class="font-weight-bold">Categories</h5>
                        <div class="py-3 form-check list-inline list-group btn-group" role="group" data-toggle="buttons" >
                        
                            <!-- <ul class="list-group" v-for="(value,key) in productCat" > -->
                                <label class="btn btn-light"  v-for="(value,key) in productCat" ><input type="checkbox" :id="key" :value="key" v-model="catfilter" @change="filterbycategories(productDict)">{{key}}<span class="badge badge-primary badge-pill">{{value}}</span></label>
                                {{catfilter}}
                                    <!-- <li class=" list-group-item list-group-item-action d-flex justify-content-between align-items-center category"  @click="filterbycategories()">
                                        {{key}}<span class="badge badge-primary badge-pill">{{value}}</span> </li> -->
                            <!-- </ul> -->
                        </div>
                        <div class="py-3">
                            <h5 class="font-weight-bold">Points</h5>
                            <form class="brand">
                                <div class="form-inline d-flex align-items-center py-1"> <input type="checkbox"> <label class="tick">1-100<span class="check"></span> </label> </div>
                                <div class="form-inline d-flex align-items-center py-1">  <input type="checkbox" checked> <label class="tick">101-200<span class="check"></span> </label> </div>
                                <div class="form-inline d-flex align-items-center py-1"> <input type="checkbox" checked><label class="tick">201-300<span class="check"></span> </label> </div>
                                <div class="form-inline d-flex align-items-center py-1"> <input type="checkbox"> <label class="tick">1-100<span class="check"></span> </label> </div>
                                <div class="form-inline d-flex align-items-center py-1"> <input type="checkbox"> <label class="tick">1-100<span class="check"></span> </label> </div>
                            </form>
                        </div>
                    
                </div>
                <div class="col-md-6 col-lg-10" id = "items">
                        <div class="container">
                            <div class = "row">  
                                <div class = "col">
                                    <div class="row g-3 mt-2 justify-content-center">
                                        <div class="col-md-6"> <input type="text" class="form-control" placeholder="Search by Product Name"> </div>
                                        <div class="col-md-2"> <button class="btn btn-secondary btn-block"><i class="fas fa-search"></i></button> </div>
                                    </div>                        
                                    <br>
                                    <div class="d-flex flex-row">
                                        <div class="text-muted m-2" id="res">Showing {{productfilter.length}} results</div>
                                        <div class="ml-auto mr-lg-3 ms-auto">
                                            <div id="sorting" class="border rounded p-1 m-1"> <span class="text-muted">Sort by</span> <select name="sort" id="sort">
                                                    <option value="popularity"><b>Points</b></option>
                                                    <option value="prcie"><b>Name</b></option>               
                                                </select> </div>
                                        </div>
                                    </div>
                                    <!-- 1st row-->
                                    <div class="row"  >
                                        <div class="col-sm-12 col-md-6 col-lg-3" @change="productfilter" v-for="product in productfilter">
                                            <div class="card mb-5">
                                                <img :src="product.image" class="card-img-top mt-4 img-fluid" alt="item1">
                                                <div class="card-body ">
                                                    <h5 class="card-title text-dark">{{product.product}}</h5>
                                                    <p class="card-text text-dark">({{product.category}}) {{product.point}} Points</p>
                                                    <div class = "text-center">
                                                        <button type="button" class="btn btn-outline-primary">Redeem</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- <div class="col-sm-12 col-md-6 col-lg-3">
                                            <div class="card mb-5">
                                                <img src="../project/item2.jfif" class="card-img-top mt-4 img-fluid" alt="item2">
                                                <div class="card-body">
                                                    <h5 class="card-title text-dark">Travel Bag</h5>
                                                    <p class="card-text text-dark">300 Points</p>
                                                    <div class = "text-center">
                                                        <button type="button" class="btn btn-outline-primary">Redeem</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-12 col-md-6 col-lg-3">
                                            <div class="card mb-5 ">
                                                <img src="../project/item3.jfif" class="card-img-top mt-4 img-fluid" alt="item3">
                                                <div class="card-body">
                                                    <h5 class="card-title text-dark">Luggage</h5>
                                                    <p class="card-text text-dark">500 Points</p>
                                                    <div class = "text-center">
                                                        <button type="button" class="btn btn-outline-primary">Redeem</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-12 col-md-6 col-lg-3">
                                            <div class="card mb-5">
                                                <img src="../project/item4.jfif" class="card-img-top mt-4 img-fluid" alt="item4">
                                                <div class="card-body">
                                                    <h5 class="card-title text-dark">Sun-Screen</h5>
                                                    <p class="card-text text-dark">100 Points</p>
                                                    <div class = "text-center">
                                                        <button type="button" class="btn btn-outline-primary">Redeem</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> -->
                                    </div>
                                    <span id="dots"></span>
                                    <!-- 2nd row-->
                                    <!-- <span id = "more"> -->
                                        <!-- <div class="row">
                                            <div class=" col-sm-12 col-md-6 col-lg-3">
                                                <div class="card mb-5">
                                                    <img src="../project/item1.jfif" class="card-img-top mt-4 img-fluid" alt="item4">
                                                    <div class="card-body">
                                                        <h5 class="card-title text-dark">Sun-Screen</h5>
                                                        <p class="card-text text-dark">100 Points</p>
                                                        <p class="card-text text-dark">Lorem ipsum dolor sit amet
                                                            consectetur adipisicing elit. </p>
                                                        <div class = "text-center">
                                                            <button type="button" class="btn btn-outline-primary">Redeem</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-12 col-md-6 col-lg-3">
                                                <div class="card mb-5">
                                                    <img src="../project/item1.jfif" class="card-img-top mt-4 img-fluid" alt="item6">
                                                    <div class="card-body">
                                                        <h5 class="card-title text-dark">Universal Adapter</h5>
                                                        <p class="card-text text-dark">300 Points</p>
                                                        <p class="card-text text-dark">Lorem ipsum dolor sit amet
                                                            consectetur adipisicing elit. </p>
                                                        <div class = "text-center">
                                                            <button type="button" class="btn btn-outline-primary">Redeem</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-12 col-md-6 col-lg-3">
                                                <div class="card mb-5 ">
                                                    <img src="../project/item1.jfif" class="card-img-top mt-4 img-fluid" alt="item5">
                                                    <div class="card-body">
                                                        <h5 class="card-title text-dark">Bag</h5>
                                                        <p class="card-text text-dark">100 Points</p>
                                                        <p class="card-text text-dark">Lorem ipsum dolor sit amet
                                                            consectetur adipisicing elit. </p>
                                                        <div class = "text-center">
                                                            <button type="button" class="btn btn-outline-primary">Redeem</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-12 col-md-6 col-lg-3">
                                                <div class="card mb-5 ">
                                                    <img src="../project/item1.jfif" class="card-img-top mt-4 img-fluid" alt="item6">
                                                    <div class="card-body">
                                                        <h5 class="card-title text-dark">Universal Adapter</h5>
                                                        <p class="card-text text-dark">300 Points</p>
                                                        <p class="card-text text-dark">Lorem ipsum dolor sit amet
                                                            consectetur adipisicing elit. </p>
                                                        <div class = "text-center">
                                                            <button type="button" class="btn btn-outline-primary">Redeem</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> -->
                                    </span>
                
                                    <div class = "text-center">
                                        <button onclick = "myFunction()" type="button" id="myBtn" class="btn btn-light btn-outline-secondary">Show More</button>
                                    </div>
                                
                            </div>
                        </div>

                </div>
            </div>
        </div>
        
        </div>
    </div>
    <script src="js/navbar.js"></script>
    <script src="js/reward.js"></script>
    <script>

    </script>

    <!-- Optional JavaScript -->
    <!-- Bundled Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"></script>

</body>
</html>