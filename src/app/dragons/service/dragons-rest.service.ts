import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../../config/service/config.service';
import { DragonListItemResponse } from '../integration/dragon-list-item.response';
import { DragonRequest } from '../integration/dragon.request';
import { DragonResponse } from '../integration/dragon.response';

@Injectable()
export class DragonsRestService {

  constructor(
    private readonly http: HttpClient,
    private readonly config: ConfigService) { }

  public getDragons(): Observable<DragonListItemResponse[]> {
    return this.http.get<DragonListItemResponse[]>(this.config.getDragonsApiUrl());
  }

  public getDragon(id: string): Observable<DragonResponse> {
    return this.http.get<DragonResponse>(`${this.config.getDragonsApiUrl()}/${id}`);
  }

  public addDragon(dragon: DragonRequest): Observable<DragonResponse> {
    return this.http.post<DragonResponse>(`${this.config.getDragonsApiUrl()}`, dragon);
  }

  public updateDragon(id: string, dragon: DragonRequest): Observable<DragonResponse> {
    return this.http.put<DragonResponse>(`${this.config.getDragonsApiUrl()}/${id}`, dragon);
  }

  public deleteDragon(id: string): Observable<DragonResponse> {
    return this.http.delete<DragonResponse>(`${this.config.getDragonsApiUrl()}/${id}`);
  }
}
