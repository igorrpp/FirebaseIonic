import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../services/cliente.service';
import { TemplateService } from '../services/template.service';

@Component({
  selector: 'app-clientes-novo',
  templateUrl: './clientes-novo.page.html',
  styleUrls: ['./clientes-novo.page.scss'],
})
export class ClientesNovoPage implements OnInit {
  formGroup: FormGroup;

  constructor(private clienteServ: ClienteService,
    private formBuilder: FormBuilder,
    private template: TemplateService) {
    this.iniciarForm();
  }

  ngOnInit() {
  }

  cadastrar() {

    this.template.loading.then(load => {
      load.present();
      this.clienteServ.cadastrar(this.formGroup.value).subscribe(
        data => {
          load.dismiss();
          this.template.myAlert('Cadastrado com sucesso');
          //Limpar informações no formulário!
          this.formGroup.reset();
        },
        err => {
          this.template.myAlert('Erro ao cadastrar');
        });
    })

  }

  iniciarForm() {
    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      endereco: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      telefone: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      cpf: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    })
  }
}



