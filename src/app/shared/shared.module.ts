import { NgModule } from '@angular/core';
import { ShortNamePipe } from './pipes/shortName.pipe';

@NgModule({
  declarations: [ShortNamePipe],
  imports: [],
  exports: [ShortNamePipe],
})
export class SharedModule {}
