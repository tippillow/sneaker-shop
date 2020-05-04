import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { error } from 'protractor';

@Component({
    selector: 'app-auth-form',
    templateUrl: './auth-form.component.html',
    styleUrls: ['./auth-form.component.less']
})
export class AuthFormComponent implements OnInit {

    @Output() login: EventEmitter<any> = new EventEmitter<any>();

    public authForm: FormGroup;
    public isSignIn = true;

    constructor() { }

    ngOnInit() {
        this.authForm = this.constructForm();
    }

    public onLogin(): void {
        this.login.emit(this.authForm.value);
    }


    private constructForm(): FormGroup {
        return new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            repeatPassword: new FormControl('', [Validators.minLength(6)]),
        });
    }

}
