(function() {
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)
  .directive('foundItems',FoundItemsDirective)
  .constant('ApiBasePath',"https://davids-restaurant.herokuapp.com/");

  function FoundItemsDirective(){
    var ddo={
      restrict: "E",
      templateUrl: 'foundItems.html',
      controller: FoundItemsDirectiveController,
      controllerAs: 'fiDirctrl',
      bindToController: true,
      scope: {
      items: '<foundItems',
      onRemove: '&'
      }
    };
    return ddo;
  };

  function FoundItemsDirectiveController() {};

  NarrowItDownController.$inject=['MenuSearchService'];
  function NarrowItDownController (MenuSearchService){
    var list=this;
    list.searchTerm="";
    list.found="";
    list.showItem=false;

    list.getMenuItems = function(searchTerm){

      var promise=MenuSearchService.getMatchedMenuItems(searchTerm);

      promise.then(function(response){
        list.found=response;
        //console.log(list.found);
        list.showItem=true;
      })
      .catch(function(error){
        console.log("Something wrong in http!");
        list.showItem=true;
      });
    };

    list.removeItem = function(index){
      console.log('this is' , this);
      console.log("Remove item: " + index);
      list.found.splice(index,1);
    };
  };

  MenuSearchService.$inject=['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath){
    var service=this;

    service.getMatchedMenuItems = function (searchTerm){
      var response=$http({
        method: "Get",
        url: (ApiBasePath + "menu_items.json")
        }).then(function (result) {
        // process result and only keep items that match
        var foundResult = result.data;
        var foundItems = [];
        for(var i=1; i < foundResult.menu_items.length-1; i++){
          var desc = foundResult.menu_items[i].description;

          if (desc.toLowerCase().indexOf(searchTerm) !==-1 && searchTerm !==''){
            //console.log(desc);
            foundItems.push(foundResult.menu_items[i]);
          }
        }
        // return processed items
        return foundItems;
        });

      return response;

      };
    };
  })();
