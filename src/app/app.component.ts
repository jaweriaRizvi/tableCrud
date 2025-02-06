
import { Component } from '@angular/core';
import { CrudComponent } from './crud.component';
import { RouterOutlet } from '@angular/router';
import { CrudService } from './crud.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CrudComponent],  
  providers:[CrudService],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  title = 'table';
}
