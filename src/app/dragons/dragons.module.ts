import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ConfigModule } from '../config/config.module';
import { DragonAddComponent } from './dragon-add/dragon-add.component';
import { DragonDetailsComponent } from './dragon-details/dragon-details.component';
import { DragonFormComponent } from './dragon-form/dragon-form.component';
import { DragonsListComponent } from './dragons-list/dragons-list.component';
import { DragonsRoutingModule } from './dragons-routing.module';
import { DragonsRestService } from './service/dragons-rest.service';
import { DragonsService } from './service/dragons.service';

@NgModule({
  declarations: [
    DragonAddComponent,
    DragonDetailsComponent,
    DragonFormComponent,
    DragonsListComponent,
  ],
  imports: [
    CommonModule,
    ConfigModule,
    DragonsRoutingModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
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
  providers: [
    DragonsService,
    DragonsRestService,
  ],
})
export class DragonsModule { }
