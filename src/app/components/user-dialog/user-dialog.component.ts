import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FacadeService } from '../../services/facade.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.css'
})
export class UserDialogComponent implements OnInit {
  showDialog = false;
  form!: FormGroup;
  constructor(private fb: FormBuilder, private facadeService: FacadeService) {
  }

  ngOnInit(): void {
    this.setVisibility();
    this.setForm();
  }

  setVisibility() {
    this.showDialog = !this.facadeService.isUserStored();
  }

  setForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  onSubmit() {
    const { name } = this.form.value;
    this.facadeService.storeUser(name);
  }
}
