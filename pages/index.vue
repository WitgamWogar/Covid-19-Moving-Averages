<template>
    <div>
        <main-header></main-header>
        <covid-chart></covid-chart>
    </div>
</template>

<script>
    import MainHeader from "../components/MainHeader";
    import CovidChart from "../components/CovidChart";
    import CountryList from "../components/CountryList";


    export default {
        components: {
            MainHeader,
            CovidChart,
            CountryList,
        },
    }
</script>