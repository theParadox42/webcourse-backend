var faker = require("faker")
function printFakeProduct(){
    console.log(faker.fake("The product, {{commerce.productName}}, is {{commerce.price}}"))
}
for(var i = 0; i < 10; i ++){
    printFakeProduct()
}