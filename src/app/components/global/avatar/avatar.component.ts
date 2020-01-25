import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { Avatar } from '../../../model/helper/avatar';
import {fromEvent} from 'rxjs';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

  @ViewChild('avatar', {static: true}) avatar: ElementRef;
  @Output() image = new EventEmitter<any>();
  down = false;
  posX = 0;
  posY = 0;
  imageSizeX = 250;
  imageSizeY: number;
  initialSizeX = 250;
  initialSizeY: number;
  moveXDirection = 0;
  xMove: number;
  yMove: number;
  avatarCircleSize = 250;
  imagePath: string = null;
  invalidImageType: boolean;
  invalidImageSize: boolean;
  imageLoaded: boolean;
  ngOnInit(): void {
    window.addEventListener('dragover', (e) => {
      e.preventDefault();
    }, false);
    window.addEventListener('drop', (e) => {
      e.preventDefault();
    }, false);
    window.addEventListener('mouseup', () => {
      this.down = false;
    });
  }

  handleDropImage(event): void {
    event.stopPropagation();
    event.preventDefault();
    const file =  event.dataTransfer.files[0];
    this.showImage(file);
  }
  getInputFile(event): void {
    event.preventDefault();
    const file = event.currentTarget.files[0];
    this.showImage(file);
  }
  showImage(file): void {
    const fReader = new FileReader();
    fReader.onload = () => {
      const path = fReader.result.toString();
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      const extension = file.name.split('.').pop().toLocaleLowerCase();
      if (!allowedExtensions.includes(extension)) {
        this.invalidImageType = true;
        this.invalidImageSize = false;
        this.imagePath = null;
        this.imageLoaded = false;
        return;
      }
      this.invalidImageType = false;
      const image = new Image();
      image.src = path;
      image.onload = () => {
        const width = image.width;
        const height = image.height;
        const imageSizeFactor = width / this.imageSizeX;
        this.imageSizeY = height / imageSizeFactor;
        this.initialSizeY = this.imageSizeY;
        if (height < 250 || width < 250) {
          this.invalidImageSize = true;
          this.imagePath = null;
          this.imageLoaded = false;
          return;
        }
        this.invalidImageSize = false;
      };
      fromEvent(image, 'load').subscribe(done => {
        if (!this.invalidImageSize) {
          this.imagePath = path;
          this.imageLoaded = true;
          this.emitAvatar();
        }
      });
    };
    if (typeof file !== 'object') {
      return;
    }
    fReader.readAsDataURL(file);
  }
  moveImage(event): void {
    if (this.down) {
      const imageMoveX = this.avatarCircleSize - this.imageSizeX;
      const imageMoveY = this.avatarCircleSize - this.imageSizeY;
      const leftMovePosX = this.xMove + event.offsetX;
      const downMovePosY = this.yMove + event.offsetY;
      if (leftMovePosX >= imageMoveX && leftMovePosX <= 0) {
        this.posX = this.xMove + event.offsetX;
      }
      if (downMovePosY >= imageMoveY && downMovePosY <= 0) {
        this.posY = this.yMove + event.offsetY;
      }
      this.emitAvatar();
    }
  }
  mouseDown(event): void {
    this.down = true;
    let backgroundImagePositionX = window.getComputedStyle(this.avatar.nativeElement).backgroundPositionX;
    let backgroundImagePositionY = window.getComputedStyle(this.avatar.nativeElement).backgroundPositionY;
    backgroundImagePositionX = backgroundImagePositionX.replace('px', '');
    backgroundImagePositionY = backgroundImagePositionY.replace('px', '');
    this.xMove =  Number(backgroundImagePositionX) - event.offsetX ;
    this.yMove = Number(backgroundImagePositionY) - event.offsetY;
    this.moveXDirection = event.offsetX;
  }
  resizeAvatar(factor: number): void {
    this.imageSizeX = (factor  * this.initialSizeX) + this.initialSizeX;
    this.imageSizeY = (factor * this.initialSizeY) + this.initialSizeY;
    let backgroundImagePositionX = window.getComputedStyle(this.avatar.nativeElement).backgroundPositionX;
    backgroundImagePositionX = backgroundImagePositionX.replace('px', '');
    let backgroundImagePositionY = window.getComputedStyle(this.avatar.nativeElement).backgroundPositionY;
    backgroundImagePositionY = backgroundImagePositionY.replace('px', '');
    if (Math.abs(Number(backgroundImagePositionX)) > this.imageSizeX - this.avatarCircleSize) {
      this.posX = -(this.imageSizeX - this.avatarCircleSize);
    }
    if (Math.abs(Number(backgroundImagePositionY)) > this.imageSizeY - this.avatarCircleSize) {
      this.posY = -(this.imageSizeY - this.avatarCircleSize);
    }
    this.emitAvatar();
  }
  emitAvatar(): void {
    const avatar: Avatar = {
      sizeX: this.imageSizeX ,
      sizeY: this.imageSizeY,
      moveX: Math.abs(this.posX),
      moveY: Math.abs(this.posY),
      path: this.imagePath
    };
    this.image.emit(avatar);
  }
}
