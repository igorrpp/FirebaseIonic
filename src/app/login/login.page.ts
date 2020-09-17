import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { TemplateService } from '../services/template.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formGroup: FormGroup;


  constructor(private formBuilder: FormBuilder,
    private auth: AngularFireAuth,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private template: TemplateService,

  ) {
    this.iniciarForm();
  }

  ngOnInit() {
  }

  autenticar() {

    let user = this.formGroup.controls['username'].value;
    let pass = this.formGroup.controls['password'].value;


  this.template.loading.then(load => {

     load.present();
      // admin2admin.com 123456

      this.auth.signInWithEmailAndPassword(user, pass).then(data => {

       load.dismiss();

        this.menuCtrl.enable(true);
        this.navCtrl.navigateRoot(['clientes']);

      }).catch(data => {
        load.dismiss();
        this.template.myAlert("Usuário ou senha inválidos");

      });
  })

  }


  iniciarForm() {
    this.formGroup = this.formBuilder.group({
      username: ['igorpires_rj@hotmail.com', [Validators.email]],
      password: ['110801', [Validators.required, Validators.minLength(13), Validators.maxLength(16)]]
    })
  }
}
