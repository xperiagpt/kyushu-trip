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
