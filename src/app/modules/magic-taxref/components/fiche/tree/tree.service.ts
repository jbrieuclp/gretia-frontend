import { Injectable } from '@angular/core';

@Injectable()
export class TreeService {

  public _tree: any = {}
  public depth: number = 0;
  get tree(): any { return this._tree; }
  set tree(taxon) { 
    this._tree = this.getParents(taxon);
    this.depth = this.getDepth(this._tree);
  }

  constructor() { }

  private getParents(taxon) {
    if (taxon.hasOwnProperty("parent")) {
      if (typeof taxon["parent"] == "object" && taxon["parent"] !== null) {
        const parent = Object.assign({}, taxon["parent"]);
        delete taxon["parent"];
        parent['childrens'] = [taxon];
        return this.getParents(parent);
      } else {
        delete taxon["parent"];
        return taxon;
      }
    }
    return taxon;
  }

  private getDepth(obj) {
    let depth = 0;
    if (obj.childrens) {
      obj.childrens.forEach((e) => {
        var tmpDepth = this.getDepth(e)
        if (tmpDepth > this.depth) {
          depth = tmpDepth
        }
      }, this)
      depth++;
    }
    return depth;
  }

  setChildrens(cdRef, childrens) {
    this.replaceChildrens(this._tree, cdRef, childrens);
  }

  private replaceChildrens(taxon, cdRef, childrens) {
    if (taxon.cdNom != cdRef) {
      if (taxon.childrens) {
        taxon.childrens.forEach((e) => {
          this.replaceChildrens(e, cdRef, childrens)
        }, this)
      }
    } else {
      if (taxon.childrens) {
        childrens.forEach((e) => {
          let child = taxon.childrens.find(c => c.cdNom == e.cdNom);
          if (child !== undefined && child.childrens) {
            e['childrens'] = child.childrens;
          }
        })
      } 
      taxon['childrens'] = childrens;
    }
  }

}
