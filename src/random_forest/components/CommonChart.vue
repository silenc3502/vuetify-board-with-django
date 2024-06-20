<template>
    <v-card>
        <v-card-title className="headline">{{ title }}</v-card-title>
        <v-card-text>
            <svg ref="chart"></svg>
        </v-card-text>
    </v-card>
</template>

<script>
import * as d3 from 'd3';

export default {
    props: {
        title: String,
        data: Array,
        graphType: String,
        xKey: String,
        hueKey: String,
        bins: Number, // optional prop for histplot
    },
    mounted() {
        this.drawChart();
        window.addEventListener('resize', this.drawChart); // Listen for window resize
    },
    unmounted() {
        window.removeEventListener('resize', this.drawChart); // Remove resize listener on component destroy
    },
    methods: {
        drawChart() {
            const {graphType} = this;

            if (graphType === 'countplot') {
                this.drawCountPlot();
            } else if (graphType === 'histplot') {
                this.drawHistPlot();
            }
        },
        drawCountPlot() {
            const {data, xKey, hueKey} = this;
            const svg = d3.select(this.$refs.chart);

            // Group data by xKey and hueKey
            const groupedData = d3.rollup(
                data,
                v => v.length,
                d => d[xKey],
                d => d[hueKey]
            );

            // Extract keys for x-axis and hue
            const xKeys = Array.from(groupedData.keys());
            const hueKeys = Array.from(groupedData.get(xKeys[0]).keys());

            // Calculate maximum value for scaling
            const maxValue = d3.max(Array.from(groupedData.values()), d => d3.max(Array.from(d.values())));

            // Get dimensions of parent container
            const parentWidth = this.$refs.chart.parentElement.clientWidth;
            const parentHeight = this.$refs.chart.parentElement.clientHeight;

            // Set margins and dimensions based on parent container size
            const margin = {top: 50, right: 50, bottom: 50, left: 50};
            const width = parentWidth - margin.left - margin.right;
            const height = parentHeight - margin.top - margin.bottom + 100;

            svg.attr('width', parentWidth)
                .attr('height', parentHeight + 100);

            const chart = svg.select('g');

            // If chart group already exists, remove it to redraw
            if (!chart.empty()) {
                chart.remove();
            }

            // Create new chart group
            const newChart = svg.append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            // Create scales for x and y axes
            const xScale = d3.scaleBand()
                .domain(xKeys)
                .range([0, width])
                .padding(0.1);

            const yScale = d3.scaleLinear()
                .domain([0, maxValue])
                .range([height, 0]);

            // Add x axis
            newChart.append('g')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(xScale));

            // Add y axis
            newChart.append('g')
                .call(d3.axisLeft(yScale));

            // Add bars for each hueKey
            newChart.selectAll()
                .data(hueKeys)
                .enter()
                .append('g')
                .attr('fill', d => d === '1' ? 'steelblue' : 'orange') // Adjust color based on hueKey
                .selectAll('rect')
                .data(d => xKeys.map(x => ({x, y: groupedData.get(x).get(d) || 0})))
                .enter()
                .append('rect')
                .attr('x', d => xScale(d.x))
                .attr('y', d => yScale(d.y))
                .attr('width', xScale.bandwidth())
                .attr('height', d => height - yScale(d.y));

            // Add chart title
            newChart.append('text')
                .attr('x', width / 2)
                .attr('y', -margin.top / 2)
                .attr('text-anchor', 'middle')
                .style('font-size', '16px')
                .text(this.title);
        },
        drawHistPlot() {
            const {data, xKey, bins} = this;
            const svg = d3.select(this.$refs.chart);

            // Extract values for the histogram
            const values = data.map(d => +d[xKey]);

            // Get dimensions of parent container
            const parentWidth = this.$refs.chart.parentElement.clientWidth;
            const parentHeight = this.$refs.chart.parentElement.clientHeight;

            // Set margins and dimensions based on parent container size
            const margin = {top: 50, right: 50, bottom: 50, left: 50};
            const width = parentWidth - margin.left - margin.right;
            const height = parentHeight - margin.top - margin.bottom + 100;

            svg.attr('width', parentWidth)
                .attr('height', parentHeight + 100);

            const chart = svg.select('g');

            // If chart group already exists, remove it to redraw
            if (!chart.empty()) {
                chart.remove();
            }

            // Create new chart group
            const newChart = svg.append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            // Create histogram bins
            const histogram = d3.histogram()
                .value(d => d)
                .domain(d3.extent(values))
                .thresholds(bins);

            const binsData = histogram(values);

            // Create scales for x and y axes
            const xScale = d3.scaleLinear()
                .domain(d3.extent(values))
                .range([0, width]);

            const yScale = d3.scaleLinear()
                .domain([0, d3.max(binsData, d => d.length)])
                .nice()
                .range([height, 0]);

            // Add x axis
            newChart.append('g')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(xScale));

            // Add y axis
            newChart.append('g')
                .call(d3.axisLeft(yScale));

            // Add bars for histogram
            newChart.selectAll('rect')
                .data(binsData)
                .enter()
                .append('rect')
                .attr('x', d => xScale(d.x0))
                .attr('y', d => yScale(d.length))
                .attr('width', d => xScale(d.x1) - xScale(d.x0) - 1)
                .attr('height', d => height - yScale(d.length));

            // Add chart title
            newChart.append('text')
                .attr('x', width / 2)
                .attr('y', -margin.top / 2)
                .attr('text-anchor', 'middle')
                .style('font-size', '16px')
                .text(this.title);
        },
    },
};
</script>

<style scoped>
svg {
    width: 100%;
    height: auto;
    font-family: 'Arial', sans-serif;
}
</style>
