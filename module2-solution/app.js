(function(){
  'use strict';
  angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyShoppingController',ToBuyShoppingController)
  .controller('AlreadyBoughtShoppingController',AlreadyBoughtShoppingController)
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

  ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyShoppingController(ShoppingListCheckOffService) {
    var list1=this;
    // console.log(ShoppingListCheckOffService.getBuyItems());
    list1.items = ShoppingListCheckOffService.getBuyItems();

    // transfer the item from ToBuylist to Brough list
    list1.transferItem = function (itemIndex) {
      ShoppingListCheckOffService.transferBuyListItem(itemIndex);
    }
  };

  AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
    var list2=this;
    // console.log(ShoppingListCheckOffService.getBroughItems());
    list2.items = ShoppingListCheckOffService.getBroughItems();
  };

  function ShoppingListCheckOffService() {
    var service=this;

    var buyItems=[
                { name: "cookies", quantity: 10 },
                { name: "biscuit", quantity: 9 },
                { name: "chocolate", quantity:8},
                { name: "chip", quantity:7},
                { name: "milk", quantity:6},
                ];

    var broughItems=[];

    service.getBuyItems = function () {
      return buyItems;
    };

    service.getBroughItems = function() {
      return broughItems;
    };

    service.transferBuyListItem = function(itemIndex){
      var name=buyItems[itemIndex].name;
      var quantity=buyItems[itemIndex].quantity;
      var item = {
        name:name,
        quantity:quantity
      }
      buyItems.splice(itemIndex,1);
      broughItems.push(item);
    }
  }
})()
