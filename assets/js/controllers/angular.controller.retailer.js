;(function(window, document, undefined) {
	var Tilbudswizard = new namespace("Tilbudswizard");


	// Retailer Controller
	Tilbudswizard.Angular.controller('RetailerCtrl', ['$scope',  function($scope) {

		//$controller('TilbudswizardCtrl', {$scope: $scope});

		// Data
		$scope.retailerctrl = {
			options: {},
			retailers: [],
			searchvalue: "",
			states: {
				showsearch: true,
				showresults: false
			},
			css: {}
		};

		/* Scope Functions
		 ===========================*/
		$scope.retailerctrl.search = function() {
			Tilbudswizard.log($scope.retailerctrl.searchvalue);

			$scope.retailerctrl.getRetailers();
			$scope.retailerctrl.states.showresults = true;
			$scope.retailerctrl.states.showsearch = false;
			//$scope.$emit('TilbudswizardCtrlTogglePending', 'show');

		};
		$scope.retailerctrl.getRetailers = function() {

			// Create 3 random retailers (TEMP)
			$scope.retailerctrl.retailers = [];
			for (var i=0;i<3;i++) {
				var retailer = {
					title: "test",
					id: $scope.retailerctrl.returnRandomId(),
					adress: "road 69",
					city: "Townname",
					zip: "666"
				}
				$scope.retailerctrl.retailers.push(retailer);
			}
		};
		$scope.retailerctrl.returnRandomId = function() {
			var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			var id = "";
			for (var i=0;i<5;i++) {
				id += chars.charAt(Math.floor(Math.random() * chars.length));
			}
			return id;
		};
		/*
		$scope.retailerctrl.selectRetailer = function(name) {
			Tilbudswizard.log("selectRetailer");
			Tilbudswizard.log(name);
		};
		*/

		Tilbudswizard.log("RetailerCtrl");
		Tilbudswizard.log($scope);

		/* Bindings
		 ===========================*/
		// Scope Events

		// User Events



	}]);


})(window, window.document);
