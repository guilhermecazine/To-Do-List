$(document).ready(function() {
  var tasks = [];

  var getAndDisplayAllTasks = function () {
    $.ajax({
      type: 'GET',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1192',
      dataType: 'json',
      success: function (response, textStatus) {
        tasks = response.tasks;
        displayTasks(tasks);
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  var displayTasks = function(tasksToDisplay) {
    $('#todo-list').empty();
    tasksToDisplay.forEach(function (task) {
      $('#todo-list').append('<div class="row"><p class="col-xs-8">' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
    });
  }

  var createTask = function () {
    $.ajax({
      type: 'POST',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1192',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $('#new-task-content').val()
        }
      }),
      success: function (response, textStatus) {
        $('#new-task-content').val('');
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  $('#create-task').on('submit', function (e) {
    e.preventDefault();
    createTask();
  });

  getAndDisplayAllTasks();

  var deleteTask = function (id) {
    $.ajax({
      type: 'DELETE',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=1192',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  $(document).on('click', '.delete', function () {
    deleteTask($(this).data('id'));
  });

  var markTaskComplete = function (id) {
    $.ajax({
      type: 'PUT',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=1192',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  var markTaskActive = function (id) {
    $.ajax({
      type: 'PUT',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=1192',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  $(document).on('change', '.mark-complete', function() {
    var id = $(this).data('id');
    if (this.checked) {
      markTaskComplete(id);
    } else {
      markTaskActive(id);
    }
  });

  $('#filter-tasks').on('click', '.filter-btn', function() {
    var status = $(this).data('status');
    var filteredTasks;

    if (status === 'all') {
      filteredTasks = tasks;
    } else if (status === 'active') {
      filteredTasks = tasks.filter(function(task) {
        return !task.completed;
      });
    } else if (status === 'complete') {
      filteredTasks = tasks.filter(function(task) {
        return task.completed;
      });
    }

    displayTasks(filteredTasks);
  });



});
