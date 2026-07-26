# Releasing

Checklist for cutting a release of the theme to npm and GitHub.

> Commands are written one per line on purpose — the usual shell here is
> Windows PowerShell 5.1, which does **not** support `&&`.

## 1. Decide the version number

Follow semver, judged from the **consumer's** point of view:

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
site pinned to an older Hugo will fail to build if it silently receives the
new theme.

`npm run deploy` deliberately does **not** bump the version — auto-bumping is
what would ship a breaking change as a patch.

## 2. Land the version bump

Edit `version` in `package.json`, then open a PR like any other change and let
CI pass before merging. Everything you intend to publish must be on `main`
first.

## 3. Pre-flight

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
git commit.** Untracked or uncommitted files ship.

Now review exactly what will be published:

```powershell
npm pack --dry-run
```

Read the file list. npm has no `.npmignore` here, so it falls back to
`.gitignore` — anything not ignored gets packed. **npm versions are immutable**;
a mistake can only be corrected by burning the next version number.

## 4. Tag

```powershell
git tag v<version>
```
```powershell
git push origin v<version>
```

Use `-f` on both if the tag already exists and needs to move.

## 5. Publish to npm

```powershell
npm run deploy
```

which runs `npm publish --access public`. `--access public` is required
because the package is scoped.

Publishing requires 2FA. Either enable it on the account and pass a one-time
code:

```powershell
npm publish --access public --otp=<code>
```

or authenticate with a granular access token that has the 2FA-bypass option
enabled. Set the token with `npm config set` — never paste it into a shared
channel, and revoke it immediately if you do.

Verify:

```powershell
npm view @filipecarneiro/hugo-bootstrap-theme version
```

## 6. GitHub release

```powershell
gh release create v<version> --title "<version>" --notes "<summary>"
```

For a major, the notes should state the new minimum Hugo version, anything
removed, and point at the upgrade section in `README.md`.

`gh release create` creates the tag if it is missing, so it can silently
produce a tag pointing somewhere you did not intend. Tag explicitly in step 4.

## Troubleshooting

**`E404` on publish** — usually *not* a missing package. For scoped packages npm
returns 404 rather than 401 for unauthenticated writes, so that it cannot be
used to probe for private packages. Check `npm whoami` first; if it errors,
you are simply logged out.

**`E403` mentioning 2FA** — the account needs two-factor authentication, or a
granular token with 2FA bypass, before it may publish.

**Errors that make no sense** — the terminal output is a lossy summary. The
debug log named at the end of the failure has the raw status code and the
registry's own message, which is often the only place the real cause appears.
