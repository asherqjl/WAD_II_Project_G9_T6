
const attraction = Vue.createApp({
  data() {
    return {
      searchField:"adventure",   //input search textbox
      displayField:"",          //display which API cate is being called 
      displayText:"Enter attraction here!",   //placeholder
      attractionDict: [],  //main data dict
      attractionCat:[],         //dropdown category option
      FilteredAttByCat:[],      //the filtered data
      errorMsg: '',             //display err msg if any
      selected_cat :"All" 
    };
  },
  created(){
    this.getAttraction()
  }
  ,
  methods :{
    getAttraction(){
      if(this.searchField.trim()==""){
        this.searchField ="adventure"
      }
      console.log(this.searchField)
      this.selected_cat = "All"

      var options = {
        method: 'GET',
        url: 'https://tih-api.stb.gov.sg/content/v1/attractions/search?keyword='+ 
        this.searchField+ "&language=en&apikey=MnqCCPlkgGWec8BPY7FeV8s7MkmBxP4h"
      };
      
      axios.request(options)
      .then(response=>{
          var attractionData = response.data.data;
          this.attractionDict=[]
          this.attractionCat=[]
          this.errorMsg =""
        
          for (i=0; i<attractionData.length; i++){

            var desc = attractionData[i].description;
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
                let temp_photo = attractionData[i].images[0].uuid
                var photo = "https://tih-api.stb.gov.sg/media/v1/download/uuid/" + temp_photo +"?apikey=MnqCCPlkgGWec8BPY7FeV8s7MkmBxP4h"
            }}
  
            //extract all the type available in this dataset
            if(! this.attractionCat.includes(type)){
              this.attractionCat.push(type)}
            
            //store in a main dict
            this.attractionDict.push({attraction:name,category:type, desc:desc, photo:photo})
          }
     
        this.FilteredAttByCat = this.attractionDict
        // console.log(this.attractionResult )

        //alphabatically sort category type
        this.attractionCat.sort()
        this.displayField=this.searchField
        this.searchField=""
        this.displayText="Enter attraction here!"
        
      }).catch(error=> {
        this.searchField=""
        this.displayText = "Cannot find! Please enter again!"
        this.errorMsg="<span style='padding-top: 15px; font-size: small; color: red;'>No record found! Here are the recommended attractions!</span>"
      }
      )

  }},
  computed :{
    displaySelected(){
      if(this.selected_cat == "All"){
        this.FilteredAttByCat = this.attractionDict
        return
      }
      
      let tempResult = [];
      this.FilteredAttByCat =[];

      for (i=0; i<this.attractionDict.length; i++){
        if(this.attractionDict[i].category == this.selected_cat){
          tempResult.push(this.attractionDict[i])
          
        }
      }
      this.FilteredAttByCat = tempResult
      console.log(this.FilteredAttByCat)
    }

  }
})
const attraction_vm = attraction.mount('#attraction');


function display_image(){
    var temp_photo ="101489f1ec856e34735a436a4e819576c2e"
    var url= "https://tih-api.stb.gov.sg/media/v1/download/uuid/"+ temp_photo  +"?apikey=MnqCCPlkgGWec8BPY7FeV8s7MkmBxP4h"

    console.log("entered")

    axios.get(url)
    .then(response => {
        console.log("yes")
        console.log(response)
        console.log( response.data )


    })
    .catch(error => {
        console.log( error.message )
    })
  }
