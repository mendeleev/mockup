var ctrl = angular.module('Controllers', ['testControllers']);

//task controller
ctrl.controller('taskCtrl', ['$scope', '$routeParams', '$http', 
	function($scope, $routeParams, $http) {
		$scope.task = null;
		$scope.answers = {};

		//switch on/off task validation
		$scope.showValidation = false;

		//loading task data
		$http.get('app/data/' + $routeParams.testId + '.json').success(function(data) {
			$scope.task = data;

			//loads individual template if task has
			//if not, loads the default template
			$scope.templateUrl = data.template ? "app/views/" + data.template : "app/views/default.html";		
		});

		//returns boolean on matching answers
		var matchAnswer = function(answer1, answer2) {
			return answer1.toLowerCase() === answer2.toLowerCase();
		};

		//check if the user answer is valid
		var validateAnswer = function(index) {
			var answer1 = $scope.task.options[index].answer;
			var answer2 = $scope.answers[index];

			if(answer2) { 
				return matchAnswer(answer1, answer2);
			} else {
				return false;
			}
		};

		//show correct sign if the answer is valid
		$scope.showCorrectMessage = function(index) {
			return validateAnswer(index);
		};

		//show incorrect message if the answer isn't valid
		$scope.showIncorrectMessage = function(index) {
			if(!validateAnswer(index)) return true;
		}; 	

		// show/hide answers validation
		$scope.checkAnswers = function() {
			$scope.showValidation = $scope.showValidation ? false : true;
		};
	}
]);

//navigation controller
ctrl.controller('navigationCtrl', ['$scope', '$http', '$location', 
	function($scope, $http, $location) {
		$scope.navigation = navOptions;	

		//getting test id from the url
		var getPathId = function() {
			var testId = $location.url();
			return parseInt(testId.substring(1));
		};

		//making navigation list
		var getTestList = function() {
			var list = [];
			angular.forEach($scope.navigation, function(exercise) {
				angular.forEach(exercise.tasks, function(task) {
					list.push(task.id);
				})
			});
			return list;
		};

		//getting the current position
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

		//creating a new list
		var testList = getTestList();

		//getting current position
		var current = getCurrentPos(testList);

		//set current position
		//when click on the navigation element
		$scope.setCurrentPos = function(pos) {
			current = pos;
		};	

		//go to the next task when click next
		$scope.nextTask = function() {
			current = getCurrentPos(testList);
			if(testList.length -1 > current) {
				current += 1; 
				$location.path(testList[current].toString());
			}
		};

		//go to the previous task when click prev
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
					}
				]
			},
			{
				"exercise": 2,
				"tasks": [
					{
						"id": 3,
						"name": "Hello"
					}
				]
			}
		];