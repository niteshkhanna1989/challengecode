var app=angular.module('app', ['infinite-scroll','wt.responsive','ui.select','ngRoute', 'ngStorage','appRoutes', 'LoginCtrl', 'MainCtrl', 'AuthenticationService', 'PatientCtrl', 'PatientService']);
app.run(run);

function run($rootScope, $http, $location, $localStorage) {
    // keep user logged in after page refresh
    if ($localStorage.currentUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
    }

    // redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var publicPages = ['/'];
        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$localStorage.currentUser) {
            $location.path('/');
        }
    });
}