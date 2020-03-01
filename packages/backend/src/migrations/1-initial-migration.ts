import { MigrationInterface, QueryRunner } from 'typeorm';
import { getVariable } from '../environment';

/**
 * Migration to create the database if it does not exist.
 */
export class InitialMigration1582736355738 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createDatabase(getVariable('DATABASE_NAME'), true);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropDatabase(getVariable('DATABASE_NAME'), true);
  }
}
