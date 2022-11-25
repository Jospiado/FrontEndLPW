import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

import { ProdutoService } from 'app/services/produto.service';

import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { ProdutoComponent } from './produto.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    NbCardModule,
    ThemeModule,
    Ng2SmartTableModule,

  ],
  declarations: [
    ProdutoComponent,
  ],
  providers: [ProdutoService],

})
export class ProdutoModule { }
