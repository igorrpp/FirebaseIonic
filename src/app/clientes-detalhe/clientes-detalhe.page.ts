
import { ClienteService } from '../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../model/cliente';
import { NavController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-clientes-detalhe',
  templateUrl: './clientes-detalhe.page.html',
  styleUrls: ['./clientes-detalhe.page.scss'],
})
export class ClientesDetalhePage implements OnInit {

  imagem: any = null;
  cliente: Cliente = new Cliente();

  constructor(
    private route: ActivatedRoute,
    private clientServ: ClienteService,
    private navCtrl: NavController,
    private fireStorage: AngularFireStorage,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(url => {
      let id = url.get('id');
      this.clientServ.buscaPorId(id).subscribe(data => {
        this.cliente = data.payload.data();
        this.cliente.id = data.payload.id as string;
        console.log(this.cliente);
        this.downloadImage();
      })
    })
  }
  atualizar(clienteObj) {
    this.navCtrl.navigateForward(['clientes-update', clienteObj.id]);
  }

  excluir(clienteObj) {
    this.navCtrl.navigateForward(['clientes-delete', clienteObj.id]);
  }
  foto() {
    this.navCtrl.navigateForward(['/clientes-foto', this.cliente.id]);
  }

  downloadImage() {
    let ref = this.fireStorage.storage.ref().child(`perfil/${this.cliente.id}.jpg`)
    ref.getDownloadURL().then(url => {
      this.imagem = url;
    }, err => {
      this.imagem = 'https://barcarena.pa.gov.br/portal/img/perfil/padrao.jpg';
    })
  }

}