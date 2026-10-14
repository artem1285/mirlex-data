import json
from pathlib import Path
index_path=Path("research/registry/master-index.json")
pending_path=Path("engine/operations/radar-index-recovery-trigger.json")
index=json.loads(index_path.read_text())
pending=json.loads(pending_path.read_text())["pending"]
seen={item["path"] for item in index["registries"]}
for item in pending:
    path=item["path"]
    if path in seen:
        continue
    card=json.loads(Path(path).read_text())
    if card["id"] != item["existing_id"]:
        raise ValueError("ID mismatch: "+path)
    index["registries"].append(item)
    seen.add(path)
index_path.write_text(json.dumps(index,ensure_ascii=False,indent=2)+"\n")
