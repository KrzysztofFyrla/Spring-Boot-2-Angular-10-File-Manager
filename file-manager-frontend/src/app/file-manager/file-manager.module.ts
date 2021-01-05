import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FileManagerRoutingModule} from './file-manager-routing.module';
import {FileManagerComponent} from './file-manager/file-manager.component';
import {FileListComponent} from './file-list/file-list.component';
import {FileViewComponent} from './file-view/file-view.component';
import {MaterialModule} from '../material.module';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TruncatePipe} from './file-view/truncate.pipe';
import {AppModule} from '../app.module';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    FileManagerComponent,
    FileListComponent,
    FileViewComponent,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    FileManagerRoutingModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class FileManagerModule {
}
