import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { DialogService } from '../shared/dialog.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

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

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.appService.getAll().subscribe((data: any) => this.tarefas = data)
  }

  save() {
    if (this.tarefa.id) {
      this.appService.update(this.tarefa.id, this.tarefa).subscribe(() => this.getAll());
    } else {
      this.appService.create(this.tarefa).subscribe(() => this.getAll());
    }
    this.tarefa = {
      id: null,
      name: '',
      filled: false
    };
  }

  edit(tarefa: any) {
    this.tarefa = JSON.parse(JSON.stringify(tarefa));
    this.save();
    console.log("Alterações salvas com sucesso!");
  }


  delete(tarefa: any) {
    this.dialogService.openConfirmDialog('Tem certeza que deseja excluir está tarefa?')
    .afterClosed().subscribe(res => {
      if(res){
        this.appService.delete(tarefa.id).subscribe(() => this.getAll())
      }
    });
  }

  toggleEditName(tarefa: any) {
    tarefa.editingName = !tarefa.editingName;
  }

  saveEdit(tarefa: any) {
    tarefa.editingName = false;
  }

  cancelEdit(tarefa: any) {
    tarefa.editingName = false;
  }

}
