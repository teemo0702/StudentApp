import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonService } from './Services/common.service';
import { ServerHttpService } from './Services/server-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Student';
  @ViewChild('sidenav') sidenav!: MatSidenav;
  public isOpened = false;
  public totalStudents = 0;
  // public totalStudents = this.common.totalStudents;

  constructor(
    private common: CommonService,
    private serverHttp: ServerHttpService
  ) {}

  public ngOnInit(): void {
    this.common.totalStudents$.subscribe(total => {
      this.totalStudents = total;
    })

    if (this.common.totalStudents ===0) {
      this.serverHttp.getStudents().subscribe(data => {
        this.common.setTotalStudents(data.length);
      })
    }
  }

  public openLeftSide() {
    this.isOpened = !this.isOpened;
    this.sidenav.toggle();
  }
  public closeLeftSide() {
    this.isOpened = false;
  }
}
