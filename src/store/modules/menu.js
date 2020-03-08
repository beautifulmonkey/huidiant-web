import de from "element-ui/src/locale/lang/de";

export default {
    state: {
        navTree: [],  // 当前树
        baseNavTree: [],  // 总树
        menuIndex: null,  // 总树
    },
    getters: {

    },
    mutations: {
        setBaseNavTree(state, navTree){  // 设置导航总树
            state.baseNavTree = navTree;
        },
        switchNavTree(state, menuIndex){  // 设置导航当前树
            if (menuIndex === state.menuIndex) {
                console.log("menuIndex没变,所以不用从新加载menu");
                return
            }
            state.menuIndex = menuIndex
            state.baseNavTree.forEach((item,index,array)=>{
                if (item.menuIndex === menuIndex){
                    state.navTree = item.children
                }
            })
        },
    },
    actions: {

    }
}
