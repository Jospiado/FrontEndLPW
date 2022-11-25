import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

import { FornecedorService } from 'app/services/fornecedor.service';

import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { FornecedorComponent } from './fornecedor.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    NbCardModule,
    ThemeModule,
    Ng2SmartTableModule,

  ],
  declarations: [
    FornecedorComponent,
  ],
  providers: [FornecedorService],

})
export class FornecedorModule { }
