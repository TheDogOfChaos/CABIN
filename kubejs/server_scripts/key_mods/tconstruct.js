// priority: 1
ServerEvents.recipes(event => {

    // Obsidian pane crafting
    // Not sure where the original recipe went
    event.shaped(TC("obsidian_pane", 8), [
        "SSS",
        "SSS"
    ], {
        S: MC("obsidian")
    })
    // melt blaze rods into blazing blood
    event.custom({
        "type": "tconstruct:melting",
        "ingredient": { "tag": "forge:rods/blaze"	},
        "result": { "fluid": "tconstruct:blazing_blood", "amount": 100 },
        "temperature": 790,
        "time": 40
    })
    // Melt redstone into destabilized redstone
    event.custom({
        "type": "tconstruct:melting",
        "ingredient": { "item": MC("redstone") },
        "result": { "fluid": TE("redstone"), "amount": 100 },
        "temperature": 300,
        "time": 10
    });
    event.custom({
        "type": "tconstruct:melting",
        "ingredient": { "item": MC("redstone_block") },
        "result": { "fluid": TE("redstone"), "amount": 900 },
        "temperature": 500,
        "time": 90
    });
    // Remove coin cast
    event.remove({ id: TC("smeltery/casts/sand_casts/coins") })
    event.remove({ id: TC("smeltery/casts/red_sand_casts/coins") })
    event.remove({ id: TC("smeltery/casts/gold_casts/coins") })

    let coinMaterials = [
        "iron",
        "gold",
        "copper",
        "netherite",
        "tin",
        "lead",
        "silver",
        "nickel",
        "bronze",
        "electrum",
        "invar",
        "constantan",
        "signalum",
        "lumium",
        "enderium"
    ];
    coinMaterials.forEach(material=>{
        event.remove({ id:TC(`smeltery/casting/metal/${material}/coin_gold_cast`) })
        event.remove({ id:TC(`smeltery/casting/metal/${material}/coin_sand_cast`) })
    })
    // Remove enchanted apple melting recipe
    event.remove({ id: TC("smeltery/melting/metal/gold/enchanted_apple") })
    // Remove Tconstruct cheese since it only costs milk to craft and cheese already exists on the moon.
    event.remove({ id: TC("smeltery/casting/cheese_block")})
    event.remove({ id: TC("smeltery/casting/cheese_ingot_gold_cast")})
    event.remove({ id: TC("smeltery/casting/cheese_ingot_sand_cast")})
})

ServerEvents.tags("item", event => {
    // zinc anvils
    event.get("tconstruct:anvil_metal").add(CR("zinc_block"))
})

ServerEvents.tags("block", event => {
  event.get("tconstruct:mineable/melting_blacklist")
    .add("#forge:storage_blocks/raw_iron")
    .add("#forge:storage_blocks/raw_copper")
    .add("#forge:storage_blocks/raw_gold")
    .add("#forge:storage_blocks/raw_zinc")
    .add("#forge:storage_blocks/raw_lead")
    .add("#forge:storage_blocks/raw_nickel")
})

ServerEvents.highPriorityData( event => {
  // Use crushed ore instead of raw ore for the autosmelt modifier
    event.addJson("tconstruct:recipes/tools/modifiers/ability/autosmelt", {
        "type": "tconstruct:modifier",
        "allow_crystal": true,
        "check_trait_level": true,
        "inputs": [
            { "tag": "create:crushed_raw_materials" },
            { "item": "minecraft:blast_furnace" },
            { "tag": "forge:ingots" },
            { "tag": "forge:storage_blocks/coal" },
            { "tag": "forge:storage_blocks/coal" }
        ],
        "level": 1,
        "result": "tconstruct:autosmelt",
        "slots": { "abilities": 1 },
        "tools": { "tag": "tconstruct:modifiable/harvest" }
    })

    //Make Melting exclusive to the melting pan
    event.addJson("tconstruct:recipes/tools/modifiers/ability/melting", {
      "type": "tconstruct:modifier",
      "allow_crystal": true,
      "check_trait_level": true,
      "inputs": [
        {
          "item": "minecraft:blaze_rod"
        },
        {
          "ingredient": [
            {
              "item": "tconstruct:seared_melter"
            },
            {
              "item": "tconstruct:smeltery_controller"
            },
            {
              "item": "tconstruct:foundry_controller"
            }
          ]
        },
        {
          "item": "minecraft:blaze_rod"
        },
        {
          "item": "minecraft:lava_bucket"
        },
        {
          "item": "minecraft:lava_bucket"
        }
      ],
      "level": 1,
      "result": "tconstruct:melting",
      "slots": {
        "abilities": 1
      },
      "tools": [
        {
          "item": "tconstruct:melting_pan"
        }
      ]
    })
    
    event.addJson("tconstruct:tinkering/tool_definitions/melting_pan", {
      "modules": [
        {
          "type": "tconstruct:material_stats",
          "primary_part": 0,
            "stat_types": [
              "tconstruct:plating_shield",
              "tconstruct:limb"
            ]
          },
          {
            "type": "tconstruct:default_materials",
            "materials": [
              {
                "type": "tconstruct:random"
              },
              {
                "type": "tconstruct:random"
              }
            ]
          },
          {
            "type": "tconstruct:material_traits",
            "hooks": [
              "tconstruct:rebalanced_trait"
            ],
            "material_index": 1,
            "stat_type": "tconstruct:limb"
          },
          {
            "type": "tconstruct:base_stats",
            "stats": {
              "tconstruct:block_amount": 10.0,
              "tconstruct:harvest_tier": "minecraft:iron",
              "tconstruct:knockback_resistance": 0.1,
              "tconstruct:mining_speed": 6.0
            }
          },
          {
            "type": "tconstruct:modifier_slots",
            "slots": {
              "abilities": 2,
              "defense": 1,
              "upgrades": 1
            }
          },
          {
            "type": "tconstruct:melting_fluid_effective",
            "ignore_tier": false,
            "inverted_type": "mantle:tag",
            "predicate_type": "mantle:inverted",
            "tag": "tconstruct:mineable/melting_blacklist",
            "temperature": 1500
          },
          {
            "type": "tconstruct:volatile_flag",
            "flag": "tconstruct:force_melting"
          },
          {
            "type": "tconstruct:vein_aoe",
            "max_distance": 0
          },
          {
            "type": "tconstruct:traits",
            "traits": [
              {
                "level": 2,
                "name": "tconstruct:melting"
              },
              {
                "level": 1,
                "name": "tconstruct:tank"
              }
            ]
          },
          {
            "type": "tconstruct:dual_option_interaction"
          }
        ]
      })
})