
// function myFunction() {
//   var dots = document.getElementById("dots");
//   var moreText = document.getElementById("more");
//   var btnText = document.getElementById("myBtn");

//   if (dots.style.display === "none") {
//     dots.style.display = "inline";
//     btnText.innerHTML = "Show More"; 
//     moreText.style.display = "none";
//   } else {
//     dots.style.display = "none";
//     btnText.innerHTML = "Show Less"; 
//     moreText.style.display = "inline";
//   }
// }

function AutoCloseTimer(){
  let timerInterval
  Swal.fire({
    title: 'Auto close alert!',
    html: 'I will close in <b></b> milliseconds.',
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
      const b = Swal.getHtmlContainer().querySelector('b')
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer')
    }
  })
}

const reward = Vue.createApp({
  data() {
    return {
        productCat:{},
        pointCat:{"0_500":"UNDER 500","501_1000":"501-1000","1001_2000":"1001 & ABOVE"},
        productDict:[],
        filtertype:[],
        filterpoint:[],
        productfilter:[],
        searchfield:"",
        sorttype:"Points",
        iconButton:"<button class='btn btn-secondary btn-block'><i class='fas fa-sort-amount-down-alt'></i></button>",
        iconButton2: "<button class='btn btn-secondary btn-block'><i class='fas fa-sort-alpha-down'></i></button>",
        userpoints: localStorage.getItem('user_points')
    };
}, 
  created(){
    // var productDict ={};
    // console.log(this.sorttype)
    this.AutoCloseTimer();
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
        this.sortbytype();
        // this.productfilter = this.productDict;
        // console.log(this.productfilter)
        
      }).catch(function (error) {
        console.error(error);
      });
      
    
    
  },
  methods:{
    AutoCloseTimer(){
      let timerInterval
      Swal.fire({
        title: 'Auto close alert!',
        html: 'I will close in <b></b> milliseconds.',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          const b = Swal.getHtmlContainer().querySelector('b')
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      })
    },
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
      console.log(data) 
      var filterdata = [];
      if(this.searchfield !=""){
        data=this.searchproduct()
      }
      console.log(this.searchfield)
      // console.log(t)
      
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
            //console.log(firstdata[j].point, maxNu)
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
        if(this.searchfield !=""){
          filterdata=this.searchproduct()
        }else{
          filterdata= data;        
        }
      }
      // console.log(filterdata);
      
      this.productfilter = filterdata;
      this.sortbytype();
      return this.productfilter;

      // console.log(this.filtertype);
      // return this.productDict;
    },
    sortbytype(){
      // console.log(this.productfilter.length)
      if(this.sorttype=="Points"){
        if(this.iconButton =="<button class='btn btn-secondary btn-block'><i class='fas fa-sort-amount-down-alt'></i></button>"){
          this.productfilter.sort( function ( a, b ) { return a.point - b.point; } )
        }else{
          this.productfilter.sort( function ( a, b ) { return b.point - a.point; } )
        }    
      }else{
        if(this.iconButton =="<button class='btn btn-secondary btn-block'><i class='fas fa-sort-amount-down-alt'></i></button>"){
          this.productfilter.sort(function (a,b){if (a.product<b.product){return-1}else if(a.product>b.product){return 1}else{return 0}})
        }else{
          this.productfilter.sort(function (a,b){if (a.product<b.product){return 1}else if(a.product>b.product){return -1}else{return 0}})
        }
      }
      return this.productfilter
    },
    clickIcon(){
      if(this.iconButton == "<button class='btn btn-secondary btn-block'><i class='fas fa-sort-amount-down-alt'></i></button>" ){
        this.iconButton = "<button class='btn btn-secondary btn-block'><i class='fas fa-sort-amount-up'></i></button>"
      }else{
        this.iconButton = "<button class='btn btn-secondary btn-block'><i class='fas fa-sort-amount-down-alt'></i></button>" 
      }
    },
    changebutton(){
      console.log("hi")
      console.log(this.sorttype)
      if(this.sorttype=="Name"){
        this.iconButton = "<button class='btn btn-secondary btn-block'><i class='fas fa-sort-alpha-down'></i></button>"
      }else{
        this.iconButton == "<button class='btn btn-secondary btn-block'><i class='fas fa-sort-alpha-down-alt'></i></button>" 
      }
    },
    searchproduct(){
      var usersearch = this.searchfield.trim();
      if(this.filtertype !=0 || this.filterpoint !=0){
        var ALLproduct = this.productfilter;
      }else{
        var ALLproduct = this.productDict;
      }
      var filter = [];

      for (var i = 0; i < ALLproduct.length; i++){
        if(ALLproduct[i].product.toLowerCase().includes(usersearch)){
          filter.push(ALLproduct[i])
        }
      }
      this.productfilter=filter;
      return this.productfilter;
    },
    deductPoints(){
        const userPoints = localStorage.getItem('user_points');
        const userName = localStorage.getItem('user_name');
        const userEmail = localStorage.getItem('user_email');

        // Database creation
        // Create an instance of a db object for us to store the open database in
        let db;
        window.onload = function() {
        nameDisplayCheck();
        // Open our database; it is created if it doesn't already exist
        // (see onupgradeneeded below)
        let request = window.indexedDB.open('smilingAcrossLocal', 2);
        // onerror handler signifies that the database didn't open successfully
        request.onerror = function() {
          console.log('Database failed to open');
        };
        request.onsuccess = function() {
          console.log('Database opened successfully');
          db = request.result;
          displayData();
        };
        deduct;
        function deduct(){
          

          let transaction = db.transaction(['user_acc'], 'readwrite');

          // call an object store that's already been added to the database
          let objectStore = transaction.objectStore('user_acc');        
          objectStore.openCursor().onsuccess = function(e){
              let cursor = e.target.result;
              if (cursor) {
                  if (cursor.value.user_name == userName) {
                      const updateData = cursor.value;
                      console.log(updateData);
                      updateData.points = userPoints;
                      const request = cursor.update(updateData);

                      request.onerror = function() {
                          alert("Update Failed");
                      };

                      request.onsuccess = function() {
                          alert("Redeem Successful");
                          window.location.href = "fangTing.html"; 
                      };

                  }  
                  cursor.continue();

              } 
          }
        }
        // Checking
        // to console.log data that's been added into the database see what is inside the database
        function displayData() {
          let objectStore = db.transaction('user_acc').objectStore('user_acc');

          objectStore.openCursor().onsuccess = function(e) {
              // Get a reference to the cursor
              let cursor = e.target.result;

              // If there is still another data item to iterate through, keep running this code
              if(cursor) {
                  
                  if (cursor.value.user_name == userName) {
                      console.log(cursor.value)
                  }
                  
                  cursor.continue();
              } else {
                  // if there are no more cursor items to iterate through, say so
                  console.log('Cursor is empty / Table is empty')
              }
          };
        }
        }
    }
  }
})
const rw = reward.mount('#reward');


