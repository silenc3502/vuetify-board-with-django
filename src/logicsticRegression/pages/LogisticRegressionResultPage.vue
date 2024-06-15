<template>
    <div class="chart-container">
        <h2>Logistic Regression Chart</h2>
        <p>Accuracy: {{ accuracy }}</p>
        <div ref="chartContainer" class="chart-wrapper">
            <svg ref="svg" :viewBox="`0 0 ${svgWidth} ${svgHeight}`" preserveAspectRatio="xMidYMid meet"></svg>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import * as d3 from 'd3';

export default {
    data() {
        return {
            accuracy: 0,
            X: [],
            y: [],
            x_values: [],
            y_values: [],
            svgWidth: 0,
            svgHeight: 0,
            margin: { top: 20, right: 50, bottom: 50, left: 50 },
            resizeTimer: null
        };
    },
    mounted() {
        this.fetchData();
        window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        async fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:33333/calculate-logistic-regression');
                const data = response.data;
                this.accuracy = data.accuracy;
                this.X = data.data_points.X;
                this.y = data.data_points.y;
                this.x_values = data.decision_boundary.x_values;
                this.y_values = data.decision_boundary.y_values;
                this.createChart();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        createChart() {
            if (!this.X.length || !this.y.length || !this.x_values.length || !this.y_values.length) {
                console.warn('Data is not fully loaded.');
                return;
            }

            const chartContainer = this.$refs.chartContainer;
            this.svgWidth = chartContainer.clientWidth;
            this.svgHeight = chartContainer.clientHeight;

            d3.select(this.$refs.svg).selectAll('*').remove();

            const svg = d3.select(this.$refs.svg)
                .attr('width', this.svgWidth)
                .attr('height', this.svgHeight);

            const g = svg.append('g')
                .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

            const x = d3.scaleLinear()
                .domain(d3.extent(this.X, d => d[0]))
                .range([0, this.svgWidth - this.margin.left - this.margin.right]);

            const y = d3.scaleLinear()
                .domain(d3.extent(this.X, d => d[1]))
                .range([this.svgHeight - this.margin.top - this.margin.bottom, 0]);

            g.append('g')
                .attr('transform', `translate(0,${this.svgHeight - this.margin.top - this.margin.bottom})`)
                .call(d3.axisBottom(x));

            g.append('g')
                .call(d3.axisLeft(y));

            g.selectAll('circle')
                .data(this.X)
                .enter()
                .append('circle')
                .attr('cx', d => x(d[0]))
                .attr('cy', d => y(d[1]))
                .attr('r', 5)
                .style('fill', (d, i) => this.y[i] === 1 ? 'green' : 'blue');

            const line = d3.line()
                .x(d => x(d[0]))
                .y(d => y(d[1]));

            const decisionBoundary = this.x_values.map((x_val, i) => [x_val, this.y_values[i]]);

            g.append('path')
                .datum(decisionBoundary)
                .attr('d', line)
                .attr('stroke', 'red')
                .attr('stroke-width', 2)
                .attr('fill', 'none');
        },
        handleResize() {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                const chartContainer = this.$refs.chartContainer;
                this.svgWidth = chartContainer.clientWidth;
                this.svgHeight = chartContainer.clientHeight;

                d3.select(this.$refs.svg)
                    .attr('viewBox', `0 0 ${this.svgWidth} ${this.svgHeight}`);

                this.createChart();
            }, 200);
        }
    }
};
</script>

<style scoped>
.chart-container {
    width: 80%;
    height: 60%;
    margin: auto;
}

.chart-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>
