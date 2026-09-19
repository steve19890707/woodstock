const axios = require("axios");
const fs = require("fs");
const path = require("path");

const ids = Array.from({ length: 2 }, (_, i) => (6025 + i).toString());

const baseUrl =
  "https://rd3-prod-imgcenter.guardians.one/backend/file/list?path=order-detail/common";
const downloadRoot = path.resolve(__dirname, "downloads");

const headers = {
  Cookie: `_hjSessionUser_2764697=eyJpZCI6IjQ3MGE1YTU5LWIwZmUtNTk2YS05NDFmLWU1MDc2MWMwYmJhMyIsImNyZWF0ZWQiOjE3MzAxODkzOTQwNjQsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VW6RXNGRE5=GS1.2.1733802144.2.1.1733802144.60.0.0; _ga_RQ33YEEQK7=GS1.1.1733802144.2.1.1733802192.12.0.0; _ga_2QZXC4B2GE=GS1.1.1733802144.2.1.1733802192.12.0.0; _ga_653VCFHVBB=GS1.1.1741663741.13.1.1741665160.48.0.0; session=5df42f9aa33efbe6f8e7e4f2f918b26d; _ga=GA1.2.140582427.1763607004; _ga_XM5PDK34F6=GS2.2.s1754468593$o31$g0$t1754468595$j58$l0$h0; _ga_RN8LP17C0W=GS2.1.s1754554485$o42$g0$t1754554485$j60$l0$h0`, // <- 這邊填你的 Cookie
};

const missingImageIDs = [];

// 建立根目錄
if (!fs.existsSync(downloadRoot)) {
  fs.mkdirSync(downloadRoot);
}

async function downloadImage(url, destPath) {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
      headers,
    });
    fs.writeFileSync(destPath, response.data);
    console.log(`✅ 下載完成: ${destPath}`);
  } catch (error) {
    console.error(`❌ 無法下載 ${url}:`, error.message);
  }
}

async function fetchAndDownload(apiUrl, destDir, id) {
  try {
    const res = await axios.get(apiUrl, { headers });
    const files = res.data?.result?.file || [];

    if (files.length === 0) {
      console.log(`⚠️  ${apiUrl} (ID ${id}) 沒有圖片`);
      missingImageIDs.push(`${id}::${apiUrl}`);
      return;
    }

    for (const file of files) {
      if (file.url) {
        const filename = path.basename(file.url.split("?")[0]);
        const fullPath = path.join(destDir, filename);
        await downloadImage(file.url, fullPath);
      }
    }
  } catch (err) {
    console.error(`❌ 取得 ${apiUrl} (ID ${id}) 發生錯誤:`, err.message);
    missingImageIDs.push(`${id}::${apiUrl}`);
  }
}

async function fetchAndDownloadImages() {
  for (const id of ids) {
    console.log(`🚀 處理 ID: ${id}`);

    const idDir = path.join(downloadRoot, id);
    if (!fs.existsSync(idDir)) fs.mkdirSync(idDir);

    // 第一個 API: order-detail/common/${id}/
    const apiUrlMain = `${baseUrl}/${id}/`;
    await fetchAndDownload(apiUrlMain, idDir, id);

    // 第二個 API: order-detail/common/${id}/symbolList/
    const apiUrlSymbol = `${baseUrl}/${id}/symbolList/`;
    const symbolListDir = path.join(idDir, "symbolList");
    if (!fs.existsSync(symbolListDir)) fs.mkdirSync(symbolListDir);
    await fetchAndDownload(apiUrlSymbol, symbolListDir, id);
  }

  // 最後輸出沒有圖片的 ID
  if (missingImageIDs.length > 0) {
    console.log("\n⚠️ 以下沒有圖片:");
    console.log(missingImageIDs.join("\n"));
  } else {
    console.log("\n🎉 所有 ID 都有圖片");
  }
}

fetchAndDownloadImages();
