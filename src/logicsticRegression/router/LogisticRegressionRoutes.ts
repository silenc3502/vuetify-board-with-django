import LogisticRegressionResultPage from "@/logicsticRegression/pages/LogisticRegressionResultPage.vue";
import ConfusionMatrixPage from "@/logicsticRegression/pages/ConfusionMatrixPage.vue";

const BoardRoutes = [
    {
        path: '/logistic-regression',
        name: 'LogisticRegressionResultPage',
        component: LogisticRegressionResultPage
    },
    {
        path: '/confusion-matrix',
        name: 'ConfusionMatrixPage',
        component: ConfusionMatrixPage
    }
]

export default BoardRoutes