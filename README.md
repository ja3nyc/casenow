# Development process

## Local Development

### Setting Up App

1. Use command `npm run dev` to start dev version of app
2. Use command `npm run build` to build app
3. Use command `npm run start` to start app in prod

| Username         | Password          |
| ---------------- | ----------------- |
| ja3nyc@gmail.com | 123456 or 1234567 |

### Setting Up Database

#### Setup Local Supabase

##### Commands

| Commands Used     |
| ----------------- |
| `supabase init`   |
| `supabase start`  |
| `supabase status` |
| `supabase stop`   |

##### Steps

1. Initiate the supabase docker instance using the command `supabase init`
2. Start the supabase process using `supabase start`
3. To find the supabase api url, studio url, and the various api-keys use the command `supabase status`
4. To stop all the supabase docker processes use the comamnd `supabase stop`

#### Manual Migration Process

##### Commands

| Commands Used                             |
| ----------------------------------------- |
| `supabase migration new <migration_name>` |
| `supabase db reset`                       |

##### Steps

1. Create a manual migration file using the command `supabase migration new <migration_name>`
2. Use command `supabase db reset` to apply migration changes to local database

#### Automated Migration Process

##### Commands

| Commands Used                          |
| -------------------------------------- |
| `supabase db diff -f <migration_name>` |

##### Steps

1. Update the tables in the local editor at `http://127.0.0.1:54323/`
2. Create a migration file using the `supabase db diff -f <migration_name>` command

#### Oh shit I messed up!? What do I do

##### Commands

| Commands Used                                                     |
| ----------------------------------------------------------------- |
| `supabase migration repair <migration_version> --status reverted` |
| `supabase db reset`                                               |

##### Steps

1. Revert the bad migration using the `supabase migration repair <migration_version> --status reverted` command
2. Add/Remove the psql code and save the file
3. Reset the local database using `supabase db reset` to apply the migration changes

#### Development Cycle

##### Branches

| Branch Name           | Usage                                             |
| --------------------- | ------------------------------------------------- |
| `main`                | Production branch                                 |
| `develop`             | Staging branch                                    |
| `feat/<feature_name>` | New feature implementation                        |
| `chore/<chore_name>`  | Other changes that don't modify src or test files |
| `bug/<bug_name>`      | Fixing a bug in the production code               |

##### Process

![Supabase Development Image](https://supabase.com/docs/_next/image?url=%2Fdocs%2Fimg%2Flocal-dev-environment.svg&w=1920&q=75)

##### Steps

1. When you push local changes to git branch, there is a github action named `ci.yaml` that spins up a shadow database and checks the validity of the changes
2. Once the changes are validated and the branch is complete, we push from the `branch` to `develop`
3. This runs the `staging.yaml` github action, which applies the database changes in the form of migrations against the test database
4. Check the staging database to ensure everything is good before we push to production
5. After staging branch is tested, we can begin the process to push to prod.
6. Once we are ready to push to prod, perform a backup on prod.
7. Then, we will open a PR request and apply the database changes from `develop` to `main` branch once merged

#### Handy Tips

| Command                                                     | Usage                                         |
| ----------------------------------------------------------- | --------------------------------------------- |
| `supabase db dump -f supabase/seed.sql --data-only --local` | Exports seed data for local supabase instance |

#### Syncing Prod to Dev to Local

##### Commands

| Commands Used                                                     |
| ----------------------------------------------------------------- |
| `supabase migration repair <migration_version> --status reverted` |
| `supabase migration repair <migration_version> --status applied`  |
| `supabase db reset`                                               |
| `supabase link --project-ref <project_ref_id>`                    |
| `supabase db pull`                                                |
| `supabase db pull --schema auth,storage`                          |
| `supabase db diff -f <migration_name>`                            |

##### Steps

1. Link ur local supabase cli to prod ref id using command `supabase link --project-ref <project_ref_id>`
2. Go to prod and dev database and clear out all of the migrations `supabase migration repair <migration_version> --status reverted`
3. Delete any local migrations in the `supabase/migrations` folder
4. Pull the prod scheme to the `supabase/migrations` folder using `supabase db pull`
5. Diff the local to prod using `supabase db diff -f <migration_name>`
6. Reset local database using `supabase db reset` to apply latest migrations and ensure they work
7. Link supabase cli back to dev database using command `supabase link --project-ref <project_ref_id>`
8. Apply all the migrations to dev (only if local and dev are synced already) using `supabase migration repair <migration_version> --status applied` where the `<migration_version>` is the version in the migration file name (beginning digits)
