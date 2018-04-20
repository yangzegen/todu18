import{Task} from '../ts/task';
export class DataStorage{
      storage:any;
      constructor(){
        this.storage = window.localStorage;
      }
      store(array:Array<Task>, callback){
          let data = JSON.stringify(array);
          let storestatus = this.storage.setItem('taskdata',data);
          if(storestatus){
          		callback(true);
          }
          else{
          		callback(false);
          }
      }
      read(callback){
          let data = this.storage.getItem('taskdata');
          let array = JSON.parse(data);
        	callback(array);
      }
}
