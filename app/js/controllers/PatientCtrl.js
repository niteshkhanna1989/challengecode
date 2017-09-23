angular.module('PatientCtrl', ['PatientService','AuthenticationService']).controller('PatientController', function ($scope,$location, PatientService,AuthenticationService, $timeout,$window,$localStorage) {

	var vm = this;
	vm.busy = false;
	vm.lessData=false;
	vm.page = 0
	vm.filter = {};
	vm.filter.max_discharges = '';
	vm.filter.min_discharges = '';
	vm.filter.state = '';
	vm.filter.max_avg_covered_charges ='';
	vm.filter.min_avg_covered_charges = '';
	vm.filter.max_avg_medicare_payments = '';
	vm.filter.min_avg_medicare_payments = '';
	vm.dataPoints = [{ key: "DRGDefinition", value: "DRG Definition" }, { key: "ProviderId", value: "Provider ID" }, { key: "ProviderName", value: "Provider Name" }, { key: "ProviderStreetAddress", value: "Provider Street Address" },
	{ key: "ProviderCity", value: "Provider City" }, { key: "ProviderState", value: "Provider State" }, { key: "ProviderZipCode", value: "Provider Zip Code" }, { key: "HospitalReferralRegionDescription", value: "Hospital Referral Region Description" }, { key: "TotalDischarges", value: "Total Discharges" },
	{ key: "AverageCoveredCharges", value: "Average Covered Charges" },
	{ key: "AverageTotalPayments", value: "Average Total Payments" }, { key: "AverageMedicarePayments", value: "Average Medicare Payments" }]
	vm.selectedDataPoints = [];
	vm.patientProviderData = [];
	vm.loggedinUser=$localStorage.currentUser.username;
	vm.search=search;
	vm.getNextPage = getNextPage;
	vm.logout=logout;
	$scope.windowWidth={};
	$scope.windowWidth["width"]=$window.innerWidth;
	// Initial Code Run 
	initController();

	function initController() {

		// reset login status
		//vm.selectedDataPoints = vm.dataPoints;
		var datapoints = '';
		var initDataPoints=['DRGDefinition','ProviderId','ProviderName','TotalDischarges','AverageCoveredCharges','AverageTotalPayments']
		angular.forEach(vm.dataPoints, function (datapoint) {
			if(initDataPoints.indexOf(datapoint.key)>-1){
				vm.selectedDataPoints.push(datapoint);
				datapoints += datapoint.key + " ";
			}
			
		});
		datapoints = datapoints.substr(0, datapoints.length - 1);
		PatientService.getPatientProviderData(datapoints, vm.filter).then(function (response) {
			if (response.status==200 && response.data.length>0) {
				//var cols=Object.keys(data.data[0]);

				vm.patientProviderData.push({ rows: response.data, cols: Object.keys(response.data[0]) });
			}
			else {

			}

		});
	};	
function getDataPoints(){
	var setdatapoints=[];
	if(vm.selectedDataPoints.length==0){
		setdatapoints=vm.dataPoints;
	}
	else{
		setdatapoints=vm.selectedDataPoints;
	}	
	//vm.selectedDataPoints = vm.dataPoints;
	var datapoints = '';
	angular.forEach(setdatapoints, function (datapoint) {
		datapoints += datapoint.key + " ";
	});
	datapoints = datapoints.substr(0, datapoints.length - 1);
	return datapoints;
}
	function search(){
		vm.lessData=false;
		vm.patientProviderData=[];
		var datapoints=getDataPoints();
		vm.page=0;
		vm.busy=true;
		PatientService.getPatientProviderData(datapoints, vm.filter, vm.page, false).then(function (response) {
			if (response.status==200 && response.data.length>0) {
				//var cols=Object.keys(data.data[0]);
				vm.patientProviderData.push({ rows: response.data, cols: Object.keys(response.data[0]) });
				//	vm.patientProviderData.push({rows:response.data,cols:Object.keys(response.data[0])});
				vm.busy = false;
				//vm.page += 1;
			}
			else	
			vm.busy = false;
			
		});
	}
	function getNextPage() {

		if (vm.busy) return;
		vm.busy = true;
		vm.page=1;
		var datapoints=getDataPoints();
		PatientService.getPatientProviderData(datapoints, vm.filter,vm.page, true).then(function (response) {
			if (response.status==200 && response.data.length>0) {
				// if(response.data.length<=10){
				// 	vm.lessData=true;
				// }
				//var cols=Object.keys(data.data[0]);
				if (vm.patientProviderData[0].rows) {
					angular.forEach(response.data,function(row){
						vm.patientProviderData[0].rows.push(row);
					});
					
				}
				//	vm.patientProviderData.push({rows:response.data,cols:Object.keys(response.data[0])});
				vm.busy = false;
				vm.page += 1;
			}
			else{
				vm.busy = false;
			}	
		
		});
	}

	function logout(){

		AuthenticationService.Logout();
		$location.path('/');
	}

});