import { NgModule } from '@angular/core';
import { ShortNamePipe } from './pipes/shortName.pipe';
import { ToFixedPipe } from './pipes/toFixed.pipe';

@NgModule({
  declarations: [ShortNamePipe, ToFixedPipe],
  imports: [],
  exports: [ShortNamePipe, ToFixedPipe],
})
export class SharedModule {}
