let metal_ores_drop_dust = (id, crushedId, dustId) => {
    return {
    "type": "minecraft:block",
    "pools": [
        {
            "rolls": 1,
            "entries": [
                {
                    "type": "minecraft:alternatives",
                    "children": [
                        {
                            "type": "minecraft:item",
                            "name": dustId,
                            "functions": [
                                {
                                    "function": "minecraft:set_count",
                                    "count": 9
                                }
                            ],
                            "conditions": [
                                {
                                    "condition": "tconstruct:has_modifier",
                                    "modifier": "tconstruct:melting"
                                }
                            ]
                        },
                        {
                            "type": "minecraft:item",
                            "name": id,
                            "conditions": [
                                {
                                    "condition": "minecraft:match_tool",
                                    "predicate": {
                                        "enchantments": [
                                            {
                                                "enchantment": "minecraft:silk_touch",
                                                "levels": {
                                                    "min": 1
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "type": "minecraft:item",
                            "name": crushedId,
                            "functions": [
                                {
                                    "function": "minecraft:set_count",
                                    "count":
                                    {
                                        "min": 2.0,
                                        "max": 3.0,
                                        "type": "minecraft:uniform"
                                    }
                                },
                                {
                                    "function": "minecraft:apply_bonus",
                                    "enchantment": "minecraft:fortune",
                                    "formula": "minecraft:uniform_bonus_count",
                                    "parameters": { "bonusMultiplier": 1 }
                                },
                                {
                                    "function": "minecraft:explosion_decay"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}}

ServerEvents.blockLootTables(event => {

    event.addSimpleBlock("minecraft:twisting_vines", "minecraft:twisting_vines")
    event.addSimpleBlock("minecraft:weeping_vines", "minecraft:weeping_vines")

    let extra_ores = ["minecraft:", "minecraft:deepslate_"]

    extra_ores.forEach(e => {
        let iron = e + "iron_ore"
        event.addJson(iron, metal_ores_drop_dust(iron, "create:crushed_raw_iron", "thermal:iron_dust"))
        let gold = e + "gold_ore"
        event.addJson(gold, metal_ores_drop_dust(gold, "create:crushed_raw_gold", "thermal:gold_dust"))
    })
    event.addJson(MC("copper_ore"), metal_ores_drop_dust(MC("copper_ore"), "create:crushed_raw_copper", "thermal:copper_dust"))
    event.addJson(MC("deepslate_copper_ore"), metal_ores_drop_dust(MC("deepslate_copper_ore"), "create:crushed_raw_copper", "thermal:copper_dust"))
    event.addJson(CR("zinc_ore"), metal_ores_drop_dust(CR("zinc_ore"), "create:crushed_raw_zinc", "kubejs:zinc_dust"))
    event.addJson(CR("deepslate_zinc_ore"), metal_ores_drop_dust(CR("deepslate_zinc_ore"), "create:crushed_raw_zinc", "kubejs:zinc_dust"))
    event.addJson(TE("nickel_ore"), metal_ores_drop_dust(TE("nickel_ore"), "create:crushed_raw_nickel", "thermal:nickel_dust"))
    event.addJson(TE("deepslate_nickel_ore"), metal_ores_drop_dust(TE("deepslate_nickel_ore"), "create:crushed_raw_nickel", "thermal:nickel_dust"))
    event.addJson(TE("lead_ore"), metal_ores_drop_dust(TE("lead_ore"), "create:crushed_raw_lead", "thermal:lead_dust"))
    event.addJson(TE("deepslate_lead_ore"), metal_ores_drop_dust(TE("deepslate_lead_ore"), "create:crushed_raw_lead", "thermal:lead_dust"))
    event.addJson(AA("moon_iron_ore"), metal_ores_drop_dust(AA("moon_iron_ore"), "create:crushed_raw_iron", "thermal:iron_dust"))
})
