import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SettingService} from '../../settings/setting.service';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  constructor(private http: HttpClient,
              private configUrl: SettingService) {
  }

  /*GET ID METHODS*/
  getFileId(id: number): Observable<any> {
    return this.http.get(this.configUrl.FILE_MANAGER + 'findFile/{fileId}?id=' + id);
  }

  /*GET METHODS*/
  getFileList(): Observable<any> {
    return this.http.get(`${this.configUrl.FILE_MANAGER}all`);
  }

  getViewList(): Observable<any> {
    return this.http.get(`${this.configUrl.FILE_MANAGER}viewer`);
  }

  /*DELETE METHODS*/
  deleteFile(id: number): Observable<any> {
    return this.http.delete(this.configUrl.FILE_MANAGER + 'deleteFile/' + id, { responseType: 'text' });
  }

  /*FIRST METHOD*/

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.configUrl.FILE_MANAGER}upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.configUrl.FILE_MANAGER}all`);
  }
}
