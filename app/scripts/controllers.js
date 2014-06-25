var ctrl = angular.module('Controllers', []);

//extend array with shuffle function
Array.prototype.shuffle = function() {
	var i = this.length;
	while(--i) {
		var j = Math.floor(Math.random() * i);
		var temp = this[i];
		this[i] = this[j];
		this[j] = temp;
	}
};

//task controller
ctrl.controller('taskCtrl', ['$scope', '$routeParams', '$http', 
	function($scope, $routeParams, $http) {
		$scope.task = null;
		$scope.answers = {};
		$scope.taskAnswers = [];
		$scope.mixedOptions = [];		

		//switch on/off task validation
		$scope.showValidation = false;

		//loading task data
		$http.get('app/data/' + $routeParams.testId + '.json').success(function(data) {
			$scope.task = data;
			$scope.taskAnswers = getMixedTaskAnswers(data);
			$scope.mixedOptions = getMixedOptions(data);
			setExampleValue($scope.task.options);
			//loads individual template if task has
			//if not, loads the default template
			$scope.templateUrl = data.template ? "app/views/" + data.template : "app/views/default.html";		
		});

		//getting mixed array with answers
		var getMixedTaskAnswers = function(data) {
			var answers = [];
			angular.forEach(data.options, function(option) {
				answers.push(option.answer);
			});
			answers.shuffle();
			return answers || [];
		};

		//setting example value
		var setExampleValue = function() {
			for(var i = 0; i < $scope.task.options.length; i++) {
				if($scope.task.options[i].isExample) {
					$scope.answers[i] = $scope.task.options[i].answer;
				} 					
			}
		};

		//getting mixed options
		var getMixedOptions = function(data) {
			var list = [];
			angular.forEach(data.options, function(option) {
				var obj = new Object();
				obj.option = option.option;
				obj.answer = option.answer;
				list.push(obj);
			});

			list.shuffle();
			return list || [];
		};

		//returns boolean on matching answers
		var matchAnswer = function(answer1, answer2) {
			return answer1.toLowerCase() === answer2.toLowerCase();
		};

		//get the task answer
		var getTaskAnswer = function(index, param) {
			if(param) return param.answer ? param.answer : $scope.task.options[index].answer;
			return $scope.task.options[index].answer;
		};

		//check if the user answer is valid
		var validateAnswer = function(index, param) {
			var answer = getTaskAnswer(index, param);
			var userAnswer = $scope.answers[index];

			//match answer if userAnswer is true
			//else return false
			return userAnswer ? matchAnswer(answer, userAnswer) : false;
		};

		//show correct sign if the answer is valid
		$scope.showCorrectMessage = function(index, param) {
			return validateAnswer(index, param);
		};

		//show incorrect message if the answer isn't valid
		$scope.showIncorrectMessage = function(index, param) {
			return !validateAnswer(index, param);
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
		$scope.navigation = null;
		var testList = null;
		var current = 0;

		$http.get('app/data/navigation.json').success(function(data) {
			$scope.navigation = data;

			//creating a new list
			testList = getTestList();

			//getting current position
			current = getCurrentPos(testList);
		});	

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

		$scope.navActive = function(id) {
			return id === getPathId();
		};		
	}	
]);