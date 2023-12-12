
angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


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

    service.addItem= function(index){
        boughtItems.push(itemsToBuy[index]); 
    }

    service.removeItem = function(item) {
        boughtItems.push(item);
        itemsToBuy.pop(item);
    }

    service.getBoughtItems = function (){
        return boughtItems; 
    }


}


