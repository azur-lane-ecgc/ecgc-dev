local data = mw.loadData("Module:ShipBarrage/data")
local data2 = mw.loadData("Module:ShipBarrage/data2")
local p = {}

local ammoNames = {
    [0] = "Unknown",
    [1] = "Normal",
    [2] = "AP",
    [3] = "HE",
    [4] = "Torpedo",
    [5] = "AA",
    [6] = "Bomb",
    [7] = "SAP",
    [8] = "Missile",
    [100] = "Shrapnel",
    [101] = "SHS",
}
local ammoColors = {
    Unknown  = "Gainsboro",
    Normal   = "PaleGoldenrod",
    AP       = "PowderBlue",
    HE       = "LightSalmon",
    Torpedo  = "LightSkyBlue",
    AA       = "MistyRose",
    Bomb     = "PaleTurquoise",
    SAP      = "LightPink",
    Missile  = "Azure",
    Shrapnel = "Lavender",
    SHS      = "LightSteelBlue",
}
local aimNames = { [-1] = "Unknown", [0] = "", [1] = "Priority", [2] = "Random", [3] = "Nearest", [4] = "Special" }

function p.shipBarrage(frame)
    local args = frame.args or {}
    local filter = args and args.filter
    local aim_type = args and args.aim_type
    local locCol = tonumber(args.locCol) == 1
    local keys = {}
    for key in string.gmatch(args.list or "", "[^,]+") do
        table.insert(keys, mw.text.trim(key))
    end

    local cols = {}

    -- build the base cols
    if locCol then
        local label = (filter == "equip") and "Equip(s)" or "Ship(s)"
        cols = {
            "Skill", label, "Stat", "Ammo", "DMG", "Count",
            "Coef", "Light", "Medium", "Heavy", "Aim", "Notes", "Effect"
        }
    else
        cols = {
            "Skill", "Stat", "Ammo", "DMG", "Count",
            "Coef", "Light", "Medium", "Heavy", "Aim", "Notes", "Effect"
        }
    end

    if not aim_type then
        for i = #cols, 1, -1 do
            if cols[i] == "Aim" then
                table.remove(cols, i)
            end
        end
    end


    local html = mw.html.create("table")
        :addClass("wikitable")
        :addClass("sortable")
        :addClass("mw-collapsible")
        :addClass("barrageTable")
        :addClass("navigation-not-searchable")


    -- load styles
    local f = mw.getCurrentFrame()
    local styleTag
    if f.extensionTag then
        styleTag = f:extensionTag('templatestyles', '', {
            src = 'Module:ShipBarrage/styles.css'
        })
    else
        styleTag = '<templatestyles src="Module:ShipBarrage/styles.css" />'
    end

    html:wikitext(styleTag)

    -- header
    do
        local header = html:tag("tr"):addClass("barrageHeader")
        for _, title in ipairs(cols) do
            local th = header:tag("th")
            if title == "Icon" or title == "Aim" or title == "Notes" or title == "Effect" then
                th:addClass("unsortable")
            end
            th:wikitext(title):done()
        end
        header:done()
    end

    for _, key in ipairs(keys) do
        local entry = (filter == "equip" and data2 or data)[key]
        if entry then
            local numKey    = tonumber(key)
            local iconKey   = numKey and (numKey - (numKey % 10)) or key
            local ships     = {}
            local shipLinks = {}

            if locCol then
                ships = entry.ships or entry.equips or {}
                for _, s in ipairs(ships) do table.insert(shipLinks, "[[" .. s .. "]]") end
            end

            for _, barrage in ipairs(entry.barrages or {}) do
                local parts = barrage.parts or {}
                local totalRows = 0
                for _ in pairs(parts) do totalRows = totalRows + 1 end

                for i, part in ipairs(parts) do
                    local row = html:tag("tr"):addClass("barrageRow")
                    if i == 1 then
                        -- Skill Name
                        row:tag("td")
                            :addClass("barrageTitle")
                            :attr("rowspan", totalRows)
                            :wikitext(barrage.name or "")
                            :done()

                        -- Ship Name
                        if locCol then
                            row:tag("td")
                                :addClass("barrageTitle")
                                :attr("rowspan", totalRows)
                                :wikitext(table.concat(shipLinks, ", "))
                                :done()
                        end
                    end

                    -- Stat
                    row:tag("td"):wikitext(string.upper(part.stat or "")):done()

                    -- Ammo + modifiers
                    local aName = ammoNames[part.ammo] or "Unknown"
                    local modList = {}
                    for _, m in ipairs(part.armor_mod or {}) do
                        table.insert(modList, tostring(math.floor((m or 0) * 100 + 0.5)))
                    end
                    local modsText = table.concat(modList, "/")
                    local amt = aName .. (modsText ~= "" and ("<br />" .. modsText) or "")
                    row:tag("td")
                        :css("background-color", ammoColors[aName] or "")
                        :wikitext(amt)
                        :done()

                    -- Raw values
                    row:tag("td"):wikitext(tostring(part.damage or "")):done()
                    row:tag("td"):wikitext(tostring(part.count or "")):done()
                    row:tag("td"):wikitext(tostring(part.coefficient or "")):done()

                    -- Computed Light/Med/Heavy
                    local dmg = tonumber(part.damage) or 0
                    local cnt = tonumber(part.count) or 0
                    local coef = tonumber(part.coefficient) or 1
                    local ratio = tonumber(part.ratio) or 1
                    local mlist = part.armor_mod or { 1, 1, 1 }
                    local critMult = part.is_critical and 1.5 or 1
                    local L = dmg * cnt * coef * (mlist[1] or 1) * ratio * critMult
                    local M = dmg * cnt * coef * (mlist[2] or 1) * ratio * critMult
                    local H = dmg * cnt * coef * (mlist[3] or 1) * ratio * critMult
                    row:tag("td"):wikitext("'''" .. string.format("%.1f", L) .. "'''"):done()
                    row:tag("td"):wikitext("'''" .. string.format("%.1f", M) .. "'''"):done()
                    row:tag("td"):wikitext("'''" .. string.format("%.1f", H) .. "'''"):done()

                    -- Aim
                    if aim_type then
                        row:tag("td"):wikitext(aimNames[part.aim_type] or ""):done()
                    end

                    -- Notes
                    local notesList = {}

                    if part.shrapnel then table.insert(notesList, "Shrapnel") end
                    if part.ignore_shield then table.insert(notesList, "Ignores Shield") end
                    if part.pierce and part.pierce > 0 then
                        table.insert(notesList, "Pierce " .. part.pierce)
                    end
                    if part.is_air then table.insert(notesList, "Airborne") end
                    if part.airdrop then table.insert(notesList, "Airdropped") end

                    if part.notes then
                        for _, custom in pairs(part.notes) do
                            table.insert(notesList, custom)
                        end
                    end

                    local noteTxt = ""
                    if #notesList > 0 then
                        noteTxt = "<p>" .. table.concat(notesList, ", ") .. "</p>"
                    end

                    row:tag("td")
                        :wikitext(noteTxt)
                        :done()

                    -- Effect
                    local effectText = ""
                    local chance = part.buff_chance and math.floor(part.buff_chance * 100 + 0.5)

                    local buffList = {}
                    for _, b in pairs(part.buffs or {}) do
                        table.insert(buffList, b)
                    end

                    local buffText = ""
                    if #buffList > 0 then
                        buffText = table.concat(buffList, ". ") .. "."
                    end

                    if chance then
                        effectText = tostring(chance) .. "%"
                    end

                    if buffText ~= "" then
                        if effectText ~= "" then
                            effectText = effectText .. ": " .. buffText
                        else
                            effectText = buffText
                        end
                    end

                    row:tag("td")
                        :wikitext(effectText)
                        :done()

                    row:done()
                end
            end
        end
    end

    return tostring(html)
end

function p.list(frame)
    local args   = frame.args or {}
    local mode   = args.filter and mw.text.trim(args.filter):lower()
    local locCol = tonumber(args.locCol) == 1

    local skills = {}
    for key, entry in pairs(data) do
        local name = entry.barrages[1] and entry.barrages[1].name or ""
        table.insert(skills, { id = key, name = name })
    end

    local skills2 = {}
    for key, entry in pairs(data2) do
        local name = entry.barrages[1] and entry.barrages[1].name or ""
        table.insert(skills2, { id = key, name = name })
    end

    table.sort(skills, function(a, b) return a.name < b.name end)

    local filtered = {}

    if mode == "equip" then
        for _, s in ipairs(skills2) do
            table.insert(filtered, s.id)
        end
    else
        for _, s in ipairs(skills) do
            if not mode then
                table.insert(filtered, s.id)
            elseif mode == "aoa" and s.name:find(" II") then
                table.insert(filtered, s.id)
            elseif mode == "noaoa" and not s.name:find(" II") then
                table.insert(filtered, s.id)
            end
        end
    end

    local fakeFrame = {
        args = {
            list   = table.concat(filtered, ","),
            locCol = locCol and 1 or 0,
            filter = mode
        }
    }
    return p.shipBarrage(fakeFrame)
end

return p
