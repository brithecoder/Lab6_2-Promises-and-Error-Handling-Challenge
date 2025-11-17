"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayDetails = exports.fetchProductCatalog = void 0;
exports.fetchProductReviews = fetchProductReviews;
exports.fetchSalesReport = fetchSalesReport;
var customErrors_1 = require("./customErrors");
var fetchProductCatalog = function () {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (Math.random() < 0.8) {
                resolve([
                    { id: 1, name: "Laptop", price: 1200 },
                    { id: 2, name: "Headphones", price: 200 },
                    { id: 3, name: "Charger", price: 10 }
                ]);
            }
            else {
                reject(new customErrors_1.NetworkError("Failed to fetch product catalog"));
            }
        }, 1000);
    });
};
exports.fetchProductCatalog = fetchProductCatalog;
var displayDetails = function (product) {
    return "".concat(product.name, " costs $").concat("".concat(product.price), " and ID is: ").concat("".concat(product.id));
};
exports.displayDetails = displayDetails;
function fetchProductReviews(productId) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (Math.random() < 0.8) {
                var allReviews = [
                    { productId: 1, rating: 5, comment: "This laptop is cool", },
                    { productId: 1, rating: 4, comment: "Should have purchased two" },
                    { productId: 2, rating: 10, comment: "These headphones are loud" }
                ];
                var filteredReviews = allReviews.filter(function (review) { return review.productId === productId; });
                resolve(filteredReviews);
            }
            else {
                reject(new customErrors_1.DataError("Failed to fetch reviews for product ID ".concat(productId)));
            }
            ;
        }, 1500);
    });
}
;
function fetchSalesReport() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (Math.random() < 0.8) {
                var salesReport = [
                    { totalSales: 20, unitsSold: 32, averagePrice: 100.00 }
                ];
                resolve(salesReport);
            }
            else {
                reject(new customErrors_1.NetworkError("Failed to fetch sales report"));
            }
        }, 1000);
    });
}
