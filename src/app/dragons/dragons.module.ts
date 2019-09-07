import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ConfigModule } from '../config/config.module';
import { DragonsListComponent } from './dragons-list/dragons-list.component';
import { DragonsRoutingModule } from './dragons-routing.module';
import { DragonsRestService } from './service/dragons-rest.service';
import { DragonsService } from './service/dragons.service';

@NgModule({
  declarations: [DragonsListComponent],
  imports: [ConfigModule, DragonsRoutingModule, HttpClientModule],
  providers: [DragonsService, DragonsRestService],
})
export class DragonsModule { }
