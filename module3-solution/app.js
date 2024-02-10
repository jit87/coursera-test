angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService',  MenuSearchService)
.directive('foundItems', FoundItemsDirective);

//Controllers
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
    var list = this; 
    
}

//Directives
function FoundItemsDirective(){
    var ddo = {
        templateURL: 'foundItemsDirective.html',
        scope: {
            items: '<',

            onRemove : '&'
        },
        controller: NarrowItDownController,
        controllerAs:'list',

    }
}


//Service
function  MenuSearchService(){
    getMatchedMenuItems(searchTerm)
    {
       /*return $http(...).then(function (result) {
            // process result and only keep items that match
            var foundItems...
        
            // return processed items
            return foundItems;
        });*/
    }
}
