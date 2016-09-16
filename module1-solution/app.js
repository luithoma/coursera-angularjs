(function(){
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController',LunchCheckController);

  LunchCheckController.$inject=['$scope'];

  function LunchCheckController($scope){
    $scope.textbox="";
    $scope.message="";
    $scope.txtMsg="";
    $scope.color="black";

    $scope.checkLunch = function(){

      if ($scope.textbox == ""){
        $scope.color="red";
        $scope.message="Please enter data first";
      }
      else{
        $scope.color="green";
        var arrayOfStrings = $scope.textbox.split(',');
        // console.log("array: " + arrayOfStrings.toString());
        // console.log("Lenght: " + arrayOfStrings.length);
        var size=arrayOfStrings.length;

        //count empty string
        var emptyStrCount = 0;
        for (var i=0; i < size; i++){
          if (arrayOfStrings[i].trim() == ''){
            emptyStrCount++;
          }
        }
        //text message
        $scope.txtMsg="";
        if (emptyStrCount > 0){
          $scope.txtMsg="NOT consider empty item";
        }

        //console.log("number: "+ emptyStrCount);
        var actualItem = size - emptyStrCount;

        if (actualItem <= 3){
          $scope.message="Enjoy!";
        }
        else{
          $scope.message="Too much!";
        }
      }
    }
  }
})()
