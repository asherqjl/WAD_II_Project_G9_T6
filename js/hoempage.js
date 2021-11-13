// const homeAttract = Vue.createApp({
//     data() {
//       return {
//         attractionDict:[]
//       };
//     },
//     created(){
//         var options = {
//             method: 'GET',
//             url: 'https://tih-api.stb.gov.sg/content/v1/attractions/search?keyword=arts&language=en&apikey=MnqCCPlkgGWec8BPY7FeV8s7MkmBxP4h'
//           };
//           axios.request(options)
//           .then(response=>{
//               var attractionData = response.data.data;
//               console.log(attractionData)

//               for (i=0; i<attractionData.length; i++){

//                   //image data
//                   if(!attractionData[i].images[0]){
//                       var photo = ""
//                     }
//                 else{
//                     if(attractionData[i].images[0].url.startsWith("https://")){
//                         var photo = attractionData[i].images[0].url
//                     }
//                     else if(attractionData[i].images[0].uuid.length >2){
//                         let temp_photo = attractionData[i].images[0].uuid
//                         var photo = "https://tih-api.stb.gov.sg/media/v1/download/uuid/" + temp_photo +"?apikey=MnqCCPlkgGWec8BPY7FeV8s7MkmBxP4h"
//                     }
//                 }
                    
//                 this.attractionDict.push({photo:photo})
//             }
//             })
//         }})
// const home_vm =  homeAttract.mount('#homeCarousel')



const homeAttract = Vue.createApp({
    // el: '.js-slideshow',
    data() {
        return{
            current: 0,
            slides: [],
            speed: 3000,
            timer: null
        }
    },
    methods: {
      startRotation() {
        this.timer = setInterval(this.next, this.speed);
      },
      stopRotation() {
        clearTimeout(this.timer);
        this.timer = null;
      },
      next() {
        var current = this.current;
        var next = current + 1;
  
        if (next > this.slides.length - 1) {
          next = 0;
        }
        this.current = next;
        this.setActive(this.current);
      },
      prev() {
        var current = this.current;
        var prev = current - 1;
  
        if (prev < 0) {
          prev = this.slides.length -1;
        }
  
        this.current = prev;
        this.setActive(this.current);
      },
      isActive(slide) {
        return this.current === slide;
      },
      setActive(slide) {
        this.current = slide;
      },
    },
    created() {
      axios.get('https://s3-us-west-2.amazonaws.com/s.cdpn.io/4723/slides.json')
      .then(function (response) {
        this.slides = response.data.slides
      }.bind(this))
      .catch(error => {
        console.log(error);
      });
    }
  });
const home_vm =  homeAttract.mount('#homeCarousel')
