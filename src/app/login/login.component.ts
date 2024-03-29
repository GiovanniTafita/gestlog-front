import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;

  constructor (private fb: FormBuilder) {}

  ngOnInit(): void {
    this.fb.group({
      userName: this.fb.control(""),
      password: this.fb.control("")
    });
  }
}
