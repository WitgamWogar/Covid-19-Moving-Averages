<template>
    <v-autocomplete
            v-model="currentCountry"
            :items="countries"
            item-text="Country"
            item-value="Slug"
            label="Country"
            placeholder="Start typing to Search"
            solo
    ></v-autocomplete>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        methods: {
            getCountries() {
                this.$store.dispatch("covidData/getCountries").then(r => {
                    let sortedCountries = r.data.sort((a, b) => (a.Country > b.Country) ? 1 : -1);
                    this.$store.commit('covidData/setCountries', sortedCountries);
                });
            }
        },
        computed: {
            ...mapState('covidData', {
                countries: state => state.countries,
            }),
            currentCountry: {
                get() { return this.$store.getters['covidData/getCurrentCountry']; },
                set(country) { this.$store.commit('covidData/setCurrentCountry', country); }
            }
        },
        mounted() {
            this.getCountries();
        },
    }
</script>

<style scoped>

</style>