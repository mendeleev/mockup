var ctrl = angular.module('Controllers', ['testControllers']);

ctrl.controller('routeCtrl', ['$scope', '$routeParams', '$http', 
	function($scope, $routeParams, $http) {
		$scope.task = null;
		$scope.answers = {};
		$http.get('app/data/' + $routeParams.testId + '.json').success(function(data) {
			$scope.task = data;			
		});

		$scope.checkAnswers = function() {
			console.log($scope.answers);
		};
	}
]);

ctrl.controller('navigationCtrl', ['$scope', '$http', '$location', 
	function($scope, $http, $location) {
		$scope.navigation = navOptions;	

		var getPathId = function() {
			var testId = $location.url();
			return parseInt(testId.substring(1));
		};

		var getTestList = function() {
			var list = [];
			angular.forEach($scope.navigation, function(exercise) {
				angular.forEach(exercise.tasks, function(task) {
					list.push(task.id);
				})
			});
			return list;
		};

		var getCurrentPos = function(list) {
			var testId = getPathId();
			var currentPos = 0;
			while(currentPos < list.length - 1) {
				if(list[currentPos] == testId) {
					break;
				} else {
					currentPos++;
				}
			}
			return currentPos;
		};	

		var testList = getTestList();
		var current = getCurrentPos(testList);
		console.log(testList);
		console.log(current);

		$scope.setCurrentPos = function(pos) {
			current = pos;
		};	

		$scope.nextTask = function() {
			current = getCurrentPos(testList);
			if(testList.length -1 > current) {
				current += 1; 
				$location.path(testList[current].toString());
			}
		};

		$scope.prevTask = function() {				
			current = getCurrentPos(testList);
			if(current > 0) {
				current--;
				$location.path(testList[current].toString());
			}
		};		
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
						"id": 25,
						"name": "May I come in?"
					}
				]
			}
		];