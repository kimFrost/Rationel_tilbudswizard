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
			activeProductLine: {
				id: "",
				name: ""
			},
			activeProduct: {
				id: "",
				name: ""
			},
			states: {
				showproductview: true,
				showproducts: false,
				showupload: false,
				showchoice: false,
				validated: false
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
					name: "test",
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
					name: "test",
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
						name: "test",
						img: "",
						productline: productline.id,
						id: $scope.productctrl.returnRandomId()
					}
					$scope.productctrl.products.push(product);
				}
			}
		};
		$scope.productctrl.setProductLine = function(id, name) {
			if (id != undefined) {
				name = (name === undefined) ? "" : name;
				$scope.productctrl.activeProductLine.id = id;
				$scope.productctrl.activeProductLine.name = name;
				$scope.productctrl.activeProduct.id = "";
				$scope.productctrl.activeProduct.name = "";
				$scope.productctrl.states.showproducts = true;
				$scope.productctrl.updateProducts();
			}
		};
		$scope.productctrl.setProduct = function(id, name) {
			if (id != undefined) {
				name = (name === undefined) ? "No product name" : name;
				$scope.productctrl.activeProduct.id = id;
				$scope.productctrl.activeProduct.name = name;
			}
		};
		$scope.productctrl.updateProducts = function(id) {
			$scope.productctrl.shownProducts = [];
			for (var i=0;i<$scope.productctrl.products.length;i++) {
				var product = $scope.productctrl.products[i];
				if (product.productline === $scope.productctrl.activeProductLine.id) {
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
			var valid = $scope.productctrl.validateForm();
			if ($scope.productform.formdata != undefined && valid) {
				$scope.$emit('TilbudswizardCtrlAddItemToBasket', {
					productid: $scope.productctrl.activeProduct.id,
					productname: $scope.productctrl.activeProduct.name,
					name: $scope.productform.formdata.name,
					width: $scope.productform.formdata.width,
					height: $scope.productform.formdata.height,
					quantity: $scope.productform.formdata.quantity,
					mullions: $scope.productform.formdata.mullions
				});
			}
		};
		$scope.productctrl.validateForm = function() {
			if (!$scope.productform.$invalid) {
				return true;
			}
			else {
				$scope.productctrl.states.validated = false;
				for (var i=0;i<$scope.productform.$error.required.length;i++) {
					var required = $scope.productform.$error.required[i];
					required.$setViewValue(required.$viewValue);
				}
				return false;
			}
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
