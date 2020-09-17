import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../services/cliente.service';
import { TemplateService } from '../services/template.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  clientes: Cliente[] = [];

  constructor(
    private clienteServ : ClienteService,
    private template: TemplateService,
    private navCtrl: NavController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.clientes = [];
    this.template.loading.then(load => {
      load.present();
      
     this.clienteServ.listar().subscribe(data => {
       
        data.map(c =>{
          let cliente : Cliente = c.payload.doc.data() as Cliente;
          cliente.id = c.payload.doc.id as string;
          this.clientes.push(cliente);
        })
        load.dismiss();
        console.log(this.clientes);
      })
    })

  }
detalhe(obj : Cliente){
  this.navCtrl.navigateForward(['/clientes-detalhe', obj.id]);
}
}
