;(function(window, document, undefined) {
	var Tilbudswizard = new namespace("Tilbudswizard");


	// Tilbudswizard Controller
	Tilbudswizard.Angular.controller('Tilbudswizard', ['$scope', '$element', '$http',  function($scope, $element, $http) {

		// Data
		$scope.tilbudswizardctrl = {
			options: {},
			activeStep: 1,
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
			//console.log(id);
			if (id != undefined) {
				$scope.tilbudswizardctrl.activeStep = id;
			}
		};

		/* Bindings
		 ===========================*/
		// Scope Events

		// User Events

	}]);

})(window, window.document);
