;(function() {

  angular
    .module('engelbertink')
    .controller('mangelController', MangelController);

  MangelController.$inject = ['LocalStorage', 'QueryService', '$scope','$routeParams'];


  function MangelController(LocalStorage, QueryService, $scope, $routeParams) {

    // 'controller as' syntax
    console.log('hoi')
    $scope.tonen = false;
    $scope.niettonen = true;
    var self = this;
    $scope.mangel = $routeParams.id;

    $scope.zoekKlant = function(){
      $scope.tonen = true;
      $scope.niettonen = false;
    }

  }


})();