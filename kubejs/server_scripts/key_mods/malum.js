// unfortunately, no kubejs for malum
const arcaneSpirit = (amount) => {
    return {"type": "arcane", "count": amount}
};
const eldritchSpirit = (amount) => {
    return {"type": "eldritch", "count": amount}
};
const sacredSpirit = (amount) => {
    return {"type": "sacred", "count": amount}
};
const wickedSpirit = (amount) => {
    return {"type": "wicked", "count": amount}
};
const aerialSpirit = (amount) => {
    return {"type": "aerial", "count": amount}
};
const aqueousSpirit = (amount) => {
    return {"type": "aqueous", "count": amount}
};
const earthenSpirit = (amount) => {
    return {"type": "earthen", "count": amount}
};

const extraItem = (item, amount) => {
    let itemJson = {};
    if (amount == 1) {
        itemJson = {"item": item};
    } else if (amount > 1) {
        itemJson = {"item": item, "count": amount};
    }
    return itemJson;
}

ServerEvents.recipes(event => {
    /**
     * Creates a Spirit Infusion recipe.
     *
     * @param {string} inputItem The input item, in ResourceLocation format
     * @param {number} inputAmount 1-64 items (don't be stupid)
     * @param {string} outputItem The output item, in ResourceLocation format.
     * @param {Array} extraItems A Json Array of the extra items required for this infusion recipe. (use {@link extraItem} where possible to represent individual items)
     * @param {Array} spirits A Json Array of spirits required for the infusion recipe (use the spirit functions at the top of this file, whereever possible. )
     */
    let spiritInfusion = (inputItem, inputAmount, outputItem, extraItems, spirits) => {
        let inputJson = {};
        if (inputAmount == 1) {
            inputJson = {"item": inputItem};
        } else if (inputAmount > 1) {
            inputJson = {"item": inputItem, "count": inputAmount};
        }
        let recipeName = outputItem.split(":")[1]
        console.log("Attempting to register Spirit Infusion recipe for '"+outputItem+"'")
        event.custom({
            "type": "malum:spirit_infusion",
            "input": inputJson,
            "output": {
                "item": `${outputItem}`
            },
            "extra_items": extraItems,
            "spirits": spirits
        });
    }

    spiritInfusion("occultism:dimensional_matrix", 1, "kubejs:computation_matrix",
        [
            extraItem("kubejs:raw_logic_bucket", 1),
            extraItem("kubejs:abtruse_mechanism", 64)
        ],
        [
            eldritchSpirit(64),
            arcaneSpirit(64),
            aerialSpirit(64),
            earthenSpirit(64)
        ]
    );

    event.custom({
        "type": "malum:spirit_infusion",
        "extra_items": [
            {
                "item": "kubejs:raw_logic_bucket",
                "count": 1
            },
            {
                "item": "kubejs:abstruse_mechanism",
                "count": 64
            }
        ],
        "input": {
            "count": 1,
            "item": "occultism:dimensional_matrix"
        },
        "output": {
            "item": "kubejs:computational_matrix"
        },
        "spirits": [
            {
                "type": "eldritch",
                "count": 64
            }
        ]
    });
})

ServerEvents.recipes(event => {
    event.recipes.malum
    // bingus
})

