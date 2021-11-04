
const attraction = Vue.createApp({
    data() {
      return {
        successfulSearch:false,
        searchField:"attraction",
        displayField:"",
        attractionDict: []
      };
    },
    created(){
      this.getAttraction()
      

    },
    methods :{
      getAttraction(){
        this.attractionDict=[]
      var options = {
        method: 'GET',
        url: 'https://tih-api.stb.gov.sg/content/v1/attractions/search?keyword='+ 
         this.searchField+ "&language=en&apikey=MnqCCPlkgGWec8BPY7FeV8s7MkmBxP4h"
      };
      console.log(this.searchField)
      
      axios.request(options)
      .then(response=>{
        var attractionData = response.data.data;
        
        for (i=0; i<response.data.data.length; i++){
          console.log(response.data.data)
          
          var latitude= attractionData[i].location.latitude
          var longitude =attractionData[i].location.longitude
          var desc = attractionData[i].description;
          var name = attractionData[i].name; 
          // console.log(attractionData)
          
          var type = attractionData[i].type; 
          
          
          if(! attractionData[i].images[0] || !attractionData[i].images[0].url || attractionData[i].images[0].url =="" ){
            var photo = "images/dummy-post-square-1.jpeg"
          }else{
            var photo = attractionData[i].images[0].url
            
          }
          
          this.attractionDict.push({attraction:name,category:type, desc:desc, photo:photo, latitude:latitude, longitude:longitude})
          // console.log(this.attractionDict)
        }
        
        // console.log(this.attractionDict)
        this.successfulSearch= true
        this.displayField=this.searchField
        this.searchField=""
        return this.attractionDict
        
      }).catch(function (error) {
        console.error(error);
      })
    }
  }
})
  const attraction_vm = attraction.mount('#attraction');