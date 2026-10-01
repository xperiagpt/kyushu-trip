# 九州 RWD 行程網站

適用 GitHub Pages：main 分支、/(root)，不需要自訂 Actions。

## 第一次發布

1. 建立公開 GitHub 儲存庫 kyushu-trip，勾選建立 README。
2. 使用 Code → Add file → Upload files，上傳本目錄內的檔案。不要上傳 ZIP，也不要多包一層 kyushu-pages 目錄。
3. Settings → Pages → Source：Deploy from a branch；Branch：main；Folder：/(root)；Save。
4. 等待發布，在同一 Pages 設定頁按 Visit site。Actions 可看發布狀態。

網站與此公開儲存庫中的全部內容都可被他人看到。完整私人主檔另存。

## 供 ChatGPT 在 Windows 後續同步

先安裝 Git 與 GitHub CLI。使用 Windows PowerShell：

```powershell
winget install --id Git.Git -e --source winget
winget install --id GitHub.cli -e --source winget
```

關閉並重開 PowerShell：

```powershell
git --version
gh --version
gh auth login --hostname github.com --git-protocol https --web
gh auth setup-git --hostname github.com
gh auth status
```

在瀏覽器完成 GitHub 登入、一次性代碼與授權；密碼與 token 不需要交給 ChatGPT。
將下列 OWNER 改為 GitHub 帳號（不要輸入尖括號）：

```powershell
New-Item -ItemType Directory -Path C:\workspace -Force
gh repo clone OWNER/kyushu-trip C:\workspace\kyushu-trip
```

若 C:\workspace\kyushu-trip 已存在，先確認它是否是同一儲存庫；不要刪除或覆蓋。
在 ChatGPT Windows 工作模式選用本機環境，讓目前工作可讀寫 C:\workspace\kyushu-trip。
提供儲存庫網址與路徑，請助理查驗登入、遠端與寫入權限，再完成首次同步測試。
瀏覽器雲端環境或其他電腦不會自動繼承這台 Windows 的登入。

## 修改網站資料

網站採旅行手帳視覺；頁首路線可直接跳至福岡、熊本與返福岡段。
完整表格的「顯示設定」可展開字體、尺寸鎖定及高度控制；平板與手機預設單日卡片。
設計與驗證範圍見 [QUALITY.md](QUALITY.md)，自我檢查不等於獎項認證。

桌面表格預設一次顯示 7 天、字體 16；鎖定時列高依內容自動展開，手機預設單日卡片。
「預設顯示天數」可選 4–12 天，其餘日期可橫向捲動。欄寬不可縮至小於一次容納 12 天的寬度。
手機完整表格預設選「自動」，依寬度展示 1–2 天，其餘日期橫向捲動；亦可手動選 1–12 天。手機停用頁面縮放，字體仍可用工具列調整。
首次使用為黑底，☀️ 切換白底、🌙 切換黑底；主題及手動選擇的字體大小會記在目前裝置。
表格尺寸預設鎖定。按「尺寸已鎖定」解除後，可拖曳日期標題右側調整個別欄寬，
解除鎖定後仍維持自動列高，直到手動拖曳任一時段左側標題下緣或列高滑桿，
才切回同時調整全部時段列高（初始設定 400）。重新鎖定會恢復自動列高。
拖曳控制支援鍵盤方向鍵，重新鎖定後滑桿與拖曳控制都不可調整。
手動列高下較長行程可在格內捲動，捲到底後繼續捲動外層表格；「重設表格」恢復 7 天、字體 16 與自動列高。
大螢幕表格預設為瀏覽器高度的 82%，至少 640；平板維持可用表格高度的兩倍。最多展開完整表格，手動調整後保留指定高度。
手機完整表格收起大型頁首與路線介紹，常駐卡片切換、開始日與顯示設定；天數及尺寸控制放在設定中。表格自動填滿剩餘螢幕高度，兩個捲動條可直接操作，手機此模式不提供手動表格高度控制。
工具列最左為顯示模式，字體調整位於表格高度之前，滑桿旁不顯示數字。
開始日可選 11/03–11/14，表格從指定日期展示。剩餘行程不足顯示天數時以灰底空白補齊，不新增實際行程。
底部高度控制可直接拖曳，最多展開完整表格；也支援上下方向鍵及 Home／End。
常駐橫向捲動條支援拖曳、點擊及方向鍵，即使表格拉高仍可在視窗底部操作。
交通行程的地點間顯示箭頭；一日遊地點不加箭頭。完整表格中每個地點獨立換行。

ChatGPT 更新完整主檔與公開 itinerary.json 後執行：

```powershell
node build.mjs
```

再檢查變更、提交、推送 main。GitHub Pages 會發布新內容；網站重新整理後讀取新版本。
build.mjs 驗證日期、合併區塊、住宿及 HTTPS 連結；也產生 itinerary.js 與 public-itinerary.md。
只修改 ChatGPT 主檔不會自動通知 GitHub；必須在有檔案與登入權限的工作中執行同步。

## 建議貼到專案指示

在我新增、修改或刪除九州行程後，請更新最新九州專案 MD，並同步到我指定的 GitHub 儲存庫 main 分支；只發布可公開行程，不包含私人預算、訂單、房號與入住密碼。同步成功後回報主檔版本、GitHub 提交及網站發布狀態；無法存取本機或 GitHub 時明確告知未同步。不得 force push 或覆蓋其他人的修改。

## 常見問題

- 網站 404：確認根目錄有 index.html、Pages 選 main/(root)，並等待 Actions 完成。
- 網站看不到更新：看遠端最新提交與 Actions 結果，再用 Ctrl+F5 或無痕視窗。
- gh 找不到：重開 PowerShell；可從 https://cli.github.com/ 下載官方 Windows 安裝程式。
- Git 找不到：可从 https://git-scm.com/downloads/win 下載官方安裝程式。
- 權限失敗：先確認本機 gh auth status；不要把任何 token 印出或貼給 ChatGPT。
表格使用自訂左右與上下捲動條，隱藏原生捲動條；捲動條支援拖曳、點擊、方向鍵與 Home／End。主題按鈕左側的四角箭頭可切換表格全螢幕，全螢幕保留預設顯示天數與開始日選單；再按一次或 Escape 恢復原畫面。
