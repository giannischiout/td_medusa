import { Migration } from '@mikro-orm/migrations';

export class Migration20251023202047 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "product_rules" ("id" text not null, "title" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "product_rules_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_product_rules_deleted_at" ON "product_rules" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "product_rules" cascade;`);
  }

}
