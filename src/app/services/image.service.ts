import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ImageModel } from '../models/image.model';
import { HttpHandlerService } from './http-handler.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService extends HttpHandlerService {

  getImages(page: number = 0, limit: number = 50) {
    const url = `/v2/list?page=${page}&limit=${limit}`;
    return this.get(url);
  }

  
}
