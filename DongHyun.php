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
    
    <script src="https://unpkg.com/axios/dist/axios.js"></script>
    <script src="js/attractions_donghyun.js"></script>
    <script src="https://kit.fontawesome.com/fbf5c5a506.js" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/vue@next"></script>

</head>
<body>
    <!-- Navigation -->
    <div id="navdiv">
        <include-navbar></include-navbar>
    </div>

    <div class="searchbar">
        <div class="row g-2 my-2">
            <div class="col-md-6 col-sm-6">
                <div class="form-floating ">
                  <select class="form-select" id="floatingSelectGrid" aria-label="Floating label select example" >
                    <option selected></option>
                    <option value="1">Adventure</option>
                    <option value="2">Arts</option>
                    <option value="3">History & Culture</option>
                    <option value="4" onclick="display_leisure()">Leisure & Recreation</option>
                    <option value="5">Nature & Wildlife</option>
                    <option value="6">Others</option>
                  </select>
                  <label for="floatingSelectGrid">Search by category</label>
                </div>
              </div>

            <div class="col-md-6 col-sm-6">
              <div class="form-floating ">
                <select class="form-select" id="floatingSelectGrid" aria-label="Floating label select example" >
                  <option selected></option>
                  <option value="1">North</option>
                  <option value="2">South</option>
                  <option value="3">East</option>
                  <option value="4">West</option>
                </select>
                <label for="floatingSelectGrid">Search by area</label>
              </div>
            </div>

           
        <div class="input-group mb-3 my-3">
            <input type="search" class="form-control me-2" placeholder="Search by Attraction Name!" aria-label="Search">
            <button class="btn btn-danger" type="button" onclick="getLoc()" >Search</button>
        </div>


        
        </div>

        <div id="map" class="map-responsive">
        </div>
        

    <!--Load the API from the specified URL
    * The async attribute allows the browser to render the page while the API loads
    * The key parameter will contain your own API key 
    * The callback parameter executes the initMap() function
    -->
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDT6sTbyN3xQA9bTHQYcyFVXsqAXT54zfE&callback=initMap"
        async defer></script>

    
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

    <script>

            
        
            
    

    function initMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 11,
                center: { lat: 1.3649170000000002, lng: 103.82287200000002 },
            });

            setMarkers(map);
            }

            // Data for the markers consisting of a name, a LatLng and a zIndex for the
            // order in which these markers should display on top of each other.
    const beaches = [
        ["Bondi Beach", -33.890542, 151.274856, 4],
        ["Coogee Beach", -33.923036, 151.259052, 5],
        ["Cronulla Beach", -34.028249, 151.157507, 3],
        ["Manly Beach", -33.80010128657071, 151.28747820854187, 2],
        ["Maroubra Beach", -33.950198, 151.259302, 1],
    ];

    const location_list=[[1.360261, 103.9892345],[1.360261, 103.9892345]];
    // [{lantitie:1.3,longitute:103}]
    
    console.log(location_list);
    
    const hardcode_locations=[[1.2890235,]]

    function return_list(){
            var options = {
            method: 'GET',
            url: 'https://tih-api.stb.gov.sg/content/v1/attractions/search?keyword=attractions&language=en&apikey=UnWhZ0GbjpzxKlcM9GssA3xbSio89mM2'
            };

            axios.request(options)
            .then(response=>{
                
                var locations_list=[];
                for (i=0; i<response.data.data.length; i++){
                    // console.log(locations_list)
                    var lat= response.data.data[i].location.latitude
                    var lng= response.data.data[i].location.longitude
                    // console.log(lat, lng)
                    // var each_location={lat:location.latitude,lng:location.longitude}
                    locations_list.push({latitude:lat,longitude:lng})
                    
                }
                console.log(locations_list);
                return locations_list;

            }).catch(function (error) {
            console.error(error);
            });
            
    }
    

           
       
        

        // console.log(locations_list[0])
        // console.log(typeof location_list[0]);
        // console.log(typeof locations_list[0].lat);
        
    
    
    function setMarkers(map) {
            // Adds markers to the map.
            // Marker sizes are expressed as a Size of X,Y where the origin of the image
            // (0,0) is located in the top left of the image.
            // Origins, anchor positions and coordinates of the marker increase in the X
            // direction to the right and in the Y direction down.
                const image = {
                    url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
                    // This marker is 20 pixels wide by 32 pixels high.
                    size: new google.maps.Size(20, 32),
                    // The origin for this image is (0, 0).
                    origin: new google.maps.Point(0, 0),
                    // The anchor for this image is the base of the flagpole at (0, 32).
                    anchor: new google.maps.Point(0, 32),
                };
                // Shapes define the clickable region of the icon. The type defines an HTML
                // <area> element 'poly' which traces out a polygon as a series of X,Y points.
                // The final coordinate closes the poly by connecting to the first coordinate.
                const shape = {
                    coords: [1, 1, 1, 20, 18, 20, 18, 1],
                    type: "poly",
                };
                
                console.log(return_list());
                console.log(aaa);
                for (let i = 0; i < return_list().length; i++) {
                    var attraction_location = return_list()[i];
                    new google.maps.Marker({
                        
                    position: { lat: attraction_location.latitude, lng: attraction_location.longitude },
                    map,
                    icon: image,
                    shape: shape,
                    title: "Hello World"
                    
                    });
                }
            }
        function getLoc() {
            var addr = encodeURI(document.getElementById("addr").value);
            var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + addr + "&key=AIzaSyDT6sTbyN3xQA9bTHQYcyFVXsqAXT54zfE";

            axios.get(url)
                .then(response => {
                    //console.log(url);
                    //console.log(response.data);    
                    var info = getFullAddress(response.data);

                    document.getElementById("display").innerHTML = info;
                    // refresh the hidden input values with new lat lng coordinates
                    var coordinate = getLatLng(response.data);
                    document.getElementById("lat").value = coordinate["lat"];
                    document.getElementById("lng").value = coordinate["lng"];
                    // now refresh the map
                    initMap();
                })
                .catch(error => {
                    console.log(error);
                    document.getElementById("display").innerHTML = "Sorry, invalid address. Please try again!";
                });
        }
                        
            
    </script>
        
            
        

        <!-- Footer -->

    <script src="js/navbar.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

        
</body>
</html>