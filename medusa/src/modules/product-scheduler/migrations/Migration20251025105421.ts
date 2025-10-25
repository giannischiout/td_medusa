import { Migration } from '@mikro-orm/migrations';

export class Migration20251025105421 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "time_slot" ("id" text not null, "product_id" text not null, "rule_id" text not null, "start_time" text not null, "end_time" text not null, "capacity" integer not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "time_slot_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_time_slot_rule_id" ON "time_slot" (rule_id) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_time_slot_deleted_at" ON "time_slot" (deleted_at) WHERE deleted_at IS NULL;`);

    this.addSql(`alter table if exists "time_slot" add constraint "time_slot_rule_id_foreign" foreign key ("rule_id") references "product_rule" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "time_slot" cascade;`);
  }

}
