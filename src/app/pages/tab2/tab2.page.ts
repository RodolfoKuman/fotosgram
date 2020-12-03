import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { PostsService } from 'src/app/services/posts.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];
  cargandoGeo = false;

  post = {
    mensaje: '',
    coords: null,
    posicion: false
  }

  constructor(private postService: PostsService,
              private navCtrl: NavController,
              private geolocation: Geolocation,
              private camera: Camera) {}

  async crearPost(){
  
    const creado = await this.postService.crearPost(this.post);

    this.post = {
      mensaje: '',
      coords: null,
      posicion: false
    }

    if(creado){
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true } );
    }

  }

  getGeo(){
    if(!this.post.posicion){
      this.post.coords = null;
      return;
    }

    this.cargandoGeo = true;

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.cargandoGeo = false;

      const coords = `${resp.coords.latitude}, ${resp.coords.longitude}`;

      this.post.coords = coords;

     }).catch((error) => {
       this.cargandoGeo = false;
       console.log('Error getting location', error);
     });

    console.log(this.post);
  }

  camara(){

    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     //let base64Image = 'data:image/jpeg;base64,' + imageData;

      const img = window.Ionic.WebView.convertFileSrc(imageData);
      this.tempImages.push(img);
      console.log(img);

    }, (err) => {
     // Handle error
    });
  }


}
