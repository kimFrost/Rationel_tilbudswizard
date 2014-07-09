;(function(window, document, undefined) {
	var Tilbudswizard = new namespace("Tilbudswizard");


	// Retailer Controller
	Tilbudswizard.Angular.controller('RetailerCtrl', ['$scope', '$http', function($scope, $http) {

		//$controller('TilbudswizardCtrl', {$scope: $scope});

		// Data
		$scope.retailerctrl = {
			options: {},
			retailers: [],
			searchvalue: "",
			geocoder: new google.maps.Geocoder(),
			states: {
				showsearch: true,
				showresults: false,
				showchoice: false
			},
			css: {}
		};

		/* Scope Functions
		 ===========================*/
		$scope.retailerctrl.search = function() {
			if (!$scope.searchform.$invalid) {
				var postalcode = $scope.retailerctrl.searchvalue;
				postalcode = (postalcode === undefined) ? "0000" : postalcode;
				postalcode = postalcode.toString();

				$scope.$emit('TilbudswizardCtrlTogglePending', 'show');

				$scope.retailerctrl.geocoder.geocode({
					address: postalcode + " Denmark"
				},function(results, status) {
					$scope.$apply(function() {
						$scope.retailerctrl.getRetailers(results[0]);
					});
				});
			}
		};
		$scope.retailerctrl.getRetailers = function(result) {
			if (result != undefined) {
				var lat = result.geometry.location.lat();
				var lng = result.geometry.location.lng();
				var url = "/website/api/pricewizard/dealers/?lat=" + lat + "&lng=" + lng + "&distance=15"

				$http({
					method: 'GET',
					url: url
				}).success(function(data, status, headers, config) {
					$scope.retailerctrl.retailers = [];
					//$scope.retailerctrl.processRetailers(data);
					for (var i=0;i<data.length;i++) {
						var retailer = data[i];
						$scope.retailerctrl.pushRetailer(retailer);
					}
					$scope.retailerctrl.states.showresults = true;
					$scope.retailerctrl.states.showsearch = false;
					$scope.$emit('TilbudswizardCtrlTogglePending', 'hide');
				}).error(function(data, status, headers, config) {
					$scope.$emit('TilbudswizardCtrlTogglePending', 'hide');
				});
			}

			// Create 3 random retailers (TEMP)
			/*
			$scope.retailerctrl.retailers = [];
			for (var i=0;i<3;i++) {
				var retailer = {
					name: "test",
					id: $scope.retailerctrl.returnRandomId(),
					adress: "road 69",
					city: "Townname",
					zip: "666"
				}
				$scope.retailerctrl.retailers.push(retailer);
			}
			*/
		};
		$scope.retailerctrl.processRetailers = function(retailers, spacesLeft, rank) {
			retailers = (retailers === undefined) ? [] : retailers;
			spacesLeft = (spacesLeft === undefined) ? 6 : spacesLeft;
			rank = (rank === undefined) ? 3 : rank;
			// Search retailers for desired ranks
			for (var i=0;i<retailers.length;i++) {
				var retailer = retailers[i];
				if (spacesLeft > 0) {
					if (retailer.rank === rank) {
						Tilbudswizard.log(rank);
						$scope.retailerctrl.pushRetailer(retailer);
						spacesLeft = spacesLeft-1;
					}
				}
			}
			// Process list again with new numbers
			if (spacesLeft > 0 && rank > 1) {
				rank--;
				$scope.retailerctrl.processRetailers(retailers, spacesLeft, rank);
			}
			else {
				// Not enough retailer to fill 3 results
			}
		};
		$scope.retailerctrl.pushRetailer = function(data) {
			var retailer = {
				name: data.name,
				id: $scope.retailerctrl.returnRandomId(),
				adress: data.streetName + data.houseNumber,
				city: data.cityName,
				zip: data.zipCode
			};
			$scope.retailerctrl.retailers.push(retailer);

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
