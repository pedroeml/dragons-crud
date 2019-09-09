import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule,
         MatTableModule, MatTooltipModule } from '@angular/material';
import { ConfigModule } from '../config/config.module';
import { DragonsListComponent } from './dragons-list/dragons-list.component';
import { DragonsRoutingModule } from './dragons-routing.module';
import { DragonsRestService } from './service/dragons-rest.service';
import { DragonsService } from './service/dragons.service';

@NgModule({
  declarations: [DragonsListComponent],
  imports: [
    CommonModule,
    ConfigModule,
    DragonsRoutingModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
  providers: [DragonsService, DragonsRestService],
})
export class DragonsModule { }
