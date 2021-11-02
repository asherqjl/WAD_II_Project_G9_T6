// When the webpage loads
function display_api_category() {

    var options = {
    method: 'GET',
    url: 'https://tih-api.stb.gov.sg/content/v1/attractions/types?language=en&apikey=MnqCCPlkgGWec8BPY7FeV8s7MkmBxP4h'

    };

    axios.request(options)
    .then(response=>{
    for (i=0; i<response.data.data.length; i++){
    var category = response.data.data[i]; 
    console.log(category);
    }

    }).catch(function (error) {
    console.error(error);
    });

}
