import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchNotesPipe } from './search-notes.pipe';
import { SearchPipe } from './searchpipe';

@NgModule({
  declarations: [SearchNotesPipe, SearchPipe],
  exports: [SearchNotesPipe, CommonModule]
})

export class SharedModule {}
