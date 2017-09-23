angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/login.html',
			controller: 'LoginController',
			controllerAs: 'vm'
		})

		.when('/nerds', {
			templateUrl: 'views/nerd.html',
			controller: 'MainController',
			controllerAs: 'vm'
		})

		.when('/patientproviders', {
			templateUrl: 'views/patientprovider.html',
			controller: 'PatientController',
			controllerAs: 'vm'	
		});

	$locationProvider.html5Mode(true);

}]);