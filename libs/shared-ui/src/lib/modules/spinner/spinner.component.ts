import { Component, Input, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FlexibleConnectedPositionStrategy, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'fp-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  isLoading: boolean = false;
  @Input() set loading(val: boolean) {
    this.isLoading = val;
  };

  @Input() isFullScreen: boolean = false;
}
