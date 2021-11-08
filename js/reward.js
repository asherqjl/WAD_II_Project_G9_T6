
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
        pointCat:{"0_500":"UNDER 500","501_1000":"501-1000","1001_2000":"1001 & ABOVE"},
        productDict:[],
        filtertype:[],
        filterpoint:[],
        productfilter:[]
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
        'x-rapidapi-key': '1e670fe13emshd57432c4f489abap194516jsn2be446bb51dc'
      }
    };
    
      
      axios.request(options)
      .then(response=>{
        // console.log(response.data);
        var productdata = response.data;
        this.ProductDetails(productdata);
        this.filterbycategories(this.productDict);
        // this.productfilter = this.productDict;
        // console.log(this.productfilter)
        
      }).catch(function (error) {
        console.error(error);
      });
      
    
    
  },
  methods:{
    redeempoint(productprice){
      // split dollar sign and number e.g. $ 49.99
      var splitprice = productprice.split("$ ");
      var actualprice = Number(splitprice[1]);
      var points = 0;

      if(Number(actualprice) < 20){
        points = 200
      }else if(Number(actualprice)<30){
        points = 400
      }else if(Number(actualprice)<40){
        points = 600
      }else if(Number(actualprice)< 50){
        points = 800
      }else if(Number(actualprice)< 60){
        points = 1000
      }else{
        points = 1500
      }
      // console.log(points)
      return points
      
    },
    ProductDetails(productdata) {
      console.log(productdata.results.length)
      for (i=0; i<productdata.results.length; i++){
        // put the data into a dictionary {{product: productname, category：category, img：image, price：price},}
        // var productDetails=[]; 
        var productName = productdata.results[i].name;
        var productcategory = productdata.results[i].categoryName;
        var productimage = productdata.results[i].images[0].url;
        var productprice = productdata.results[i].price.formattedValue;
        var points = this.redeempoint(productprice);

        // productDetails.push(category);
        // productDetails.push(image);
        // productDetails.push(price);
      
        // productDetails = {category:productcategory, image:productimage, price:productprice};

        if(!this.productDict[productimage]){
          // this.productDict[productName] = productDetails;
          this.productDict.push({product:productName,category:productcategory, image:productimage, point:points, price:productprice}) ;
        }
        // else{
        //   productName += "_2";
        //   // this.productDict[productName] = productDetails;
        //   this.productDict.push({product:productName,category:productcategory, image:productimage, price:productprice});
        // }

        // console.log(productName)
        // console.log(Object.keys(this.productDict).length);
        // console.log(this.productDict[0])
      
        // retrive category data and put in a dictionary with total number of count {ladies:0, kids:0, men:0}
        if (!this.productCat[productcategory]){
          this.productCat[productcategory] = 1;
        }else{
          this.productCat[productcategory] +=1;        
        }
      }
      // console.log(Object.keys(this.productDict).length);
      // console.log(this.productDict)
      
      return this.productDict;
    },
    filterbycategories(data){
      var filterdata = [];
      if(this.filterpoint.length !=0 && this.filtertype.length !=0){
        var firstdata = [];
        
        for (var i=0; i<this.filtertype.length; i++){
          for (var j=0; j<Object.keys(data).length; j++){
            if (this.filtertype[i]==data[j].category){
              firstdata.push(data[j])
            }
          }
        }
        for (var i=0; i<this.filterpoint.length; i++){
          var minNu= this.filterpoint[i].split("_")[0];
          var maxNu = this.filterpoint[i].split("_")[1];
          
          for (var j=0; j<Object.keys(firstdata).length; j++){
            console.log(firstdata[j].point, maxNu)
            if (firstdata[j].point>=minNu && firstdata[j].point<=maxNu){
              filterdata.push(firstdata[j])
            }
          }
        }
      }
      else if (this.filterpoint.length !=0 && this.filtertype.length==0){
        
        for (var i=0; i<this.filterpoint.length; i++){
          var minNu= this.filterpoint[i].split("_")[0];
          var maxNu = this.filterpoint[i].split("_")[1];
          for (var j=0; j<Object.keys(data).length; j++){
            if (data[j].point>=minNu &&data[j].point<=maxNu){
              filterdata.push(data[j])
            }
          }
        }
      }else if(this.filterpoint.length ==0 && this.filtertype.length !=0){       
        for (var i=0; i<this.filtertype.length; i++){
          for (var j=0; j<Object.keys(data).length; j++){
            if (this.filtertype[i]==data[j].category){
              filterdata.push(data[j])
            }
          }
        }
      }else{
        filterdata= data;
        console.log(filterdata);
        
      }
      console.log(filterdata);
      this.productfilter = filterdata;
      return this.productfilter;

      // console.log(this.filtertype);
      // return this.productDict;
    }
  }
})
const rw = reward.mount('#reward');

