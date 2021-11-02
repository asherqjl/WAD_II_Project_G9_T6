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
const reward = Vue.createApp({
  data() {
    return {
        productCat:{},
        productDict:{},
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
        var productdata = response.data;
        this.ProductDetails(productdata);
        this.ProductCard();
          
      }).catch(function (error) {
        console.error(error);
      });
  },
  methods:{
    ProductDetails(productdata) {
      console.log(productdata.results.length)
      for (i=0; i<productdata.results.length; i++){
        // put the data into a dictionary {productname:[category, image, price]}
        var productDetails=[]; 
        var productName = productdata.results[i].name;
        var category = productdata.results[i].categoryName;
        var image = productdata.results[i].images[0].url;
        var price = productdata.results[i].price.formattedValue;
        productDetails.push(category);
        productDetails.push(image);
        productDetails.push(price);

        if(!this.productDict[productName]){
          this.productDict[productName] = productDetails;
        }else{
          productName += "_2";
          this.productDict[productName] = productDetails;
        }


        // console.log(productName)
        // console.log(Object.keys(this.productDict).length);
        
      
        // retrive category data and put in a dictionary with total number of count [ladies:0, kids:0, men:0]
        if (!this.productCat[category]){
          // console.log("hi");
          // this.productCat.push(category);
          this.productCat[category] = 1;
          // console.log(this.productCat)
        }else{
          // console.log("hey")
          this.productCat[category] +=1;        
        }
      }
      console.log(Object.keys(this.productDict).length);
      return this.productDict;
    },
    ProductCard(){
      console.log(Object.keys(this.productDict).length)
      for (i=0; i<this.productDict.length; i++){
        
      }
      
    }
  }
})
const rw = reward.mount('#reward');

