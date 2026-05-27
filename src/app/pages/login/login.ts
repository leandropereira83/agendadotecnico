import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PoButtonModule, PoFieldModule, PoInfoModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, PoFieldModule, PoButtonModule, PoInfoModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  
  private fb = inject(FormBuilder);

  public form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required]],
  });

  constructor() {

  }

  public submit = () => {
    if (this.form.valid) {
      const username: string = this.form.value.username || '';
      const password: string = this.form.value.password || '';
      
      console.log('Username:', username);
      console.log('Password:', password);
      
    } else {
      console.log('Formulário inválido');
    }
  }
}
