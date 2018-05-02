import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EmployeeService } from '../services/employee.service';
import { fadeInOutAnimation, snackBarAnimation } from "../animations/animations";

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
  animations: [
    fadeInOutAnimation,
    snackBarAnimation
  ]
})
export class EmployeeDetailComponent implements OnInit {
  private editMode: boolean = false;
  private employeeEdited: boolean = false;
  private showMessage: boolean = false;
  private message: string;
  private clone: any;

	constructor(
		public dialogRef: MatDialogRef<EmployeeDetailComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
    private employeeService: EmployeeService) { 
    dialogRef.disableClose = true;
  }

  ngOnInit() { }

  ngAfterViewInit() {
    if (this.data.action == 'edit') this.editMode = true;
    this.clone = Object.assign({}, this.data.employee);
  }

  closeDialog(): void {
    if (this.employeeEdited == true) this.dialogRef.close('edited');
    else this.dialogRef.close();
  }

  editEmployee() {
  	this.editMode = true;
  }

  saveEmployee() {
  	this.editMode = false;
    this.employeeEdited = true;
    this.employeeService.editEmployee(this.data.employee).subscribe(
      response => {
        this.displayMessage(this.data.employee.name + ' has been updated');
      }
    );
  }

  discardChanges() {
    this.employeeEdited = false;
    this.employeeService.editEmployee(this.clone).subscribe(
      response => {
        this.data.employee = this.clone;
        this.displayMessage('Changes has been discarded');
      }
    );
  }

  displayMessage(message: string): void {
    this.showMessage = true;
    this.message = message;
      setTimeout(() => {
        this.showMessage = false;
      }, 7000);
  }

}
