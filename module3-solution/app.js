angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService',  MenuSearchService);

//Controllers
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
    
}

//Directive



//Service
function  MenuSearchService(){
    //getMatchedMenuItems(searchTerm);
}
