import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataloginService } from '../service/datalogin.service';
import { Users } from '../modeles/Users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private formbuilder: FormBuilder, private loginservice: DataloginService) { }

  loginForm = this.formbuilder.group({
                username: [null, Validators.required],
                password: [null, Validators.compose([ Validators.required, Validators.minLength(5), Validators.maxLength(255)])]
  });

  onSubmit() {

    const user = new Users();
    user.username = this.loginForm.value.username;
    user.password = this.loginForm.value.password;
    this.loginservice.signIn(user);

  }


}
