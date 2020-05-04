import { Component, OnInit, Input, Renderer2, QueryList, ViewChildren, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.less']
})
export class GalleryComponent implements OnInit {

    @Input() photos: string[];
    @ViewChildren('image') images: QueryList<ElementRef>;
    @ViewChild('mainPhoto') mainPhoto: ElementRef;

    public indexOfMainPhoto = 0;
    public size = '100%';

    constructor(private renderer: Renderer2) { }

    ngOnInit() {
    }

    public onImageClick(evt: any, index: number) {
        this.indexOfMainPhoto = index;
        this.images.forEach((photo: ElementRef) => this.renderer.removeClass(photo.nativeElement, 'active'));
        this.renderer.setStyle(this.mainPhoto.nativeElement, 'background', `url(${evt.target.src})`);
        this.renderer.setStyle(this.mainPhoto.nativeElement, 'background-size', '100%');
        this.renderer.setStyle(this.mainPhoto.nativeElement, 'background-position', 'center');
        this.renderer.addClass(evt.target, 'active');
    }

    public onMouseMove(evt: any) {
        const width = this.mainPhoto.nativeElement.offsetWidth;
        const height = this.mainPhoto.nativeElement.offsetHeight;
        const mouseX = evt.offsetX;
        const mouseY = evt.offsetY;
        const photoPositionX = mouseX / width * 100;
        const photoPositionY = mouseY / height * 100;

        this.renderer.setStyle(this.mainPhoto.nativeElement, 'background-position', `${photoPositionX}% ${photoPositionY}%`);
        this.size = '250%';
    }

    public onMouseOver(): void {
        this.size = '100%';
    }

    public getUrl(urlPhoto: string): string {
        return `url(${urlPhoto})`;
    }

    public getSize(): string {
        return this.size;
    }

}
