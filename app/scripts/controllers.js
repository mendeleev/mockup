var ctrl = angular.module('Controllers', ['testControllers']);

ctrl.controller('MainCtrl', function($scope) {
	$scope.test = {
		"name": "Andrii"
	}

	$scope.test.name = "Andrii";
});

ctrl.controller('taskCtrl', ['$scope', '$http', function($scope, $http) {

	$scope.task = null;
	$http.get("app/data/test.json").success(function(data) {
		$scope.task = data;
	});
}]);

ctrl.controller('routeCtrl', ['$scope', '$routeParams', '$http', 
	function($scope, $routeParams, $http) {
		$scope.task = null;
		$http.get('app/data/' + $routeParams.testId + '.json').success(function(data) {
			$scope.task = data;			
		});
	}
]);

ctrl.controller('navigationCtrl', ['$scope', '$routeParams', '$http', '$location', 
	function($scope, $routeParams, $http, $location) {
		$scope.test = navOptions;

		$scope.nextTask = function() {				
			if($routeParams.testId < $scope.test.length) {
				console.log($scope.test.length);
				$location.path((++$routeParams.testId).toString());
			}
		}

		$scope.prevTask = function() {				
			if($routeParams.testId > 1) {
				$location.path((--$routeParams.testId).toString());
			}
		}		
	}	
]);

var navOptions = [
			{
				"option": 1,
				"name": "something"
			},
			{
				"option": 2,
				"name": "number two"
			},
			{
				"option": 3,
				"name": "The third one"
			}
		];