/**
 * Main application controller
 *
 * You can use this controller for your whole app if it is small
 * or you can have separate controllers for each logical section
 * 
 */
;(function() {

  angular
    .module('engelbertink')
    .controller('MainController', MainController);

  MainController.$inject = ['LocalStorage', 'QueryService', '$scope','$location','$routeParams'];


  function MainController(LocalStorage, QueryService, $scope, $location, $routeParams) {

    // 'controller as' syntax
    var self = this;

    $scope.goMangel = function(mangel){
      console.log(mangel)
      console.log($location)
      $location.path('/main/' + mangel)
    }

    $scope.goManagement = function(){
      $location.path('/management');
    }
   
    $scope.login= function(){
      console.log($scope.user, $scope.password)
      firebase.auth().signInWithEmailAndPassword($scope.user, $scope.password).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(error.code)
      if (errorCode === 'auth/wrong-password') {
          $scope.errorMessage = "gebruiker/wachtwoord is ongeldig";
          $scope.$applyAsync() ;
      } 
      if (errorCode === 'auth/invalid-email') {
          $scope.errorMessage = "gebruiker/wachtwoord  is ongeldig";
          $scope.$applyAsync() ;
      } 
      if (errorCode === 'auth/user-not-found'){
          $scope.errorMessage = "Gebruiker/email is niet gevonden";
              $scope.$applyAsync(); 
      }
      if (errorCode === 'auth/user-disabled' ){
          $scope.errorMessage = "Gebruiker is geblokkeerd, neem contact op";
          $scope.$applyAsync(); 
      }
    });
    }


  }


})();