import { Migration } from '@mikro-orm/migrations';

export class Migration20251026065312 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "product_extension" add column if not exists "product_id" text not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "product_extension" drop column if exists "product_id";`);
  }

}
