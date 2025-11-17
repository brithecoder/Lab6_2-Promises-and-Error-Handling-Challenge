"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apiCalls = require("./apiSimulator");
var customErrors = require("./customErrors");
function runApplication() {
    apiCalls.fetchProductCatalog()
        .then(function (products) {
        console.log('---Products Retrieved Successfully ---');
        console.log("Found ".concat(products.length, " products."));
        products.forEach(function (product) {
            console.log(apiCalls.displayDetails(product));
        });
        // Store promises for review fetching
        var reviewPromises = products.map(function (product) {
            console.log("\n -> Attempting to fetch reviews for ".concat(product.name, " (ID: ").concat(product.id, ")..."));
            // 2. Fetch Reviews for Each Product
            return apiCalls.fetchProductReviews(product.id)
                .then(function (reviews) {
                console.log(" \u2705 Reviews for ".concat(product.name, ": ").concat(reviews.length, " total."));
            })
                .catch(function (e) {
                // Handle errors specifically for review fetching
                console.error(new customErrors.DataError(" \u274C Failed to get reviews for ".concat(product.name, ": [").concat(e.name, "] ").concat(e.message)));
            });
        });
        return Promise.allSettled(reviewPromises);
    })
        .then(function () {
        // After reviews are attempted, fetch the Sales Report
        console.log('\n--- Fetching Sales Report ---');
        return apiCalls.fetchSalesReport();
    })
        .then(function (reports) {
        console.log('✅ Sales Report Retrieved Successfully!');
        console.log(reports);
        var report = reports[0];
        if (report) {
            console.log("Total Sales: ".concat(report.totalSales));
            console.log("Units Sold: ".concat(report.unitsSold));
        }
    })
        .catch(function (error) {
        // 3. Global Error Handling
        // This catches errors from fetchProductCatalog() or fetchSalesReport()
        console.error('\n--- 🛑 FATAL ERROR DURING MAIN FETCH PROCESS ---');
        if (error instanceof customErrors.NetworkError) {
            console.error("\uD83C\uDF10 Network Issue: ".concat(error.message));
        }
        else if (error instanceof customErrors.DataError) {
            console.error("\uD83D\uDCCB Data Issue: ".concat(error.message));
        }
        else {
            console.error("\uD83D\uDD25 Unexpected Error: ".concat(error.message));
        }
    })
        .finally(function () {
        // 4. Final Logging
        console.log('\n--- All API calls have been attempted. Application finished. ---');
    });
}
runApplication();
