#!/usr/bin/env python3
import json
import re

from bs4 import BeautifulSoup


def detect_targetting(notes: str) -> int:
    n = notes.lower()
    if re.search(r"(?:priority target|target priority)", n):
        return 1
    if re.search(r"(?:random target|target random)", n):
        return 2
    if re.search(r"(?:nearest target|target nearest)", n):
        return 3
    if "target" in n:
        return 4
    return 0


def normalize(col: str) -> str:
    # lower-case, strip non-alphanumerics
    return re.sub(r"\W+", "", col).lower()


# Load and parse the saved HTML dump
with open("test.html", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")

# Identify only the barrage tables by header presence
required = {"skillid", "weaponid", "bulletid", "damage", "notes"}
tables = []
for tbl in soup.select("#mw-content-text .wikitable"):
    hdrs = [th.get_text(strip=True) for th in tbl.find_all("tr")[0].find_all("th")]
    if required.issubset({normalize(h) for h in hdrs}):
        tables.append(tbl)

out = {}

for tbl in tables:
    # Build normalized column keys
    orig_cols = [th.get_text(strip=True) for th in tbl.find_all("tr")[0].find_all("th")]
    col_keys = [normalize(c) for c in orig_cols]
    last_seen = {key: None for key in col_keys}

    # Track grouping state per skill
    last_name = {}
    last_barrage = {}

    for row in tbl.find_all("tr")[1:]:
        cells = row.find_all("td")
        if not cells or all(not td.get_text(strip=True) for td in cells):
            continue

        # Extract text or None, then pad to header length
        texts = [td.get_text(strip=True) or None for td in cells]
        if len(texts) < len(col_keys):
            texts += [None] * (len(col_keys) - len(texts))

        # Inherit blank cells
        rowdict = {}
        for key, val in zip(col_keys, texts):
            if val is None:
                rowdict[key] = last_seen[key]
            else:
                rowdict[key] = val
                last_seen[key] = val

        # Guard: need numeric skillid & bulletid
        sid_raw = rowdict.get("skillid") or ""
        bullet_raw = rowdict.get("bulletid") or ""
        if not (sid_raw.isdigit() and bullet_raw.isdigit()):
            continue
        sid = int(sid_raw)
        sname = rowdict.get("skillname", "")

        # New barrage variant when skill name changes
        if sid not in last_name or last_name[sid] != sname:
            b = {"name": sname, "parts": []}
            out.setdefault(sid, []).append(b)
            last_name[sid] = sname
            last_barrage[sid] = b

        # Conversion helpers
        def to_int(v):
            return int(v) if v and str(v).isdigit() else None

        def to_float(v):
            try:
                return float(v)
            except:
                return None

        # Build part dict
        part = {
            "weapon_id": int(rowdict["weaponid"]),
            "bullet_id": int(rowdict["bulletid"]),
            "damage": int(rowdict["damage"]),
            "bullet_type": rowdict.get("bullettype"),
            "coeff": to_float(rowdict.get("coeff")),
            "scaling": to_float(rowdict.get("scaling")),
            "scaling_stat": rowdict.get("scalingstat"),
            "count": to_int(rowdict.get("bulletcount")) or 0,
            "notes": [
                n.strip() for n in (rowdict.get("notes") or "").split(",") if n.strip()
            ],
            "proc_percent": to_float(rowdict.get("proc")),
            "buff_id": to_int(rowdict.get("buffid")),
            "light_dmg": to_float(rowdict.get("lightdmg")) or 0,
            "med_dmg": to_float(rowdict.get("meddmg")) or 0,
            "heavy_dmg": to_float(rowdict.get("heavydmg")) or 0,
            "targetting": detect_targetting(rowdict.get("notes") or ""),
        }

        last_barrage[sid]["parts"].append(part)

# Write out to barrages3.json
with open("barrages3.json", "w", encoding="utf-8") as out_f:
    json.dump(out, out_f, ensure_ascii=False, indent=2)

print("Written", len(out), "skills to barrages3.json")
