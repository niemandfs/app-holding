# app-holding

Holding page served by a Cloudflare Worker. Shows a "Coming soon" page with `noindex` until the real app is ready.

## Environments

| Environment | URL | Worker | Deploys when |
| --- | --- | --- | --- |
| Production | https://app.novanfs.my.id | `app-holding` | A PR is merged to `main` |
| Staging | https://app-staging.novanfs.my.id | `app-holding-staging` | A PR to `main` is opened or updated |

## How changes go live

1. Create a branch from `main` and make your change.
2. Open a PR. GitHub Actions runs `validate`, `secret-scan` and `deploy-staging`.
3. Check the staging URL.
4. Merge the PR. `Deploy Worker` deploys to production.

`main` is protected. Direct pushes are blocked and all checks must pass before merge.

## Files

- `src/index.js` – page content and response headers
- `wrangler.jsonc` – Worker name, domains and environments
- `.github/workflows/` – CI checks and deploy workflows

## Run locally

```bash
npm ci
npm run dev                       # production settings
npx wrangler dev --env staging    # staging settings
```

## Rollback

Fast (no code change):
Cloudflare dashboard → Workers & Pages → `app-holding` → Deployments → `...` on the last good version → Rollback.

Then fix the code:
```bash
git revert <commit-hash>
```
Push the revert on a branch and merge it through a PR, so `main` matches what is live.

## Secrets

Stored in GitHub → Settings → Secrets and variables → Actions:

- `CLOUDFLARE_API_TOKEN` – scoped token (Workers only, zone `novanfs.my.id`), expires every 90 days
- `CLOUDFLARE_ACCOUNT_ID`

When the token expires, deploys fail with an auth error. Roll the token in Cloudflare (My Profile → API Tokens) and update the secret.