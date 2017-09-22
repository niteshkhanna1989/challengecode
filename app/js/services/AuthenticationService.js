angular.module('AuthenticationService', []).factory('AuthenticationService', ['$http', '$localStorage', function ($http, $localStorage) {
    var service = {};

    service.Login = Login;
    service.Logout = Logout;
    service.Register = Register;
    return service;

    function Login(username, password, callback) {
        $http({method:'POST',url:'http://localhost:3000/authenticate', data: 'username='+ username+ '&password='+ password , headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
            .success(function (response) {
                // login successful if there's a token in the response
                if (response.token) {
                    // store username and token in local storage to keep user logged in between page refreshes
                    $localStorage.currentUser = { username: username, token: response.token };

                    // // add jwt token to auth header for all requests made by the $http service
                    // $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;

                    // execute callback with true to indicate successful login
                    callback(true);
                } else {
                    // execute callback with false to indicate failed login
                    callback(false);
                }
            });
    }

    function Logout() {
        // remove user from local storage and clear http auth header
        delete $localStorage.currentUser;
        // $http.defaults.headers.common.Authorization = '';
    }

    function Register(username, password, callback) {
        $http.post('http://localhost:3000/register', { username: username, password: password })
            .success(function (response) {
                // login successful if there's a token in the response
                if (response.true) {
                   // // add jwt token to auth header for all requests made by the $http service
                    // $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;

                    // execute callback with true to indicate successful login
                    callback(true);
                } else {
                    // execute callback with false to indicate failed login
                    callback(false);
                }
            });
    }

}]);