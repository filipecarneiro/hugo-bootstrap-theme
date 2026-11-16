# Releasing

Releases are handled by `.github/workflows/release.yml`.

| Release | How |
|---|---|
| **Patch** | Automatic — every push to `main` that touches shipped files |
| **Minor / major** | Manual — Actions tab → **Release** → *Run workflow* → pick the bump |

The workflow builds `exampleSite` first and stops if it fails, then bumps the
version, commits, tags, pushes, publishes to npm and creates the GitHub release
with generated notes.

## Landing a minor or major

Two steps, and the order matters. Any push to `main` that touches shipped files
cuts a **patch** on its own, so the push and the deliberate bump would otherwise
race each other.

1. Commit the change with **`[skip ci]`** in the message and push. No release fires.
2. Actions tab → **Release** → *Run workflow* → pick `minor` or `major`.

**Leave `package.json` alone.** The workflow owns the bump, and running
`npm version` yourself breaks both halves of the release:

- The bump lands folded into your code commit, so there is no separate
  `chore(release): x.y.z` commit and `git log --grep='chore(release)'` stops being
  a complete release ledger.
- `npm version` derives the next version from the current one, so once you have
  written 2.1.0 by hand the workflow can only reach 2.1.1 or 2.2.0. There is no
  bump that lands on the version you already wrote, and the only route back is
  rewriting history that has already been pushed.

If it happens anyway, do not unwind it. Finish that version by hand instead (see
below). The tag, the version in `package.json` and the published contents still
agree, which is the property that matters; the cost is one release missing from
the `chore(release)` ledger.

## How the workflow authenticates to npm

It uses **npm trusted publishing** (OIDC). There is no `NPM_TOKEN` secret and
nothing to rotate: npm accepts the publish because the job runs from this
repository and this workflow file. npm is retiring tokens that bypass 2FA for
direct publishing, which is why a stored token is not an option.

The link lives on npmjs.com, under the package's **Settings → Trusted
Publisher**, and has to match exactly (the fields are case-sensitive):

| Field | Value |
|---|---|
| Organization or user | `filipecarneiro` |
| Repository | `hugo-bootstrap-theme` |
| Workflow filename | `release.yml` |
| Environment | empty |
| Allowed actions | **npm publish** ticked, so the workflow can publish without a staged approval |

Three things keep it working:

- **Do not rename `release.yml`.** The filename is part of the link, and a
  rename fails at publish time with `ENEEDAUTH`.
- The workflow needs `id-token: write` and an npm of 11.5.1 or newer, which is
  why it runs on Node 24.
- `package.json` `repository.url` must keep pointing at this GitHub repository.

npm does not validate the link when it is saved, and a link cannot be edited,
only deleted and recreated. A new link must also complete one successful publish
within two days or it expires.

## Hugo version

The Hugo version CI builds with lives in **`.hugo-version`** at the repo root,
and both workflows read it. Change it there once — do not hardcode it in a
workflow.

That is the version the theme is *tested* against. The minimum version
consumers must run is separate, and lives in `min_version` in `theme.toml`;
raising it is a breaking change (see below).

## Choosing the bump

Judge it from the **consumer's** point of view:

| Change | Bump |
|---|---|
| Raising `min_version` in `theme.toml` | **major** |
| Removing or renaming a param, partial or layout | **major** |
| Changing default rendered markup in a breaking way | **major** |
| New optional feature, backwards compatible | minor |
| Bug fix, no API change | patch |

**A Hugo version requirement is a breaking change.** `min_version` in
`theme.toml` is Hugo Modules metadata — it means nothing to npm, where
consumers depend on `^x.y.z` ranges that promise backwards compatibility. A
site pinned to an older Hugo will fail to build if it silently receives the new
theme. This is why minor and major are deliberate: a breaking change must never
reach consumers as an automatic patch.

## What does not trigger a release

`**.md`, `.github/**` and `.vscode/**` are ignored, so documentation and
workflow edits do not cut a version. Note this also covers `exampleSite`
content, which *does* ship in the package — run the workflow manually if such a
change needs to reach npm.

## Releasing by hand

If the workflow is unavailable:

> Commands are one per line on purpose — the shell here is Windows PowerShell
> 5.1, which does **not** support `&&`.

```powershell
git checkout main
```
```powershell
git pull
```
```powershell
git status
```

The tree must be clean: **`npm publish` packs your working directory, not the
git commit.** Untracked or uncommitted files ship. Then check the payload —
npm has no `.npmignore` here, so it falls back to `.gitignore`, and **npm
versions are immutable**:

```powershell
npm pack --dry-run
```

Swap `patch` for `minor` or `major` as needed. The `-m` is not optional: npm's
default message is just the version number, so without it the release commit
lands on `main` carrying no `[skip ci]`, and `git push --follow-tags` then
triggers the workflow and cuts a *second* release on top of the one you are
making by hand. It also keeps the commit message identical to the workflow's.

```powershell
npm version patch -m "chore(release): %s [skip ci]"
```
```powershell
git push --follow-tags
```
```powershell
npm publish --access public --otp=<code>
```
```powershell
gh release create v<version> --title "<version>" --generate-notes
```

## Troubleshooting

**`E404` on publish** — usually *not* a missing package. For scoped packages npm
returns 404 rather than 401 for unauthenticated writes, so the endpoint cannot
be used to probe for private packages. Run `npm whoami`; if it errors, you are
simply logged out.

**`ENEEDAUTH` or `E404` in the workflow** — the trusted publisher link is the
first suspect, since there is no token to expire. Check that the link still
exists and that every field matches the table above, and that `release.yml` has
not been renamed. A `404` here is the same masked authentication failure
described above.

**`E403` mentioning 2FA** — the account needs two-factor authentication, or a
granular token with 2FA bypass, before it may publish.

**Version bumped but npm publish failed** — the tag and commit are already
pushed. Fix the cause and publish that version by hand; do not bump again.

**Errors that make no sense** — terminal output is a lossy summary. The debug
log named at the end of the failure has the raw status code and the registry's
own message, which is often the only place the real cause appears.
