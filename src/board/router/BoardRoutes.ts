import BoardListPage from "@/board/list/BoardListPage.vue";
import BoardRegisterPage from "@/board/register/BoardRegisterPage.vue";
import BoardReadPage from "@/board/read/BoardReadPage.vue";
import BoardModifyPage from "@/board/modify/BoardModifyPage.vue";
import VuetifyBoardListPage from "@/board/pages/list/VuetifyBoardListPage.vue";
import VuetifyBoardRegisterPage from "@/board/pages/register/VuetifyBoardRegisterPage.vue";
import VuetifyBoardReadPage from "@/board/pages/read/VuetifyBoardReadPage.vue";
import VuetifyBoardModifyPage from "@/board/pages/modify/VuetifyBoardModifyPage.vue";

const BoardRoutes = [
    {
        path: '/board/list',
        name: 'VuetifyBoardListPage',
        component: VuetifyBoardListPage
    },
    {
        path: '/board/register',
        name: 'VuetifyBoardRegisterPage',
        component: VuetifyBoardRegisterPage
    },
    {
        path: '/board/read/:boardId',
        name: 'VuetifyBoardReadPage',
        components: {
            default: VuetifyBoardReadPage
        },
        props: {
            default: true
        }
    },
    {
        path: '/board/modify/:boardId',
        name: 'VuetifyBoardModifyPage',
        components: {
            default: VuetifyBoardModifyPage
        },
        props: {
            default: true
        }
    }
]

export default BoardRoutes