<template>
    <div>
        <apexchart
                v-if="dataReady"
                height="500px"
                ref="covidChart"
                type="line"
                :options="chartOptions"
                :series="series">
        </apexchart>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import MainHeader from "../components/MainHeader";

    export default {
        components: {
            MainHeader,
        },
        data() {
            return {
                dataReady: false,
                fetchedDatasets: {},
                series: [],
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
                if (this.fetchedDatasets[this.currentCountry]) {
                    this.series = [this.fetchedDatasets[this.currentCountry]];
                    return;
                }

                let dataObj = {
                    name: this.currentCountry,
                    data: [],
                };

                this.$store.dispatch('covidData/getTimeSeriesForCountry', this.currentCountry).then(r => {
                    r.data.forEach((record) => {
                        let prevConfirmed = dataObj.data[dataObj.data.length - 1]
                            ? dataObj.data[dataObj.data.length - 1].confirmed : 0;

                        dataObj.data.push({
                            x: record.Date,
                            y: record.Confirmed - prevConfirmed,
                            confirmed: record.Confirmed,
                        });
                    });
                    this.dataReady = true;
                });

                this.fetchedDatasets[this.currentCountry] = dataObj;
                this.series = [dataObj];
            },
        },
        mounted() {
            this.$store.commit('covidData/setCurrentCountry', 'united-states');
        },
    }
</script>