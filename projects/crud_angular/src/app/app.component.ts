import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild('myModal') model: ElementRef | undefined;
  studentObj: Student = new Student();
  studentList: Student[] = [];

  ngOnInit(): void {
    const localData = localStorage.getItem('angularCrud');
    if (localData !== null) {
      this.studentList = JSON.parse(localData);
    }
  }

  openModel() {
    const model = document.getElementById('myModal');
    if (model !== null) model.style.display = 'block';
  }

  closeModel() {
    this.studentObj = new Student();
    if (this.model != null) this.model.nativeElement.style.display = 'none';
  }

  saveStudent() {
    debugger;
    const isLocalPresent = localStorage.getItem('angularCrud');
    if (isLocalPresent !== null) {
      const oldArray = JSON.parse(isLocalPresent);
      this.studentObj.id = oldArray.length + 1;
      oldArray.push(this.studentObj);
      this.studentList = oldArray;
      localStorage.setItem('angularCrud', JSON.stringify(oldArray));
    } else {
      const newArr = [];
      newArr.push(this.studentObj);
      this.studentObj.id = 1;
      this.studentList = newArr;
      localStorage.setItem('angularCrud', JSON.stringify(newArr));
    }
    this.closeModel();
  }

  onEdit(item: Student) {
    this.studentObj = item;
    this.openModel();
  }

  updateStudent() {
    const currentRecord = this.studentList.find(
      (m) => m.id === this.studentObj.id
    );
    if (currentRecord !== undefined) {
      currentRecord.name = this.studentObj.name;
      currentRecord.address = this.studentObj.address;
      currentRecord.movilNumber = this.studentObj.movilNumber;
    }
    localStorage.setItem('angularCrud', JSON.stringify(this.studentList));
    this.closeModel();
  }

  onDelete(item: Student) {
    const isDelet = confirm('Are your sure want to delete?');
    if (isDelet) {
      const currentRecord = this.studentList.findIndex(
        (m) => m.id === this.studentObj.id
      );
      this.studentList.splice(currentRecord, 1);
      localStorage.setItem('angularCrud', JSON.stringify(this.studentList));
    }
  }
}

export class Student {
  id: number;
  name: string;
  movilNumber: string;
  email: string;
  city: string;
  state: string;
  pinCode: string;
  address: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.movilNumber = '';
    this.email = '';
    this.city = '';
    this.state = '';
    this.pinCode = '';
    this.address = '';
  }
}
