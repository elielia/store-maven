import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LoaderComponent],
  exports: [CommonModule, LoaderComponent],
})
export class SharedModule {}
