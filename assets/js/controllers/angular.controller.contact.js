;(function(window, document, undefined) {
	var Tilbudswizard = new namespace("Tilbudswizard");


	// Retailer Controller
	Tilbudswizard.Angular.controller('ContactCtrl', ['$scope',  function($scope) {

		//$controller('TilbudswizardCtrl', {$scope: $scope});

		// Data
		$scope.contactctrl = {
			options: {},
			states: {
				showcontactform: true,
				showsucces: false,
				showchoice: false
			},
			css: {}
		};

		/* Scope Functions
		 ===========================*/

		Tilbudswizard.log("ContactCtrl");
		Tilbudswizard.log($scope);

		/* Bindings
		 ===========================*/
		// Scope Events

		// User Events

	}]);


})(window, window.document);
