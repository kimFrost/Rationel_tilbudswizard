;(function(window, document, undefined) {
	var Tilbudswizard = new namespace("Tilbudswizard");


	// Retailer Controller
	Tilbudswizard.Angular.controller('ProductCtrl', ['$scope',  function($scope) {

		//$controller('TilbudswizardCtrl', {$scope: $scope});

		// Data
		$scope.productctrl = {
			options: {},
			categories: [],
			productlines: [],
			products: [],
			shownProducts: [],
			activeProductLine: "",
			activeProduct: "",
			states: {
				showproductview: true,
				showproducts: false,
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
		$scope.productctrl.getProductLines = function() {
			// Create 4 random product lines (TEMP)
			$scope.productctrl.productlines = [];
			for (var i=0;i<4;i++) {
				var productline = {
					title: "test",
					img: "",
					id: $scope.productctrl.returnRandomId()
				}
				$scope.productctrl.productlines.push(productline);
			}
		};
		$scope.productctrl.getProducts = function() {
			// Create x random products for each product line (TEMP)
			$scope.productctrl.products = [];
			for (var i=0;i<$scope.productctrl.productlines.length;i++) {
				var productline = $scope.productctrl.productlines[i];
				var numOfProducts = Math.random()*6+1;
				for (var ii=0;ii<numOfProducts;ii++) {
					var product = {
						title: "test",
						img: "",
						productline: productline.id,
						id: $scope.productctrl.returnRandomId()
					}
					$scope.productctrl.products.push(product);
				}
			}
		};
		$scope.productctrl.setProductLine = function(id) {
			if (id != undefined) {
				$scope.productctrl.activeProductLine = id;
				$scope.productctrl.activeProduct = "";
				$scope.productctrl.states.showproducts = true;
				$scope.productctrl.updateProducts();
			}
		};
		$scope.productctrl.setProduct = function(id) {
			if (id != undefined) {
				$scope.productctrl.activeProduct = id;
			}
		};
		$scope.productctrl.updateProducts = function(id) {
			$scope.productctrl.shownProducts = [];
			for (var i=0;i<$scope.productctrl.products.length;i++) {
				var product = $scope.productctrl.products[i];
				if (product.productline === $scope.productctrl.activeProductLine) {
					$scope.productctrl.shownProducts.push(product);
				}
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
		$scope.productctrl.addItemToBasket = function() {
			$scope.$emit('TilbudswizardCtrlAddItemToBasket', {
				id: $scope.productctrl.activeProduct
			});
		};

		//Tilbudswizard.log("ProductCtrl");
		//Tilbudswizard.log($scope);

		/* Bindings
		===========================*/
		// Scope Events

		// User Events

		$scope.productctrl.getCategories();
		$scope.productctrl.getProductLines();
		$scope.productctrl.getProducts();

	}]);


})(window, window.document);
