import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './components/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { ToggleComponent } from '@shared/components/toggle/toggle.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LoaderComponent, ToggleComponent],
  exports: [CommonModule, LoaderComponent, FormsModule, ToggleComponent],
})
export class SharedModule {}
