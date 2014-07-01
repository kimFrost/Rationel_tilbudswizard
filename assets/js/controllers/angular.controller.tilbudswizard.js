;(function(window, document, undefined) {
	var Tilbudswizard = new namespace("Tilbudswizard");


	// Tilbudswizard Controller
	Tilbudswizard.Angular.controller('TilbudswizardCtrl', ['$scope', '$http',  function($scope, $http) {

		// Data
		$scope.tilbudswizardctrl = {
			options: {},
			activeStep: 2,
			activeRetailer: "",
			activeCategory: "",
			steps:[
				{
					id: 0,
					title: "Step 1",
					states: {
						valid: false
					}
				},
				{
					id: 1,
					title: "Step 2",
					require: [0],
					states: {
						valid: false
					}
				},
				{
					id: 2,
					title: "Step 3",
					require: [0, 1],
					states: {
						valid: false
					}
				}
			],
			states: {

			},
			css: {}
		};

		/* Scope Functions
		 ===========================*/
		$scope.tilbudswizardctrl.checkstep = function(id) {
			if (id != undefined) {
				if (id === $scope.tilbudswizardctrl.activeStep) {
					return true;
				}
				else {
					return false;
				}
			}
		};
		$scope.tilbudswizardctrl.switchstep = function(id) {
			//Tilbudswizard.log(id);
			if (id != undefined) {
				$scope.tilbudswizardctrl.activeStep = id;
			}
		};

		// Global Retailer functions
		$scope.tilbudswizardctrl.setRetailer = function(id) {
			if (id != undefined) {
				$scope.tilbudswizardctrl.activeRetailer = id;
			}
		};
		$scope.tilbudswizardctrl.checkRetailer = function(id) {
			if (id != undefined) {
				if (id === $scope.tilbudswizardctrl.activeRetailer) {
					return true;
				}
				else {
					return false;
				}
			}
		};

		// Global Product functions
		$scope.tilbudswizardctrl.setCategory = function(id) {
			if (id != undefined) {
				$scope.tilbudswizardctrl.activeCategory = id;
			}
		};
		$scope.tilbudswizardctrl.checkCategory = function(id) {
			if (id != undefined) {
				if (id === $scope.tilbudswizardctrl.activeCategory) {
					return true;
				}
				else {
					return false;
				}
			}
		};


		Tilbudswizard.log("TilbudswizardCtrl");
		Tilbudswizard.log($scope);

		/* Bindings
		 ===========================*/
		// Scope Events

		// User Events

	}]);


})(window, window.document);
