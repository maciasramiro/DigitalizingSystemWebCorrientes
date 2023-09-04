import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-zoom-image',
  templateUrl: './zoom-image.component.html',
  styleUrls: ['./zoom-image.component.scss']
})
export class ZoomImageComponent {
  imagenUrl = 'URL_DE_LA_IMAGEN'; // Reemplaza con la URL de la imagen real
  isZoomed = false;
  isDragging = false;
  startX = 0;
  startY = 0;
  translateX = 0;
  translateY = 0;
  scale = 1;

  @ViewChild('imagenElement') imagenElement!: ElementRef;

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
}
