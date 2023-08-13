import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Documento } from 'src/app/models/documento_response';
import { ImagenService } from 'src/app/shared/imagen.service';

@Component({
  selector: 'app-visualizador-dialog',
  templateUrl: './visualizador-dialog.component.html',
  styleUrls: ['./visualizador-dialog.component.scss']
})
export class VisualizadorDialogComponent implements OnInit{
  imageToShow: any;
  imagenUrl: string | null | undefined;
  datos:Documento;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Documento,
    private imagenService: ImagenService) {
      this.datos=data;
  }
  ngOnInit(): void {
    this.obtentenerImagen(this.datos.Hojas[0].ImagenFrontalId);
  }

  verImagen(idImagen: number) {
    console.log(idImagen);
    this.imagenService.getImagen(idImagen).subscribe(response => {
      this.createImageFromBlob(response);
    }, error => {
      console.log(error);
    });
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
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
