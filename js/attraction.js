
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
          console.log(attractionData)

          this.errorMsg =""
        
          for (i=0; i<attractionData.length; i++){
            var desc = attractionData[i].description;
            var name = attractionData[i].name;
            var type = attractionData[i].type; 

            //clean the mrt data
            var mrt = attractionData[i].nearestMrtStation.trim().toLowerCase()
            // console.log(mrt)
            if(mrt.length>0){
              //settle the outlier data w random syntax
              if(mrt.includes("/")){
                let mrtManyMany =[]
                let tempMrt = mrt.split("/")

                for (j=0; j<tempMrt.length; j++){
                  tempMrt[j] = this.validateMRT(tempMrt[j])

                  if(! mrtManyMany.includes(tempMrt[j])){
                    mrtManyMany.push(tempMrt[j])}
                  if(! this.MRTlist.includes(tempMrt[j])){
                    this.MRTlist.push(tempMrt[j])}
                }
                mrt = mrtManyMany.join()
              }
              else if(mrt.includes(",")){
                let mrtManyMany =[]
                let tempMrt = mrt.split(",")

                for (k=0; k<tempMrt.length; k++){
                  tempMrt[k] = this.validateMRT(tempMrt[k])

                  if(! mrtManyMany.includes(tempMrt[k])){
                    mrtManyMany.push(tempMrt[k])}
                  if(! this.MRTlist.includes(tempMrt[k])){
                    this.MRTlist.push(tempMrt[k])}
                }
                mrt = mrtManyMany.join()
              }
              else{
                if(/\d/.test(mrt)){   //if got random noise
                  let newMRT =""
                  let tempMrt = mrt.split(" ")
                  for (l=0; l<tempMrt.length; l++){
                    if (/^[a-z]+$/i.test(tempMrt[l])){
                      tempMrt[l] = this.capitalizeLetter(tempMrt[l].trim())
                      newMRT +=tempMrt[l]}
                  }
                  mrt =newMRT
                  if(! this.MRTlist.includes(newMRT)){
                    this.MRTlist.push(newMRT)}
                }else{
                  mrt = this.validateMRT(mrt)
                  if(! this.MRTlist.includes(mrt)){
                    this.MRTlist.push(mrt)
                  }
                }
              }
            }

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
          
        //sort alphabatically
        this.attractionCat.sort()
        this.MRTlist.sort()
        this.FilteredAttByCat = this.attractionDict   //update the display dict

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
  searchAttraction(){      //for input search , clear the initial data in dict
    this.buttonCount= -1;  //initialize buttonCount for later displaying part
    this.attractionDict=[]
    this.attractionCat=[]
    this.MRTlist =[]
    this.displaySeeMore =""

    this.getAttraction(this.searchField)
  },
  validateMRT(train){
    train = train.trim()
    if (train.includes("station")){
      train = train.split("station")[0].trim()
    }
    if (train.includes("mrt")){
      train = train.split("mrt")[0].trim()
    }
    train = this.capitalizeLetter(train)
    return train
  },
  capitalizeLetter(text){  //capitalize first char to make looks visually pleasing..
    const words = text.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
  }
  },
  computed :{
    displaySelected(){

      
      if(this.selected_cat == "All" && this.selectedMRT.length ==0 ){
        this.FilteredAttByCat = this.attractionDict
        return
      }
      
      let tempResult = [];
      this.FilteredAttByCat =[];
      // console.log(this.attractionDict)
      // console.log(this.selectedMRT)


      for (i=0; i<this.attractionDict.length; i++){
        if(this.attractionDict[i].mrt.includes(",")){
          
          // console.log(this.attractionDict[i].mrt)
        }
        if(this.attractionDict[i].category == this.selected_cat ){
          tempResult.push(this.attractionDict[i])
        }
      }
      this.FilteredAttByCat = tempResult
      // console.log(this.FilteredAttByCat)
    }

  }
})
const attraction_vm = attraction.mount('#attraction');