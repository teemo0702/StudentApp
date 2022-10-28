import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../models/Student';
import { CommonService } from '../Services/common.service';
import { ServerHttpService } from '../Services/server-http.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  public students: Student[] = [];

  constructor(
    private common: CommonService,
    private serverHttp: ServerHttpService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.serverHttp.getStudents().subscribe(data => {
      this.students = data;
      this.common.setTotalStudents(data.length);
    })
  }

  public addSV() {
    this.router.navigate(['studentform', 0]);
  }

  public deleteSV(studentID: number) {
    this.serverHttp.deleteStudent(studentID).subscribe(data => {
      this.loadData();
    })
  }

  public editSV(studentID: number) {
    this.router.navigate(['studentform', studentID]);
  }

  public sortById() {
    this.students = _.sortBy(this.students, ['id']);
  }

  public sortByCode(dir: string) {
    if(dir === 'up') {
      this.students = _.orderBy(this.students, ['code'], ['desc']);
    } else {
      this.students = _.orderBy(this.students, ['code'], ['asc']);
    }
  }


}
