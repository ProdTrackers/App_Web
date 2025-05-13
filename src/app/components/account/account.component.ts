import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-account',
  imports: [ CommonModule,ReactiveFormsModule ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
 accountForm!: FormGroup;
  imageUrl: string = 'assets/default-avatar.png'; // ruta a tu placeholder

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      fullName: ['Cody Fisher'],
      email: ['cody.fisher45@example.com'],
      dob: [''],
      gender: [''],
      phone: ['']
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) { return; }

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onEdit() {
    if (this.accountForm.valid) {
      console.log('Datos a guardar:', this.accountForm.value);
      // aquí iría llamada a tu servicio para actualizar perfil
    }
  }
}
