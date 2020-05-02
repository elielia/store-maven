import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@core/services/api/api.service';
import { RootStoreModule } from '@core/root-store/root-store.module';

@NgModule({
  imports: [CommonModule, HttpClientModule, NgbModule, RootStoreModule],
  providers: [ApiService],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}
