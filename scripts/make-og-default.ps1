<#
.SYNOPSIS
  Renders public\images\og\og-default.png (1200x675 social preview card).

.DESCRIPTION
  The default Open Graph image carries the brand: the deep-navy gradient and dot
  grid are drawn with GDI+, while the FinanceQuizPulse mark itself is drawn from
  public\images\brand\logo-512.png — the very same art the header renders — so
  the card can never drift away from the logo used in the site chrome.

  Run it again whenever the brand name, tagline, palette or logo changes:

      powershell -ExecutionPolicy Bypass -File ./scripts/make-og-default.ps1
#>

Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = 'Stop'

$root = Resolve-Path (Join-Path $PSScriptRoot '..')
$outFile = Join-Path $root 'public\images\og\og-default.png'
$logoPng = Join-Path $root 'public\images\brand\logo-512.png'

$brandName  = 'Smart'
$brandTail  = 'FinanceQuiz'
$tagline    = 'Clear, practical money education'

$w = 1200
$h = 675

if (-not (Test-Path $logoPng)) { throw "Brand mark not found at $logoPng" }

# --- Draw the card ------------------------------------------------------------
$bmp = New-Object System.Drawing.Bitmap($w, $h)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# Background: brand gradient + dot grid + soft light circles.
$bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  (New-Object System.Drawing.Rectangle(0, 0, $w, $h)),
  [System.Drawing.Color]::FromArgb(13, 27, 54),
  [System.Drawing.Color]::FromArgb(5, 11, 23),
  [System.Drawing.Drawing2D.LinearGradientMode]::ForwardDiagonal
)
$g.FillRectangle($bgBrush, 0, 0, $w, $h)

$dotBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(46, 147, 197, 253))
for ($dy = 0; $dy -lt $h; $dy += 28) {
  for ($dx = 0; $dx -lt $w; $dx += 28) {
    $g.FillEllipse($dotBrush, $dx, $dy, 3.2, 3.2)
  }
}

$g.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(30, 147, 197, 253))), 820, -110, 440, 440)
$g.FillEllipse((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(26, 99, 102, 241))), -120, 340, 520, 520)

# Logo. The navy tile barely separates from the navy card, so a soft pale halo is
# painted behind it (radial falloff, brand cyan tint) to lift the mark off the
# background without adding a solid plate of its own.
$markSize = 168
$markX = ($w - $markSize) / 2
$markY = 139
$haloPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$haloPath.AddEllipse(($markX - 58), ($markY - 44), ($markSize + 116), ($markSize + 116))
$haloBrush = New-Object System.Drawing.Drawing2D.PathGradientBrush($haloPath)
$haloBrush.CenterColor = [System.Drawing.Color]::FromArgb(64, 147, 197, 253)
$haloBrush.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 147, 197, 253))
$g.FillPath($haloBrush, $haloPath)
$haloBrush.Dispose()
$haloPath.Dispose()

$logo = [System.Drawing.Image]::FromFile($logoPng)
$g.DrawImage($logo, [single]$markX, [single]$markY, [single]$markSize, [single]$markSize)
$logo.Dispose()

# Wordmark: "Smart" in white, "FinanceQuiz" in the accent cyan — joined, no space.
$titleFont = New-Object System.Drawing.Font('Segoe UI', 92, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$nameSize = $g.MeasureString($brandName, $titleFont)
$tailSize = $g.MeasureString($brandTail, $titleFont)
$fullNameSize = $g.MeasureString($brandName + $brandTail, $titleFont)
# MeasureString adds one trailing-space advance; removing it keeps the wordmark joined.
$trailing = $nameSize.Width + $tailSize.Width - $fullNameSize.Width
$titleY = 340
$titleX = ($w - ($fullNameSize.Width - $trailing)) / 2

$g.DrawString($brandName, $titleFont, (New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)), [single]$titleX, [single]$titleY)
$g.DrawString($brandTail, $titleFont, (New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(34, 211, 238))), [single]($titleX + $fullNameSize.Width - $tailSize.Width), [single]$titleY)

$tagFont = New-Object System.Drawing.Font('Segoe UI', 34, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$tagBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(214, 201, 215, 232))
$tagSize = $g.MeasureString($tagline, $tagFont)
$g.DrawString($tagline, $tagFont, $tagBrush, [single](($w - $tagSize.Width) / 2 + 8), [single]($titleY + $nameSize.Height + 6))

$g.Dispose()
$bmp.Save($outFile, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

Write-Host "Wrote $((Resolve-Path $outFile))" -ForegroundColor Green
