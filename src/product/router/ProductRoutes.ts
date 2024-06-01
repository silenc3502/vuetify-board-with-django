import ProductListPage from "@/product/pages/list/ProductListPage.vue";
import ProductRegisterPage from "@/product/pages/register/ProductRegisterPage.vue";


const ProductRoutes = [
    {
        path: '/product/list',
        name: 'ProductListPage',
        component: ProductListPage
    },
    {
        path: '/product/register',
        name: 'ProductRegisterPage',
        component: ProductRegisterPage
    },
    // {
    //     path: '/product/read/:boardId',
    //     name: 'ProductReadPage',
    //     components: {
    //         default: VuetifyBoardReadPage
    //     },
    //     props: {
    //         default: true
    //     }
    // },
]

export default ProductRoutes