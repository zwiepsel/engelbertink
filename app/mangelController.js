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
    //$scope.wasprogrammas = [];
    var self = this;
    var today = new Date();
    $scope.mangel = $routeParams.id;
    console.log($scope.mangel)

    //firebase request to get programs of date
    function getWashPrograms(date){
    var programmas;
    var programRef = firebase.database().ref('programs/' + date.toString('dd-MM-yyyy') + '/');
      programRef.child('/Mangel ' + $scope.mangel).once('value').then(function(snapshot) {
      //array met micro's en macro's ophalen en binden aan menu
      programmas = snapshot.val();
      }).then(function(result){
        console.log('test',programmas.length)
          if(programmas !== null){
              for(var i = 0; i < programmas.length; i++){
                console.log('pussie', programmas[i])
                  $scope.wassie.push(programmas[i])
              }
          }
          console.log('wassie',$scope.wassie)
      })
    }
    $scope.wasprogrammas = getWashPrograms(today)
    //console.log($scope.wasprogrammas)


    console.log($scope.wasprogrammas)
    $scope.zoekKlant = function(){
      $scope.tonen = true;
      $scope.niettonen = false;
    }

  }


})();