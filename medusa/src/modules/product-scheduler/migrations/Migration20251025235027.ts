import { Migration } from '@mikro-orm/migrations';

export class Migration20251025235027 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "product_extension" ("id" text not null, "duration" text null, "difficulty_level" text null, "max_participants" integer null, "location" text null, "tags" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "product_extension_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_product_extension_deleted_at" ON "product_extension" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "product_extension" cascade;`);
  }

}
