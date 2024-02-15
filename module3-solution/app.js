angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService',  MenuSearchService)
.directive('foundItems', FoundItemsDirective);


//Controllers
function NarrowItDownController(MenuSearchService) {
    var list = this;
    list.searchTerm = '';
    list.found = [];  // Inicializa como un array vacío
    list.showNotFound = false; 
  
    list.getMatchedMenuItems = function () {
    // Verifica si el término de búsqueda está vacío antes de hacer la solicitud HTTP
    if(!list.searchTerm || list.searchTerm.trim() === '') {
          list.found = [];
          list.showNotFound = true;
          return;
      }
      MenuSearchService.getMatchedMenuItems(list.searchTerm)
        .then(function (foundItems) {
          list.found = foundItems;
          list.showNotFound = list.found.length === 0;
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
        bindToController: true,
        transclude: true
    };
    return ddo; 
}


//Services
// Services
MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
    this.getMatchedMenuItems = function (searchTerm) {
        // Verificar si el término de búsqueda es nulo o está vacío
        if (!searchTerm || searchTerm.trim() === '') {
            // Si es así, devolver una promesa resuelta con un array vacío
            return Promise.resolve([]);
        } else {
            // Si hay un término de búsqueda válido, realizar la solicitud HTTP
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
        }
    };
}
