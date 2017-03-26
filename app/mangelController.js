;(function() {

  angular
    .module('engelbertink')
    .controller('mangelController', MangelController);

  MangelController.$inject = ['LocalStorage', 'QueryService', '$scope','$routeParams', '$location'];


  function MangelController(LocalStorage, QueryService, $scope, $routeParams, $location) {

    // 'controller as' syntax
    $scope.tonen = false;
    $scope.niettonen = true;
    $scope.programma = [];
    $scope.wassie = [];
    $scope.data = [];
    //$scope.wasprogrammas = [];
    var self = this;
    var today = new Date();
    $scope.mangel = $routeParams.id;
    $scope.getCustomerCode = function(e)
    {
      console.log('check',e,$scope.index)
      $scope.data = $scope.wassie[$scope.index]
    }

    $scope.goBack = function(){
           $location.path('/choice');
    }
    $scope.closeProgram = function(){
      console.log($scope.data.sleutel)
      firebase.database().ref('programs/' + today.toString('dd-MM-yyyy') + "/Mangel " + $scope.mangel + "/" + $scope.data.sleutel).update({done: true});
        $location.path('/choice');
    }
    //firebase request to get programs of date
    var programRef = firebase.database().ref('programs/' + today.toString('dd-MM-yyyy') + '/');
      programRef.child('/Mangel ' + $scope.mangel).once('value',function(snapshot) {
      snapshot.forEach(function(userSnapshot) {
        if(userSnapshot.val().done == false){
        $scope.wassie.push(userSnapshot.val())
        }
      })
      $scope.$applyAsync();
    })
    $scope.zoekKlant = function(){
      $scope.tonen = true;
      $scope.niettonen = false;
    }

  }


})();