;(function(window, document, undefined) {
	var Tilbudswizard = new namespace("Tilbudswizard");


	// Tilbudswizard Controller
	Tilbudswizard.Angular.controller('TilbudswizardCtrl', ['$scope', '$http',  function($scope, $http) {

		// Data
		$scope.tilbudswizardctrl = {
			options: {},
			activeStep: 0,
			activeRetailer: {
				id: "",
				name: ""
			},
			activeCategory: "",
			basket: {
				items: [],
				states: {
					showbasket: false
				}
			},
			steps:[
				{
					id: 0,
					name: "Step 1",
					states: {
						valid: false
					}
				},
				{
					id: 1,
					name: "Step 2",
					require: [0],
					states: {
						valid: false
					}
				},
				{
					id: 2,
					name: "Step 3",
					require: [0, 1],
					states: {
						valid: false
					}
				}
			],
			generatedIds: [],
			states: {
				pending: false
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
				$scope.tilbudswizardctrl.activeRetailer.id = id;
			}
		};
		$scope.tilbudswizardctrl.checkRetailer = function(id) {
			if (id != undefined) {
				if (id === $scope.tilbudswizardctrl.activeRetailer.id) {
					return true;
				}
				else {
					return false;
				}
			}
		};

		// Pending functions
		$scope.tilbudswizardctrl.togglePending = function(state) {
			state = (state === undefined) ? "toggle" : state;
			if (state === "toggle") {
				$scope.tilbudswizardctrl.states.pending = !$scope.tilbudswizardctrl.states.pending;
			}
			else if (state === "show") {
				$scope.tilbudswizardctrl.states.pending = true;
			}
			else if (state === "hide") {
				$scope.tilbudswizardctrl.states.pending = false;
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

		// Basket functions
		$scope.tilbudswizardctrl.addItemToBasket = function(item) {
			if (item != undefined) {
				item.productname = (item.productname === undefined) ? "No product name" : item.productname;
				item.productid = (item.productid === undefined) ? "No product id" : item.productid;
				item.name = (item.name === undefined) ? item.productname : item.name;
				if (item.name.length < 1) {
					item.name = item.productname;
				}
				item.id = $scope.tilbudswizardctrl.returnRandomId();
				var found = false;
				//for (var i=0;i<$scope.tilbudswizardctrl.basket.items.length;i++) {
					//var basketitem = $scope.tilbudswizardctrl.basket.items[i];
					//if (basketitem.id === item.id) found = true;
				//}
				if (!found) {
					$scope.tilbudswizardctrl.basket.items.push(item);
					$scope.tilbudswizardctrl.validateBasket();
				}
			}
		};
		$scope.tilbudswizardctrl.removeItemFromBasket = function(id) {
			if (id != undefined) {
				for (var i=0;i<$scope.tilbudswizardctrl.basket.items.length;i++) {
					var item = $scope.tilbudswizardctrl.basket.items[i];
					if (id === item.id) {
						$scope.tilbudswizardctrl.basket.items.splice(i,1);
					}
				}
				$scope.tilbudswizardctrl.validateBasket();
			}
		};
		$scope.tilbudswizardctrl.clearBasket = function() {

			$scope.tilbudswizardctrl.validateBasket();
		};
		$scope.tilbudswizardctrl.validateBasket = function() {
			var numOfItems = $scope.tilbudswizardctrl.basket.items.length;
			if (numOfItems > 0) {
				$scope.tilbudswizardctrl.basket.states.showbasket = true;
			}
			else {
				$scope.tilbudswizardctrl.basket.states.showbasket = false;
			}
		};
		$scope.tilbudswizardctrl.returnRandomId = function() {
			var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			var id = "";
			for (var i=0;i<5;i++) {
				id += chars.charAt(Math.floor(Math.random() * chars.length));
			}
			var found = false;
			for (var i=0;i<$scope.tilbudswizardctrl.generatedIds.length;i++) {
				var storedId = $scope.tilbudswizardctrl.generatedIds[i];
				if (id === storedId) found = true;
			}
			if (!found) {
				$scope.tilbudswizardctrl.generatedIds.push(id);
				return id;
			}
			else {
				return $scope.tilbudswizardctrl.returnRandomId();
			}
		};


		Tilbudswizard.log("TilbudswizardCtrl");
		Tilbudswizard.log($scope);

		/* Bindings
		 ===========================*/
		// Scope Events
		$scope.$on('TilbudswizardCtrlTogglePending', function(event, state) {
			$scope.tilbudswizardctrl.togglePending(state);
		})
		$scope.$on('TilbudswizardCtrlAddItemToBasket', function(event, data) {
			$scope.tilbudswizardctrl.addItemToBasket(data);
		});
		$scope.$on('TilbudswizardCtrlRemoveItemFromBasket', function(event, data) {
			$scope.tilbudswizardctrl.removeItemFromBasket(data);
		});
		$scope.$on('TilbudswizardCtrlClearBasket', function(event) {
			$scope.tilbudswizardctrl.clearBasket();
		});


		// User Events

	}]);


})(window, window.document);
