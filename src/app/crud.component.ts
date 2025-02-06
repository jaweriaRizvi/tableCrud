import { Component } from '@angular/core';
import { CrudService, User } from './crud.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'crud',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CrudComponent {
  user: User = {
    name: '',
    email: ''
  };

  users: User[] = [];
  isEdit: boolean = false;
  currentIndex: number | null = null;

  constructor(private crudService: CrudService) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.crudService.getUsers().subscribe((data: User[]) => {
      this.users = data;
      console.log('Fetched Users:', data);
    });
  }

  onSubmit(form: any) {
    if (form.valid) {
      if (this.isEdit && this.currentIndex !== null) {
        this.crudService.updateUser(this.user).subscribe((updatedUser: User) => {
          this.users[this.currentIndex!] = { ...updatedUser };
          this.resetForm();
        });
      } else {
        this.crudService.addUser(this.user).subscribe((newUser: User) => {
          this.users.push(newUser);
          this.resetForm();
        });
      }
    }
  }

  onDelete(index: number) {
    const userId = this.users[index].id;
    
    const confirmation = window.confirm('Are you sure you want to delete this entry?');
    if (confirmation) {
      this.crudService.deleteUser(userId!).subscribe(() => {
        this.users.splice(index, 1);
      });
    }
  }
  

  onEdit(index: number) {
    this.user = { ...this.users[index] };
    this.isEdit = true;
    this.currentIndex = index;
  }

  resetForm() {
    this.user = {
      name: '',
      email: ''
    };
    this.isEdit = false;
    this.currentIndex = null;
  }
}
