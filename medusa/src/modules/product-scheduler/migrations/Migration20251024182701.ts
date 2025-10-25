import { Migration } from '@mikro-orm/migrations';

export class Migration20251024182701 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "product_rule" ("id" text not null, "product_id" text not null, "title" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "product_rule_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_product_rule_deleted_at" ON "product_rule" (deleted_at) WHERE deleted_at IS NULL;`);

    this.addSql(`drop table if exists "product_rules" cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`create table if not exists "product_rules" ("id" text not null, "title" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "product_rules_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_product_rules_deleted_at" ON "product_rules" (deleted_at) WHERE deleted_at IS NULL;`);

    this.addSql(`drop table if exists "product_rule" cascade;`);
  }

}
