import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";

import { Category, CategoryRepository } from '../../../../repository/category.repository'

@Component({
  selector: 'app-projet-admin-category-form',
  templateUrl: './category-form.component.html'
})
export class CategoryFormComponent implements OnInit {

	form: FormGroup;
	category: Category;
  @Output() saveChange: EventEmitter<boolean> = new EventEmitter();
  @Input('updateCategory') updateCategory: Category = null;

  constructor(private fb: FormBuilder, private categoryR: CategoryRepository) { }

  ngOnInit() {
  	this.setForm();

  }

  setForm() {
  	this.form = this.fb.group({
      libelle: [null, [Validators.required]],
			ordre: []
    });

    if (this.updateCategory !== null) {
      this.form.patchValue(this.updateCategory);
    }
  }

  save() {
    if (this.form.valid) { 
      if (this.updateCategory !== null) {
        this.update();
      } else {
        this.add();
      }
    }
  }

  add() {
		this.categoryR.post(this.form.value)
							  		.subscribe(res => {
							          this.category = res;
                        this.saveChange.emit();
							        },
							        error => { /*this.errors = error.error;*/ }
							      );
  }

  update() {
    this.categoryR.put(this.updateCategory, this.form.value)
                    .subscribe(res => {
                        this.category = res;
                        this.saveChange.emit();
                      },
                      error => { /*this.errors = error.error;*/ }
                    );
  }

}
