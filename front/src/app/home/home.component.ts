import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { DialogService } from '../shared/dialog.service';
import { Observable } from 'rxjs';

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

  nomeUsuario: string = '';

  constructor(
    private appService: AppService,
    private dialogService: DialogService,
    private authService: AuthService
  ) { }


  /* -------------- CRUD -------------- */

  ngOnInit(): void {
    this.getAll();
    this.nomeUsuario = this.authService.getUsername();
  }

  getAll() {
    this.appService.getAll().subscribe((data: any) => this.tarefas = data)
  }

  save() {
    if (this.tarefa.name.trim() !== '') {
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
  }

  edit(tarefa: any) {
    this.tarefa = {
      ...tarefa
    }
  }

  delete(tarefa: any) {
    this.dialogService.openConfirmDialog('Tem certeza que deseja excluir está tarefa?')
    .afterClosed().subscribe(res => {
      if(res){
        this.appService.delete(tarefa.id).subscribe(() => this.getAll())
      }
    });
  }

}
