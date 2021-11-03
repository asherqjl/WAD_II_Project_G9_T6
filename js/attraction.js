
const attraction = Vue.createApp({
    data() {
      return {
        attractionDict: []
      };
    }, 
    created(){
      var options = {
          method: 'GET',
          url: 'https://tih-api.stb.gov.sg/content/v1/attractions/search?keyword=Attractions&language=en&apikey=MnqCCPlkgGWec8BPY7FeV8s7MkmBxP4h'
        };
        
        axios.request(options)
        .then(response=>{
          var attractionData = response.data.data;

          for (i=0; i<response.data.data.length; i++){
              var desc = attractionData[i].description;
              console.log(desc)

              var name = attractionData[i].name; 
              // console.log(attractionData)

              var type = attractionData[i].type; 
   

              if(! attractionData[i].images[0] || !attractionData[i].images[0].url || attractionData[i].images[0].url =="" ){
                var photo = "images/dummy-post-square-1.jpeg"
              }else{
                var photo = attractionData[i].images[0].url
                
              }
 
              this.attractionDict.push({attraction:name,category:type, desc:desc, photo:photo})
              // console.log(this.attractionDict)
              }

          // console.log(this.attractionDict)
          return this.attractionDict

      }).catch(function (error) {
        console.error(error);
      
      })
      
    }

    });
  const attraction_vm = attraction.mount('#attraction');