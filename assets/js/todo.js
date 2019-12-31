const todoList = angular.module('todoList', [])

todoList.controller('todoCtrl', function($scope) {

  // check if we have any todos in localStorage
  try {
    let arr = JSON.parse(localStorage.getItem('savedTodos'))
    if (arr) $scope.savedTodos = arr
    else $scope.savedTodos = []
  } catch(error) {
    console.log(error)
  }

  // add a todo item
  $scope.addTodo = function(newTodo) {
    
    // save new todo in newTodo array
    $scope.savedTodos.push({
      task: newTodo,
      done: false
    })

    // put new todo in localStorage
    localStorage.clear()
    localStorage.setItem('savedTodos', JSON.stringify($scope.savedTodos))
    
    // clear the input field
    $scope.newTodo = ''
  }

})