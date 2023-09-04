import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Documento } from 'src/app/models/documento_response';
import { ImagenService } from 'src/app/shared/imagen.service';
import { ChangeDetectorRef } from '@angular/core';
import { LoadingIndicatorService } from 'src/app/shared/services/loading-indicator.service';

@Component({
  selector: 'app-detail-component',
  templateUrl: './detail-component.component.html',
  styleUrls: ['./detail-component.component.scss'],
})
export class DetailComponentComponent implements AfterViewInit {
  imageToShow: any;
  imagenUrl: string | null | undefined;
  datos: Documento;
  imageId: number;

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'Apellido',
    'Nombre',
    'TipoDocumento',
    'NumeroDocumento',
    'Genero',
    'Legajo',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  imageDialogOpen = false;
  currentImageIndex = 0;

  isZoomed = false;
  isDragging = false;
  startX = 0;
  startY = 0;
  translateX = 0;
  translateY = 0;
  scale = 1;

  @ViewChild('imagenElement', { static: false }) imagenElement!: ElementRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Documento,
    private cdr: ChangeDetectorRef,
    private imagenService: ImagenService,
    public  loadingIndicatorService: LoadingIndicatorService,
  ) {
    this.datos = data;
    this.dataSource = new MatTableDataSource(data.PersonasDtos);
    this.imageId = this.imageDialogOpen
      ? this.datos.Hojas[0].ImagenReversoId
      : this.datos.Hojas[0].ImagenFrontalId;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
    if (this.imagenElement) {
      var scale = 1,
        panning = false,
        pointX = 0,
        pointY = 0,
        start = { x: 0, y: 0 },
        zoom = this.imagenElement.nativeElement;
    }
  }

  ngOnInit(): void {
    this.obtentenerImagen(this.datos.Hojas[0].ImagenFrontalId);
  }

  obtentenerImagen(idImagen: number) {
    this.imagenService.getImagen(idImagen).subscribe((response: Blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.imagenUrl = reader.result as string;
      };
      reader.readAsDataURL(response);
    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imageToShow = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  verImagen(idImagen: number) {
    this.loadingIndicatorService.showLoading();
    this.imagenService.getImagen(idImagen).subscribe(
      (response) => {
        this.createImageFromBlob(response);
        this.loadingIndicatorService.hideLoading();
      },
      (error) => {
        console.log(error);
        this.loadingIndicatorService.hideLoading();
      }
    );
  }

  openImageDialog() {
    this.imageDialogOpen = true;
    this.currentImageIndex = 0; // Show the first image initially
  }

  closeImageDialog() {
    this.imageDialogOpen = false;
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

  getImageTransform(): string {
    const transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
    return transform;
  }

  toggleZoom() {
    this.isZoomed = !this.isZoomed;
    this.scale = this.isZoomed ? 2 : 1; // Ajusta el nivel de zoom según tus necesidades
    this.translateX = 0;
    this.translateY = 0;
  }

  onImageMouseDown(event: MouseEvent) {
    if (this.isZoomed) {
      this.isDragging = true;
      this.startX = event.clientX - this.translateX;
      this.startY = event.clientY - this.translateY;
      this.imagenElement.nativeElement.style.cursor = 'grabbing';
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onImageMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      this.translateX = event.clientX - this.startX;
      this.translateY = event.clientY - this.startY;
    }
  }

  @HostListener('window:mouseup', ['$event'])
  onImageMouseUp() {
    if (this.isDragging) {
      this.isDragging = false;
      this.imagenElement.nativeElement.style.cursor = 'grab';
    }
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
