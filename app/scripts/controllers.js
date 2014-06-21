var ctrl = angular.module('Controllers', ['testControllers']);

ctrl.controller('MainCtrl', function($scope) {
	$scope.test = {
		"name": "Andrii"
	}

	$scope.test.name = "Andrii";
});

ctrl.controller('taskCtrl', ['$scope', '$http', function($scope, $http) {

	$scope.task = null;
	$scope.ttt = null;

	$http.get("app/data/test.json").success(function(data) {
		$scope.task = data;
	});

	$scope.testData = function() {
		$scope.ttt = angular.copy($scope.answers);
		console.log($scope.answers);
	};
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
				"exercise": 1,
				"tasks": [
					{
						"id": 1,
						"name": "Hello"
					},
					{
						"id": 2,
						"name": "Hello World"
					},
					{
						"id": 3,
						"name": "What's up?"
					}
				]
			},
			{
				"exercise": 2,
				"tasks": [
					{
						"id": 4,
						"name": "Hello"
					},
					{
						"id": 5,
						"name": "Hello World"
					},
					{
						"id": 6,
						"name": "What's up?"
					},
					{
						"id": 4,
						"name": "May I come in?"
					}
				]
			}
		];