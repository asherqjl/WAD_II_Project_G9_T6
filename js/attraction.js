
const attraction = Vue.createApp({
  data() {
    return {
      searchField:"Attractions",
      displayField:"",
      attractionDict: [],
      attractionCat:[],
      errorMsg: ''
    };
  },
  created(){
    this.getAttraction()

  }
  ,
  methods :{
    getAttraction(){
      var options = {
        method: 'GET',
        url: 'https://tih-api.stb.gov.sg/content/v1/attractions/search?keyword='+ 
        this.searchField+ "&language=en&apikey=MnqCCPlkgGWec8BPY7FeV8s7MkmBxP4h"
      };
      // console.log(this.searchField)
      
      axios.request(options)
      .then(response=>{
          var attractionData = response.data.data;
          this.attractionDict=[]
          this.attractionCat=[]
          this.errorMsg =""
          console.log(attractionData)
        
          for (i=0; i<attractionData.length; i++){
            // var latitude= attractionData[i].location.latitude
            // var longitude =attractionData[i].location.longitude
            var desc = attractionData[i].description;   //to do: trim the text (by bootstrap display or java extract certain till certain index)
            var name = attractionData[i].name;           
            var type = attractionData[i].type; 

            // if no image url provided-> set dummy pic for now
            if(!attractionData[i].images[0]){
              var photo = "images/dummy-post-square-1.jpeg"
            }
            else{
              if(attractionData[i].images[0].url.startsWith("https://")){
                var photo = attractionData[i].images[0].url
              }
              else if(attractionData[i].images[0].uuid.length >2){
                var temp_photo = attractionData[i].images[0].uuid
                var photo = "https://tih-api.stb.gov.sg/media/v1/download/uuid/" + temp_photo +"?apikey=MnqCCPlkgGWec8BPY7FeV8s7MkmBxP4h"
              }
            }
            // console.log(photo)
  
            //extract all the type available in this dataset
            if(! this.attractionCat.includes(type)){
              this.attractionCat.push(type)}
            
            //store in a our main dict
            this.attractionDict.push({attraction:name,category:type, desc:desc, photo:photo})
            // console.log(this.attractionDict)
        }
        
        //alphabatically sort category type
        this.attractionCat.sort()
        // console.log(this.attractionCat)

        this.displayField=this.searchField
        this.searchField=""
        return this.attractionDict
        
      }).catch(error=> {
        this.errorMsg="<span style='padding-top: 15px; font-size: small; color: red;'>No record found! Here are the recommended attractions!</span>"
        // console.log(error);
      }
      )}
    },
    // getImage(){
    //   var imgoptions = {
    //     method: 'GET',
    //     url: 'https://app.zenserp.com/api/v2/search',
    //     params: {q: this.searchField , tbm:'isch', location: 'Singapore', hl: 'en', num: '1', start: '1', ijn: '1'},
    //     headers: {
    //       'apikey': "c9fbd920-3d57-11ec-a2ca-ab4629a79280"}
    //   };

    //   axios.request(imgoptions).then(function (response) {
    //     console.log(response.data);
    //   }).catch(function (error) {
    //     console.error(error);
    //   });

    // }
})
  const attraction_vm = attraction.mount('#attraction');