import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule],
  declarations: [LoaderComponent],
  exports: [CommonModule, LoaderComponent, FormsModule],
})
export class SharedModule {}
