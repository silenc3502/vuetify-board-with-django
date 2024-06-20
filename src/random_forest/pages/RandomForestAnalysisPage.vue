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

        <!-- 그래프들 -->
        <v-row>
            <!-- 예약 완료 여부에 따른 승객 수 분포 -->
            <v-col cols="6">
                <common-chart
                        :title="'Number of Passengers vs Booking Completion'"
                        :data="passengersCountInfo"
                        graphType="countplot"
                        xKey="num_passengers"
                        hueKey="booking_complete"
                ></common-chart>
            </v-col>

            <!-- 구매 리드 타임에 따른 예약 완료 여부 -->
            <v-col cols="6">
                <common-chart
                        :title="'Purchase Lead Time vs Booking Completion'"
                        :data="purchaseLeadInfo"
                        graphType="histplot"
                        xKey="purchase_lead"
                        bins="30"
                        hueKey="booking_complete"
                ></common-chart>
            </v-col>
        </v-row>

        <v-row>
            <!-- 체류 기간에 따른 예약 완료 여부 -->
            <v-col cols="6">
                <common-chart
                        :title="'Length of Stay vs Booking Completion'"
                        :data="lengthOfStayInfo"
                        graphType="histplot"
                        xKey="length_of_stay"
                        bins="30"
                        hueKey="booking_complete"
                ></common-chart>
            </v-col>

            <!-- 추가 수하물 여부에 따른 예약 완료 여부 -->
            <v-col cols="6">
                <common-chart
                        :title="'Wants Extra Baggage vs Booking Completion'"
                        :data="extraBaggageInfo"
                        graphType="countplot"
                        xKey="wants_extra_baggage"
                        hueKey="booking_complete"
                ></common-chart>
            </v-col>
        </v-row>

        <v-row>
            <!-- 선호 좌석 여부에 따른 예약 완료 여부 -->
            <v-col cols="6">
                <common-chart
                        :title="'Wants Preferred Seat vs Booking Completion'"
                        :data="preferredSeatInfo"
                        graphType="countplot"
                        xKey="wants_preferred_seat"
                        hueKey="booking_complete"
                ></common-chart>
            </v-col>

            <!-- 기내식 여부에 따른 예약 완료 여부 -->
            <v-col cols="6">
                <common-chart
                        :title="'Wants In-Flight Meals vs Booking Completion'"
                        :data="inFlightMealsInfo"
                        graphType="countplot"
                        xKey="wants_in_flight_meals"
                        hueKey="booking_complete"
                ></common-chart>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ConfusionMatrix from "@/random_forest/components/ConfusionMatrix.vue";
import CommonChart from "@/random_forest/components/CommonChart.vue";

export default {
    components: {
        ConfusionMatrix,
        CommonChart,
    },
    data() {
        return {
            cmVisualizationInfoBeforeSmote: null,
            cmVisualizationInfoAfterSmote: null,
            passengersCountInfo: [],
            purchaseLeadInfo: [],
            lengthOfStayInfo: [],
            extraBaggageInfo: [],
            preferredSeatInfo: [],
            inFlightMealsInfo: [],
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

                this.passengersCountInfo = data.common_info.passengers_count;
                this.purchaseLeadInfo = data.common_info.purchase_lead;
                this.lengthOfStayInfo = data.common_info.length_of_stay;
                this.extraBaggageInfo = data.common_info.extra_baggage;
                this.preferredSeatInfo = data.common_info.preferred_seat;
                this.inFlightMealsInfo = data.common_info.in_flight_meals;

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
