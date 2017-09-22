angular.module('LoginCtrl', ['AuthenticationService']).controller('LoginController', function($scope,$location,PatientService,AuthenticationService) {
	var vm = this;
	vm.tagline = 'To the moon and back!';	
	vm.username='';
	vm.password='';
	vm.login = login;
	
		   initController();
	
		   function initController() {
			   // reset login status
			   AuthenticationService.Logout();
		   };
		   function login() {
            vm.loading = true;
            AuthenticationService.Login(vm.username, vm.password, function (result) {
                if (result === true) {
                    $location.path('/patientproviders');
                } else {
                    vm.error = 'Username or password is incorrect';
                    vm.loading = false;
                }
            });
        };
});