import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnChanges, OnInit{
  @Input() toolbar;
  @Input() list;

  arrayHeader: any = [];
  arraySource: any = [];
  arraySourceFinal: any = [];
  error: any = [];
  isLoadingList: boolean = true;
  msg: string;
  rows: any = [];
  pages: any = [];
  selectedPageValue: number;
  selectedRowValue: number;
  
  constructor(
  ) { }

  ngOnChanges() {

    if(this.list) {
      if(this.list.array) {
        this.isLoadingList = false;
        this.arraySource = this.list.array;
        this.filterArrayKey(this.arraySource);
        if(this.arraySource.length < 1) {
          this.msg = "Nada na lista";
        }
      } else {
        this.error = ['list.array']
      }
    
      if(this.list.header) {
        this.arrayHeader = this.list.header;
      } else {
        this.error = ['list.header']  
      }
    } else {
      setTimeout(() => {
        if(this.list == undefined) {
          this.error = ['list', 'time exceeded'];
        }
      }, 20000)
    }
  }

  ngOnInit() {
  }

  filterArrayKey = (data) => {
    //Set pages array - find a better place for it
    for(let lim = Math.ceil(data.length / this.selectedRowValue), i = 0; i < lim; i++) {
      this.pages[i] = i+1;
    }

    let filter = data.map((data) => {
      let temp = [];
      for(let lim = this.list.childKeys.length, i = 0; i < lim; i++){
        temp.push(data[this.list.childKeys[i]]);
      }
      return temp;
    })

    this.arraySourceFinal = filter; 
  }
}

/***************************************************************************************************************************************
 * Motivos para a lógica de acesso aos dados para a array da listagem NÃO SER aplicada dentro do componente                            *
 ***************************************************************************************************************************************/
/*
  Universaliza e individualiza a utilização do componente, já que nenhum terceiro elemento está diretamente relacionado a ele
  O argumento anterior é o que, no fim das contas, define o que componetizar, a independência do elemento
*/

/***************************************************************************************************************************************
 * Motivos para a lógica de acesso aos dados para a array da listagem SER aplicada dentro do componente                                *
 ***************************************************************************************************************************************/
/*
  Diminui a complexidade do uso do componente, já que um terceiro elemento, como service necessário para gerar array faz-se desnecessário
  A não necessidade de acessar um terceiro serviço no componente pai para gerar a array aumenta a produção
*/