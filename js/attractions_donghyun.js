function display_location() {
    var options = {
    method: 'GET',
    url: 'https://tih-api.stb.gov.sg/content/v1/attractions/search?keyword=Leisure&language=en&apikey=MnqCCPlkgGWec8BPY7FeV8s7MkmBxP4h'
    };

    axios.request(options)
    .then(response=>{
        console.log(response.data.data)
        for (i=0; i<response.data.data.length; i++){
            var location= response.data.data[i].location
            console.log(location)
            console.log(location.latitude)
            console.log(location.longitude)
        }

    }).catch(function (error) {
    console.error(error);
    });

}


