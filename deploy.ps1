# Deploy to GitHub Pages
# Run from the project root after logging in with: gh auth login

$ErrorActionPreference = "Stop"

$repoName = "tv-stations-map"

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Error "GitHub CLI (gh) is required. Install with: winget install GitHub.cli"
}

$authStatus = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Not logged in to GitHub. Run: gh auth login"
    exit 1
}

$remotes = git remote 2>$null
if ($remotes -notcontains "origin") {
    Write-Host "Creating public repo '$repoName' and pushing..."
    gh repo create $repoName --public --source=. --remote=origin --push
} else {
    Write-Host "Pushing to origin..."
    git push -u origin main
}

Write-Host "Enabling GitHub Pages..."
gh api repos/{owner}/$repoName/pages -X POST -f "build_type=legacy" -f "source[branch]=main" -f "source[path]=/" 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Pages may already be enabled. Check: https://github.com/$(gh api user -q .login)/$repoName/settings/pages"
} else {
    $user = gh api user -q .login
    Write-Host "Done! Site will be live at: https://$user.github.io/$repoName/"
}
