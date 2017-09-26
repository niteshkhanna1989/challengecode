angular.module('PatientCtrl', ['PatientService', 'AuthenticationService']).controller('PatientController', function ($scope, $location, PatientService, AuthenticationService, $timeout, $window, $localStorage) {

	var vm = this;
	vm.busy = false;
	vm.page = 0
	vm.filter = {};
	vm.filter.max_discharges = '';
	vm.filter.min_discharges = '';
	vm.filter.state = '';
	vm.filter.max_avg_covered_charges = '';
	vm.filter.min_avg_covered_charges = '';
	vm.filter.max_avg_medicare_payments = '';
	vm.filter.min_avg_medicare_payments = '';
	vm.showError=false;
	vm.dataPoints = [{ name: "DRGDefinition", value: "DRG Definition", width: '30%', minWidth: 120 }, { name: "ProviderId", value: "Provider ID", width: '30%', minWidth: 70 }, { name: "ProviderName", value: "Provider Name", width: '30%', minWidth: 120 }, { name: "ProviderStreetAddress", value: "Provider Street Address", width: '30%', minWidth: 120 },
	{ name: "ProviderCity", value: "Provider City", width: '30%', minWidth: 70 }, { name: "ProviderState", value: "Provider State", width: '30%', minWidth: 70 }, { name: "ProviderZipCode", value: "Provider Zip Code", width: '30%', minWidth: 70 }, { name: "HospitalReferralRegionDescription", value: "Hospital Referral Region Description", width: '30%', minWidth: 120 }, { name: "TotalDischarges", value: "Total Discharges", width: '30%', minWidth: 70 },
	{ name: "AverageCoveredCharges", value: "Average Covered Charges", width: '30%', minWidth: 70 },
	{ name: "AverageTotalPayments", value: "Average Total Payments", width: '30%', minWidth: 70 }, { name: "AverageMedicarePayments", value: "Average Medicare Payments", width: '30%', minWidth: 70 }]
	vm.selectedDataPoints = [];
	vm.patientProviderData = [];
	vm.loggedinUser = $localStorage.currentUser.username;
	vm.search = search;
	vm.getNextPage = getNextPage;
	vm.logout = logout;
	vm.scroll = scroll;
	//vm.setDollar=setDollar;
	$scope.data = [];
	$scope.cols = [];
	vm.recordsCount = 0;
	vm.totalCount = 0;
	vm.firstTime = true;
	vm.loading = false;
	// Initial Code Run 
	search(vm.firstTime, false);

	// Function to get selected datapoints
	function getDataPoints() {
		var setdatapoints = [];
		if (vm.selectedDataPoints.length == 0) {
			setdatapoints = vm.dataPoints;
		}
		else {
			setdatapoints = vm.selectedDataPoints;
		}
		//vm.selectedDataPoints = vm.dataPoints;
		var datapoints = '';
		angular.forEach(setdatapoints, function (datapoint) {
			datapoints += datapoint.name + " ";
		});
		datapoints = datapoints.substr(0, datapoints.length - 1);
		return datapoints;
	}
	//Search function to get initial data and on search click
	function search(firstTime, fromClick) {
		vm.showError=false;
		if(validateForm())
		return false;
		vm.recordsCount = 0;
		vm.totalCount = 0;
		vm.page = 0;
		vm.busy = true;
		if (fromClick) {
			vm.loading = true;
		}
		vm.patientProviderData = [];
		var datapoints = '';
		//vm.filter.state=vm.filter.state.toUpperCase();
		if (firstTime) {

			var initDataPoints = ['DRGDefinition', 'ProviderId', 'ProviderName', 'TotalDischarges', 'AverageCoveredCharges', 'AverageTotalPayments']
			angular.forEach(vm.dataPoints, function (datapoint) {
				if (initDataPoints.indexOf(datapoint.name) > -1) {
					vm.selectedDataPoints.push(datapoint);
					datapoints += datapoint.name + " ";
				}

			});
			datapoints = datapoints.substr(0, datapoints.length - 1);
		}
		else {
			datapoints = getDataPoints();
		}

		PatientService.getPatientProviderData(datapoints, vm.filter).then(function (response) {
			if (response.status == 200) {
				var colDefs = [];
				if (response.data.data.length > 0) {
					colDefs = Object.keys(response.data.data[0]);
				}
				else {
					if (vm.selectedDataPoints.length > 0) {
						angular.forEach(vm.selectedDataPoints, function (datapoint) {
							colDefs.push(datapoint.name);
						});
					}
				}
				var cols = [];
				$scope.cols = [];
				var idIndex = colDefs.indexOf('_id');
				if (idIndex > -1) {
					colDefs.splice(idIndex, 1);
				}
				angular.forEach(vm.dataPoints, function (datapoint) {
					if (colDefs.indexOf(datapoint.name) > -1) {
						setDynamicWidth(colDefs, datapoint);
						$scope.cols.push(datapoint);
					}
				});
				if (response.data.data.length > 0) {
					$scope.data = setDollar(response.data.data);
				}
				else {
					$scope.data = response.data.data;
				}


				vm.gridOptions = {
					infiniteScrollRowsFromEnd: 10,
					infiniteScrollUp: false,
					infiniteScrollDown: true,
					enableSorting: false,
					columnDefs: $scope.cols,
					data: $scope.data,
					onRegisterApi: function (gridApi) {
						gridApi.infiniteScroll.on.needLoadMoreData($scope, vm.getNextPage);
						//	gridApi.infiniteScroll.on.needLoadMoreDataTop($scope, $scope.getDataUp);
						$scope.gridApi = gridApi;
					}
				};
				if (response.data.data <= 40) {
					$scope.gridApi.infiniteScroll.dataLoaded(false, false);

				}
				else {
					vm.page += 1;
				}
				if (!firstTime) {
					$scope.gridApi.infiniteScroll.resetScroll();
					$scope.gridApi.infiniteScroll.dataLoaded();
				}

				vm.recordsCount = vm.gridOptions.data.length;
				vm.totalCount = response.data.totalCount;
				vm.busy = false;
				vm.loading = false;
				vm.firstTime = false;
			}




		});


	}
	$scope.$watch('vm.selectedDataPoints', function () {
		if (!vm.firstTime) {
			vm.page = 0;
			search(vm.firstTime, false);
		}

	});
	//Function to get data on infinite scroll
	function getNextPage() {

		if (vm.busy) return;
		vm.busy = true;
		//vm.page = 1;
		var datapoints = getDataPoints();
		PatientService.getPatientProviderData(datapoints, vm.filter, vm.page, true).then(function (response) {
			if (response.status == 200 && response.data.data.length > 0) {
				$scope.gridApi.infiniteScroll.saveScrollPercentage();
				var colDefs = Object.keys(response.data.data[0]);
				var idIndex = colDefs.indexOf('_id');
				if (idIndex > -1) {
					colDefs.splice(idIndex, 1);
				}
				$scope.cols = [];
				angular.forEach(vm.dataPoints, function (datapoint) {
					if (colDefs.indexOf(datapoint.name) > -1) {

						setDynamicWidth(colDefs, datapoint);
						$scope.cols.push(datapoint);
						vm.gridOptions.columnDefs = $scope.cols;


					}
				});
				vm.busy = false;
				vm.page += 1;
				if (response.data.data.length > 0) {
					vm.gridOptions.data = vm.gridOptions.data.concat(setDollar(response.data.data));
				}
				else {
					vm.gridOptions.data = vm.gridOptions.data.concat(response.data.data);
				}

				$scope.gridApi.infiniteScroll.dataLoaded();

				vm.recordsCount = vm.gridOptions.data.length;
				vm.totalCount = response.data.totalCount;
				//	vm.patientProviderData.push({rows:response.data,cols:Object.keys(response.data[0])});

			}
			else {
				vm.busy = false;
			}

		});
	}
	// Set Dynamic Width of Columns Based onn Number of Columns
	function setDynamicWidth(colDefs, datapoint) {
		if (colDefs.length == 3) {

			datapoint.width = "34%";
		}
		else if (colDefs.length == 2) {

			datapoint.width = "50%";
		}
		else if (colDefs.length == 1) {

			datapoint.width = "100%";
		}
		else {
			datapoint.width = "30%";
		}
	}


	function setDollar(data) {

		angular.forEach(data, function (row) {
			if (row.AverageCoveredCharges)
				row.AverageCoveredCharges = addDollar(row.AverageCoveredCharges);
			if (row.AverageMedicarePayments)
				row.AverageMedicarePayments = addDollar(row.AverageMedicarePayments);
			if (row.AverageTotalPayments)
				row.AverageTotalPayments = addDollar(row.AverageTotalPayments);
		});
		return data;

	}

	function validateForm()
	{
		var ifError=false;
		for (var property in vm.filter) {
            if (vm.filter.hasOwnProperty(property)) {
				
                if ((vm.filter[property] <0 ||vm.filter[property]===undefined)&& property!=="state" ) {
				   vm.showError=true;
				   ifError=true;
				}
				if(vm.filter[property]===null){
					vm.filter[property]='';
				}
            }
		}
		return ifError;
	}
	function addDollar(val) {
		return '$' + val.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
	}

	//Logout of Application
	function logout() {

		AuthenticationService.Logout();
		$location.path('/');
	}



});