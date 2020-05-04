import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-basket-form',
  templateUrl: './basket-form.component.html',
  styleUrls: ['./basket-form.component.less']
})
export class BasketFormComponent implements OnInit {

  @Output() post: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  public basketForm: FormGroup;
  public email = JSON.parse(localStorage.authData) ? JSON.parse(localStorage.authData).email : '';

  constructor() { }

  ngOnInit() {
    this.basketForm = this.constructForm();
  }

  public onSubmit(): void {
    this.post.emit(this.basketForm);
  }

  public constructForm(): FormGroup {
    return new FormGroup({
      email: new FormControl(this.email, [Validators.required, Validators.email]),
      fullName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
    });
  }

}
