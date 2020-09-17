import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Camera,CameraOptions } from '@ionic-native/camera/ngx';
import { NavController } from '@ionic/angular';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-clientes-foto',
  templateUrl: './clientes-foto.page.html',
  styleUrls: ['./clientes-foto.page.scss'],
})
export class ClientesFotoPage implements OnInit {

  foto: any = null;
  cliente: Cliente = new Cliente();
  constructor(private clienteServ: ClienteService,
    private route: ActivatedRoute,
    private  navCtrl : NavController){

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

  tirarFoto(){
    this.clienteServ.obterFotoCamera.subscribe(data=>{
      this.foto = data;
    })
  }
  enviarFoto(){
    this.clienteServ.uploadFoto(this.cliente.id).subscribe(data=>{
      console.log("Enviado");
    },err=>{
      console.log(err);
    })
  }
}
