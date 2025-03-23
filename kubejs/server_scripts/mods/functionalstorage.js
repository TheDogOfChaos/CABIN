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

        let fsWoodTypes = [MC("oak"), MC("spruce"), MC("birch"), MC("jungle"), MC("acacia"), MC("dark_oak"), MC("mangrove"), MC("cherry"), MC("crimson"), MC("warped")]
        
        for (let i=1; i==4; i++) {

        }
    })

    ServerEvents.tags("block", event => {
        event.add("create:wrench_pickup", /functionalstorage/)
        event.add("create:wrench_pickup", /everycomp:fs\//)
    })
}
