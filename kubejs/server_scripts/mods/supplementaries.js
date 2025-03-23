if (Platform.isLoaded("supplementaries")) {
    ServerEvents.recipes(event => {
        event.remove({ id:"supplementaries:timber_frame" })
        donutCraft(event, Item.of("supplementaries:timber_frame", 2), "minecraft:air", "#forge:rods/wooden")

        event.stonecutting("supplementaries:timber_frame", "#kubejs:timber_frame")
        event.stonecutting("supplementaries:timber_brace", "#kubejs:timber_frame")
        event.stonecutting("supplementaries:timber_cross_brace", "#kubejs:timber_frame")
    })

    ServerEvents.tags("item", event => {
        event.get("kubejs:timber_frame")
            .add("supplementaries:timber_frame")
            .add("supplementaries:timber_brace")
            .add("supplementaries:timber_cross_brace")
    })
}