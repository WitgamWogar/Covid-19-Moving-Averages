<template>
    <div>
        <main-header></main-header>
        <covid-chart></covid-chart>
    </div>
</template>

<script>
    import MainHeader from "../components/MainHeader";
    import CovidChart from "../components/CovidChart";


    export default {
        components: {
            MainHeader,
            CovidChart,
        },
    }
</script>