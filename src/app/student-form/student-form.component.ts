import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Student } from '../models/Student';
import { CommonService } from '../Services/common.service';
import { ServerHttpService } from '../Services/server-http.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})

export class StudentFormComponent implements OnInit {
  public id = 0;
  public studentForm = new FormGroup({
    code: new FormControl(''),
    gender: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dob: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    picture: new FormControl('')
  });

  // public studentForm = this.formBuilder.group({
  //   code: ['', Validators.required],
  //   gender: ['', Validators.required],
  //   firstName: ['', Validators.required],
  //   lastName: ['', Validators.required],
  //   dob: ['', Validators.required],
  //   email: ['', Validators.required],
  //   phone: ['', Validators.required],
  //   picture: ['', Validators.required]
  // });

  constructor(
    private common: CommonService,
    private serverHttp: ServerHttpService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const route: any = this.route.snapshot.paramMap.get('id');
    this.id = route;
    if(this.id > 0) {
      this.loadData(this.id);
    }
  }

  private loadData(id: Number) {
    console.log(id);
    this.serverHttp.getStudent(id).subscribe(data => {
      console.log(data);
      for( const control in this.studentForm.controls) {
        if(control) {
          const controls: any = this.studentForm.controls;
          controls[control].setValue(data[control]);
        }
      }
    })
  }

  private createNewData() {
    const newStudent: any = {};
    for( const control in this.studentForm.controls) {
      if(control) {
        const controls: any = this.studentForm.controls;
        newStudent[control] = controls[control].value;
      }
    }
    return newStudent as Student;
  }

  public save() {
    if(this.id > 0) {
      this.serverHttp.editStudent(this.id, this.createNewData()).subscribe(data => {
        this.common.increamentStudent();
        this.studentForm.reset();
      })
    } else {
      this.serverHttp.addStudent(this.createNewData()).subscribe(data => {
        this.common.increamentStudent();
        this.studentForm.reset();
      })
    }
  }

  public saveAndReturn() {
    if(this.id > 0) {
      this.serverHttp.editStudent(this.id, this.createNewData()).subscribe(data => {
        this.router.navigate(['student']);
      })
    } else {
      this.serverHttp.addStudent(this.createNewData()).subscribe(data => {
        this.router.navigate(['student']);
      })
    }
  }

  public randomSV() {
    this.serverHttp.getRandomStudent().subscribe(data => {
      console.log(data);
      if(data && data.results && data.results.length > 0){
        const student = data.results[0];
        this.studentForm.controls.code.setValue(
          (student.id.name || '') + '-' + (student.id.value || '')
        );
        this.studentForm.controls.gender.setValue(student.gender);
        this.studentForm.controls.firstName.setValue(student.name.first);
        this.studentForm.controls.lastName.setValue(student.name.last);
        this.studentForm.controls.dob.setValue(student.dob.date);
        this.studentForm.controls.email.setValue(student.email);
        this.studentForm.controls.phone.setValue(student.phone);
        this.studentForm.controls.picture.setValue(student.picture.large);
      }
    })
  }

  public returnStudent() {
    this.router.navigate(['student']);
  }

}
