import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-import-toolsbox',
  templateUrl: './toolsbox.component.html',
  styleUrls: ['./toolsbox.component.scss']
})
export class ToolsboxComponent {

  constructor(
  	private _bottomSheetRef: MatBottomSheetRef<ToolsboxComponent>,
  ) {}

}
