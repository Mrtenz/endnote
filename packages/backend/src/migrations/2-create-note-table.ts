import { MigrationInterface, QueryRunner, Table } from 'typeorm';

/**
 * Migration to create the `note` table, if it does not exist.
 */
export class CreateNoteTable1582736368611 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'note',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true
          },
          {
            name: 'title',
            type: 'varchar',
            length: '50',
            isNullable: false
          },
          {
            name: 'cipher',
            type: 'text',
            isNullable: false
          },
          {
            name: 'iv',
            type: 'text',
            isNullable: false
          },
          {
            name: 'hmac',
            type: 'text',
            isNullable: false
          },
          {
            name: 'views',
            type: 'bigint',
            isNullable: false,
            default: 0
          },
          {
            name: 'deleteAfter',
            type: 'bigint',
            unsigned: true,
            isNullable: false
          },
          {
            name: 'maxViews',
            type: 'bigint',
            unsigned: true,
            isNullable: true,
            default: null
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP'
          }
        ]
      }),
      true
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('note', true);
  }
}
