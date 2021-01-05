import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs';
import {FileModel} from '../model/file';
import {FileManagerService} from '../service/file-manager.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.scss']
})
export class FileViewComponent implements OnInit {

  selectedFiles: FileList;
  progressInfos = [];
  message = '';

  fileObs: Observable<FileModel[]>;
  file: FileModel[];

  @Output() elementMoved = new EventEmitter<{ element: FileModel; moveTo: FileModel }>();
  @Output() navigatedDown = new EventEmitter<FileModel>();

  constructor(private fileService: FileManagerService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.fileService.getFileList().subscribe(data => {
        this.file = data;
      },
      result => {
        this.refresh();
      });
  }

  private refresh(): void {
    this.fileService.getFileList().subscribe(data => {
      this.file = data;
    });
  }

  private reloadData(): void {
    this.fileObs = this.fileService.getFileList();
    this.fileService.getFileList().subscribe(data => {
      this.file = data;
    });
  }

  deleteFile(id: number): void {
    this.fileService.deleteFile(id)
      .subscribe(data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
    this.snackBar.open('The file has been deleted', '', { duration: 2000 });
  }

  selectFiles(event): void {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    this.uploadFiles();
    this.snackBar.open('The file has been added', '', { duration: 2000 });
  }

  uploadFiles(): void {
    this.message = '';

    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }

  upload(idx, file): void {
    this.progressInfos[idx] = {value: 0, fileName: file.name};

    this.fileService.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          this.reloadData();
        } else if (event instanceof HttpResponse) {
          this.fileObs = this.fileService.getFileList();
        }
      },
      err => {
        this.progressInfos[idx].value = 0;
        this.message = 'Could not upload the file:' + file.name;
      }
    );
  }

  moveElement(element: FileModel, moveTo: FileModel): void {
    this.elementMoved.emit({element: element, moveTo: moveTo});
  }

  navigate(element: FileModel): void {
    if (element.fileType === 'text/html') {
      this.navigatedDown.emit(element);
    }
  }

  openMenu(event: MouseEvent, viewChild: MatMenuTrigger): void {
    event.preventDefault();
    viewChild.openMenu();
  }
}
