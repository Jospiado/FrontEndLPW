import {
  Component, OnInit, TemplateRef, ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { Fornecedor } from 'app/models/fornecedor';
import { FornecedorService } from 'app/services/fornecedor.service';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { Row } from 'ng2-smart-table/lib/lib/data-set/row';

@Component({
  selector: 'fornecedor',
  styleUrls: ['fornecedor.component.scss'],
  templateUrl: './fornecedor.component.html',
})
export class FornecedorComponent implements OnInit {
  @ViewChild('ng2TbFornecedor') ng2TbFornecedor: Ng2SmartTableComponent;
  @ViewChild('dialogFornecedor') dialogFornecedor: TemplateRef<any>;
  @ViewChild('dialogDelete') dialogDelete: TemplateRef<any>;

  dialogRef: NbDialogRef<any>;

  tbFornecedorData: Fornecedor[];
  tbFornecedorConfig: Object;
  fornecedorSelected: Fornecedor;

  formFornecedor = this.formBuilder.group({
    _id: [null],
    name: [null, Validators.required],
    cnpj: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    creation: { value: null, disabled: true },
  });

  constructor(private formBuilder: FormBuilder,
              private dialogService: NbDialogService,
              private toastrService: NbToastrService,
              private fornecedorService: FornecedorService) { }

  ngOnInit(): void {
    this.setConfigTbFornecedor();
    this.setDataTbFornecedor();
  }

  private setConfigTbFornecedor() {
    this.tbFornecedorConfig = {
      mode: 'external',
      actions: { columnTitle: 'Ações', add: false, position: 'right' },
      edit: {
        editButtonContent: '<span class="nb-edit"  title="Editar"></span>',
      },
      delete: {
        deleteButtonContent: '<span class="nb-trash"  title="Excluir"></span>',
      },
      noDataMessage: 'Nenhum fornecedor cadastrado.',
      columns: {
        name: {
          title: 'Nome',
        },
        cnpj: {
          title: 'Cnpj',
        },
        email: {
          title: 'E-mail',
        },
      },
    };
  }

  private setDataTbFornecedor() {
    this.fornecedorService.list().subscribe((res) => {
      this.tbFornecedorData = res.body;
    });
  }

  public openModalFornecedor(event: Row) {
    this.formFornecedor.reset();

    if (event) {
      const fornecedor: Fornecedor = event.getData();
      this.fornecedorService.findById(fornecedor._id).subscribe((res) => {
        this.formFornecedor.patchValue(res.body);
      });
    }

    this.dialogRef = this.dialogService.open(this.dialogFornecedor);
  }

  public openModalExclusion(event: Row) {
    this.fornecedorSelected = event.getData();
    this.dialogRef = this.dialogService.open(this.dialogDelete, { context: this.fornecedorSelected.name });
  }

  public btnSave() {
    if (this.formFornecedor.invalid) return this.setFormInvalid();

    if (this.isAdd()) this.addFornecedor();
    else this.editFornecedor();
  }

  private setFormInvalid() {
    this.toastrService.warning('Existem um ou mais campos obrigatórios que não foram preenchidos.', 'Atenção');
    this.formFornecedor.get('name').markAsTouched();
    this.formFornecedor.get('cnpj').markAsTouched();
    this.formFornecedor.get('email').markAsTouched();
  }

  private isAdd(): boolean {
    return !this.formFornecedor.get('_id').value;
  }

  private addFornecedor() {
    this.fornecedorService.create(this.findFormAdd()).subscribe((res) => {
      this.tbFornecedorData.push(res.body);
      this.ng2TbFornecedor.source.refresh();
      this.toastrService.success('Fornecedor criado com sucesso.', 'Sucesso');
      this.dialogRef.close();
    });
  }

  private findFormAdd() {
    const fornecedor = this.formFornecedor.value;
    delete fornecedor._id;

    return fornecedor;
  }

  private editFornecedor() {
    this.fornecedorService.edit(this.formFornecedor.value).subscribe((res) => {
      this.tbFornecedorData = this.tbFornecedorData.map((fornecedor: Fornecedor) => {
        if (fornecedor._id === this.formFornecedor.value._id) return this.formFornecedor.value;
        return fornecedor;
      });
      this.toastrService.success('Fornecedor editado com sucesso.', 'Sucesso');
      this.dialogRef.close();
    });
  }

  public findOperation(): string {
    return this.isAdd() ? 'Inclusão' : 'Edição';
  }

  public btnDelete() {
    this.fornecedorService.delete(this.fornecedorSelected._id).subscribe((res) => {
      this.tbFornecedorData = this.tbFornecedorData.filter(((fornecedor) => fornecedor._id !== this.fornecedorSelected._id));
      this.toastrService.success('Fornecedor excluído com sucesso.', 'Sucesso');
      this.dialogRef.close();
    });
  }
}
