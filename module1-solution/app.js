
angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope){
   
   $scope.dish = "";
   var text1 = "Too much";
   var text2 = "Enjoy";
   $scope.textPrinted = "";

   $scope.check = function (){
        var count = 0; 
        var elems = $scope.dish.split(","); 
 
        elems.forEach(element => {
            count++; 
        });

        if(elems.length-1==0){
            $scope.textPrinted = "Please enter data first";
        } else {
            if(count > 3){
                $scope.textPrinted = text1;
            }
            else 
                $scope.textPrinted = text2;
        }
        
    }

    $scope.checkCount = function (){ 
           return $scope.textPrinted;
    }

}

