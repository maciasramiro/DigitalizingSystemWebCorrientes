import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Documento } from 'src/app/models/documento_response';
import { ImagenService } from 'src/app/shared/imagen.service';
import { LoadingIndicatorService } from 'src/app/shared/services/loading-indicator.service';

@Component({
  selector: 'app-visualizador-dialog',
  templateUrl: './visualizador-dialog.component.html',
  styleUrls: ['./visualizador-dialog.component.scss']
})
export class VisualizadorDialogComponent implements OnInit {
  imageToShow: any;
  imagenUrl: string | null | undefined;
  datos: Documento;

  currentImageIndex = 0;
  imageId: number;
  imageDialogOpen = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Documento,
    private imagenService: ImagenService,
    public  loadingIndicatorService: LoadingIndicatorService
    ) {
    this.datos = data;
    this.imageId = this.imageDialogOpen
      ? this.datos.Hojas[0].ImagenReversoId
      : this.datos.Hojas[0].ImagenFrontalId;
  }
  ngOnInit(): void {
    this.obtentenerImagen(this.datos.Hojas[0].ImagenFrontalId);
  }

  verImagen(idImagen: number) {
    console.log(idImagen);
    this.loadingIndicatorService.showLoading();

    this.imagenService.getImagen(idImagen).subscribe(response => {
      this.createImageFromBlob(response);
      //this.loadingIndicatorService.hideLoading();
    }, error => {
      console.log(error);
      this.loadingIndicatorService.hideLoading();
    });
  }

  obtentenerImagen(idImagen: number) {
    this.loadingIndicatorService.showLoading();
    this.imagenService.getImagen(idImagen).subscribe((response: Blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.imagenUrl = reader.result as string;
        this.loadingIndicatorService.hideLoading();
      };
      reader.readAsDataURL(response);
      this.loadingIndicatorService.hideLoading();
    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  nextImage() {
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.datos.Hojas.length;
    console.log('CURRENT IMAGE INDEX', this.currentImageIndex);
    console.log('imageId', this.imageId);
    this.obtentenerImagen(
      this.datos.Hojas[this.currentImageIndex].ImagenReversoId
    );
  }

  prevImage() {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.datos.Hojas.length) %
      this.datos.Hojas.length;
    console.log('CURRENT IMAGE INDEX', this.currentImageIndex);
    console.log('imageId', this.imageId);
    this.obtentenerImagen(
      this.datos.Hojas[this.currentImageIndex].ImagenFrontalId
    );
  }

  abrirImagenEnNuevaVentana() {
    const anchoVentana = 800;
    const altoVentana = 600;

    const left = (screen.width - anchoVentana) / 2;
    const top = (screen.height - altoVentana) / 2;

    const nuevaPestana = window.open(
      '',
      '_blank',
      `width=${anchoVentana},height=${altoVentana},left=${left},top=${top}`
    );
    nuevaPestana!.document.write(`
    <html>
      <head>
        <title>Imagen</title>
        <style>
        * {
        padding: 0;
        margin: 0;
        outline: 0;
        overflow: hidden;
      }
      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
        #zoom {
          /* margin-left: 18px;
          margin-right: 18px;
          margin-top: 18px; */
          width: 100%;
          height: 100%;
          transform-origin: 0px 0px;
          transform: scale(1) translate(0px, 0px);
          cursor: grab;
        }
        div#zoom > img {
          width: 100%;
          height: auto;
        }
        </style>
      </head>
      <body>
       
       
  <div class="zoom_outer">
    <div id="zoom">
      <img src="${this.imagenUrl}" alt="zoom">
    </div>
  </div>
  <div>
      <button onclick="rotarImagenHorario()">Rotar Horario</button>
      <button onclick="rotarImagenAntihorario()">Rotar Antihorario</button>
    </div>
  <script>
    var scale = 1,
      panning = false,
      pointX = 0,
      pointY = 0,
      start = { x: 0, y: 0 },
      zoom = document.getElementById("zoom");
  
    function setTransform() {
      zoom.style.transform =
        "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
    }
  
    zoom.onmousedown = function (e) {
      e.preventDefault();
      start = { x: e.clientX - pointX, y: e.clientY - pointY };
      panning = true;
    };
  
    zoom.onmouseup = function (e) {
      panning = false;
    };
  
    zoom.onmousemove = function (e) {
      e.preventDefault();
      if (!panning) {
        return;
      }
      pointX = e.clientX - start.x;
      pointY = e.clientY - start.y;
      setTransform();
    };
  
    zoom.onwheel = function (e) {
      e.preventDefault();
      var xs = (e.clientX - pointX) / scale,
        ys = (e.clientY - pointY) / scale,
        delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
      delta > 0 ? (scale *= 1.2) : (scale /= 1.2);
      pointX = e.clientX - xs * scale;
      pointY = e.clientY - ys * scale;
  
      setTransform();
    };
    
  </script>
      </body>
    </html>
  `);
    nuevaPestana!.document.close();
  }
}
