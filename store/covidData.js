export const state = () => ({
    countries: [],
    currentCountry: null,
})

export const actions = {
    async getCountries () {
        return await this.$axios.get(`https://api.covid19api.com/countries`);
    },
    async getTimeSeriesForCountry ({ commit }, countrySlug) {
        return await this.$axios
            .get(`https://api.covid19api.com/total/country/${countrySlug}`);
        
    },
}

export const mutations = {
    setCurrentCountry(state, country) {
        state.currentCountry = country;
    },
}