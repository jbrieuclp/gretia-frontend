import { Component, OnInit } from '@angular/core';

import { Category, CategoryRepository } from '../../../repository/category.repository'

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

  categories: Category[] = [];
  display: string;
  deleteCategory: Category = null;
	updateCategory: Category = null;
  
  constructor(private categoryR: CategoryRepository) { }

  ngOnInit() {
  	this.displayReset();
    this.loadCategories();
  }

  save() { 
    this.displayReset();
    this.loadCategories(); 
  }

  update(category: Category) {
    this.display = 'update-form';
    this.updateCategory = category;
  }

  deleteConfirm(category: Category) {
    this.display = 'delete';
    this.deleteCategory = category;
  }

  delete(category: Category) {
    this.categoryR.delete(category)
          .subscribe( res => {
            if (res) { 
              this.displayReset(); this.loadCategories(); 
            } 
          });
  }

  loadCategories() {
    this.categoryR.categories().subscribe( res => this.categories = res);
  }

  displayReset(){
    this.updateCategory = null;
    this.deleteCategory = null;
    this.display = null;
  }

}
