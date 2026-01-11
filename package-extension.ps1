# KoalaSnap Extension Packaging Script
# 此脚本会自动打包扩展文件为 koalasnap.zip

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  KoalaSnap Extension Packaging Tool" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 设置输出文件名
$outputFile = "koalasnap.zip"

# 需要包含的文件和文件夹
$filesToInclude = @(
    "manifest.json",
    "background.js",
    "content.js",
    "popup",
    "icons"
)

# 检查必需文件是否存在
Write-Host "检查必需文件..." -ForegroundColor Yellow
$allFilesExist = $true

foreach ($file in $filesToInclude) {
    if (Test-Path $file) {
        Write-Host "  [OK] $file" -ForegroundColor Green
    }
    else {
        Write-Host "  [FAIL] $file (未找到)" -ForegroundColor Red
        $allFilesExist = $false
    }
}

if (-not $allFilesExist) {
    Write-Host ""
    Write-Host "错误：缺少必需文件，无法打包。" -ForegroundColor Red
    exit 1
}

# 删除旧的 zip 文件
if (Test-Path $outputFile) {
    Write-Host ""
    Write-Host "删除旧的打包文件..." -ForegroundColor Yellow
    Remove-Item $outputFile -Force
}

# 创建 zip 文件
Write-Host ""
Write-Host "正在打包扩展..." -ForegroundColor Yellow

try {
    Compress-Archive -Path $filesToInclude -DestinationPath $outputFile -Force
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  打包成功！" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "输出文件: $outputFile" -ForegroundColor Cyan
    
    $fileSize = (Get-Item $outputFile).Length
    $fileSizeKB = [math]::Round($fileSize / 1KB, 2)
    Write-Host "文件大小: $fileSizeKB KB" -ForegroundColor Cyan
    
    Write-Host ""
    Write-Host "下一步：" -ForegroundColor Yellow
    Write-Host "1. 访问 https://chrome.google.com/webstore/devconsole" -ForegroundColor White
    Write-Host "2. 点击 '新增项目'" -ForegroundColor White
    Write-Host "3. 上传 $outputFile" -ForegroundColor White
    Write-Host "4. 填写商店列表信息（参考 CHROME_STORE_SUBMISSION.md）" -ForegroundColor White
    Write-Host "5. 提交审核" -ForegroundColor White
    Write-Host ""
    
}
catch {
    Write-Host ""
    Write-Host "打包失败：$_" -ForegroundColor Red
    exit 1
}
