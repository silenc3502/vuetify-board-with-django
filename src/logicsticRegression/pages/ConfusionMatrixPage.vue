<template>
    <v-container>
        <div class="chart-wrapper">
            <!-- Accuracy 표시 -->
            <div class="accuracy">Accuracy: {{ accuracy }}</div>
            <!-- Confusion Matrix를 그릴 SVG -->
            <svg ref="svg" :viewBox="`0 0 ${svgWidth} ${svgHeight}`" preserveAspectRatio="xMidYMid meet"></svg>
            <!-- Classification Report를 표시할 테이블 -->
            <div class="report">
                <h2>Classification Report</h2>
                <table class="classification-report-table">
                    <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Precision</th>
                        <th>Recall</th>
                        <th>F1-score</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="report in formattedReportData" :key="report.metric">
                        <td>{{ report.metric }}</td>
                        <td>{{ report.precision }}</td>
                        <td>{{ report.recall }}</td>
                        <td>{{ report['f1-score'] }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </v-container>
</template>

<script>
import * as d3 from 'd3';

export default {
    data() {
        return {
            svgWidth: 600,
            svgHeight: 600,
            accuracy: null,
            classificationReport: [],
            formattedReportData: [],
        };
    },
    async created() {
        try {
            const response = await fetch('http://127.0.0.1:33333/train-test-evaluation');
            const data = await response.json();
            console.log('Fetched analysis data:', data);

            // 정확도 설정
            this.accuracy = data.accuracy;
            console.log('Accuracy:', this.accuracy);

            // Confusion Matrix 그리기
            this.drawConfusionMatrix(data.confusion_matrix);

            // Classification Report 데이터 설정
            this.classificationReport = data.classification_report;
            console.log('Classification Report:', this.classificationReport);

            // Classification Report 형식화
            this.formatClassificationReport();
            console.log('Formatted Report Data after processing:', this.formattedReportData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },
    methods: {
        drawConfusionMatrix(matrix) {
            const { svgWidth, svgHeight } = this;
            const margin = { top: 50, right: 50, bottom: 50, left: 50 };
            const width = svgWidth - margin.left - margin.right;
            const height = svgHeight - margin.top - margin.bottom;

            // SVG 요소에 접근
            const svg = d3.select(this.$refs.svg)
                .attr("width", svgWidth)
                .attr("height", svgHeight);

            // Confusion Matrix의 최대 값 구하기
            const maxValue = d3.max(matrix.flat());

            // 색상 척도 설정
            const color = d3.scaleSequential()
                .domain([0, maxValue])
                .interpolator(d3.interpolateBlues);

            // 셀의 크기 계산
            const cellSize = Math.min(width / matrix.length, height / matrix.length);

            // 행렬 그리기
            svg.append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`)
                .selectAll("rect")
                .data(matrix.flat())
                .enter().append("rect")
                .attr("x", (d, i) => (i % matrix.length) * cellSize)
                .attr("y", (d, i) => Math.floor(i / matrix.length) * cellSize)
                .attr("width", cellSize)
                .attr("height", cellSize)
                .style("fill", d => color(d))
                .style("stroke", "#ccc")
                .style("stroke-width", 1);

            // 셀 내부에 숫자 표시
            svg.append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`)
                .selectAll("text")
                .data(matrix.flat())
                .enter().append("text")
                .attr("x", (d, i) => (i % matrix.length) * cellSize + cellSize / 2)
                .attr("y", (d, i) => Math.floor(i / matrix.length) * cellSize + cellSize / 2)
                .attr("dy", "0.35em")
                .attr("text-anchor", "middle")
                .text(d => d.toFixed(2));
        },
        formatClassificationReport() {
            // Classification Report 데이터를 표시 형식으로 변환
            const formattedData = this.classificationReport.map((report, index) => {
                const formattedReport = {
                    metric: report.metric,
                    precision: report.precision.toFixed(2),
                    recall: report.recall.toFixed(2),
                    'f1-score': report['f1-score'].toFixed(2),
                };

                console.log(`Formatted Report [${index}]:`, formattedReport);

                return formattedReport;
            });

            // 변환된 데이터 출력
            console.log('Final Formatted Data:', formattedData);

            this.formattedReportData = formattedData;
        },
    },
};
</script>

<style scoped>
.chart-wrapper {
    margin-top: 20px;
    position: relative;
}

.accuracy {
    position: absolute;
    top: 10px;
    left: 10%;
    bottom: 20px;
    transform: translateX(-50%);
    font-size: 18px;
    font-weight: bold;
}

.report {
    margin-top: 20px;
    text-align: center;
}

.classification-report-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.classification-report-table th,
.classification-report-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

.classification-report-table th {
    background-color: #f2f2f2;
}
</style>
