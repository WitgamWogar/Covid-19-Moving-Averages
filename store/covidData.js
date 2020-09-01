import {count} from "echarts/src/component/dataZoom/history";

export const state = () => ({
    countries: [],
    currentCountry: 'united-states',
})

export const actions = {
    async getCountries () {
        return await this.$axios.get(`https://api.covid19api.com/countries`);
    },
    async getTimeSeriesForCountry ({ commit }, countrySlug) {
        let today = new Date().toISOString().slice(0, 10);
        return await this.$axios
            .get(
                `https://api.covid19api.com/total/country/${countrySlug}/status/confirmed?from=2020-03-15T00:00:00Z&to=${today}`,
                {timeout: 5000}
            );
        
    },
}

export const mutations = {
    setCurrentCountry(state, country) {
        state.currentCountry = country;
    },
    setCountries(state, countries) {
        state.countries = countries;
    },
}

export const getters = {
    getCurrentCountry: (state) => {
        return state.currentCountry;
    }
}