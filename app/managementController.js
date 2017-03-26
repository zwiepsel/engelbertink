;(function() {

  angular
    .module('engelbertink')
    .controller('managementController', ManagementController);

  ManagementController.$inject = ['LocalStorage', 'QueryService', '$scope','$routeParams'];


  function ManagementController(LocalStorage, QueryService, $scope, $routeParams) {
    $scope.program = {};
    $scope.selectedItem;
    $scope.program.info = "";
    var datum2 = new Date();
    $scope.program.contactperson = "";
    $scope.program.selectedMangel = 'Kies uw mangel...';
    $('.datepicker').datepicker({
    autoclose: true,
    format: 'dd/MM/jjjj',
    startdate: new Date()
    })
    // 'controller as' syntax
    $scope.mangels = ['Mangel 1', 'Mangel 2', 'Mangel 3'];
    $scope.selectMangel = function(item){
        $scope.program.selectedMangel = item; 
    }
    $scope.saveProgram = function(){
      datum2 = new Date($scope.program.date)
      if($scope.program.date != undefined && $scope.program.selectedMangel != undefined && $scope.program.customercode  != undefined && $scope.program.customername  != undefined && $scope.program.washprogram  != undefined){
        $scope.errorMessage = "";
        var key= firebase.database().ref('programs/' + datum2.toString('dd-MM-yyyy') + "/" + $scope.program.selectedMangel).push().key;
        var washingProgram = {
          date : datum2.toString('dd-MM-yyyy'),
          selectedMangel : $scope.program.selectedMangel,
          customerCode : $scope.program.customercode,
          customerName : $scope.program.customername,
          washProgram : $scope.program.washprogram,
          contactPerson : $scope.program.contactperson,
          extraInfo : $scope.program.info,
          done : false,
          sleutel : key
        }
        var customer = {
          customerCode : $scope.program.customercode,
          customerName : $scope.program.customername,
          contactPerson : $scope.program.contactperson
        }
        firebase.database().ref('programs/' + datum2.toString('dd-MM-yyyy') + "/" + $scope.program.selectedMangel + "/" + key).update(washingProgram);
        var customerRef = firebase.database().ref('customers/' + $scope.program.customercode).update(customer);
        $scope.program.selectedMangel = "Kies uw mangel...";
        $scope.program.customercode = undefined;
        $scope.program.customername = undefined;
        $scope.program.washprogram = undefined;
        $scope.program.contactperson = "";
        $scope.program.date = undefined;
        $scope.program.info ="";
      }
      else{      $scope.errorMessage = "U heeft niet alle verplichte velden ingevuld"}


    }
  }


})();