var routes = angular.module("Routes", ["ngRoute"]);

routes.config(["$routeProvider",
	function($routeProvider) {
		$routeProvider.			
			when("/:testId", {
				templateUrl: "app/views/task-router.html",
				controller: "taskCtrl",
				controllerAs: "task"
			}).
			otherwise({
				redirectTo: "/1"
			});
	}
]);