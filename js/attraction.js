
const attraction = Vue.createApp({
  data() {
    return {
      searchField:"",   //input search textbox
      displayField:"",          //display which API cate is being called 
      displayPlaceholder:"Enter attraction here!",   //placeholder
      attractionDict: [],  //main data dict
      attractionCat:[],         //dropdown category option
      FilteredAttByCat:[],      //the filtered data
      errorMsg: '',             //display err msg if any
      selected_cat :"All" ,   //dropdown selected option
      MRTlist:[],            //checkbox mrt
      selectedMRT:[],
      buttonCount:0,         //when click button the count ++ 
      displaySeeMore: "<button type='button' class='btn btn-primary' >See More</button>"
    };
  },
  created(){
    this.getAttraction(this.searchField)
    }
  ,
  methods :{
    getAttraction(keyword){
      if(keyword.trim()==""){
        keyword ="adventure"
      }
      this.selected_cat = "All"

      var options = {
        method: 'GET',
        url: 'https://tih-api.stb.gov.sg/content/v1/attractions/search?keyword='+ 
        keyword + "&language=en&apikey=MnqCCPlkgGWec8BPY7FeV8s7MkmBxP4h"
      };
      
      axios.request(options)
      .then(response=>{
          var attractionData = response.data.data;
          // console.log(attractionData)
          this.errorMsg =""
        
          for (i=0; i<attractionData.length; i++){
            var desc = attractionData[i].description;
            var name = attractionData[i].name;
            var type = attractionData[i].type; 

            //clean mrt data
            var mrt = attractionData[i].nearestMrtStation.trim().toLowerCase()
            console.log(mrt)

            if(mrt.length>0){
              if(mrt.includes("/")){
                var tempMrt = mrt.split("/")
                var tempLen = tempMrt.length

                for (j=0; j<tempLen; j++){
                  console.log(tempMrt[j])

                }

                

              }

              // if (mrt.includes("/")){
              //   let temp_mrt = mrt.split("/")
              //   for(i=0; i<temp_mrt.length; i++){
              //     console.log(temp_mrt[i])
              //     // if (temp_mrt[i].includes("station")){
              //     //   temp_mrt[i] = temp_mrt[i].split("station")[0]
              //     //   console.log("Inneralter1 " + temp_mrt[i])
              //     // }

              //     // if (temp_mrt[i].includes("mrt")){
              //     //   temp_mrt[i] = temp_mrt[i].split("mrt")[0]
              //     //   console.log("Inneralter2 " + newMrt)
              //     // }

                  
              //     // if(! this.MRTlist.includes(temp_mrt[i])){
              //     //   this.MRTlist.push(temp_mrt[i])
                  
                
              

              if (mrt.includes("station")){
                mrt = mrt.split("station")[0]
                // console.log("Inneralter1 " + mrt)
              }

              if (mrt.includes("mrt")){
                mrt = mrt.split("mrt")[0]
                // console.log("Inneralter2 " + mrt)
              }

              
              if(! this.MRTlist.includes(mrt)){
                this.MRTlist.push(mrt)
              }
              // console.log(MRTlist)
            }
 
            
            // if(mrt && ! mrtList.includes(mrt)){
            //   if(
            //     mrt.includes("/"){
            //       const myArray = text.split(" ")
              // var mrt = mrt.replace(/\//g,'')
              // var mrt = mrt.replace(/station/g,'') 
            // dummyString = dummyString.replace(/-/g,'') 
            // if (tempMRT.length >0){
            //   console.log(tempMRT)
            // }
            // const mrtStr = mrt.charAt(0).toUpperCase() + mrt.slice(1);    
            // console.log(mrtStr)

            //image data
            if(!attractionData[i].images[0]){
              var photo = "./images/dummy-post-square-1.jpeg"
            }
            else{
              if(attractionData[i].images[0].url.startsWith("https://")){
                var photo = attractionData[i].images[0].url
              }
              else if(attractionData[i].images[0].uuid.length >2){
                let temp_photo = attractionData[i].images[0].uuid
                var photo = "https://tih-api.stb.gov.sg/media/v1/download/uuid/" + temp_photo +"?apikey=MnqCCPlkgGWec8BPY7FeV8s7MkmBxP4h"
              }
            }
  
            //extract all the type available in this dataset
            if(! this.attractionCat.includes(type)){
              this.attractionCat.push(type)}

            //store in a main dict
            this.attractionDict.push({attraction:name,category:type, desc:desc, photo:photo , mrt:mrt})
          }
          
          //sort category type alphabatically
        this.attractionCat.sort()

        //push to the dict that will be iterated in the main html
        this.FilteredAttByCat = this.attractionDict
        // console.log(this.MRTlist)

        //format the "Displaying list of.." to make it sounds legit
        if(keyword == "adventure" ||keyword == "arts" || keyword == "history&culture" || keyword =="nature&wildlife" || keyword =="Leisure&Recreation" ){
          this.displayField= "Singapore Key Attractions!"
        }else{
          this.displayField= keyword
        }

        this.searchField=""
        this.displayPlaceholder="Enter attraction here!"
        return this.attractionDict
        
      }).catch(error=> {
        this.searchField=""
        this.displayField =keyword
        this.displaySeeMore =""
        this.displayPlaceholder = "Cannot find! Please enter another Attraction Name!"
        this.errorMsg="<span style='padding-top: 15px; font-size: small; color: red;'>No record found! Take a look at our recommended attractions? <button type='button' class='btn btn-primary btn-sm ml-50'>Yes!</button></span>"
      }
      )

  }, 
  buttonDisplay(){   //display 100 set of attraction -fk off duplication 
    this.buttonCount+=1;
    // console.log(this.buttonCount)
    let defaultkeyword= ['adventure','arts','history&culture', 'nature&wildlife', 'Leisure&Recreation']

    if(this.buttonCount<5){
      // console.log(defaultkeyword[this.buttonCount])
      this.getAttraction(defaultkeyword[this.buttonCount])
      this.displaySeeMore= "<button type='button' class='btn btn-primary' >See More</button>"
    }else{
      this.displaySeeMore= ""
    }
  },
  searchAttraction(){      //if use search function, clear the initial data in dict
    //clear the initial data
    this.buttonCount= -1;  //initialize buttonCount for later displaying part
    this.attractionDict=[]
    this.attractionCat=[]
    this.displaySeeMore =""

    this.getAttraction(this.searchField)
  }

  },
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
      // console.log(this.FilteredAttByCat)
    }

  }
})
const attraction_vm = attraction.mount('#attraction');