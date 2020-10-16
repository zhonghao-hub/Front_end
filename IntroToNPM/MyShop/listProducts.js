var faker = require("faker");

console.log("Welcome to my shop:")
for(var i = 0; i < 10; i++){
    console.log(i + ". ~" +faker.commerce.productName() + "- $" + faker.commerce.price());
}
