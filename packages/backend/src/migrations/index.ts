import { InitialMigration1582736355738 } from './1-initial-migration';
import { CreateNoteTable1582736368611 } from './2-create-note-table';
import { CreateDeletionKeyTable1583190106796 } from './3-create-deletion-key-table';

export default [InitialMigration1582736355738, CreateNoteTable1582736368611, CreateDeletionKeyTable1583190106796];
