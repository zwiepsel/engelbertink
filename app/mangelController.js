;(function() {

  angular
    .module('engelbertink')
    .controller('mangelController', MangelController);

  MangelController.$inject = ['LocalStorage', 'QueryService', '$scope','$routeParams'];


  function MangelController(LocalStorage, QueryService, $scope, $routeParams) {

    // 'controller as' syntax
    $scope.tonen = false;
    $scope.niettonen = true;
    $scope.wassie = [];
    $scope.data = [];
    //$scope.wasprogrammas = [];
    var self = this;
    var today = new Date();
    $scope.mangel = $routeParams.id;
     $scope.$watch('wassie', function() {
        alert('hey, myVar has changed!');
    });
    //firebase request to get programs of date
    var programRef = firebase.database().ref('programs/' + today.toString('dd-MM-yyyy') + '/');
      programRef.child('/Mangel ' + $scope.mangel).once('value').then(function(snapshot) {
      snapshot.forEach(function(userSnapshot) {
        $scope.wassie.push(userSnapshot.val())
      })
      $scope.data = $scope.wassie;
      $scope.$applyAsync();
    })
    console.log($scope.wasprogrammas)
    $scope.zoekKlant = function(){
      $scope.tonen = true;
      $scope.niettonen = false;
    }

  }


})();