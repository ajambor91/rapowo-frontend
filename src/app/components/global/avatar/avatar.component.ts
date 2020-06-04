import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Avatar } from '../../../model/helper/avatar';
import {fromEvent} from 'rxjs';
import {AuthService} from '../../../services/auth-service';
import {User} from '../../../model/user/user.model';
import {API_CONFIG} from '../../../config/config.module';
import {AvatarService} from '../../../services/avatar-service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

  @ViewChild('avatar', {static: true}) avatar: ElementRef;
  @Output() image = new EventEmitter<any>();
  avatarInput;
  down = false;
  posX = 0;
  posY = 0;
  imageSizeX = 175;
  imageSizeY: number;
  initialSizeX = 175;
  initialSizeY: number;
  moveXDirection = 0;
  xMove: number;
  yMove: number;
  avatarCircleSize = 175;
  imagePath: string;
  invalidImageType: boolean;
  invalidImageSize: boolean;
  imageLoaded: boolean;
  removed = false;
  constructor(private authService: AuthService, private avatarService: AvatarService) {
    const user: User = this.authService.currentUserValue;
    if(user && user.mainAvatar && user.mainAvatar.path !== ''){
      this.imageLoaded = true;
      this.avatarService.getAvatar(user.mainAvatar.path).subscribe(blob => {
        this.showExistingImage(blob);
      });
    }
  }

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
  showExistingImage(image){
    const fReader = new FileReader();
    fReader.onload = () =>{
      const path = fReader.result.toString();
      this.imagePath = path;
      const imageFile = new Image();
      imageFile.src = path;
      imageFile.onload = () => {
        const width = imageFile.width;
        const height = imageFile.height;
        let factor;
        if(height > width){
          factor = imageFile.width / 175;
          this.imageSizeY = imageFile.height / factor;
          this.initialSizeY = this.imageSizeY;
        }else{
          factor = imageFile.height / 175;
          this.imageSizeX = imageFile.width / factor;
          this.initialSizeX = this.imageSizeX;
          this.imageSizeY = 175;
          this.initialSizeY = 175;
        }

      };
    };
    fReader.readAsDataURL(image);

  }
  removeAvatar(): void {
    this.imagePath = null;
    this.imageLoaded = false;
    this.avatarInput = null;
    this.removed = true;
    this.emitAvatar();
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
        this.removed = true;
        return;
      }
      this.invalidImageType = false;
      const image = new Image();
      image.src = path;
      image.onload = () => {
        const width = image.width;
        const height = image.height;
        let imageSizeFactor;
        if(width > height){
          this.imageSizeY = 175;
          this.initialSizeY = 175;
          imageSizeFactor = height / this.imageSizeY;
          this.imageSizeX = width / imageSizeFactor;
          this.initialSizeX = this.imageSizeX
        }
        else{
          this.imageSizeX = 175;
          this.initialSizeX = 175;
          imageSizeFactor = width / this.imageSizeX;
          this.imageSizeY = height / imageSizeFactor;
          this.initialSizeY = this.imageSizeY;
        }

        if (height < 175 || width < 175) {
          this.invalidImageSize = true;
          this.imagePath = null;
          this.removed = true;
          this.imageLoaded = false;
          return;
        }
        this.invalidImageSize = false;
      };
      fromEvent(image, 'load').subscribe(done => {
        if (!this.invalidImageSize) {
          this.imagePath = path;
          this.imageLoaded = true;
          this.posY = 0;
          this.posX = 0;
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
      path: this.imagePath,
      removed: this.removed
    };
    this.image.emit(avatar);
  }
}

