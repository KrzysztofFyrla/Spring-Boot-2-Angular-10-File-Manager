import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private mainUrl = 'http://localhost:8080';

  get FILE_MANAGER(): string {
    return this.mainUrl + '/file/';
  }
}
