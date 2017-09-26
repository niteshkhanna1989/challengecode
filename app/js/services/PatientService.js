angular.module('PatientService', []).factory('PatientService', ['$http', '$localStorage', function ($http, $localStorage) {
    var service = {
        getPatientProviderData: getPatientProviderData
    };
    return service;
    var queryParameters = '';
    function getPatientProviderData(datapoints, filterObj, page, fromScroll) {
        var token = '';
        var queryParams = '';
        if (!fromScroll) {
            queryParams = getQueryParams(filterObj);
        }
        else {
            queryParams = queryParameters;
        }
        var token = '';
        if ($localStorage.currentUser) {
            token = $localStorage.currentUser.token;
        }

        return $http({ method: 'GET', url: '/providers?' + queryParams, headers: { 'options': datapoints, 'x-access-token': token, 'page': page } })
    }

    function getQueryParams(filterObj) {
        var querystring = '';
        for (var property in filterObj) {
            if (filterObj.hasOwnProperty(property)) {
                if (filterObj[property] !== '' && filterObj[property]!==null) {
                    querystring += property + "=" + filterObj[property] + "&";
                }
            }
        }
        querystring = querystring.substr(0, querystring.length - 1);
        queryParameters = querystring;
        return querystring;
    }
}]);