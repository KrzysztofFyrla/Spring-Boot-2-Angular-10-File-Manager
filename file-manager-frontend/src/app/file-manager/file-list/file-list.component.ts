import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {FileModel} from '../model/file';
import {FileManagerService} from '../service/file-manager.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {

  selectedFiles: FileList;
  progressInfos = [];
  message = '';

  fileObs: Observable<FileModel[]>;
  file: FileModel[];

  displayedColumns: string[] = [/*'id',*/ 'name', 'space', 'type', 'size', 'delete'];

  // @ts-ignore
  dataSource = new MatTableDataSource<FileModel>(this.file);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private fileService: FileManagerService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.fileService.getFileList().subscribe(data => {
        this.file = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      result => {
        this.refresh();
      });
  }

  private refresh(): void {
    this.fileService.getFileList().subscribe(data => {
      this.file = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  private reloadData(): void {
    this.fileObs = this.fileService.getFileList();
    this.fileService.getFileList().subscribe(data => {
      this.file = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
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
}
