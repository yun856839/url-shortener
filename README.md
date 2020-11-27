
# 專案畫面
![image](https://github.com/yun856839/url-shortener/blob/master/url-shortener.jpg)

# url-shortener
* 供使用者產生短網址

# 功能描述 (features)
* 首頁畫面上有一個表單，使用者可以在表單輸入原始網址，輸出格式為 5 碼英數組合短網址
* 在伺服器啟動期間，使用者可以在瀏覽器的網址列，輸入你提供的短網址，瀏覽器就會導向原本的網站
* 使用者可以按 Copy 來複製縮短後的網址

# 環境建置與需求 (prerequisites)
* Node.js: 13.5.0
* Express: 4.17.1
* Express-Handlebars: 5.2.0
* body-parser: 1.19.0
* mongoose": 5.10.16

# 安裝與執行步驟(installation and execution)
  1. 打開終端機(Terminal)，Clone 此專案至本地電腦
  ```
  git clone https://github.com/yun856839/url-shortener.git
  ```

  2. 開啟終端機，進入專案資料夾
  ```
  cd url-shortener
  ```

  3. 安裝 npm 套件
  ```
  npm install
  ```  

  4. 執行 server
  ```
  npm run dev
  ```

  5. 開啟任一瀏覽器瀏覽器，輸入網址
  ```
  http://localhost:3000
  ```
