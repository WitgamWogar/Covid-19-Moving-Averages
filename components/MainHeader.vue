<template>
    <v-app-bar
            color="#43a047"
            dark
            src="https://phil.cdc.gov//PHIL_Images/23311/23311_lores.jpg"
    >
        <template v-slot:img="{ props }">
            <v-img
                    v-bind="props"
                    gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
            ></v-img>
        </template>

        <v-toolbar-title>Covid-19 Moving Averages</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
            <v-icon>mdi-information-outline</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
    export default {}
</script>

<style scoped>

</style>