var routes = angular.module("Routes", ["ngRoute"]);

routes.config(["$routeProvider",
	function($routeProvider) {
		$routeProvider.
			when("/", {
				templateUrl: "app/views/test.html"
			}).
			when("/:testId", {
				templateUrl: "app/views/tmpl.html",
				controller: "routeCtrl",
				controllerAs: "task"
			});
	}
]);