import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-import-toolsbox',
  templateUrl: './toolsbox.component.html',
  styleUrls: ['./toolsbox.component.scss']
})
export class ToolsboxComponent implements OnInit, OnDestroy {

	

  constructor(
  	private _bottomSheetRef: MatBottomSheetRef<ToolsboxComponent>,
  ) { }

  ngOnInit() {
  	
  }



}
