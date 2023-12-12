
angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){

    var buyList = this; 
    buyList.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();
    buyList.removeProduct = function (index) {
        console.log(index);
        ShoppingListCheckOffService.removeItem(index);
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

    service.removeItem = function(index) {
        boughtItems.push(itemsToBuy[index]);
        itemsToBuy.pop(index);
    }

    service.getBoughtItems = function (){
        return boughtItems; 
    }


}


