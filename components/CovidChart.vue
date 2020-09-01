<template>
    <div class="pl-4 pr-4">
        <h1 class="text-center">Daily Covid-19 Cases for The United States</h1>
        <apexchart
                v-if="dataReady"
                height="550px"
                ref="chart"
                type="line"
                :options="chartOptions"
                :series="series">
        </apexchart>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import MainHeader from "../components/MainHeader";
    import { sma } from 'moving-averages';

    export default {
        components: {
            MainHeader,
        },
        data() {
            return {
                dataReady: false,
                fetchedDatasets: {},
                series: [],
                selectedSmas: [],
                smaOptions: [10, 25, 50, 100],
                chartOptions: {
                    chart: {
                        id: 'vuechart-example',
                        sparkline: {
                            enabled: false,
                        },
                        theme: 'dark',
                    },
                    stroke: {
                        curve: 'smooth',
                        width: 3,
                    },
                    theme: {
                        mode: 'dark'
                    },
                    yaxis: {
                        title: {
                            text: 'Cases'
                        },
                        labels: {
                            formatter: function (value) {
                                return Math.round(value);
                            }
                        },
                    },
                    xaxis: {
                        type: 'datetime',
                    },
                    tooltip: {
                        theme: 'dark',
                    },
                },
                activities: []
            };
        },
        watch: {
            currentCountry() {
                this.handleCountryChange();
            }
        },
        computed: {
            ...mapState('covidData', {
                currentCountry: state => state.currentCountry,
            }),
        },
        methods: {
            handleCountryChange() {
                let total = {name: 'Total Cases', data: []};
                let daily = {name: 'Daily Cases', data: []};
                let sma10 = {name: 'SMA 10', data: []};
                let sma25 = {name: 'SMA 25', data: []};
                let sma50 = {name: 'SMA 50', data: []};
                let sma100 = {name: 'SMA 100', data: []};

                this.$store.dispatch('covidData/getTimeSeriesForCountry', this.currentCountry).then(r => {
                    let rawData = [];

                    r.data.forEach((record) => {
                        let prevCases = total.data.length
                            ? total.data[total.data.length - 1].y : 0;
                        let dailyIncrease = record.Cases - prevCases;

                        rawData.push(dailyIncrease);

                        let smaData = this.generateSmaData(rawData);

                        total.data.push({x: record.Date, y: record.Cases});
                        daily.data.push({x: record.Date, y: dailyIncrease});
                        sma10.data.push({x: record.Date, y: smaData.sma10});
                        sma25.data.push({x: record.Date, y: smaData.sma25});
                        sma50.data.push({x: record.Date, y: smaData.sma50});
                        sma100.data.push({x: record.Date, y: smaData.sma100});
                    });
                    this.dataReady = true;
                });

                this.series = [
                    daily,
                    sma10,
                    sma25,
                    sma50,
                    sma100,
                ];
            },
            generateSmaData (dataSet) {
                return {
                    sma10: sma(dataSet, 10),
                    sma25: sma(dataSet, 25),
                    sma50: sma(dataSet, 50),
                    sma100: sma(dataSet, 100),
                }
            },
        },
        mounted() {
            this.$store.commit('covidData/setCurrentCountry', 'united-states');
        },
    }
</script>