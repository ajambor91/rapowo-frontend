import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {AuthService} from '../../../services/auth-service';
import {AvatarService} from '../../../services/avatar-service';
import {User} from '../../../model/user/user.model';
import {Background} from '../../../model/helper/Background';

@Component({
  selector: 'app-background-image',
  templateUrl: './background-image.component.html',
  styleUrls: ['./background-image.component.css']
})
export class BackgroundImageComponent implements OnInit{
  @ViewChild('backgroundImage',{static: true}) backgroundImage: ElementRef;
  @Output() bckImage = new EventEmitter();
  imageLoaded = false;
  moved = false;
  path: string;
  imageTooThin = false;
  minWidth = 600;
  posY = 0;
  initialY = 0;
  height = 300;
  imageSizeX = 0;
  imageSizeY = 0;
  imageHeight = 0;
  constructor(private authService: AuthService, private avatarService: AvatarService) {
    const user: User = this.authService.currentUserValue;
    if(user && user.avatar && user.avatar.path !== ''){
      this.imageLoaded = true;
      this.avatarService.getAvatar(user.background.path).subscribe(blob => {
        this.showImage(blob);
      });
    }
  }
  ngOnInit(): void {
    window.addEventListener('mouseup', () => {
      this.moved = false;
    });
  }
  getDroppedImage(event): void {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    this.showImage(file);
  }
  getInputFile(event): void{
    const file = event.currentTarget.files[0];
    this.showImage(file);
  }
  showImage(file): void{
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const path = fileReader.result.toString();
      const blob = new Image();
      blob.src = path;
      blob.onload = () => {
        if(blob.width < this.minWidth){
          this.imageTooThin = true;
          return;
        }
        this.imageLoaded = true;
        this.path = path;
        this.imageHeight = blob.height;
        this.imageSizeX = 1100;
        const factor = 1100 / blob.width;
        this.imageSizeY = blob.height * factor;
        this.emitAvatar();
      };
    };
    fileReader.readAsDataURL(file);
  }
  clickImage(e): void{
    this.initialY = Number(window.getComputedStyle(this.backgroundImage.nativeElement).backgroundPositionY.replace('px','')) - e.offsetY;
    this.moved = true;
  }
  moveImage(event): void {
    if(this.moved){
      const downMovePosY = this.initialY + event.offsetY;
      const imageMoveY = this.height - this.imageHeight;
      if (downMovePosY >= imageMoveY && downMovePosY <= 0) {
        this.posY = this.initialY + event.offsetY;
        this.emitAvatar();
      }
    }
  }
  emitAvatar(){
    const image: Background = {
      path: this.path,
      moveY: Math.abs(this.posY),
      moveX: 0,
      sizeX: this.imageSizeX,
      sizeY: this.imageSizeY
    };
    this.bckImage.emit(image);
  }

}
