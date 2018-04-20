(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var DataStorage = /** @class */ (function () {
    function DataStorage() {
        this.storage = window.localStorage;
    }
    DataStorage.prototype.store = function (array, callback) {
        var data = JSON.stringify(array);
        var storestatus = this.storage.setItem('taskdata', data);
        if (storestatus) {
            callback(true);
        }
        else {
            callback(false);
        }
    };
    DataStorage.prototype.read = function (callback) {
        var data = this.storage.getItem('taskdata');
        var array = JSON.parse(data);
        callback(array);
    };
    return DataStorage;
}());
exports.DataStorage = DataStorage;
},{}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var ListView = /** @class */ (function () {
    function ListView(listid) {
        this.list = document.getElementById(listid);
    }
    ListView.prototype.render = function (items) {
        var _this = this;
        items.forEach(function (task) {
            var id = task.id;
            var name = task.name;
            var status = task.status;
            var template = "<li id=\"" + id + "\" data-status=\"" + status + "\">\n                      <div class=\"task-container\">\n                          <div class =\"task-name\">" + name + "</div>\n                          <div class=\"task-buttons\">\n                              <button type=\"button\" data-function=\"status\">&#x2714;</button>\n                              <button type=\"button\" data-function=\"delete\">&times;</button>\n\n                          </div>\n                      </div>\n                      </li>";
            var fragment = document.createRange().createContextualFragment(template);
            _this.list.appendChild(fragment);
        });
    };
    ListView.prototype.clear = function () {
        this.list.innerHTML = '';
    };
    return ListView;
}());
exports.ListView = ListView;
},{}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var task_1 = require("../ts/task");
var taskmanager_1 = require("../ts/taskmanager");
var listview_1 = require("../ts/listview");
var datastorage_1 = require("../ts/datastorage");
//initialize
var taskarray = [];
var taskstorage = new datastorage_1.DataStorage();
var taskmanager = new taskmanager_1.TaskManager(taskarray);
var listview = new listview_1.ListView('task-list');
window.addEventListener('load', function () {
    var taskdata = taskstorage.read(function (data) {
        if (data.length > 0) {
            data.forEach(function (item) {
                taskarray.push(item);
            });
            listview.clear();
            listview.render(taskarray);
        }
    });
    //taskdata.forEach((item) => {taskarray.push(item);});
    //listview.render(taskarray);
});
//reference to form
var taskform = document.getElementById('task-form');
taskform.addEventListener('submit', function (event) {
    event.preventDefault();
    var input = document.getElementById('task-input');
    var taskname = input.value;
    taskform.reset();
    //console.log(taskname);
    if (taskname.length > 0) {
        var task = new task_1.Task(taskname);
        taskmanager.add(task);
        listview.clear();
        taskstorage.store(taskarray, function (result) {
            if (result) {
                taskform.reset();
                listview.clear();
                listview.render(taskarray);
            }
            else {
                //error to do with storage
            }
        });
        listview.render(taskarray);
    }
});
function getParentId(elm) {
    while (elm.parentNode) {
        elm = elm.parentNode;
        var id = elm.getAttribute('id');
        if (id) {
            return id;
        }
    }
    return null;
}
var listelement = document.getElementById('task-list');
listelement.addEventListener('click', function (event) {
    var target = event.target;
    var id = getParentId(event.target);
    if (target.getAttribute('data-function') == 'status') {
        if (id) {
            taskmanager.changeStatus(id, function () {
                taskstorage.store(taskarray, function () {
                    listview.clear();
                    listview.render(taskarray);
                });
                //listview.clear();
                //listview.render(taskarray);
            });
        }
    }
    if (target.getAttribute('data-function') == 'delete') {
        if (id) {
            taskmanager["delete"](id, function () {
                taskstorage.store(taskarray, function () {
                    listview.clear();
                    listview.render(taskarray);
                });
                //listview.clear();
                //listview.render(taskarray);
            });
        }
    }
});
},{"../ts/datastorage":1,"../ts/listview":2,"../ts/task":4,"../ts/taskmanager":5}],4:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Task = /** @class */ (function () {
    function Task(taskname) {
        this.id = new Date().getTime().toString();
        this.name = taskname;
        this.status = false;
    }
    return Task;
}());
exports.Task = Task;
},{}],5:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var TaskManager = /** @class */ (function () {
    function TaskManager(array) {
        this.tasks = array;
    }
    TaskManager.prototype.add = function (task) {
        this.tasks.push(task);
        this.sort(this.tasks);
    };
    TaskManager.prototype.changeStatus = function (id, callback) {
        this.tasks.forEach(function (task) {
            if (task.id == id) {
                if (task.status == false) {
                    task.status = true;
                }
                else {
                    task.status = false;
                }
            }
        });
        this.sort(this.tasks);
        callback();
    };
    TaskManager.prototype["delete"] = function (id, callback) {
        var index_to_remove = undefined;
        this.tasks.forEach(function (item, index) {
            if (item.id == id) {
                index_to_remove = index;
            }
        });
        //delete the item with specified index
        if (index_to_remove !== undefined) {
            this.tasks.splice(index_to_remove, 1);
        }
        this.sort(this.tasks);
        callback();
    };
    TaskManager.prototype.sort = function (tasks) {
        tasks.sort(function (task1, task2) {
            if (task1.status == true && task2.status == false) {
                return 1;
            }
            if (task1.status == false && task2.status == true) {
                return -1;
            }
            if (task1.status == task2.status) {
                return 0;
            }
        });
    };
    return TaskManager;
}());
exports.TaskManager = TaskManager;
},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0cy9kYXRhc3RvcmFnZS50cyIsInRzL2xpc3R2aWV3LnRzIiwidHMvbWFpbi1tb2R1bGUudHMiLCJ0cy90YXNrLnRzIiwidHMvdGFza21hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0NBO0lBRU07UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUM7SUFDckMsQ0FBQztJQUNELDJCQUFLLEdBQUwsVUFBTSxLQUFpQixFQUFFLFFBQVE7UUFDN0IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEQsSUFBRyxXQUFXLEVBQUM7WUFDYixRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEI7YUFDRztZQUNGLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNqQjtJQUNMLENBQUM7SUFDRCwwQkFBSSxHQUFKLFVBQUssUUFBUTtRQUNULElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFDUCxrQkFBQztBQUFELENBcEJBLEFBb0JDLElBQUE7QUFwQlksa0NBQVc7Ozs7QUNBeEI7SUFFSSxrQkFBWSxNQUFjO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBQ0QseUJBQU0sR0FBTixVQUFPLEtBQXFCO1FBQTVCLGlCQWtCQztR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Q1Asa0JBQUM7QUFBRCxDQWxEQSxBQWtEQyxJQUFBO0FBbERZLGtDQUFXIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0e1Rhc2t9IGZyb20gJy4uL3RzL3Rhc2snO1xyXG5leHBvcnQgY2xhc3MgRGF0YVN0b3JhZ2V7XHJcbiAgICAgIHN0b3JhZ2U6YW55O1xyXG4gICAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XHJcbiAgICAgIH1cclxuICAgICAgc3RvcmUoYXJyYXk6QXJyYXk8VGFzaz4sIGNhbGxiYWNrKXtcclxuICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5zdHJpbmdpZnkoYXJyYXkpO1xyXG4gICAgICAgICAgbGV0IHN0b3Jlc3RhdHVzID0gdGhpcy5zdG9yYWdlLnNldEl0ZW0oJ3Rhc2tkYXRhJyxkYXRhKTtcclxuICAgICAgICAgIGlmKHN0b3Jlc3RhdHVzKXtcclxuICAgICAgICAgIFx0XHRjYWxsYmFjayh0cnVlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICBcdFx0Y2FsbGJhY2soZmFsc2UpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJlYWQoY2FsbGJhY2spe1xyXG4gICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnN0b3JhZ2UuZ2V0SXRlbSgndGFza2RhdGEnKTtcclxuICAgICAgICAgIGxldCBhcnJheSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgXHRjYWxsYmFjayhhcnJheSk7XHJcbiAgICAgIH1cclxufVxyXG4iLCJpbXBvcnR7VGFza30gZnJvbSAnLi4vdHMvdGFzayc7XHJcbmV4cG9ydCBjbGFzcyBMaXN0VmlldyB7XHJcbiAgICBsaXN0OiBIVE1MRWxlbWVudDtcclxuICAgIGNvbnN0cnVjdG9yKGxpc3RpZDogc3RyaW5nKSB7XHJcbiAgICAgIHRoaXMubGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxpc3RpZCk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoaXRlbXM6IEFycmF5IDwgVGFzayA+ICkge1xyXG4gICAgICAgIGl0ZW1zLmZvckVhY2goICh0YXNrKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IHRhc2suaWQ7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gdGFzay5uYW1lO1xyXG4gICAgICAgICAgICBsZXQgc3RhdHVzID0gdGFzay5zdGF0dXM7XHJcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IGA8bGkgaWQ9XCIke2lkfVwiIGRhdGEtc3RhdHVzPVwiJHtzdGF0dXN9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFzay1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzID1cInRhc2stbmFtZVwiPiR7bmFtZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFzay1idXR0b25zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRhdGEtZnVuY3Rpb249XCJzdGF0dXNcIj4mI3gyNzE0OzwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkYXRhLWZ1bmN0aW9uPVwiZGVsZXRlXCI+JnRpbWVzOzwvYnV0dG9uPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9saT5gO1xyXG4gICAgICAgICAgICAgbGV0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQodGVtcGxhdGUpO1xyXG4gICAgICAgICAgICB0aGlzLmxpc3QuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG4gICAgICAgIH0gKTtcclxuICAgIH1cclxuICBjbGVhcigpe1xyXG4gICAgdGhpcy5saXN0LmlubmVySFRNTCA9ICcnO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnR7VGFza30gZnJvbSAnLi4vdHMvdGFzayc7XHJcbmltcG9ydHtUYXNrTWFuYWdlcn0gZnJvbSAnLi4vdHMvdGFza21hbmFnZXInO1xyXG5pbXBvcnR7TGlzdFZpZXcgfSBmcm9tICcuLi90cy9saXN0dmlldyc7XHJcbmltcG9ydHtEYXRhU3RvcmFnZX0gZnJvbSAnLi4vdHMvZGF0YXN0b3JhZ2UnO1xyXG5cclxuXHJcblxyXG4vL2luaXRpYWxpemVcclxudmFyIHRhc2thcnJheTpBcnJheTxhbnk+ID0gW107XHJcbnZhciB0YXNrc3RvcmFnZSA9IG5ldyBEYXRhU3RvcmFnZSgpO1xyXG52YXIgdGFza21hbmFnZXIgPSBuZXcgVGFza01hbmFnZXIodGFza2FycmF5KTtcclxudmFyIGxpc3R2aWV3ID0gbmV3IExpc3RWaWV3KCd0YXNrLWxpc3QnKTtcclxuXHJcbiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpPT4ge1xyXG4gICAgICBcdFx0XHRsZXQgdGFza2RhdGEgPSB0YXNrc3RvcmFnZS5yZWFkKChkYXRhKSA9PntcclxuICAgICAgICAgIFx0XHRcdFx0XHRcdGlmKGRhdGEubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgXHRcdFx0XHRcdFx0XHRcdGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgIFx0XHRcdFx0XHRcdFx0XHR0YXNrYXJyYXkucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICBcdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xyXG4gICAgICAgICAgICAgIFx0XHRcdFx0XHRcdFx0XHRsaXN0dmlldy5jbGVhcigpO1xyXG4gICAgICAgICAgICAgIFx0XHRcdFx0XHRcdFx0XHRsaXN0dmlldy5yZW5kZXIodGFza2FycmF5KTtcclxuICAgICAgICAgIFx0XHRcdFx0XHRcdH1cclxuICAgICAgXHRcdFx0fSk7XHJcbiAgICAgICAgICAgLy90YXNrZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7dGFza2FycmF5LnB1c2goaXRlbSk7fSk7XHJcbiAgICAgICAgICAvL2xpc3R2aWV3LnJlbmRlcih0YXNrYXJyYXkpO1xyXG4gICAgfSk7XHJcblxyXG4vL3JlZmVyZW5jZSB0byBmb3JtXHJcbmNvbnN0IHRhc2tmb3JtID0gKCA8IEhUTUxGb3JtRWxlbWVudCA+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWZvcm0nKSk7XHJcbnRhc2tmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgbGV0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2staW5wdXQnKTtcclxuICAgICAgbGV0IHRhc2tuYW1lID0gKCA8IEhUTUxJbnB1dEVsZW1lbnQgPiBpbnB1dCkudmFsdWU7XHJcbiAgICAgIHRhc2tmb3JtLnJlc2V0KCk7XHJcbiAgICAgIC8vY29uc29sZS5sb2codGFza25hbWUpO1xyXG4gICAgICBpZih0YXNrbmFtZS5sZW5ndGggPjApe1xyXG4gICAgICAgICAgICAgICAgbGV0IHRhc2sgPSBuZXcgVGFzayh0YXNrbmFtZSk7XHJcbiAgICAgICAgICAgICAgICB0YXNrbWFuYWdlci5hZGQodGFzayk7XHJcbiAgICAgICAgICAgICAgICBsaXN0dmlldy5jbGVhcigpO1xyXG4gICAgICAgICAgICBcdFx0dGFza3N0b3JhZ2Uuc3RvcmUodGFza2FycmF5LChyZXN1bHQpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcdFx0dGFza2Zvcm0ucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFx0XHRsaXN0dmlldy5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHRcdGxpc3R2aWV3LnJlbmRlcih0YXNrYXJyYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFx0XHQvL2Vycm9yIHRvIGRvIHdpdGggc3RvcmFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGxpc3R2aWV3LnJlbmRlcih0YXNrYXJyYXkpO1xyXG4gICAgICAgIH1cclxufSk7XHJcbmZ1bmN0aW9uIGdldFBhcmVudElkKGVsbTpOb2RlKXtcclxuICAgIFx0XHR3aGlsZShlbG0ucGFyZW50Tm9kZSl7XHJcbiAgICAgICAgXHRcdFx0XHRlbG0gPSBlbG0ucGFyZW50Tm9kZTtcclxuICAgICAgICBcdFx0XHRcdGxldCBpZDpzdHJpbmcgPSAoPEhUTUxFbGVtZW50PmVsbSkuZ2V0QXR0cmlidXRlKCdpZCcpO1xyXG4gICAgICAgIFx0XHRcdFx0aWYoaWQpe1xyXG4gICAgICAgIFx0XHRcdFx0XHRcdHJldHVybiBpZDtcclxuICAgICAgICBcdFx0XHRcdH1cclxuICAgIFx0XHR9XHJcbiAgICBcdFx0cmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbmNvbnN0IGxpc3RlbGVtZW50OkhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stbGlzdCcpO1xyXG5saXN0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDpFdmVudCkgPT57XHJcbiAgICAgIFx0XHRsZXQgdGFyZ2V0OkhUTUxFbGVtZW50ID0gPEhUTUxFbGVtZW50PiBldmVudC50YXJnZXQ7XHJcbiAgICAgIFx0XHRsZXQgaWQgPSBnZXRQYXJlbnRJZCggPE5vZGU+IGV2ZW50LnRhcmdldCApO1xyXG5cclxuICAgICAgXHRcdGlmKHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZnVuY3Rpb24nKT09J3N0YXR1cycpe1xyXG4gICAgICAgICAgXHRcdFx0XHRpZihpZCl7XHJcbiAgICAgICAgICAgIFx0XHRcdFx0XHR0YXNrbWFuYWdlci5jaGFuZ2VTdGF0dXMoaWQsICgpPT57XHJcbiAgICAgICAgICAgICAgICBcdFx0XHRcdFx0XHQgICAgdGFza3N0b3JhZ2Uuc3RvcmUodGFza2FycmF5LCAoKT0+e1xyXG4gICAgICAgICAgICAgICAgXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGlzdHZpZXcuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgIFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxpc3R2aWV3LnJlbmRlcih0YXNrYXJyYXkpO1xyXG4gICAgICAgICAgICAgICAgXHRcdFx0XHRcdFx0XHRcdH0pXHJcbiAgICAgICAgICAgICAgICBcdFx0XHRcdFx0XHRcdFx0Ly9saXN0dmlldy5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgXHRcdFx0XHRcdFx0XHRcdC8vbGlzdHZpZXcucmVuZGVyKHRhc2thcnJheSk7XHJcbiAgICAgICAgICAgIFx0XHRcdFx0XHRcdH0pO1xyXG4gICAgICAgICAgXHRcdFx0XHR9XHJcbiAgICAgIFx0XHR9XHJcbiAgICAgICAgICBpZih0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWZ1bmN0aW9uJykgPT0gJ2RlbGV0ZScpe1xyXG4gICAgICAgICAgICAgICAgaWYoaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXNrbWFuYWdlci5kZWxldGUoaWQsICgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza3N0b3JhZ2Uuc3RvcmUodGFza2FycmF5LCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdHZpZXcuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0dmlldy5yZW5kZXIodGFza2FycmF5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2xpc3R2aWV3LmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9saXN0dmlldy5yZW5kZXIodGFza2FycmF5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbn0pO1xyXG4iLCJleHBvcnQgY2xhc3MgVGFzayB7XHJcbiAgICBpZDogc3RyaW5nO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgc3RhdHVzOiBib29sZWFuO1xyXG4gICAgY29uc3RydWN0b3IodGFza25hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLmlkID0gbmV3IERhdGUoKS5nZXRUaW1lKCkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgdGhpcy5uYW1lID0gdGFza25hbWU7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0e1Rhc2t9IGZyb20gJy4uL3RzL3Rhc2snO1xyXG5leHBvcnQgY2xhc3MgVGFza01hbmFnZXIge1xyXG4gICAgICB0YXNrczogQXJyYXkgPCBUYXNrID4gO1xyXG4gICAgICBjb25zdHJ1Y3RvcihhcnJheTogQXJyYXkgPCBUYXNrID4gKSB7XHJcbiAgICAgICAgdGhpcy50YXNrcyA9IGFycmF5O1xyXG4gICAgICB9XHJcbiAgICAgIGFkZCh0YXNrOiBUYXNrKSB7XHJcbiAgICAgICAgdGhpcy50YXNrcy5wdXNoKHRhc2spO1xyXG4gICAgICAgIHRoaXMuc29ydCh0aGlzLnRhc2tzKTtcclxuICAgICAgfVxyXG4gICAgICBjaGFuZ2VTdGF0dXMoaWQ6c3RyaW5nLCBjYWxsYmFjayApOnZvaWR7XHJcbiAgICAgIFx0XHR0aGlzLnRhc2tzLmZvckVhY2goKHRhc2s6VGFzaykgPT4ge1xyXG4gICAgICAgICAgICAgIGlmKHRhc2suaWQgPT0gaWQpe1xyXG4gICAgICAgICAgICAgICAgICBpZih0YXNrLnN0YXR1cyA9PWZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgXHRcdHRhc2suc3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgIFx0XHR0YXNrLnN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgXHRcdH0pO1xyXG4gICAgICAgICAgdGhpcy5zb3J0KHRoaXMudGFza3MpO1xyXG4gICAgICBcdFx0Y2FsbGJhY2soKTtcclxuICAgICAgfVxyXG4gICAgICBkZWxldGUoaWQ6c3RyaW5nLCBjYWxsYmFjayl7XHJcbiAgICAgICAgICAgIGxldCBpbmRleF90b19yZW1vdmU6bnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tzLmZvckVhY2goKGl0ZW06VGFzaywgaW5kZXg6bnVtYmVyKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGl0ZW0uaWQgPT0gaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgaW5kZXhfdG9fcmVtb3ZlID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy9kZWxldGUgdGhlIGl0ZW0gd2l0aCBzcGVjaWZpZWQgaW5kZXhcclxuICAgICAgICAgICAgaWYoaW5kZXhfdG9fcmVtb3ZlICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnRhc2tzLnNwbGljZShpbmRleF90b19yZW1vdmUsIDEpO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgICB0aGlzLnNvcnQodGhpcy50YXNrcyk7XHJcbiAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgfVxyXG4gICAgICBzb3J0KHRhc2tzOkFycmF5PFRhc2s+KXtcclxuICAgICAgICAgICAgdGFza3Muc29ydCgodGFzazEsdGFzazIpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGFzazEuc3RhdHVzID09IHRydWUgJiYgdGFzazIuc3RhdHVzID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZih0YXNrMS5zdGF0dXMgPT0gZmFsc2UgJiYgdGFzazIuc3RhdHVzID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZih0YXNrMS5zdGF0dXMgPT0gdGFzazIuc3RhdHVzKXtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxufVxyXG4iXX0=
