/**
 * 
 * AngularJS Boilerplate
 * @description           Description
 * @author                Jozef Butko // www.jozefbutko.com/resume
 * @url                   www.jozefbutko.com
 * @version               1.1.7
 * @date                  March 2015
 * @license               MIT
 * 
 */
;(function() {
      var firebaseConfig = {
			apiKey: "AIzaSyCIxkShwVt0b5oYDmHlVu_jpD_oaPnpcrc",
			authDomain: "engelbertink-990a3.firebaseapp.com",
			databaseURL: "https://engelbertink-990a3.firebaseio.com",
			storageBucket: "engelbertink-990a3.appspot.com",
			messagingSenderId: "421095126756"
		};
		var engelbertink = firebase.initializeApp(firebaseConfig);

  /**
   * Definition of the main app module and its dependencies
   */
  angular
    .module('engelbertink', [
      'ngRoute'
    ])
    .config(config);

  // safe dependency injection
  // this prevents minification issues
  config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider'];

  /**
   * App routing
   *
   * You can leave it here in the config section or take it out
   * into separate file
   * 
   */
  function config($routeProvider, $locationProvider, $httpProvider, $compileProvider) {

    $locationProvider.html5Mode(false);

    // routes
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/main/:id', {
        templateUrl: 'views/mangel.html',
        controller: 'mangelController',
      })
      .when('/choice', {
        templateUrl: 'views/choice.html',
        controller: 'MainController',
        controllerAs: 'choice'
      })
      .when('/management', {
        templateUrl: 'views/management.html',
        controller: 'managementController',
        controllerAs: 'management'
      })
      .otherwise({
        redirectTo: '/'
      });

    $httpProvider.interceptors.push('authInterceptor');

  }
  angular
    .module('engelbertink').controller('RouteCtrl', function($scope, $route, $location) {

  firebase.auth().onAuthStateChanged(function(user) {
    if(user){
      $location.path('/choice');
                  $scope.$applyAsync();
         }
           else
        {   
            $location.path('/');
            $scope.$applyAsync(); 
        }   
    });
});



  /**
   * You can intercept any request or response inside authInterceptor
   * or handle what should happend on 40x, 50x errors
   * 
   */
  angular
    .module('engelbertink')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$rootScope', '$q', 'LocalStorage', '$location'];

  function authInterceptor($rootScope, $q, LocalStorage, $location) {

    return {

      // intercept every request
      request: function(config) {
        config.headers = config.headers || {};
        return config;
      },

      // Catch 404 errors
      responseError: function(response) {
        if (response.status === 404) {
          $location.path('/');
          return $q.reject(response);
        } else {
          return $q.reject(response);
        }
      }
    };
  }


  /**
   * Run block
   */
  angular
    .module('engelbertink')
    .run(run);

  run.$inject = ['$rootScope', '$location', '$route'];

  function run($rootScope, $location, $route, $state) {

    // put here everything that you need to run on page load

  }


})();