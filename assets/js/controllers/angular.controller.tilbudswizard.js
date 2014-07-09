;(function(window, document, undefined) {
	var Tilbudswizard = new namespace("Tilbudswizard");


	// Tilbudswizard Controller
	Tilbudswizard.Angular.controller('TilbudswizardCtrl', ['$scope', '$http',  function($scope, $http) {

		// Data
		$scope.tilbudswizardctrl = {
			options: {},
			activeStep: 0,
			files: [
				{},{},{},{},{},{}
			],
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
					require: [],
					states: {
						valid: false,
						locked: false
					}
				},
				{
					id: 1,
					name: "Step 2",
					require: [0],
					states: {
						valid: false,
						locked: true
					}
				},
				{
					id: 2,
					name: "Step 3",
					//require: [0, 1],
					states: {
						valid: false,
						locked: false
					}
				},
				{
					id: 3,
					name: "Step 4",
					require: [0, 1, 2],
					states: {
						valid: false,
						locked: true
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

		// Step functions
		$scope.tilbudswizardctrl.checklock = function(id) {
			var step = $scope.tilbudswizardctrl.steps[id];
			if (step != undefined) {
				return step.states.locked;
			}
		};
		$scope.tilbudswizardctrl.checkvalid = function(id) {
			var step = $scope.tilbudswizardctrl.steps[id];
			if (step != undefined) {
				return step.states.valid;
			}
		};
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
				$scope.tilbudswizardctrl.updateLocks(); // Update lock states
				var locked = $scope.tilbudswizardctrl.checklock(id);
				//Tilbudswizard.log("locked");
				//Tilbudswizard.log(id);
				//Tilbudswizard.log(locked);
				if (!locked) {
					$scope.tilbudswizardctrl.activeStep = id;
				}
			}
		};
		$scope.tilbudswizardctrl.updateLocks = function() {
			var steps = $scope.tilbudswizardctrl.steps;
			for (var i=0;i<steps.length;i++) {
				var step = steps[i];
				var anyNotValid = false;
				if (step.require != undefined && step.require.length > 0) {
					// Find step required step and check their valid state
					for (var ii=0;ii<step.require.length; ii++) {
						var requiredStep = step.require[ii];
						if (!steps[requiredStep].states.valid) {
							anyNotValid = true;
						}
					}
					step.states.locked = anyNotValid;
				}
				else {
					step.states.locked = anyNotValid;
				}
			}
		};

		// Global Retailer functions
		$scope.tilbudswizardctrl.setRetailer = function(id) {
			if (id != undefined) {
				$scope.tilbudswizardctrl.activeRetailer.id = id;
				// Validate curent step and activate next step
				$scope.tilbudswizardctrl.steps[0].states.valid = true;
				$scope.tilbudswizardctrl.switchstep(1);
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
				$scope.tilbudswizardctrl.steps[1].states.valid = true;
				$scope.tilbudswizardctrl.switchstep(2);
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

		// Global Contact functions
		$scope.tilbudswizardctrl.filesChanged = function(file, index) {
			$scope.tilbudswizardctrl.files[index] = file;
			/*
			var name = files[0].name;
			for (var i=0;i<$scope.tilbudswizardctrl.files.length;i++) {
				var file = $scope.tilbudswizardctrl.files[i][0];
				if (file.name === name) {
					$scope.tilbudswizardctrl.files.splice(i,1);
					Tilbudswizard.log("splice");
				}
			}
			$scope.tilbudswizardctrl.files.push(files)
			*/
			//$scope.tilbudswizardctrl.files = elm.files;
			$scope.$apply();
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
				$scope.tilbudswizardctrl.steps[2].states.valid = true;
			}
			else {
				$scope.tilbudswizardctrl.basket.states.showbasket = false;
				$scope.tilbudswizardctrl.steps[2].states.valid = false;
			}
			$scope.tilbudswizardctrl.updateLocks(); // Update locks
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
