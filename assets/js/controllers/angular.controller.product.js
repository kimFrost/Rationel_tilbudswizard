;(function(window, document, undefined) {
	var Tilbudswizard = new namespace("Tilbudswizard");


	// Retailer Controller
	Tilbudswizard.Angular.controller('ProductCtrl', ['$scope',  function($scope) {

		//$controller('TilbudswizardCtrl', {$scope: $scope});

		// Data
		$scope.productctrl = {
			options: {},
			categories: [],
			states: {
				showproductview: true,
				showupload: false
			},
			css: {}
		};

		/* Scope Functions
		===========================*/
		$scope.productctrl.getCategories = function() {

			// Create 2 random categories (TEMP)
			$scope.productctrl.categories = [];
			for (var i=0;i<2;i++) {
				var category = {
					title: "test",
					id: $scope.productctrl.returnRandomId()
				}
				$scope.productctrl.categories.push(category);
			}
		};
		$scope.productctrl.returnRandomId = function() {
			var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			var id = "";
			for (var i=0;i<5;i++) {
				id += chars.charAt(Math.floor(Math.random() * chars.length));
			}
			return id;
		};

		Tilbudswizard.log("ProductCtrl");
		Tilbudswizard.log($scope);

		/* Bindings
		===========================*/
		// Scope Events

		// User Events

		$scope.productctrl.getCategories();

	}]);


})(window, window.document);
