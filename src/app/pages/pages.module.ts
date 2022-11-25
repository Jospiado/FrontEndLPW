import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';

import { FornecedorModule } from './fornecedor/fornecedor.module';
import { TaskModule } from './task/task.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProdutoModule } from './produto/produto.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    FornecedorModule,
    TaskModule,
    ProdutoModule

  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
