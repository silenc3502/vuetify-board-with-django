import FastapiPostListPage from "@/post/pages/list/FastapiPostListPage.vue";
import FastapiPostRegisterPage from "@/post/pages/register/FastapiPostRegisterPage.vue";
import FastapiPostReadPage from "@/post/pages/read/FastapiPostReadPage.vue";

const PostRoutes = [
    {
        path: '/post/list',
        name: 'FastapiPostListPage',
        component: FastapiPostListPage
    },
    {
        path: '/post/register',
        name: 'FastapiPostRegisterPage',
        component: FastapiPostRegisterPage
    },
    {
        path: '/post/read/:id',
        name: 'FastapiPostReadPage',
        components: {
            default: FastapiPostReadPage
        },
        props: {
            default: true
        }
    },
]

export default PostRoutes