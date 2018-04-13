(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var Task = /** @class */ (function () {
    function Task(taskname) {
        this.id = new Date().getTime().toString();
        this.name = taskname;
        this.status = false;
    }
    return Task;
}());
var TaskManager = /** @class */ (function () {
    function TaskManager(array) {
        this.tasks = array;
    }
    TaskManager.prototype.add = function (task) {
        this.tasks.push(task);
        console.log(this.tasks);
    };
    return TaskManager;
}());
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
            var template = "<li id=\"" + id + "\" data-status=\"" + status + "\">\n                <div class=\"task-container\">\n                    <div class =\"task-name\">" + name + "</div>\n                    <div class=\"task-buttons\">\n                        <button type=\"button\" data-function=\"status\">&#x2714;</button>\n                        <button type=\"button\" data-function=\"delete\">&times;</button>\n                        \n                    </div>\n                </div>\n                </li>";
            var fragment = document.createRange().createContextualFragment(template);
            _this.list.appendChild(fragment);
        });
    };
    ListView.prototype.clear = function () {
        this.list.innerHTML = '';
    };
    return ListView;
}());
var DataStorage = /** @class */ (function () {
    function DataStorage() {
        this.storage = window.localStorage;
    }
    DataStorage.prototype.store = function (array) {
        var data = JSON.stringify(array);
        this.storage.setItem('taskdata', data);
    };
    DataStorage.prototype.read = function () {
        var data = this.storage.getItem('taskdata');
        var array = JSON.parse(data);
        return array;
    };
    return DataStorage;
}());
//initialize
var taskarray = [];
var taskstorage = new DataStorage();
var taskmanager = new TaskManager(taskarray);
var listview = new ListView('task-list');
window.addEventListener('load', function () {
    var taskdata = taskstorage.read();
    taskdata.forEach(function (item) { taskarray.push(item); });
    listview.render(taskarray);
});
//reference to form
var taskform = document.getElementById('task-form');
taskform.addEventListener('submit', function (event) {
    event.preventDefault();
    var input = document.getElementById('task-input');
    var taskname = input.value;
    //console.log(taskname);
    var task = new Task(taskname);
    taskmanager.add(task);
    listview.clear();
    taskstorage.store(taskarray);
    listview.render(taskarray);
});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0cy9tYWluLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0lBSUUsY0FBWSxRQUFnQjtRQUMxQixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUNILFdBQUM7QUFBRCxDQVRBLEFBU0MsSUFBQTtBQUVEO0lBRUUscUJBQVksS0FBcUI7UUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUNELHlCQUFHLEdBQUgsVUFBSSxJQUFVO1FBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FUQSxBQVNDLElBQUE7QUFFRDtJQUVFLGtCQUFZLE1BQWM7UUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFDRCx5QkFBTSxHQUFOLFVBQU8sS0FBcUI7UUFBNUIsaUJBa0JDO1FBakJDLEtBQUssQ0FBQyxPQUFPLENBQUUsVUFBQyxJQUFJO1lBQ2xCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDakIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNyQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3pCLElBQUksUUFBUSxHQUFHLGNBQVcsRUFBRSx5QkFBa0IsTUFBTSwyR0FFWixJQUFJLHlWQU81QixDQUFDO1lBQ2hCLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMxRSxLQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUUsQ0FBQztJQUNOLENBQUM7SUFDSCx3QkFBSyxHQUFMO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFDRCxlQUFDO0FBQUQsQ0EzQkEsQUEyQkMsSUFBQTtBQUVEO0lBRUE7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUM7SUFDckMsQ0FBQztJQUNELDJCQUFLLEdBQUwsVUFBTSxLQUFpQjtRQUNyQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0QsMEJBQUksR0FBSjtRQUNFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQ0Qsa0JBQUM7QUFBRCxDQWRBLEFBY0MsSUFBQTtBQUdELFlBQVk7QUFDWixJQUFJLFNBQVMsR0FBYyxFQUFFLENBQUM7QUFDOUIsSUFBSSxXQUFXLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUNwQyxJQUFJLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM3QyxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUV2QyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO0lBQ2hDLElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNsQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxJQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQztJQUNwRCxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3pCLENBQUMsQ0FBQyxDQUFDO0FBRVAsbUJBQW1CO0FBQ25CLElBQU0sUUFBUSxHQUF5QixRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBRSxDQUFDO0FBQzdFLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsVUFBQyxLQUFZO0lBQy9DLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN2QixJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2xELElBQUksUUFBUSxHQUEwQixLQUFNLENBQUMsS0FBSyxDQUFDO0lBQ25ELHdCQUF3QjtJQUN4QixJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QixXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzdCLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDN0IsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjbGFzcyBUYXNrIHtcclxuICBpZDogc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBzdGF0dXM6IGJvb2xlYW47XHJcbiAgY29uc3RydWN0b3IodGFza25hbWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5pZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpLnRvU3RyaW5nKCk7XHJcbiAgICB0aGlzLm5hbWUgPSB0YXNrbmFtZTtcclxuICAgIHRoaXMuc3RhdHVzID0gZmFsc2U7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBUYXNrTWFuYWdlciB7XHJcbiAgdGFza3M6IEFycmF5IDwgVGFzayA+IDtcclxuICBjb25zdHJ1Y3RvcihhcnJheTogQXJyYXkgPCBUYXNrID4gKSB7XHJcbiAgICB0aGlzLnRhc2tzID0gYXJyYXk7XHJcbiAgfVxyXG4gIGFkZCh0YXNrOiBUYXNrKSB7XHJcbiAgICB0aGlzLnRhc2tzLnB1c2godGFzayk7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLnRhc2tzKTtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIExpc3RWaWV3IHtcclxuICBsaXN0OiBIVE1MRWxlbWVudDtcclxuICBjb25zdHJ1Y3RvcihsaXN0aWQ6IHN0cmluZykge1xyXG4gICAgdGhpcy5saXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGlzdGlkKTtcclxuICB9XHJcbiAgcmVuZGVyKGl0ZW1zOiBBcnJheSA8IFRhc2sgPiApIHtcclxuICAgIGl0ZW1zLmZvckVhY2goICh0YXNrKSA9PiB7XHJcbiAgICAgIGxldCBpZCA9IHRhc2suaWQ7XHJcbiAgICAgIGxldCBuYW1lID0gdGFzay5uYW1lO1xyXG4gICAgICBsZXQgc3RhdHVzID0gdGFzay5zdGF0dXM7XHJcbiAgICAgIGxldCB0ZW1wbGF0ZSA9IGA8bGkgaWQ9XCIke2lkfVwiIGRhdGEtc3RhdHVzPVwiJHtzdGF0dXN9XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFzay1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzID1cInRhc2stbmFtZVwiPiR7bmFtZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFzay1idXR0b25zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRhdGEtZnVuY3Rpb249XCJzdGF0dXNcIj4mI3gyNzE0OzwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkYXRhLWZ1bmN0aW9uPVwiZGVsZXRlXCI+JnRpbWVzOzwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9saT5gO1xyXG4gICAgICAgbGV0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQodGVtcGxhdGUpO1xyXG4gICAgICB0aGlzLmxpc3QuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG4gICAgfSApO1xyXG4gIH1cclxuY2xlYXIoKXtcclxuICB0aGlzLmxpc3QuaW5uZXJIVE1MID0gJyc7XHJcbn1cclxufVxyXG5cclxuY2xhc3MgRGF0YVN0b3JhZ2V7XHJcbiAgc3RvcmFnZTphbnk7XHJcbmNvbnN0cnVjdG9yKCl7XHJcbiAgdGhpcy5zdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcclxufVxyXG5zdG9yZShhcnJheTpBcnJheTxUYXNrPil7XHJcbiAgbGV0IGRhdGEgPSBKU09OLnN0cmluZ2lmeShhcnJheSk7XHJcbiAgdGhpcy5zdG9yYWdlLnNldEl0ZW0oJ3Rhc2tkYXRhJyxkYXRhKTtcclxufVxyXG5yZWFkKCl7XHJcbiAgbGV0IGRhdGEgPSB0aGlzLnN0b3JhZ2UuZ2V0SXRlbSgndGFza2RhdGEnKTtcclxuICBsZXQgYXJyYXkgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gIHJldHVybiBhcnJheTtcclxufVxyXG59XHJcblxyXG5cclxuLy9pbml0aWFsaXplXHJcbnZhciB0YXNrYXJyYXk6QXJyYXk8YW55PiA9IFtdO1xyXG52YXIgdGFza3N0b3JhZ2UgPSBuZXcgRGF0YVN0b3JhZ2UoKTtcclxudmFyIHRhc2ttYW5hZ2VyID0gbmV3IFRhc2tNYW5hZ2VyKHRhc2thcnJheSk7XHJcbnZhciBsaXN0dmlldyA9IG5ldyBMaXN0VmlldygndGFzay1saXN0Jyk7XHJcblxyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCk9PiB7XHJcbiAgbGV0IHRhc2tkYXRhID0gdGFza3N0b3JhZ2UucmVhZCgpO1xyXG4gIHRhc2tkYXRhLmZvckVhY2goKGl0ZW0pID0+IHt0YXNrYXJyYXkucHVzaChpdGVtKTt9KTtcclxuICBsaXN0dmlldy5yZW5kZXIodGFza2FycmF5KTtcclxuICAgIH0pO1xyXG5cclxuLy9yZWZlcmVuY2UgdG8gZm9ybVxyXG5jb25zdCB0YXNrZm9ybSA9ICggPCBIVE1MRm9ybUVsZW1lbnQgPiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1mb3JtJykpO1xyXG50YXNrZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICBsZXQgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1pbnB1dCcpO1xyXG4gIGxldCB0YXNrbmFtZSA9ICggPCBIVE1MSW5wdXRFbGVtZW50ID4gaW5wdXQpLnZhbHVlO1xyXG4gIC8vY29uc29sZS5sb2codGFza25hbWUpO1xyXG4gIGxldCB0YXNrID0gbmV3IFRhc2sodGFza25hbWUpO1xyXG4gIHRhc2ttYW5hZ2VyLmFkZCh0YXNrKTtcclxuICBsaXN0dmlldy5jbGVhcigpO1xyXG4gIHRhc2tzdG9yYWdlLnN0b3JlKHRhc2thcnJheSk7XHJcbiAgbGlzdHZpZXcucmVuZGVyKHRhc2thcnJheSk7XHJcbn0pO1xyXG4iXX0=
