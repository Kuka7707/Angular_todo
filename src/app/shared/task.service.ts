import {Injectable} from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as moment from 'moment';

export interface Task{
    id?: string,
    title: string
    date?: string
}
interface CreateResponse{
    name:string
}

@Injectable({providedIn:'root'})
export class TasksService {
    static url ='https://angular-todo-24c29-default-rtdb.asia-southeast1.firebasedatabase.app/tasks'

    constructor(public http: HttpClient){
    }

    load(date: moment.Moment):Observable<any>{
        return this.http
            .get<Task[]>(`${TasksService.url}/${date.format('DD-MM-YYYY')}.json`)
            .pipe(map(tasks =>{
                if(!tasks){
                    return []
                }
                console.log('vot', Object.keys(tasks).map(key=>({...tasks[key], id:key})))
                return Object.keys(tasks).map(key=>({...tasks[key], id:key}))
        }))
    }

    create( task: Task ):Observable<Task>{
        return this.http
            .post<any>(`${TasksService.url}/${task.date}.json`, task).pipe(map(res => {
            return {...task, id:res.name}
        }))
    }

    remove(task: Task ):Observable<void>{
        return this.http.delete<void>(`${TasksService.url}/${task.date}/${task.id}.json`)
    }
}