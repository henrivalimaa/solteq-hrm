import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { EmployeeDetailComponent } from '../employee-detail/employee-detail.component';
import { EmployeeService } from '../services/employee.service';
import { fadeInOutAnimation, snackBarAnimation } from "../animations/animations";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  animations: [
    fadeInOutAnimation,
    snackBarAnimation
  ]
})
export class EmployeesComponent implements OnInit {
  private employees: Employee[] = [];
  private employeeToBeRemoved: Employee;
  private employee: Employee = new Employee();
	private displayedColumns = ['name', 'position', 'salary', 'action'];
  private dataSource;
  private averageSalary: number;
  private message: string;
  private showMessage: boolean;
  private showConfirmButtons: boolean;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  constructor(
    public dialog: MatDialog,
    private router: Router, 
    private employeeService: EmployeeService) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(
        response => {
          this.employees = response;
          this.averageSalary = this.calculateAverageSalary(response);
          this.dataSource = new MatTableDataSource(this.employees);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
    );
  }

  calculateAverageSalary(employees: Employee[]): any {
    let totalSalaries = 0;
    for (let employee of employees) {
      totalSalaries += employee.salary;
    }

    return (totalSalaries / employees.length).toFixed(2);
  }

  previewDetails(employee: Employee, action: string): void {
    let data = { action: action, employee: employee };

    let dialogRef = this.dialog.open(EmployeeDetailComponent, {
      width: '40em',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'edited') {
        this.averageSalary = this.calculateAverageSalary(this.dataSource.filteredData);
      }
    });
  }

  createEmployee(): void {
    this.employeeService.createEmployee(this.employee).subscribe(
      response => {
        if (response.status) {
          this.displayMessage('Check form values', false);
        } else {
          this.displayMessage(this.employee.name + ' added to employees', false);
          this.employee = new Employee();
          this.employees.push(response);
          this.dataSource = new MatTableDataSource(this.employees);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.averageSalary = this.calculateAverageSalary(this.dataSource.filteredData);
        }
      }
    )
  }

  removeEmployee(): void {
    this.employeeService.removeEmployee(this.employeeToBeRemoved). subscribe(
      response => {
        if (response !== null) {
          this.displayMessage('Error with removing: ' + this.employeeToBeRemoved, false);
        } else {
          this.displayMessage(this.employeeToBeRemoved.name + ' has been removed from employees', false);

          this.employees.forEach((employee, index) => {
            if(employee.id == this.employeeToBeRemoved.id) {
              this.employees.splice(index, 1);
            }
          });

          this.employeeToBeRemoved = null;
          this.dataSource = new MatTableDataSource(this.employees);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.averageSalary = this.calculateAverageSalary(this.dataSource.filteredData);
        }
      }
    );
  }

  confirmRemoval(employee: Employee): void {
    this.employeeToBeRemoved = employee;
    let confirmText = 'Removing ' + employee.name;
    this.displayMessage(confirmText, true);
  }

  displayMessage(message: string, confirm: boolean): void {
    if (confirm === true) {
      this.message = message;
      this.showMessage = true;
      this.showConfirmButtons = true;
    } else {
      this.showConfirmButtons = false;
      this.showMessage = true;
      this.message = message;
        setTimeout(() => {
          this.showMessage = false;
        }, 7000);
    }
  }

  exportEmployeeData(): void {
    let headers = { id: 'id', name: 'name', salary: 'salary', position: 'position', email: 'email', phone: 'phone', street: 'street', code: 'code', city: 'city', country: 'country' }; 
    this.exportCSVFile(headers, Object.assign([], this.dataSource.filteredData), 'export');
  }

  convertToCSV(objArray): string {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';

    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in array[i]) {
        if (line != '') line += ','

        line += array[i][index];
      }

      str += line + '\r\n';
    }

    return str;
  }

  exportCSVFile(headers, items, fileTitle): void {
    if (headers) {
        items.unshift(headers);
    }

    let jsonObject = JSON.stringify(items);

    let csv = this.convertToCSV(jsonObject);

    let filename = fileTitle + '.csv' || 'export.csv';

    let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      var link = document.createElement("a");
      if (link.download !== undefined) {
        let url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

}

export class Employee {
	id: string;
  name: string;
  position: string;
  salary: number;
  phone: string;
  email: string;
  street: string;
  code: string;
  city: string;
  country: string;

  public constructor(init?:Partial<Employee>) {
    Object.assign(this, init);
  };
}
