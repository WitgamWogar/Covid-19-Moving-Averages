<template>
    <div>
        <v-toolbar color="teal" dark>
            <v-toolbar-title>Countries</v-toolbar-title>
        </v-toolbar>

        <v-list style="max-height:100vh;overflow: scroll;" v-if="countries && countries.length">
            <v-list-item v-for="country in countries">
                <template v-slot:default="{ active, }">
                    <v-list-item-action>
                        <v-radio-group v-model="currentCountry" @change="setCurrentCountry(country.Slug)">
                            <v-radio :value="country.Slug" color="primary"></v-radio>
                        </v-radio-group>
                    </v-list-item-action>

                    <v-list-item-content>
                        <v-list-item-title>{{ country.Country }}</v-list-item-title>
                    </v-list-item-content>
                </template>
            </v-list-item>
        </v-list>
        <div class="text-center mt-5" v-else>
            <v-progress-circular
                    :size="70"
                    :width="7"
                    color="teal"
                    indeterminate
            ></v-progress-circular>
        </div>
    </div>

</template>

<script>
    import {mapState} from 'vuex';

    export default {
        data() {
            return {
                countries: [],
                currentCountry: null,
                defaultCountries: [
                    {
                        Country: 'United States of America',
                        Slug: 'united-states',
                    },
                    {
                        Country: 'Canada',
                        Slug: 'canada',
                    },
                    {
                        Country: 'China',
                        Slug: 'china',
                    },
                ],
            };
        },
        methods: {
            setCurrentCountry(countrySlug) {
                this.$store.commit('covidData/setCurrentCountry', countrySlug);
            },
            getCountries() {
                this.$store.dispatch("covidData/getCountries").then(r => {
                    this.countries = r.data.sort((a, b) => (a.Country > b.Country) ? 1 : -1);
                });
            }
        },
        mounted() {
            this.countries = this.defaultCountries;
        }
    }
</script>

<style scoped>

</style>