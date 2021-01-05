import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FileManagerComponent} from './file-manager/file-manager.component';
import {FileListComponent} from './file-list/file-list.component';
import {FileViewComponent} from './file-view/file-view.component';

const routes: Routes = [
  {
    path: '',
    component: FileManagerComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: FileListComponent
      },
      {
        path: 'view',
        component: FileViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileManagerRoutingModule {
}
