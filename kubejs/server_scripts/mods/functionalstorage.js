if(Platform.isLoaded("functionalstorage")) {
    ServerEvents.recipes(event => {
        zincMachine(event, Item.of(FS("storage_controller"), 1), MC("diamond"))
        zincMachine(event, Item.of(FS("controller_extension"), 1), MC("gold_ingot"))
        zincMachine(event, Item.of(FS("simple_compacting_drawer"), 1), CR("mechanical_piston"))
        zincMachine(event, Item.of(FS("compacting_drawer"), 1), CR("sticky_mechanical_piston"))
        enderiumMachine(event, Item.of(FS("fluid_1"), 4))
        enderiumMachine(event, Item.of(FS("fluid_2"), 4))
        enderiumMachine(event, Item.of(FS("fluid_4"), 4))
        enderiumMachine(event, Item.of(FS("ender_drawer"), 1))

        event.remove({id:FS("oak_drawer_alternate_x1")})
        // framed drawers
        event.remove({id:FS("compacting_framed_drawer")})
        event.remove({id:FS("framed_storage_controller")})
        event.remove({id:FS("framed_controller_extension")})
        event.remove({id:FS("framed_simple_compacting_drawer")})
        
        donutCraft(event, FS("compacting_framed_drawer"), FS("compacting_drawer"), "#forge:nuggets/iron")
        donutCraft(event, FS("framed_storage_controller"), FS("storage_controller"), "#forge:nuggets/iron")
        donutCraft(event, FS("framed_controller_extension"), FS("controller_extension"), "#forge:nuggets/iron")
        donutCraft(event, FS("framed_simple_compacting_drawer"), FS("simple_compacting_drawer"), "#forge:nuggets/iron")
        
        let drawerTypeTags = ["kubejs:drawer_1x1", "kubejs:drawer_1x2", "kubejs:drawer_2x2"]
        let stripNamespace = (resourceLocation) => resourceLocation.split(":").shift();
        for (let i=0; i<2; i++) {
            console.log(i)
            //! ABSOLUTELY CRITIAL: PRESERVE ALL NBT DATA
            // TODO: figure out why this isn't working
            wood_types.forEach((woodType) => {
                if (woodType.includes("minecraft")) {
                    donutCraft(Item.of(FS(stripNamespace(woodType)+"_"+i), 1), woodType+"_planks", drawerTypeTags[i])
                    console.log(woodType+" woodtype (minecraft)")
                } else {
                    // TODO: EveryCompat compat
                    console.log(woodType+" woodtype (other)")
                }
            })
        }
    })

    ServerEvents.tags("block", event => {
        event.add("create:wrench_pickup", /functionalstorage/)
        event.add("create:wrench_pickup", /everycomp:fs\//)
    })

    ServerEvents.tags("item", event => {
        // these do not match framed or fluid drawers
        event.add("kubejs:drawer_1x1", /^functionalstorage:(?!framed_1$)(?!fluid_1$).+_1$/)
        event.add("kubejs:drawer_1x2", /^functionalstorage:(?!framed_2$)(?!fluid_2$).+_2$/)
        event.add("kubejs:drawer_2x2", /^functionalstorage:(?!framed_4$)(?!fluid_4$).+_4$/)
    })
}
