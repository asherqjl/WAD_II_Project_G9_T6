// // When the webpage loads
// function display_api_category() {

//     var result = []
//     var options = {
//     method: 'GET',
//     url: 'https://tih-api.stb.gov.sg/content/v1/attractions/types?language=en&apikey=MnqCCPlkgGWec8BPY7FeV8s7MkmBxP4h'

//     };

//     axios.request(options)
//     .then(response=>{
//     for (i=0; i<response.data.data.length; i++){
//     var category = response.data.data[i];
//     result.push(category)  

//     }
//     return result
//     }).catch(function (error) {
//     console.error(error);
//     });
// }

// function display_list_of_category(){

//   var result = display_api_category();
//   console.log(result.length);
// }


// function display_category_data() {
//     var options = {
//     method: 'GET',
//     url: 'https://tih-api.stb.gov.sg/content/v1/attractions/search?keyword=Leisure&language=en&apikey=MnqCCPlkgGWec8BPY7FeV8s7MkmBxP4h'
//     };

//     axios.request(options)
//     .then(response=>{
//         console.log(response.data.data)
//         for (i=0; i<response.data.data.length; i++){
            
//             //address
//             var address= response.data.data[i].address
//             // console.log(address)

//             var postalCode = address.postalCode
//             var buildingName= (address.buildingName =="") ? "NA" : address.buildingName
//             var streetName =  (address.streetName =="") ? "NA" : address.streetName

//             // console.log(buildingName)
//             // console.log(postalCode)

//             //location
//             var latitude= response.data.data[i].location.latitude
//             var longitude = response.data.data[i].location.longitude
//             // console.log(latitude)
//             // console.log(longitude)

//             //desc
//             var description= response.data.data[i].description
//             console.log(description)

            
//         }

//     }).catch(function (error) {
//     console.error(error);
//     });

// }


const attraction_cat = Vue.createApp({
    data() {
      return {
          checked: '',
          attractionCate: []
      };
  }, 
    created(){

      var options = {
          method: 'GET',
          url: 'https://tih-api.stb.gov.sg/content/v1/attractions/search?keyword=Attractions&language=en&apikey=MnqCCPlkgGWec8BPY7FeV8s7MkmBxP4h'
        };
        
        axios.request(options)
        .then(response=>{
        console.log(response.data);

        for (i=0; i<response.data.data.length; i++){
            
            var a_cat = response.data.data[i];
            this.attractionCate.push(a_cat);

        }
        console.log(this.attractionCate);

        return this.attractionCate;

        }).catch(function (error) {
          console.error(error);
        });
    }
  })
  const attraction_vm = attraction_cat.mount('#attraction_cat');