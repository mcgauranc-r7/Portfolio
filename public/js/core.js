var myCareer = angular.module('myCareer', ['ngMap']);
 
function mainController($scope, $http) {
    $scope.formData = {};
    $scope.timeSpan = function(from,to){
		return moment(from).format("MMM YY") + " to " +  moment(to).format("MMM YY");
	};
	$scope.stripCo = function(str) {
		console.log(str.replace(/\s/g,''))
		return str.replace(/\s/g,'');
	}
    $scope.diffDate = function(from,to){
		now =moment(to)
		return Math.round(now.diff(moment(from), 'months', true)/ 12);
	};
    // when landing on the page, get all todos and show them
    $http.get('/data/roles')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}