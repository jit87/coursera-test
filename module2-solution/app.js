
angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

//Controllers
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){

    var buyList = this; 

    buyList.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();
    buyList.removeProduct = function (item) {
        ShoppingListCheckOffService.removeItem(item);
    }

}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){

    var boughtList = this; 

    boughtList.boughtItems = ShoppingListCheckOffService.getBoughtItems();

}


//Service
function ShoppingListCheckOffService(){
    var service = this; 

    var itemsToBuy = [ 
        {
            quantity: "10",
            name: "Cookies"
        },
        {
            quantity: "1 bottle",
            name: "Rioja Wine"
        },
        {
            quantity: "1 bottle",
            name: "Milk"
        },
        {
            quantity: "5 kg",
            name: "Potatoes"
        },
        {
            quantity: "800 g",
            name: "Sugar"
        }
    ]; 

    var boughtItems = []; 
 

    service.getItemsToBuy = function (){
        return itemsToBuy; 
    }

    service.removeItem = function(item) {
        //This obtains position in Array of To Buy list
        var index = itemsToBuy.indexOf(item); 
        //Adds the bought product to Bought List and removes it from To Buy List
        boughtItems.push(item);
        itemsToBuy.splice(index,1);
    }

    service.getBoughtItems = function (){
        return boughtItems; 
    }


}


