;(function() {

  angular
    .module('engelbertink')
    .controller('managementController', ManagementController);

  ManagementController.$inject = ['LocalStorage', 'QueryService', '$scope','$routeParams'];


  function ManagementController(LocalStorage, QueryService, $scope, $routeParams) {
    $scope.selectedItem;
    $scope.selectedMangel = 'Kies uw mangel...';
    $('.datepicker').datepicker({
        startDate: '-1d'
    });
    // 'controller as' syntax
    $scope.mangels = ['Mangel 1', 'Mangel 2', 'Mangel 3'];
    console.log('hoi');
    $scope.selectMangel = function(item){
        $scope.selectedMangel = item;
    }
  }


})();