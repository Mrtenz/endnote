import { MigrationInterface, QueryRunner, Table } from 'typeorm';

/**
 * Migration to create the `deletion_key` table, if it does not exist.
 */
export class CreateDeletionKeyTable1583190106796 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'deletion_key',
        columns: [
          {
            name: 'noteId',
            type: 'varchar',
            isPrimary: true
          },
          {
            name: 'privateKey',
            type: 'text',
            isNullable: false
          },
          {
            name: 'expiryDate',
            type: 'bigint',
            isNullable: false
          }
        ],
        foreignKeys: [
          {
            name: 'deletion_key',
            columnNames: ['noteId'],
            referencedTableName: 'note',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE'
          }
        ]
      }),
      true
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('deletionKey', true, true);
  }
}
