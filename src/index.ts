import * as apiCalls from "./apiSimulator";
import * as customErrors from "./customErrors";

function runApplication (){
 apiCalls.fetchProductCatalog()
 .then((products)=>{
    console.log('---Products Retrieved Successfully ---');
      console.log(`Found ${products.length} products.`);
      products.forEach(product =>{
         console.log(apiCalls.displayDetails(product));
      });
   // Store promises for review fetching
      const reviewPromises = products.map((product) => {
        console.log(`\n -> Attempting to fetch reviews for ${product.name} (ID: ${product.id})...`);
        // 2. Fetch Reviews for Each Product
        return apiCalls.fetchProductReviews(product.id)
          .then((reviews) => {
            console.log(` ✅ Reviews for ${product.name}: ${reviews.length} total.`);
          })
          .catch((e) => {
            // Handle errors specifically for review fetching
            console.error(new customErrors.DataError(` ❌ Failed to get reviews for ${product.name}: [${e.name}] ${e.message}`));
          });
        });
          return Promise.allSettled(reviewPromises);
        })
          .then(() => {
      // After reviews are attempted, fetch the Sales Report
      console.log('\n--- Fetching Sales Report ---');
      return apiCalls.fetchSalesReport();

      })
    .then((reports) => {
      console.log('✅ Sales Report Retrieved Successfully!');
      console.log(reports);
      const report = reports[0];
      if(report){
      console.log(`Total Sales: ${report.totalSales}`);
      console.log(`Units Sold: ${report.unitsSold}`);
      }
    })
    .catch((error) => {
      // 3. Global Error Handling
      // This catches errors from fetchProductCatalog() or fetchSalesReport()
      console.error('--- 🛑 FATAL ERROR DURING MAIN FETCH PROCESS ---');
      if (error instanceof customErrors.NetworkError) {
        console.error(`🌐 Network Issue: ${error.message}`);
      } else if (error instanceof customErrors.DataError) {
        console.error(`📋 Data Issue: ${error.message}`);
      } else {
        console.error(`🔥 Unexpected Error: ${error.message}`);
      }
    })
    .finally(() => {
      // 4. Final Logging
      console.log('--- All API calls have been attempted. Application finished. ---');
    });
}
 runApplication();

