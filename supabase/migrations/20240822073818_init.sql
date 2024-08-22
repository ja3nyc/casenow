create table "public"."cases" (
    "id" bigint generated always as identity not null,
    "title" text not null,
    "timestamp" timestamp with time zone not null default now(),
    "category" text not null,
    "user_id" bigint
);


alter table "public"."cases" enable row level security;

create table "public"."chats" (
    "id" bigint generated always as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "feedback" jsonb,
    "case_id" bigint,
    "user_id" bigint
);


alter table "public"."chats" enable row level security;

create table "public"."messages" (
    "id" bigint generated always as identity not null,
    "text" text not null,
    "sender" text not null,
    "timestamp" timestamp with time zone not null default now(),
    "type" text,
    "options" text[],
    "chat_id" bigint,
    "user_id" bigint
);


alter table "public"."messages" enable row level security;

CREATE UNIQUE INDEX cases_pkey ON public.cases USING btree (id);

CREATE UNIQUE INDEX chats_pkey ON public.chats USING btree (id);

CREATE UNIQUE INDEX messages_pkey ON public.messages USING btree (id);

alter table "public"."cases" add constraint "cases_pkey" PRIMARY KEY using index "cases_pkey";

alter table "public"."chats" add constraint "chats_pkey" PRIMARY KEY using index "chats_pkey";

alter table "public"."messages" add constraint "messages_pkey" PRIMARY KEY using index "messages_pkey";

alter table "public"."chats" add constraint "chats_case_id_fkey" FOREIGN KEY (case_id) REFERENCES cases(id) not valid;

alter table "public"."chats" validate constraint "chats_case_id_fkey";

alter table "public"."messages" add constraint "messages_chat_id_fkey" FOREIGN KEY (chat_id) REFERENCES chats(id) not valid;

alter table "public"."messages" validate constraint "messages_chat_id_fkey";

alter table "public"."messages" add constraint "messages_sender_check" CHECK ((sender = ANY (ARRAY['bot'::text, 'user'::text]))) not valid;

alter table "public"."messages" validate constraint "messages_sender_check";

alter table "public"."messages" add constraint "messages_type_check" CHECK ((type = ANY (ARRAY['multiple-choice'::text, 'select'::text, 'number'::text]))) not valid;

alter table "public"."messages" validate constraint "messages_type_check";

grant delete on table "public"."cases" to "anon";

grant insert on table "public"."cases" to "anon";

grant references on table "public"."cases" to "anon";

grant select on table "public"."cases" to "anon";

grant trigger on table "public"."cases" to "anon";

grant truncate on table "public"."cases" to "anon";

grant update on table "public"."cases" to "anon";

grant delete on table "public"."cases" to "authenticated";

grant insert on table "public"."cases" to "authenticated";

grant references on table "public"."cases" to "authenticated";

grant select on table "public"."cases" to "authenticated";

grant trigger on table "public"."cases" to "authenticated";

grant truncate on table "public"."cases" to "authenticated";

grant update on table "public"."cases" to "authenticated";

grant delete on table "public"."cases" to "service_role";

grant insert on table "public"."cases" to "service_role";

grant references on table "public"."cases" to "service_role";

grant select on table "public"."cases" to "service_role";

grant trigger on table "public"."cases" to "service_role";

grant truncate on table "public"."cases" to "service_role";

grant update on table "public"."cases" to "service_role";

grant delete on table "public"."chats" to "anon";

grant insert on table "public"."chats" to "anon";

grant references on table "public"."chats" to "anon";

grant select on table "public"."chats" to "anon";

grant trigger on table "public"."chats" to "anon";

grant truncate on table "public"."chats" to "anon";

grant update on table "public"."chats" to "anon";

grant delete on table "public"."chats" to "authenticated";

grant insert on table "public"."chats" to "authenticated";

grant references on table "public"."chats" to "authenticated";

grant select on table "public"."chats" to "authenticated";

grant trigger on table "public"."chats" to "authenticated";

grant truncate on table "public"."chats" to "authenticated";

grant update on table "public"."chats" to "authenticated";

grant delete on table "public"."chats" to "service_role";

grant insert on table "public"."chats" to "service_role";

grant references on table "public"."chats" to "service_role";

grant select on table "public"."chats" to "service_role";

grant trigger on table "public"."chats" to "service_role";

grant truncate on table "public"."chats" to "service_role";

grant update on table "public"."chats" to "service_role";

grant delete on table "public"."messages" to "anon";

grant insert on table "public"."messages" to "anon";

grant references on table "public"."messages" to "anon";

grant select on table "public"."messages" to "anon";

grant trigger on table "public"."messages" to "anon";

grant truncate on table "public"."messages" to "anon";

grant update on table "public"."messages" to "anon";

grant delete on table "public"."messages" to "authenticated";

grant insert on table "public"."messages" to "authenticated";

grant references on table "public"."messages" to "authenticated";

grant select on table "public"."messages" to "authenticated";

grant trigger on table "public"."messages" to "authenticated";

grant truncate on table "public"."messages" to "authenticated";

grant update on table "public"."messages" to "authenticated";

grant delete on table "public"."messages" to "service_role";

grant insert on table "public"."messages" to "service_role";

grant references on table "public"."messages" to "service_role";

grant select on table "public"."messages" to "service_role";

grant trigger on table "public"."messages" to "service_role";

grant truncate on table "public"."messages" to "service_role";

grant update on table "public"."messages" to "service_role";

create policy "user_policy_cases"
on "public"."cases"
as permissive
for all
to public
using ((user_id = (current_setting('app.current_user_id'::text))::bigint))
with check ((user_id = (current_setting('app.current_user_id'::text))::bigint));


create policy "user_policy"
on "public"."chats"
as permissive
for all
to public
using ((user_id = (current_setting('app.current_user_id'::text))::bigint))
with check ((user_id = (current_setting('app.current_user_id'::text))::bigint));


create policy "user_policy_messages"
on "public"."messages"
as permissive
for all
to public
using ((user_id = (current_setting('app.current_user_id'::text))::bigint))
with check ((user_id = (current_setting('app.current_user_id'::text))::bigint));



