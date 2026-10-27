<#
.SYNOPSIS
  Downloads the 14 article photographs into public\images\photos\.

.DESCRIPTION
  FinanceQuizPulse article images are real photographs used under the Unsplash
  Licence: free for commercial use, no attribution required
  (https://unsplash.com/license). Copyright stays with each photographer, so the
  Terms page deliberately does not describe photographs as FinanceQuizPulse work.

  Files are self-hosted rather than hot-linked, so a removed or renamed upstream
  file can never break the live site.

  This script is idempotent: an existing valid file is skipped, so re-running it
  only fetches what is missing.

.PARAMETER Force
  Re-download every photo even if a valid copy already exists.

.PARAMETER PicsumFallback
  For any photo whose Unsplash id no longer resolves, fetch a generic real
  photograph from picsum.photos instead. Keeps the site photographic, but the
  picture will not match the article topic, so use it only as a last resort.

.EXAMPLE
  npm run photos
  powershell -ExecutionPolicy Bypass -File .\scripts\fetch-photos.ps1 -Force
#>
[CmdletBinding()]
param(
  [switch]$Force,
  [switch]$PicsumFallback
)

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$dest = Join-Path $root 'public\images\photos'

# slug => Unsplash file id. This table is the single source of truth; src/data
# and src/config never name a third-party image URL themselves.
$photos = [ordered]@{
  'debt-snowball-vs-avalanche'              = 'photo-1753955900090-d252808f350d'
  'index-funds-boring-ownership'            = 'photo-1611974789855-9c2a0a7236a3'
  'first-paycheck-money-guide'              = 'photo-1604594849809-dfedbc827105'
  'insurance-need-vs-sell'                  = 'photo-1648221350871-e3ae3c8d0f58'
  'tax-advantaged-accounts-missing'         = 'photo-1634474588707-de99f09285c0'
  'rent-vs-buy-the-math'                    = 'photo-1560518883-ce09059eeffa'
  'building-credit-from-zero'               = 'photo-1601597111158-2fceff292cdc'
  'real-cost-of-running-a-car'              = 'photo-1503376780353-7e6692767b70'
  'fixed-deposits-vs-bonds'                 = 'photo-1501167786227-4cba60f6d58f'
  'reading-a-payslip'                       = 'photo-1763872867598-b1b5f769d7e3'
  'financial-goals-that-survive'            = 'photo-1646931335361-e3c46150b11a'
  'when-to-break-money-rules'               = 'photo-1544819667-9bfc1de23d4e' 
  'net-worth-the-only-number'               = 'photo-1542744173-05336fcc7ad4'
  'splitting-finances-as-a-couple'          = 'photo-1758523418820-a492bf647c63'
}

New-Item -ItemType Directory -Force -Path $dest | Out-Null

# A real 1200px JPEG is tens of kilobytes; anything smaller is an error page
# saved with a .jpg name, which would render as a broken image.
function Test-ValidJpeg([string]$path) {
  if (-not (Test-Path $path)) { return $false }
  if ((Get-Item $path).Length -lt 20KB) { return $false }
  $magic = Get-Content -Path $path -Encoding Byte -TotalCount 2 -ErrorAction SilentlyContinue
  return ($magic.Count -eq 2 -and $magic[0] -eq 0xFF -and $magic[1] -eq 0xD8)
}

$ok = 0; $skipped = 0; $failed = @()

foreach ($slug in $photos.Keys) {
  $id = $photos[$slug]
  $out = Join-Path $dest "$slug.jpg"

  if (-not $Force -and (Test-ValidJpeg $out)) {
    Write-Host "SKIP  $slug (already present)" -ForegroundColor DarkGray
    $skipped++
    continue
  }

  $url = "https://images.unsplash.com/$id?fm=jpg&q=80&w=1200&h=675&fit=crop"

  try {
    Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing -TimeoutSec 60
  } catch {
    Write-Host "FAIL  $slug  ($($_.Exception.Message))" -ForegroundColor Red
    Remove-Item $out -ErrorAction SilentlyContinue
  }

  if (-not (Test-ValidJpeg $out) -and $PicsumFallback) {
    try {
      Invoke-WebRequest -Uri "https://picsum.photos/seed/$slug/1200/675" `
        -OutFile $out -UseBasicParsing -TimeoutSec 60
      Write-Host "WARN  $slug used a picsum.photos placeholder - not topic relevant" -ForegroundColor Yellow
    } catch {
      Remove-Item $out -ErrorAction SilentlyContinue
    }
  }

  if (Test-ValidJpeg $out) {
    Write-Host "OK    $slug  <-  unsplash/$id" -ForegroundColor Green
    $ok++
  } else {
    $failed += $slug
  }
}

Write-Host ''
Write-Host "Downloaded: $ok   Skipped: $skipped   Missing: $($failed.Count)" -ForegroundColor Cyan

if ($failed.Count -gt 0) {
  Write-Host 'These articles have no photo yet. Pick any free image on unsplash.com and' -ForegroundColor Yellow
  Write-Host "save it as public\images\photos\<slug>.jpg, or re-run with -PicsumFallback:" -ForegroundColor Yellow
  $failed | ForEach-Object { Write-Host "  $_" -ForegroundColor Yellow }
  Write-Host 'Until then each article shows its own illustration as a fallback.' -ForegroundColor Yellow
  exit 1
}

Write-Host 'All article photos are in place.' -ForegroundColor Green
