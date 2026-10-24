# Konversi aset sumber -> public/. Jalankan ulang kapan saja: .\scripts\assets.ps1
$ErrorActionPreference = 'Continue'
$root = Split-Path $PSScriptRoot -Parent
$img = "$root\public\img"; $vid = "$root\public\video"
New-Item -ItemType Directory -Force $img, $vid | Out-Null
$P = 'D:\Code\opencode\diandra\pribadi'
$W = "$P\screenshot-website"; $A = "$P\screenshot-aplikasi"; $G = "$P\dari-komputer-lain\screenshot"

$shots = [ordered]@{
  # web
  'sgn'            = "$W\01-sgn.png"
  'perpus-sgn'     = "$W\03-perpustakaan-sgn.png"
  'keuangan-sgn'   = "$W\04-keuangan-sgn.png"
  'nvm'            = "$W\05-nusavisionmedia.png"
  'nvmedia'        = "$W\06-nvmedia.png"
  'iamta'          = "$W\07-iamta.png"
  'iamta-3d'       = "$W\09-iamta-3d.png"
  'apbp'           = "$W\10-apbp.png"
  'cbt'            = "$W\11-cbt-poltekbang.png"
  'konsultasi-ta'  = "$W\12-konsultasi-ta.png"
  'lulus-ta'       = "$W\13-lulus-ta.png"
  'al-habiibah'    = "$W\15-al-habiibah.png"
  'bina-amanah'    = "$W\16-bina-amanah.png"
  'sevel'          = "$W\21-sevel-stamina.png"
  'villa'          = "$W\23-masterpiece-villa.png"
  'nafisa'         = "$W\24-nafisa-spa.png"
  'pos-smkn10'     = "$W\25-pos-smkn10.png"
  # app
  'nusacut'        = "$A\nusacut.png"
  'retailpos'      = "$A\retailpos.png"
  'smartlib'       = "$A\smartlib-ai.png"
  'calistung'      = "$A\calistung.png"
  'yolo'           = "$A\projectyoloai_blur.png"
  'property'       = "$A\smartglobal-property.png"
  'todolist'       = "$A\todolist-csgn.png"
  'penerbit'       = "$A\penerbit-buku-nusantara.png"
  'titik-baca'     = "$A\titik-baca.png"
  # game
  'glass-tetris'   = "$G\com.nusavisionmedia.glasstetris.png"
  'brick-tetris'   = "$G\com.nusavisionmedia.bricktetris.png"
  'jinn-chase'     = "$G\com.nusavisionmedia.jinnchase.png"
  'momentum'       = "$G\com.nusavisionmedia.momentum.png"
  'serangan-fajar' = "$G\com.nusavisionmedia.seranganfajar1947.png"
  'balung-wesi'    = "$G\com.nusavision.gatotkaca.png"
  'sky-blitz'      = 'D:\Code\opencode\diandra\game_pesawat\playstore-assets\screenshot-1.png'
  'blockdown'      = 'D:\Code\opencode\block-down\undefined\04-game-main.png'
  # ui/ux
  'cetak-emas'     = 'D:\Code\opencode\diandra\web_cetak-varian-emas\presentasi-varian\emas\tema-utama\beranda-desktop-layar.png'
  'cetak-monokrom' = 'D:\Code\opencode\diandra\web_cetak-varian-monokrom\presentasi-varian\monokrom\tema-utama\beranda-desktop-layar.png'
  'cetak-pink'     = 'D:\Code\opencode\diandra\web_cetak-varian-pink\presentasi-varian\pink\tema-utama\beranda-desktop-layar.png'
  'blockdown-menu' = 'D:\Code\opencode\block-down\undefined\01-menu.png'
  'nike'           = 'D:\Code\opencode\landing-nike\img\air-ship.jpg'
}

# Tangkapan layar situs live yang tidak punya screenshot lokal.
$browser = "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
$live = @{ 'pintar-calistung' = 'https://pintar-calistung-orpin.vercel.app/'; 'nike-live' = 'https://nike-website-bay.vercel.app' }
foreach ($k in $live.Keys) {
  $out = "$root\media-src\$k.png"
  if (-not (Test-Path $out)) {
    & $browser --headless=new --disable-gpu --hide-scrollbars --window-size=1440,900 --virtual-time-budget=6000 "--screenshot=$out" $live[$k] 2>$null | Out-Null
  }
  if (Test-Path $out) { $shots[$k] = $out }
}

foreach ($k in $shots.Keys) {
  $src = $shots[$k]
  if (-not (Test-Path -LiteralPath $src)) { Write-Warning "hilang: $k ($src)"; continue }
  ffmpeg -v error -y -i $src -vf "scale='min(1600,iw)':'min(1600,ih)':force_original_aspect_ratio=decrease" -c:v libwebp -quality 78 "$img\$k.webp"
}

# Foto profil
$portrait = "$root\media-src\portrait.png"
ffmpeg -v error -y -i $portrait -vf 'scale=640:-2' -c:v libwebp -quality 82 "$img\portrait-640.webp"
ffmpeg -v error -y -i $portrait -c:v libwebp -quality 82 "$img\portrait-1120.webp"
ffmpeg -v error -y -i $portrait -vf 'scale=-2:630,pad=1200:630:(ow-iw)/2:0:0xF2F2EE' -q:v 3 "$root\public\og.jpg"

# Video: preview 8 dtk tanpa suara dari 40% durasi + poster
$videos = 'xploration', 'good-day', 'pelindo', 'sariayu', 'smekten-bersholawat'
foreach ($v in $videos) {
  $src = "$root\media-src\$v.mp4"
  $dur = [double](ffprobe -v error -show_entries format=duration -of csv=p=0 $src)
  $ss = [math]::Floor($dur * 0.4)
  ffmpeg -v error -y -ss $ss -t 8 -i $src -an -vf 'scale=1280:-2,fps=24' -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p -movflags +faststart "$vid\$v.mp4"
  ffmpeg -v error -y -ss ($ss + 2) -i $src -frames:v 1 -vf 'scale=1280:-2' -c:v libwebp -quality 75 "$vid\$v.webp"
}

# Showreel: 2 dtk dari tiap preview
$in = @(); $f = ''
for ($i = 0; $i -lt $videos.Count; $i++) { $in += '-i', "$vid\$($videos[$i]).mp4"; $f += "[$($i):v]trim=1:3,setpts=PTS-STARTPTS[v$i];" }
$f += (0..($videos.Count - 1) | ForEach-Object { "[v$_]" }) -join ''
$f += "concat=n=$($videos.Count):v=1:a=0[out]"
ffmpeg -v error -y @in -filter_complex $f -map '[out]' -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p -movflags +faststart "$vid\showreel.mp4"
ffmpeg -v error -y -ss 1 -i "$vid\showreel.mp4" -frames:v 1 -c:v libwebp -quality 75 "$vid\showreel.webp"

Get-ChildItem $img, $vid | Select-Object Name, @{n = 'KB'; e = { [math]::Round($_.Length / 1KB) } } | Format-Table -AutoSize
