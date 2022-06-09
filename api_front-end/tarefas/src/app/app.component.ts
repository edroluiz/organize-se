import { AppService } from '../app/app.service';
import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { DialogService } from './shared/dialog.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  title = 'app';

  tarefas: any[] = [];
  tarefa = {
    id: null,
    name: '',
    filled: false
  }

  displayedColumns = ['id', 'name', 'status', 'edit', 'delete']

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

    this.dialogService.openConfirmDialog('Lorem?')
    .afterClosed().subscribe(res => {
      if(res){
        this.appService.delete(tarefa.id).subscribe(() => this.getAll())
      }
    });
  }

}

