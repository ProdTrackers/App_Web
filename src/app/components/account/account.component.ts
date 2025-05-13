import { Component, OnInit, inject }  from '@angular/core';
import { CommonModule }                from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { UserService }                 from '../../services/user.service';
import { User }                        from '../../models/user';
@Component({
  selector: 'app-account',
  imports: [ CommonModule,ReactiveFormsModule ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userSvc = inject(UserService);

  accountForm = this.fb.group({
    id:       [0],
    firstName:[''],
    lastName: [''],
    email:    [''],
    password: [''],
    // añade aquí dob, gender, phone… según tu modelo
  });

  imageUrl = 'assets/default-avatar.png';

ngOnInit() {
  const user = this.userSvc.getCurrentUser()!;
  this.accountForm = this.fb.group({
    id:       [user.id],
    firstName:[user.firstName],
    lastName: [user.lastName],
    email:    [user.email],
    password: [user.password]
    // …cualquier otro campo
  });
}

  onFileSelected(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input.files?.length) return;
    const reader = new FileReader();
    reader.onload = () => this.imageUrl = reader.result as string;
    reader.readAsDataURL(input.files[0]);
  }

onEdit() {
  if (this.accountForm.invalid) return;
  const { id, firstName, lastName, email, password } = this.accountForm.value;
  const updated: User = {
    id:       id!,          // ‘!’ le dice a TS “confía, no es undefined”
    firstName: firstName!,
    lastName:  lastName!,
    email:     email!,
    password:  password!
  };

  this.userSvc.updateUser(updated).subscribe(/* ... */);
}
}