import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../../config/service/config.service';
import { DragonListItemResponse } from '../integration/dragon-list-item.response';

@Injectable()
export class DragonsRestService {

  constructor(
    private readonly http: HttpClient,
    private readonly config: ConfigService) { }

  public getDragons(): Observable<DragonListItemResponse[]> {
    return this.http.get<DragonListItemResponse[]>(this.config.getDragonsApiUrl());
  }
}
