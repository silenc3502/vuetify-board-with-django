<template>
    <v-container v-if="cmVisualizationInfoBeforeSmote && cmVisualizationInfoAfterSmote">
        <v-row>
            <!-- Before SMOTE -->
            <v-col cols="6">
                <v-card>
                    <v-card-title class="headline">Confusion Matrix before SMOTE</v-card-title>
                    <v-card-text>
                        <confusion-matrix :confusionMatrix="cmVisualizationInfoBeforeSmote.cm"></confusion-matrix>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- After SMOTE -->
            <v-col cols="6">
                <v-card>
                    <v-card-title class="headline">Confusion Matrix after SMOTE</v-card-title>
                    <v-card-text>
                        <confusion-matrix :confusionMatrix="cmVisualizationInfoAfterSmote.cm"></confusion-matrix>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ConfusionMatrix from "@/random_forest/components/ConfusionMatrix.vue";

export default {
    components: {
        ConfusionMatrix,
    },
    data() {
        return {
            cmVisualizationInfoBeforeSmote: null,
            cmVisualizationInfoAfterSmote: null,
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const response = await fetch('http://localhost:33333/random-forest');
                const data = await response.json();

                this.cmVisualizationInfoBeforeSmote = data.cm_visualization_info_before_smote;
                this.cmVisualizationInfoAfterSmote = data.cm_visualization_info_after_smote;

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
    },
};
</script>

<style scoped>
/* 필요한 스타일링을 여기에 추가할 수 있습니다. */
</style>
