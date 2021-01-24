import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs'
import { ImageModel } from 'src/app/models/image.model';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  images: ImageModel[] = [];
  favoriteImages: ImageModel[] = [];
  logSubscriber = new Subject<ImageModel>();
  showFavoriteImages: boolean = false;
  imageToShow?: ImageModel;

  constructor(
    private imageService: ImageService,
    private cd: ChangeDetectorRef
  ) {
    this.getImages();
    this.logSubscriber.subscribe((image) => {
      console.log(image?.id);
    });
  }

  ngOnInit(): void {}

  getImages() {
    this.imageService.getImages().subscribe(
      (res) => {
        if (res) {
          this.images.push.apply(this.images, res);
          this.imageToShow = this.images[0];
          this.cd.markForCheck();
          setTimeout(() => {
            this.images.forEach((image: ImageModel, i) => {
              let item = document.getElementsByClassName('item')[i];
              if (item) {
                item.addEventListener('mouseover', (e) => {
                  this.logSubscriber.next(image);
                });
              }
            });
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // Add to favorites
  markAsFavorite(image: ImageModel) {
    let imageFound = this.favoriteImages.find((img) => img.id === image.id);
    if (imageFound) {
      return;
    }
    this.favoriteImages.push(image);
    localStorage.setItem('favorites', JSON.stringify(this.favoriteImages));
    alert(`Image with id: ${image.id} added to favorites list`);
  }

  setImage(image: ImageModel) {
    this.imageToShow = image;
  }

  toggleShowFavoriteImages(show: boolean) {
    this.showFavoriteImages = show;
    if (show) {
      let favoritesObject = JSON.parse(
        localStorage.getItem('favorites') || '{}'
      );
      let favoriteArray = [];
      for (let favoriteObject in favoritesObject) {
        favoriteArray.push(favoritesObject[favoriteObject]);
      }
      this.favoriteImages = favoriteArray;
    }
  }
}
