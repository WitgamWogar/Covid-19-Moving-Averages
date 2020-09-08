<template>
    <div class="pl-4 pr-4">
        <v-row justify="center">
            <v-col cols="3">
                <country-select></country-select>
            </v-col>
            <v-col cols="3">
                <v-select
                        :items="dataTypes"
                        v-model="dataType"
                        label="Date Type"
                        @change="buildCountryData"
                        solo
                ></v-select>
            </v-col>
        </v-row>

        <apexchart
                v-if="dataReady"
                height="550px"
                ref="chart"
                type="line"
                :options="chartOptions"
                :series="series">
        </apexchart>
        <v-progress-linear
                v-else
                indeterminate
                color="info"
        ></v-progress-linear>

        <v-snackbar v-model="hasError" color="info">
            {{ errorMessage }}
            <v-btn text @click="hasError = false">Close</v-btn>
        </v-snackbar>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import MainHeader from "../components/MainHeader";
    import { sma } from 'moving-averages';
    import CountrySelect from "./CountrySelect";

    export default {
        components: {
            MainHeader,
            CountrySelect,
        },
        data() {
            return {
                dataReady: false,
                series: [],
                hasError: false,
                errorMessage: null,
                smaOptions: [10, 25, 50, 100],
                dataTypes: [
                    {text: 'Confirmed Cases', value: 'confirmed'},
                    {text: 'Deaths', value: 'deaths'},
                ],
                dataType: 'confirmed',
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
            };
        },
        watch: {
            currentCountry() {
                this.buildCountryData();
            }
        },
        computed: {
            ...mapState('covidData', {
                currentCountry: state => state.currentCountry,
            }),
        },
        methods: {
            buildCountryData() {
                this.dataReady = false;
                this.setError(false);
                let total = {name: 'Total Cases', data: []};
                let daily = {name: 'Daily Cases', data: []};
                let sma10 = {name: 'SMA 10', data: []};
                let sma25 = {name: 'SMA 25', data: []};
                let sma50 = {name: 'SMA 50', data: []};
                let sma100 = {name: 'SMA 100', data: []};
                let requestData = {
                    country: this.currentCountry,
                    dataType: this.dataType,
                };

                this.$store.dispatch('covidData/getTimeSeriesForCountry', requestData).then(r => {
                    let rawData = [];
                    if (!r.data.length) {
                        this.setError(
                            true,
                            "Interesting, there doesn't seem to be any data for this country."
                        );
                    }

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
                    this.series = [
                        daily,
                        sma10,
                        sma25,
                        sma50,
                        sma100,
                    ];
                    if (this.$refs.chart) {
                        this.$refs.chart.updateSeries(this.series, true);
                    }
                }).catch((error) => {
                    this.setError(true, `The Covid API has encountered an error: ${error}`);
                });
            },
            generateSmaData (dataSet) {
                return {
                    sma10: sma(dataSet, 10),
                    sma25: sma(dataSet, 25),
                    sma50: sma(dataSet, 50),
                    sma100: sma(dataSet, 100),
                }
            },
            setError(hasError, message = "") {
              this.hasError = hasError;
              this.errorMessage = message;
            },
        },
        mounted() {
            this.buildCountryData();
        },
    }
</script>