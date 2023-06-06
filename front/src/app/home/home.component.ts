import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { DialogService } from '../shared/dialog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'app';

  tarefas: any[] = [];
  tarefa = {
    id: null,
    name: '',
    filled: false
  }

  displayedColumns = ['id', 'name', 'status', 'edit', 'delete'];

  constructor(
    private appService: AppService,
    private dialogService: DialogService
  ) { }


  /* -------------- CRUD -------------- */

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.appService.getAll().subscribe((data: any) => this.tarefas = data)
  }

  save() {
    if (this.tarefa.id) {
      this.appService.update(this.tarefa.id!, this.tarefa).subscribe(() => this.getAll())
    } else {
      this.appService.create(this.tarefa).subscribe(() => this.getAll())
    }
    this.tarefa = {
      id: null,
      name: '',
      filled: false
    }
  }

  edit(tarefa: any) {
    this.tarefa = {
      ...tarefa //Arruma o bug de edição imediata
    }
  }

  delete(tarefa: any) {
    // this.appService.delete(pedido.id).subscribe(() => this.getAll())

    this.dialogService.openConfirmDialog('Tem certeza que deseja excluir está tarefa?')
    .afterClosed().subscribe(res => {
      if(res){
        this.appService.delete(tarefa.id).subscribe(() => this.getAll())
      }
    });
  }

}
