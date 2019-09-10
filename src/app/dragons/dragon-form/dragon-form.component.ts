import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { DragonModel } from '../model/dragon.model';

@Component({
  selector: 'app-dragon-form',
  templateUrl: './dragon-form.component.html',
  styleUrls: ['./dragon-form.component.css'],
})
export class DragonFormComponent implements OnInit {
  public form: FormGroup;

  @Input()
  public dragon: DragonModel;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    const name: string = !isNullOrUndefined(this.dragon) ? this.dragon.name : '';
    const type: string = !isNullOrUndefined(this.dragon) ? this.dragon.type : '';
    const history: string = !isNullOrUndefined(this.dragon) ? this.dragon.history : '';
    const histories: string[] = !isNullOrUndefined(this.dragon) ? this.dragon.histories : [''];
    this.form = this.formBuilder.group({
      nameCtrl: [name, [Validators.required]],
      typeCtrl: [type, [Validators.required]],
      historyCtrl: [history, []],
      historiesCtrl: [histories.join('\n'), []]
    });
  }
}
