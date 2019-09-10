import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, first, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { DragonListItemModel } from '../model/dragon-list-item.model';
import { DragonsService } from '../service/dragons.service';

@Component({
  selector: 'app-dragons-list',
  templateUrl: './dragons-list.component.html',
  styleUrls: ['./dragons-list.component.css'],
})
export class DragonsListComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$: Subject<void>;
  private dragons: DragonListItemModel[];
  public form: FormGroup;
  public isLoading: boolean;
  public displayedColumns: string[];
  public dataSource: MatTableDataSource<DragonListItemModel>;
  public tableSizeOptions: number[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private readonly service: DragonsService,
    private formBuilder: FormBuilder) {
    this.unsubscribe$ = new Subject<void>();
    this.isLoading = false;
    this.tableSizeOptions = [5, 10, 20];
    this.displayedColumns = ['name', 'type', 'date'];
    this.getDragons().subscribe();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      filterCtrl: ['', []]
    });
    this.reactToFilterValueChange().subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private reactToFilterValueChange(): Observable<DragonListItemModel[]> {
    return this.form.get('filterCtrl').valueChanges.pipe(
      takeUntil(this.unsubscribe$),
      tap(() => { this.isLoading = true; }),
      debounceTime(300),
      distinctUntilChanged(),
      map(search => this.applyFilter(search)),
      tap(() => { this.isLoading = false; }));
  }

  private getDragons(): Observable<DragonListItemModel[]> {
    return of({}).pipe(
      first(),
      tap(() => { this.isLoading = true; }),
      switchMap(() => this.service.getDragonsList()),
      map(dragons => dragons.sort((dragonA, dragonB) => dragonA.name.localeCompare(dragonB.name))),
      tap(dragons => { this.dragons = dragons; }),
      tap(() => { this.isLoading = false; }),
      tap(dragons => {
        this.dataSource = new MatTableDataSource(dragons);
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (item, property): string | number => {
          switch (property) {
            case 'date':
              return item.createdAt.valueOf();
            default:
              return item[property];
          }
        };
        this.dataSource.paginator = this.paginator;
      }));
  }

  private applyFilter(filterValue: string): DragonListItemModel[] {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    return this.dataSource.filteredData;
  }

  get isMobileDevice(): boolean {
    return screen.width < 650;
  }
}
