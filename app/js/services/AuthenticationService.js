angular.module('AuthenticationService', []).factory('AuthenticationService', ['$http', '$localStorage', function ($http, $localStorage) {
    var service = {};

    service.Login = Login;
    service.Logout = Logout;
    service.Register = Register;
    return service;

    function Login(username, password, callback) {
        $http({method:'POST',url:'https://patientproviders.herokuapp.com/authenticate', data: 'username='+ username+ '&password='+ password , headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
            .success(function (response) {
                // login successful if there's a token in the response
                if (response.token) {
                    // store username and token in local storage to keep user logged in between page refreshes
                    $localStorage.currentUser = { username: username, token: response.token };

                    // // add jwt token to auth header for all requests made by the $http service
                    // $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;

                    // execute callback with true to indicate successful login
                    callback(response);
                } else {
                    // execute callback with false to indicate failed login
                    callback(response);
                }
            });
    }

    function Logout() {
        // remove user from local storage and clear http auth header
       delete $localStorage.currentUser;
       
     //  callback(true);
       return true;
        // $http.defaults.headers.common.Authorization = '';
    }

    function Register(username, password, callback) {
        $http({method:'POST',url:'https://patientproviders.herokuapp.com/register', data: 'username='+ username+ '&password='+ password , headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
            .success(function (response) {
                // login successful if there's a token in the response
                if (response.success) {
                   // // add jwt token to auth header for all requests made by the $http service
                    // $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;

                    // execute callback with true to indicate successful login
                    callback(response);
                } else {
                    // execute callback with false to indicate failed login
                    callback(response);
                }
            });
    }

}]);