angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService',  MenuSearchService)
.directive('foundItems', FoundItemsDirective);


//Controllers
function NarrowItDownController(MenuSearchService) {
    var list = this;
    list.searchTerm = '';
    list.found = [];  // Inicializa como un array vacío
  
    list.getMatchedMenuItems = function () {
      MenuSearchService.getMatchedMenuItems(list.searchTerm)
        .then(function (foundItems) {
          list.found = foundItems;
          console.log(list.found);
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    list.remove = function (index){
      list.found.splice(index, 1);
    }
  }

function ListDirectiveController() {
  var list = this;
}


//Directives
function FoundItemsDirective(){
    var ddo = {
        templateUrl: 'foundItems.html',
        scope: {
            items: '<',
            onRemove: '&'
        },
        controller: ListDirectiveController,
        controllerAs: 'list',
        bindToController: true
    };
    return ddo; 
}


//Services
MenuSearchService.$inject = ['$http'];
function MenuSearchService($http){

    this.getMatchedMenuItems = function (searchTerm) {
        var apiUrl = 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json';
        
        return $http.get(apiUrl)
          .then(function (response) {
            var menuData = response.data || {};
            var foundItems = [];

            // Iterar a través de las categorías
            for (var categoryKey in menuData) {
              if (menuData.hasOwnProperty(categoryKey)) {
                var category = menuData[categoryKey];

                // Lógica de búsqueda dentro de cada categoría
                foundItems = foundItems.concat(category.menu_items.filter(function (menuItem) {
                    return (
                        menuItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        menuItem.description.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                }));
              }
            }
            return foundItems;

          });

    };
    
}