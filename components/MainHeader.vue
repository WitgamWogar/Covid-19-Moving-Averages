<template>
    <div>
        <v-app-bar color="#43a047" dark src="https://phil.cdc.gov//PHIL_Images/23311/23311_lores.jpg">
            <template v-slot:img="{ props }">
                <v-img
                        v-bind="props"
                        gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
                ></v-img>
            </template>

            <v-toolbar-title>Covid-19 Moving Averages</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon @click="dialog = true">mdi-information-outline</v-icon>
            </v-btn>
        </v-app-bar>
        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-card-title class="headline">
                    Covid-19 Moving Averages
                </v-card-title>

                <v-card-text>
                    This is a simple demonstration of Covid-19 moving average data for the US.<br />
                    <a href="https://en.wikipedia.org/wiki/Moving_average" target="_blank">
                        Moving averages are useful for viewing smoothed trend data.
                    </a><br />
                    Moving averages can contain useful indicators like crossovers.
                    When a faster moving average like a 10 crosses over or under a slower moving average like 50
                    this indicates a strong trend change.
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">
                        Okay
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                dialog: false,
            };
        }
    }
</script>