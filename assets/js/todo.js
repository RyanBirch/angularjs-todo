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

    // generate a unique id for the todo item
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let len = str.length
    let id = ''
    for (let i = 0; i < 6; i++) {
      id += str.charAt(Math.floor(Math.random() * len))
    }

    // save new todo in newTodo array
    $scope.savedTodos.push({
      task: newTodo,
      done: false,
      id: id
    })

    // put new todo in localStorage
    try {
      localStorage.clear()
      localStorage.setItem('savedTodos', JSON.stringify($scope.savedTodos))
    } catch(error) {
      alert(`Your browser's security settings prevent to-dos from being added to localStorage`)
    }
    
    // clear the input field
    $scope.newTodo = ''
    document.getElementById('todoInput').focus()
  }


  // delete todo item
  $scope.initDelete = function(todo) {
    let todos = $scope.savedTodos 
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === todo.id) {
        todos.splice(i, 1)
        localStorage.clear()
        localStorage.setItem('savedTodos', JSON.stringify(todos))
      }
    }
  }


  // check off a todo item
  $scope.completeTodo = function(todo) {
    let todos = $scope.savedTodos 
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === todo.id) {
        todo.done = !todo.done
        localStorage.clear()
        localStorage.setItem('savedTodos', JSON.stringify(todos))
      }
    }
  }


  // make a todo editable by double clicking
  $scope.makeEditable = function(todo) {
    let todos = $scope.savedTodos 
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === todo.id) {
        event.target.contentEditable = true
        event.target.focus()
      }
    }
  }


  // save the edited todo when you click away from the field
  $scope.editTodo = function(todo) {
    let todos = $scope.savedTodos 
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === todo.id) {
        todo.task = event.target.textContent
        localStorage.clear()
        localStorage.setItem('savedTodos', JSON.stringify(todos))
      }
    }

    event.target.contentEditable = false
  }

  // log data to console when you click a todo
  $scope.showData = function(todo) {
    console.log(todo)
  }

})