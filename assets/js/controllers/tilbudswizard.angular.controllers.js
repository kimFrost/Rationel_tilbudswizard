;(function(window, document, undefined) {
	var Nemrefusion = new namespace("Nemrefusion");


	// Newsletter Controller
	Nemrefusion.Angular.controller('NewsletterCtrl', ['$scope', '$element', '$http',  function($scope, $element, $http) {
		$scope.data = ($scope.data === undefined) ? {} : $scope.data;
		$scope.states = ($scope.states === undefined) ? {} : $scope.states;
		$scope.options = ($scope.options === undefined) ? {} : $scope.options;

		// Data
		$scope.newsletterctrl = {
			options: {},
			states: {
				validated: false,
				pending: false,
				postedSuccess: false,
				postedError: false,
				notValidated: false
			},
			css: {}
		};



		/* Scope Functions
		 ===========================*/
		$scope.newsletterctrl.postform = function(action) {
			action = (action === undefined) ? "unsubscribe" : action;
			//Nemrefusion.log($scope.newsletterform);
			if (!$scope.newsletterform.$invalid) {
				var url = "";
				if (action === "subscribe") {
					url = "/umbraco/api/";
				}
				else if (action === "unsubscribe") {
					url = "/umbraco/api/";
				}


				return false;
				$scope.newsletterctrl.states.notValidated = false;
				$scope.newsletterctrl.states.pending = true;
				$http({
					method: 'POST',
					url: url,
					data: $scope.newsletterform.formdata
				}).success(function(data, status, headers, config) {
					$scope.newsletterctrl.states.pending = false;
					$scope.newsletterctrl.states.postedSuccess = true;
					$scope.newsletterctrl.states.postedError = false;
					$scope.newsletterctrl.clearform();
				}).error(function(data, status, headers, config) {
					$scope.newsletterctrl.states.pending = false;
					$scope.newsletterctrl.states.postedSuccess = false;
					$scope.newsletterctrl.states.postedError = true;
				});


			}
			else {
				$scope.newsletterctrl.states.notValidated = true;
				for (var i=0;i<$scope.newsletterform.$error.required.length;i++) {
					var required = $scope.newsletterform.$error.required[i];
					required.$setViewValue(required.$viewValue);
				}
			}
		};
		$scope.newsletterctrl.clearform = function() {
			$scope.newsletterform.formdata = {};
		};


		/* Bindings
		 ===========================*/
		// Scope Events

		// User Events

	}]);

})(window, window.document);
