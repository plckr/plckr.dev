create table
    "public"."post_claps" (
        "post_slug" character varying not null,
        "claps_count" integer not null,
        "created_at" timestamp
        with
            time zone DEFAULT "now" () not null,
            "posthog_session_id" character varying not null
    );

alter table only "public"."post_claps" add constraint "post_claps_pkey" primary key ("post_slug", "posthog_session_id");

alter table "public"."post_claps" enable row level security;

alter role authenticator
set
    pgrst.db_aggregates_enabled = 'true';

notify pgrst,
'reload config';