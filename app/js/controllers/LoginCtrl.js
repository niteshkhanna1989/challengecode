angular.module('LoginCtrl', ['AuthenticationService']).controller('LoginController', function ($scope, $location, PatientService, AuthenticationService) {
	var vm = this;
	vm.tagline = 'To the moon and back!';
	vm.username = '';
	vm.password = '';
	vm.register = false;
	vm.login = login;
	vm.isRegister=false;
	vm.register = register;
	initController();

	function initController() {
		// reset login status
		AuthenticationService.Logout();
	};
	function login() {
		vm.loading = true;
		AuthenticationService.Login(vm.username, vm.password, function (result) {
			if (result.success) {
				$location.path('/patientproviders');
			} else {
				vm.error = result.message;
				vm.loading = false;
			}
		});
	};

	function register() {
		vm.loading = true;
		AuthenticationService.Register(vm.username, vm.password, function (result) {
			if (result.success) {
			//	$location.path('/patientproviders');
			} else {
				vm.error = result.message;
				vm.loading = false;
			}
		});
	}
});