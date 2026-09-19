#!/usr/bin/env bash
set -euo pipefail

# 使用說明
usage() {
  cat <<'EOF'
用法:
  ./upload.sh -u <UPLOAD_URL> -c <COOKIE> -r <ROOT_DIR> -i <ID 或 ID範圍>

參數:
  -u  上傳 API 位址，例如: https://.../backend/file/upload_image
  -c  Cookie 字串 (例如 session=...; _ga=...)
  -r  本機根資料夾 (其下應有 <ID>/ 與 <ID>/symbolList/)
  -i  要上傳的 ID，例如 6001 或 6001-6024

範例 (單一 ID):
  ./upload.sh \
    -u "https://rd3-168prod-imgcenter.rebirth.games/backend/file/upload_image" \
    -c "session=xxxx; _ga=xxxx" \
    -r "/Users/you/downloads" \
    -i 6001

範例 (範圍):
  ./upload.sh \
    -u "https://rd3-168prod-imgcenter.rebirth.games/backend/file/upload_image" \
    -c "session=xxxx; _ga=xxxx" \
    -r "/Users/you/downloads" \
    -i 6001-6024
EOF
}

UPLOAD_URL=""
COOKIE=""
ROOT_DIR=""
TARGET_ID_ARG=""

while getopts ":u:c:r:i:h" opt; do
  case "$opt" in
    u) UPLOAD_URL="$OPTARG" ;;
    c) COOKIE="$OPTARG" ;;
    r) ROOT_DIR="$OPTARG" ;;
    i) TARGET_ID_ARG="$OPTARG" ;;
    h) usage; exit 0 ;;
    :) echo "缺少參數: -$OPTARG" >&2; usage; exit 1 ;;
    \?) echo "未知參數: -$OPTARG" >&2; usage; exit 1 ;;
  esac
done

if [[ -z "$UPLOAD_URL" || -z "$COOKIE" || -z "$ROOT_DIR" || -z "$TARGET_ID_ARG" ]]; then
  echo "參數不完整" >&2
  usage
  exit 1
fi

# 解析 ID 或範圍
IDS=()
if [[ "$TARGET_ID_ARG" =~ ^[0-9]+-[0-9]+$ ]]; then
  IFS='-' read -r ID_START ID_END <<<"$TARGET_ID_ARG"
  if (( ID_START <= ID_END )); then
    for n in $(seq "$ID_START" "$ID_END"); do IDS+=("$n"); done
  else
    for n in $(seq "$ID_START" -1 "$ID_END"); do IDS+=("$n"); done
  fi
elif [[ "$TARGET_ID_ARG" =~ ^[0-9]+$ ]]; then
  IDS+=("$TARGET_ID_ARG")
else
  echo "-i 參數格式錯誤，請使用 6001 或 6001-6024" >&2
  exit 1
fi

# 取得副檔名以外的檔名
basename_no_ext() {
  local f="$1"
  local b
  b=$(basename -- "$f")
  echo "${b%.*}"
}

# 單檔上傳 (用 curl 模擬)，使用 GLOBAL CURRENT_ID
upload_file() {
  local file_path="$1"
  local api_path_suffix="$2"    # "" 或 "/symbolList"
  local file_name_no_ext
  file_name_no_ext=$(basename_no_ext "$file_path")

  echo "➡️  上傳: $file_path -> order-detail/common/$CURRENT_ID$api_path_suffix (file_name=$file_name_no_ext)"

  # 嘗試推斷 mime-type
  local mime_type
  if command -v file >/dev/null 2>&1; then
    mime_type=$(file -b --mime-type "$file_path" || echo "application/octet-stream")
  else
    mime_type="application/octet-stream"
  fi

  curl --location "$UPLOAD_URL" \
    --header "cookie: $COOKIE" \
    --header "Accept: */*" \
    --header "User-Agent: curl/8.1.2" \
    --form "file=@\"$file_path\";type=$mime_type" \
    --form "path=order-detail/common/$CURRENT_ID${api_path_suffix}" \
    --form "encrypt=false" \
    --form "file_name=$file_name_no_ext"
}

# 逐一處理每個 ID
shopt -s nullglob
for CURRENT_ID in "${IDS[@]}"; do
  ID_DIR="${ROOT_DIR%/}/$CURRENT_ID"
  echo "\n==== 🔧 開始處理 ID: $CURRENT_ID ===="

  if [[ ! -d "$ID_DIR" ]]; then
    echo "⚠️  資料夾不存在，略過: $ID_DIR"
    continue
  fi

  # 上傳主資料夾內的所有檔案 (非資料夾)
  declare -a MAIN_FILES=("$ID_DIR"/*)
  for f in "${MAIN_FILES[@]}"; do
    if [[ -f "$f" ]]; then
      upload_file "$f" ""
    fi
  done

  # 上傳 symbolList 子資料夾
  if [[ -d "$ID_DIR/symbolList" ]]; then
    declare -a SYMBOL_FILES=("$ID_DIR/symbolList"/*)
    for f in "${SYMBOL_FILES[@]}"; do
      if [[ -f "$f" ]]; then
        upload_file "$f" "/symbolList"
      fi
    done
  fi

done

echo "\n✅ 全部完成" 