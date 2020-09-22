import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../services/cliente.service';
import { TemplateService } from '../services/template.service';


@Component({
  selector: 'app-clientes-foto',
  templateUrl: './clientes-foto.page.html',
  styleUrls: ['./clientes-foto.page.scss'],
})
export class ClientesFotoPage implements OnInit {

  foto: any = null;
  cliente: Cliente = new Cliente();
  fotoBlob : any = null;
  constructor(private clienteServ: ClienteService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private template: TemplateService

   ) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(url => {

      let id = url.get('id');

      this.clienteServ.buscaPorId(id).subscribe(data => {
        this.cliente = data.payload.data();
        this.cliente.id = id;
        this.tirarFoto();
      }, err => {
        this.navCtrl.navigateRoot(['/clientes']);
      })

    });
  }

  tirarFoto() {
    this.clienteServ.obterFotoCamera.subscribe(data => {
      this.foto = data;
    })
  }

  obterFoto() {
   
    this.clienteServ.obterFotoArquivo.subscribe(data => {
      this.foto = data;
    })
  }
  enviarFoto() {
    this.clienteServ.uploadFoto(this.cliente.id).subscribe(data => {
      console.log("Enviado");
      this.template.myAlert('Foto Enviar com sucesso!');
      this.navCtrl.navigateBack(['clientes-detalhe', this.cliente.id])
    }, err => {
      console.log(err);
    })

    /*this.fireStorage.storage.ref().child(`/perfil/${this.cliente.id}.jpg`).put(this.fotoBlob).then(data=>{
      console.log("Enviado Com sucesso!");
    });*/
  }
}
