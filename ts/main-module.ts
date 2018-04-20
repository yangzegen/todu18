import{Task} from '../ts/task';
import{TaskManager} from '../ts/taskmanager';
import{ListView } from '../ts/listview';
import{DataStorage} from '../ts/datastorage';



//initialize
var taskarray:Array<any> = [];
var taskstorage = new DataStorage();
var taskmanager = new TaskManager(taskarray);
var listview = new ListView('task-list');

 window.addEventListener('load', ()=> {
      			let taskdata = taskstorage.read((data) =>{
          						if(data.length > 0){
              								data.forEach((item) => {
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
const taskform = ( < HTMLFormElement > document.getElementById('task-form'));
taskform.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      let input = document.getElementById('task-input');
      let taskname = ( < HTMLInputElement > input).value;
      taskform.reset();
      //console.log(taskname);
      if(taskname.length >0){
                let task = new Task(taskname);
                taskmanager.add(task);
                listview.clear();
            		taskstorage.store(taskarray,(result)=>{
                              if(result){
                                  		taskform.reset();
                                  		listview.clear();
                                  		listview.render(taskarray);
                              }else{
                                  		//error to do with storage
                              }
                });
                listview.render(taskarray);
        }
});
function getParentId(elm:Node){
    		while(elm.parentNode){
        				elm = elm.parentNode;
        				let id:string = (<HTMLElement>elm).getAttribute('id');
        				if(id){
        						return id;
        				}
    		}
    		return null;
}

const listelement:HTMLElement = document.getElementById('task-list');
listelement.addEventListener('click', (event:Event) =>{
      		let target:HTMLElement = <HTMLElement> event.target;
      		let id = getParentId( <Node> event.target );

      		if(target.getAttribute('data-function')=='status'){
          				if(id){
            					taskmanager.changeStatus(id, ()=>{
                						    taskstorage.store(taskarray, ()=>{
                												listview.clear();
                												listview.render(taskarray);
                								})
                								//listview.clear();
                								//listview.render(taskarray);
            						});
          				}
      		}
          if(target.getAttribute('data-function') == 'delete'){
                if(id){
                        taskmanager.delete(id, ()=>{
                                taskstorage.store(taskarray,()=>{
                                      listview.clear();
                                      listview.render(taskarray);
                                });
                                //listview.clear();
                                //listview.render(taskarray);
                        });
                }
          }
});
