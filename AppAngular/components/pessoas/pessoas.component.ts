import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Pessoa } from 'src/app/pessoa';
import { PessoasService } from 'src/app/pessoas.service';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.scss']
})
export class PessoasComponent implements OnInit {

  formulario: any;
  tituloFormulario!: string;
  pessoas!: Pessoa[];

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;

  nomePessoa!: string;
  pessoaId!: number;
  modalRef!: BsModalRef;

  constructor(
    private pessoaService: PessoasService,
    private bsModalService: BsModalService) { }


  ngOnInit(): void {

    this.pegarTodos()
    this.exibirFormularioCadastro()
  }

  pegarTodos(): void {
    this.pessoaService.PegarTodos().subscribe(resultados => {
      this.pessoas = resultados;
      console.log(this.pessoas)
    })
  }
  exibirFormularioCadastro(): void {
    this.visibilidadeFormulario = true;
    this.visibilidadeTabela = false;
    this.tituloFormulario = "Nova pessoa"
    this.formulario = new FormGroup({
      nome: new FormControl(null),
      sobrenome: new FormControl(null),
      idade: new FormControl(null),
      profissao: new FormControl(null),
    })
  }
  exibirFormularioAtualizacao(pessoaId: number): void {
    this.visibilidadeFormulario = true;
    this.visibilidadeTabela = false;

    this.pessoaService.PegarPessoa(pessoaId).subscribe(resultado => {
      this.tituloFormulario = `Atualizar ${resultado.nome} ${resultado.sobrenome}`

      this.formulario = new FormGroup({
        pessoaId: new FormControl(resultado.pessoaId),
        nome: new FormControl(resultado.nome),
        sobrenome: new FormControl(resultado.sobrenome),
        idade: new FormControl(resultado.idade),
        profissao: new FormControl(resultado.profissao),
      })
    })
  }

  enviarFormulario() {
    const pessoa: Pessoa = this.formulario.value;

    if (pessoa.pessoaId > 0) {
      this.pessoaService.AtualizarPessoa(pessoa).subscribe(resultado => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert("Pessoa atualizada com sucesso");
        this.pegarTodos()
      })
    } else {
      this.pessoaService.SalvarPessoa(pessoa).subscribe(resultado => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert("Pessoa inserida com sucesso");
        this.pegarTodos()
      })
    }
  }
  voltar(): void {
    this.visibilidadeFormulario = false;
    this.visibilidadeTabela = true;
  }

  exibirConfirmarFormularioAtualizacao(pessoaId: number, nomePessoa: string, conteudoModal: TemplateRef<any>) {
    this.modalRef = this.bsModalService.show(conteudoModal);
    this.pessoaId = pessoaId;
    this.nomePessoa = nomePessoa;
  }

  excluirPessoa(pessoaId: number): void {
   
    this.pessoaService.ExcluirPessoa(pessoaId).subscribe(resultados => {
      this.pessoas = resultados;
      this.modalRef.hide();
      alert("Pessoa excluida com sucesso");
      this.pegarTodos()
    })
  }
}
