;(function() {

  angular
    .module('engelbertink')
    .controller('mangelController', MangelController);

  MangelController.$inject = ['LocalStorage', 'QueryService', '$scope','$routeParams'];


  function MangelController(LocalStorage, QueryService, $scope, $routeParams) {

    // 'controller as' syntax
    var self = this;
    $scope.mangel = $routeParams.id;

  }


})();