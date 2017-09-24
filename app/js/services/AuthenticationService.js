angular.module('AuthenticationService', []).factory('AuthenticationService', ['$http', '$localStorage', function ($http, $localStorage) {
    var service = {};

    service.Login = Login;
    service.Logout = Logout;
    service.Register = Register;
    return service;

    //Login function to get authenticated with backend service
    function Login(username, password, callback) {
        $http({method:'POST',url:'/authenticate', data: 'username='+ username+ '&password='+ btoa(password) , headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
            .success(function (response) {
                // login successful if there's a token in the response
                if (response.token) {
                    // store username and token in local storage to keep user logged in between page refreshes
                    $localStorage.currentUser = { username: username, token: response.token };

                    // execute callback with true to indicate successful login
                    callback(response);
                } else {
                    // execute callback with false to indicate failed login
                    callback(response);
                }
            });
    }

    //function to log off delete session from local storage

    function Logout() {
        // remove user from local storage and clear http auth header
       delete $localStorage.currentUser;
       
     //  callback(true);
       return true;
        // $http.defaults.headers.common.Authorization = '';
    }

    function Register(username, password, callback) {
        $http({method:'POST',url:'/register', data: 'username='+ username+ '&password='+ btoa(password) , headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
            .success(function (response) {
                // login successful if there's a token in the response
                if (response.success) {
                    // execute callback with true to indicate successful login
                    callback(response);
                } else {
                    // execute callback with false to indicate failed login
                    callback(response);
                }
            });
    }

}]);