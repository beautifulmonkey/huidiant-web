import de from "element-ui/src/locale/lang/de";

export default {
    state: {
        // 左侧树相关
        navTree: [],  // 当前树
        baseNavTree: [],  // 总树
        menuIndex: null,  // 总树
        selectActive: null,  // 当前选中的select, 通常为url

        // 上侧head相关
        headMenu: []  // 最上方的head菜单,结构数据的第一级
    },
    getters: {

    },
    mutations: {
        setBaseNavTree(state, navTree){  // 设置导航总树
            state.baseNavTree = navTree;

            if (!state.headMenu.length){ // 在遍历总树的时候可以加载出menu的数据
                navTree.forEach((item,index,array)=>{
                    state.headMenu.push({
                        "menuIndex": item.menuIndex,
                        "name": item.name,
                        "svg": item.svg
                    })
                });
            }
        },
        switchNavTree(state, menuIndex){  // 设置导航当前树
            if (menuIndex === state.menuIndex) {
                // console.log("menuIndex没变,所以不用从新加载menu");
                return
            }
            if (menuIndex === "/"){
                console.log("访问首页");
                menuIndex = "/cashier"
            }
            state.menuIndex = menuIndex;
            state.baseNavTree.forEach((item,index,array)=>{
                if (item.menuIndex === menuIndex){
                    state.navTree = item.children
                }
            })
        },
        setSelectActive(state, Active){  // 设置当前选中节点
            state.selectActive = Active;
        },
    },
    actions: {

    }
}
