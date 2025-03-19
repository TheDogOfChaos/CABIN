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

ServerEvents.highPriorityData(event => {
    /**
     * Creates a Spirit Infusion recipe.
     *
     * @param {string} input The input item, in ResourceLocation format
     * @param {number} inputCount 1-64 items (don't be stupid)
     * @param {string} output The output item, in ResourceLocation format.
     * @param {Array} extra_items A Json Array of the extra items required for this infusion recipe. (use {@link extraItem} where possible to represent individual items)
     * @param {Array} spirits A Json Array of spirits required for the infusion recipe (use the spirit functions at the top of this file, whereever possible. )
     */
    let spiritInfusion = (input, inputCount, output, extra_items, spirits) => {
        let inputJson = {};
        if (inputCount == 1) {
            inputJson = {"item": input};
        } else if (inputCount > 1) {
            inputJson = {"item": input, "count": inputCount};
        }
        event.addJson(`kubejs:spirit_infusion/${output}`,{
            "type": "malum:spirit_infusion",
            "input": inputJson,
            "output": {
                "item": `${output}`
            },
            "extra_items": extra_items,
            "spirits": spirits
        });
        console.log("Attempted to register recipe for '"+output+"'")
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
})

ServerEvents.recipes(event => {
    // bingus
})

