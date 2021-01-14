import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'map',
      },
      {
        path: 'superMapGis',
        loadChildren: () => import('./super-map-gis/super-map-gis.module').then(m => m.SuperMapGisModule)
      },
      {
        path: 'map',
        loadChildren: () => import('./map/map.module').then(m => m.MapModule)
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
