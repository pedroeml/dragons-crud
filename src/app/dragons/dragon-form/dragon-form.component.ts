import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { DragonRequest } from '../integration/dragon.request';
import { DragonModel } from '../model/dragon.model';

@Component({
  selector: 'app-dragon-form',
  templateUrl: './dragon-form.component.html',
  styleUrls: ['./dragon-form.component.css'],
  providers: [DatePipe],
})
export class DragonFormComponent implements OnInit {
  public form: FormGroup;

  @Input()
  public dragon: DragonModel;

  @Input()
  public isLoading: boolean;

  @Output()
  public editedDragon: EventEmitter<DragonRequest>;

  @Output()
  public deletedDragon: EventEmitter<void>;

  constructor(
    private readonly datePipe: DatePipe,
    private readonly formBuilder: FormBuilder) {
    this.editedDragon = new EventEmitter<DragonRequest>();
    this.deletedDragon = new EventEmitter<void>();
  }

  ngOnInit() {
    const name: string = !isNullOrUndefined(this.dragon) ? this.dragon.name : '';
    const type: string = !isNullOrUndefined(this.dragon) ? this.dragon.type : '';
    const date: string = this.datePipe.transform(!isNullOrUndefined(this.dragon) ? this.dragon.createdAt : new Date(), 'MM/dd/yyy HH:mm');
    const history: string = !isNullOrUndefined(this.dragon) ? this.dragon.history : '';
    const histories: string[] = !isNullOrUndefined(this.dragon) ? this.dragon.histories : [''];
    this.form = this.formBuilder.group({
      nameCtrl: [name, [Validators.required]],
      typeCtrl: [type, [Validators.required]],
      dateCtrl: [date, [Validators.required]],
      historyCtrl: [history, []],
      historiesCtrl: [histories.join('\n'), []]
    });
  }

  public save(): void {
    const name: string = this.form.controls['nameCtrl'].value.toString();
    const type: string = this.form.controls['typeCtrl'].value.toString();
    const history: string = this.form.controls['historyCtrl'].value.toString();
    const histories: string[] = this.form.controls['historiesCtrl'].value.toString()
      .split('\n')
      .filter((line: string) => line.length > 0);
    const updatedDragon: DragonRequest = {
      name,
      type,
      history,
      histories
    };
    this.editedDragon.emit(updatedDragon);
  }

  public cancel(): void {
    this.editedDragon.emit();
  }

  public delete(): void {
    this.deletedDragon.emit();
  }
}
