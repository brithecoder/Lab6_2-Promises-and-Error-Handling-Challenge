import { DataError, NetworkError } from "./customErrors";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Review {
  productId: number;
  rating: number;
  comment: string;
}

interface SalesReport {
  totalSales: number;
  unitsSold: number;
  averagePrice: number;
}





export const fetchProductCatalog = (): Promise<Product[]> => {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() < 0.8) {
         resolve([
            { id: 1, name: "Laptop", price: 1200 },
            { id: 2, name: "Headphones", price: 200 },
            {id: 3, name: "Charger", price: 10}
        ]);
        } else {
        reject (new NetworkError("Failed to fetch product catalog"));
        }
    }, 1000)
    });
};

export const displayDetails = (product: Product) =>{
   return "".concat(product.name, " costs $").concat(`${product.price}`, " and ID is: ").concat(`${product.id}`);

}

export function fetchProductReviews(productId: number):Promise  <Review[]>{
    return new Promise((resolve,reject) => {
    setTimeout(() =>{
    if (Math.random() < 0.8) {
         const allReviews =[
            { productId:1,rating:5, comment: "This laptop is cool",},
            {productId:1,rating:4, comment:"Should have purchased two"},
            {productId:2,rating:10, comment:"These headphones are loud"}
         ];
         const filteredReviews = allReviews.filter(review => review.productId === productId);
         resolve(filteredReviews);
      }else {
        reject(new DataError(`Failed to fetch reviews for product ID ${productId}`))
    };
    },1500);
    });
};

export function fetchSalesReport():Promise<SalesReport[]> {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            if(Math.random() < 0.8){
                const salesReport =[
                    {totalSales: 20, unitsSold: 32 ,averagePrice:100.00}
                ];
                resolve(salesReport);
            }else {
                reject (new NetworkError(`Failed to fetch sales report`));
    }},1000);
    })
}