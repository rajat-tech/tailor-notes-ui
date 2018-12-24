import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ContextService } from '../shared';
import { NoteService } from './note.service';


@Component({
  selector: 'app-add-note',
  template: `
  
  <form [formGroup]="form" novalidate (ngSubmit)="save(form)">

    <mat-form-field>
      <input matInput placeholder="Contact Name" formControlName="name">
      <button mat-icon-button matSuffix (click)="addFieldwidget()" type="button"><mat-icon>add_circle</mat-icon></button>
    </mat-form-field>
    
    <ng-container formArrayName="measures">
        <ng-container *ngFor="let measure of getMeasuresControl().controls; let i=index" [formGroupName]="i">
          <app-note-field-widget 
            [group]="form.controls.measures.controls[i]" 
            [index]="i" 
            (remove)="removeFieldWiget(i)"
            [canRemove]="canRemove()"
            ></app-note-field-widget>
        </ng-container>
    </ng-container>
    
    <button mat-raised-button color="primary" type="submit" [disabled]="!form.valid" color="primary">
      Save Measurement
    </button>

  </form>
  `,
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private appContext: ContextService, 
    private fb: FormBuilder, 
    private noteService: NoteService,
    private router: Router) { }

  ngOnInit() {

    this.appContext.showBackBtn.next(true);
    this.appContext.moduleTitle.next("Add Note");

    this.form = this.fb.group({
      measures: this.fb.array([
        this.measureFactory()
      ]),
      name: ['', Validators.required]
    });
  }

  measureFactory(){
    return  this.fb.group({
      name: ['Waist', Validators.required],
      value: [0.00, [Validators.required, Validators.min(0.01)]],
      unit: ['in', Validators.required]
    });
  }

  addFieldwidget() {
    const control = this.getMeasuresControl();
    control.push(this.measureFactory());
    return false;
  }

  removeFieldWiget(i: number) {
    const control = this.getMeasuresControl();
    control.removeAt(i);
  }

  public getMeasuresControl = () => <FormArray>this.form.controls["measures"];


  save(model) {
    console.log(model.value);
    this.noteService.addNote(model.value).subscribe(x=>{
      if(x) this.router.navigateByUrl('notes');
    });
  }

  canRemove(): boolean{
    return this.getMeasuresControl().length > 1;
  }

}
