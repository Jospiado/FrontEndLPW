import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { ResponseApp } from 'app/models/response';
import { Produto } from 'app/models/produto';
import { User } from 'app/models/user';
import { ProdutoService } from 'app/services/produto.service';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { Row } from 'ng2-smart-table/lib/lib/data-set/row';
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'produto',
  styleUrls: ['produto.component.scss'],
  templateUrl: './produto.component.html',
})
export class ProdutoComponent implements OnInit {
  @ViewChild('ng2TbProduto') ng2TbProduto: Ng2SmartTableComponent;
  @ViewChild('dialogProduto') dialogProduto: TemplateRef<any>;
  @ViewChild('dialogDelete') dialogDelete: TemplateRef<any>;

  dialogRef: NbDialogRef<any>;

  tbProdutoData: Produto[];
  tbProdutoConfig: Object;
  produtoSelected: Produto;

  formProduto = this.formBuilder.group({
    _id: [null],
    codigo: [null, Validators.required],
    descricao: [null, Validators.required],
    preco: [null, Validators.required],
    precoavista: [null, Validators.required],
    estoque: [null, Validators.required],
    imagem: [null, null],
    creation: { value: null, disabled: true },
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private produtoService: ProdutoService,
  ) {}

  ngOnInit(): void {
    this.setConfigTbProduto();
    this.setDataTbProduto();
  }

  private setConfigTbProduto() {
    this.tbProdutoConfig = {
      editable:false,
      mode: 'external',
      actions: { columnTitle: 'Ações', add: false, position: 'right' },
      edit: {
        editButtonContent: '<span class="nb-edit"  title="Editar"></span>',
      },
      delete: {
        deleteButtonContent: '<span class="nb-trash"  title="Excluir"></span>',
      },
      noDataMessage: 'Nenhum produto cadastrado.',
      columns: {
        codigo: {
          title: 'Código',
        },
        descricao: {
          title: 'Descrição',
        },
        preco: {
          title: 'Preço',
        },
        precoavista: {
          title: 'Preço à Vista',
        },
        estoque: {
          title: 'Estoque',
        },
        imagem: {
          title: 'Imagem',
          type: 'html',
          // eslint-disable-next-line arrow-body-style
          
        },
      },
    };
  }

  private setDataTbProduto() {
    this.produtoService.list().subscribe((res) => {
      this.tbProdutoData = res.body;
    });
  }

  public openModalProduto(event: Row) {
    this.formProduto.reset();

    if (event) {
      const produto: Produto = event.getData();
      this.produtoService.findById(produto._id).subscribe((res) => {
        this.formProduto.patchValue(res.body);
      });
    }

    this.dialogRef = this.dialogService.open(this.dialogProduto);
  }

  public openModalExclusion(event: Row) {
    this.produtoSelected = event.getData();
    this.dialogRef = this.dialogService.open(this.dialogDelete, {
      context: this.produtoSelected.descricao,
    });
  }

  public btnSave() {
    if (this.formProduto.invalid) return this.setFormInvalid();

    if (this.isAdd()) this.addProduto();
    else this.editProduto();
  }

  private setFormInvalid() {
    this.toastrService.warning(
      'Existem um ou mais campos obrigatórios que não foram preenchidos.',
      'Atenção',
    );
    this.formProduto.get('codigo').markAsTouched();
    this.formProduto.get('descricao').markAsTouched();
    this.formProduto.get('preco').markAsTouched();
    this.formProduto.get('precoavista').markAsTouched();
    this.formProduto.get('estoque').markAsTouched();
    this.formProduto.get('imagem').markAsTouched();
  }

  private isAdd(): boolean {
    return !this.formProduto.get('_id').value;
  }

  private addProduto() {
    this.produtoService.create(this.findFormAdd()).subscribe((res) => {
      this.tbProdutoData.push(res.body);
      this.ng2TbProduto.source.refresh();
      this.toastrService.success('Produto importado com sucesso.', 'Sucesso');
      this.dialogRef.close();
    });
  }

  private findFormAdd() {
    const produto = this.formProduto.value;
    delete produto._id;

    return produto;
  }

  private editProduto() {
    this.produtoService.edit(this.formProduto.value).subscribe((res) => {
      this.tbProdutoData = this.tbProdutoData.map((produto: Produto) => {
        if (produto._id === this.formProduto.value._id) return this.formProduto.value;
        return produto;
      });
      this.toastrService.success('Produto editada com sucesso.', 'Sucesso');
      this.dialogRef.close();
    });
  }

  public findOperation(): string {
    return this.isAdd() ? 'Inclusão' : 'Edição';
  }

  public btnDelete() {
    this.produtoService.delete(this.produtoSelected._id).subscribe((res) => {
      this.tbProdutoData = this.tbProdutoData.filter(
        ((produto) => produto._id !== this.produtoSelected._id)
      );
      this.toastrService.success('Produto excluído com sucesso.', 'Sucesso');
      this.dialogRef.close();
    });
  }
}
