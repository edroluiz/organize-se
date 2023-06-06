import { AppService } from '../app/app.service';
import { Component, OnInit} from '@angular/core';
import { DialogService } from './shared/dialog.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {

  constructor( ) { }

  ngOnInit(): void { }
}

