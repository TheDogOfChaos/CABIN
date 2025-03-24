ServerEvents.recipes(event => {
    let stone = Item.of(MC("cobblestone"), 1).withChance(.5)
    let experience = Item.of(CR("experience_nugget"), 1).withChance(0.75)

    event.recipes.create.crushing([Item.of(TE("sapphire"), 2), Item.of(TE("sapphire"), 1).withChance(.25), experience,stone], TE("sapphire_ore"))
    event.recipes.create.crushing([Item.of(TE("ruby"), 2), Item.of(TE("ruby"), 1).withChance(.25), experience,stone], TE("ruby_ore"))

    event.recipes.create.milling(Item.of("minecraft:redstone", 4), TE("cinnabar")).processingTime(700)
    event.recipes.create.crushing(Item.of("minecraft:redstone", 6), TE("cinnabar")).processingTime(500)
    event.remove({ id: TE("machines/pulverizer/pulverizer_cinnabar") })
    thermalPulverizer(event, Item.of("minecraft:redstone", 8), TE("cinnabar"), 10000)

    event.recipes.create.milling(TE("sulfur_dust"), F("#gems/sulfur")).processingTime(500)
    event.recipes.create.milling(TE("niter_dust"), F("#gems/niter")).processingTime(500)
    event.recipes.create.milling(TE("apatite_dust"), F("#gems/apatite")).processingTime(500)

    // recompacting gem dusts into their gem form
    let recompact = (id, id2) => {
        event.recipes.create.compacting(id2, [id])
    }
    recompact(F("#dusts/obsidian"), MC("obsidian"))
    recompact(F("#dusts/diamond"), MC("diamond"))
    recompact(F("#dusts/emerald"), MC("emerald"))
    recompact(F("#dusts/lapis"), MC("lapis_lazuli"))
    recompact(F("#dusts/sulfur"), TE("sulfur"))
    recompact(F("#dusts/apatite"), TE("apatite"))
    recompact(F("#dusts/niter"), TE("niter"))
    recompact(F("#dusts/sapphire"), TE("sapphire"))
    recompact(F("#dusts/ruby"), TE("ruby"))
    recompact(F("#dusts/quartz"), MC("quartz"))
})
