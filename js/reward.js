
function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Show More"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Show Less"; 
    moreText.style.display = "inline";
  }
}

// function callingapi(){
//   var productDict ={};
//   var options = {
//     method: 'GET',
//     url: 'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list',
//     params: {country: 'singapore', lang: 'en_sg', currentpage: '0', pagesize: '30'},
//     headers: {
//       'x-rapidapi-host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com',
//       'x-rapidapi-key': '9061375655msh14a8e669554639cp108b6bjsn1f084a105610'
//     }
//   };
  
//   axios.request(options)
//   .then(response=>{
//     // console.log(response.data);

//       for (i=0; i<response.data.results.length; i++){
//         var productDetails=[]; 
//         var productName = response.data.results[i].name;
//         var category = response.data.results[i].categoryName;
//         var image = response.data.results[i].images[0].url;
//         var price = response.data.results[i].price.formattedValue;
//         productDetails.push(category);
//         productDetails.push(image);
//         productDetails.push(price);
//         // console.log(productName);
//         productDict[productName] = productDetails;
//         // productDict={productName: productDetails}
//       }
//       return productDict;
//   }).catch(function (error) {
//     console.error(error);
//   });
// }

// function productCard(){

// }
const app = Vue.createApp({
  data() {
    return {
        productCat: [],
        productDict:{}
    };
}, 
  created(){
    // var productDict ={};
    var options = {
        method: 'GET',
        url: 'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list',
        params: {country: 'singapore', lang: 'en_sg', currentpage: '0', pagesize: '30'},
        headers: {
          'x-rapidapi-host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com',
          'x-rapidapi-key': '9061375655msh14a8e669554639cp108b6bjsn1f084a105610'
        }
      };
      
      axios.request(options)
      .then(response=>{
        // console.log(response.data);
    
          for (i=0; i<response.data.results.length; i++){
            // put the data into a dictionary {productname:[category, image, price]}
            var productDetails=[]; 
            var productName = response.data.results[i].name;
            var category = response.data.results[i].categoryName;
            var image = response.data.results[i].images[0].url;
            var price = response.data.results[i].price.formattedValue;
            productDetails.push(category);
            productDetails.push(image);
            productDetails.push(price);
            this.productDict[productName] = productDetails;

            // retrive category data and put in a list [ladies, men, kids]
            if (!this.productCat.includes(category)){
              this.productCat.push(category);
              console.log(category);
            }
          }
          
          return this.productDict;
      }).catch(function (error) {
        console.error(error);
      });
  }
})
const vm = app.mount('#app');