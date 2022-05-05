import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { DateService } from '../shared/date.service';
import { TasksService } from '../shared/task.service';


@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})

export class OrganizerComponent implements OnInit {

  form: FormGroup
  tasks: Task[] = []

  constructor(public dataService: DateService, public tasksService: TasksService) { }

  ngOnInit(): void {
    this.dataService.date.pipe(
      switchMap(date => this.tasksService.load(date))
    ).subscribe(tasks => {this.tasks = tasks})
    console.log(this.tasks)

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  submit(){
     const {title} = this.form.value
     let task ={
      title,
      date:this.dataService.date.value.format('DD-MM-YYYY')
    }

    this.tasksService.create(task).subscribe(task => {
      // this.tasks.push(task)
      console.log('New Task', task)
      this.form.reset()
    }, err => console.error(err))
    
  }

  // remove(task: Task){
  //   this.tasksService.remove(task).subscribe(()=>{
  //     this.tasks = this.tasks.filter(t => t.id !== task.id)
  //   }, err => console.error(err))
  // }

}
