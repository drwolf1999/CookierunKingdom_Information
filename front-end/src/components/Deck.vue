<template>
    <v-expansion-panel>
        <v-expansion-panel-header>
            <v-row align="center" class="hidden-md-and-down">
                <v-col cols="2" class="text-center">
                    <v-chip>좋아요 {{ deck.vote | ShortNumber }} 개</v-chip>
                </v-col>
                <v-col cols="3" class="text-left">
                    {{ deck.name }}
                </v-col>
                <v-col cols="7" class="">
                    <DeckPreview :deck="CookieKeyList(deck.units)" img-size="big"/>
                </v-col>
            </v-row>
            <div class="hidden-lg-and-up hidden-xs-only">
                <v-row align="center">
                    <v-col cols="3" class="text-center">
                        <v-chip>좋아요 {{ deck.vote | ShortNumber }} 개</v-chip>
                    </v-col>
                    <v-col cols="9">
                        {{ deck.name }}
                    </v-col>
                </v-row>
                <v-row align="center">
                    <v-col>
                        <DeckPreview :deck="CookieKeyList(deck.units)" img-size="small"/>
                    </v-col>
                </v-row>
            </div>
            <div class="d-flex d-sm-none">
                <v-row align="center">
                    <v-col cols="12">
                        <v-chip>좋아요 {{ deck.vote | ShortNumber }} 개</v-chip>
                    </v-col>
                    <v-col cols="12">
                        {{ deck.name }}
                    </v-col>
                    <v-col cols="12">
                        <DeckPreview :deck="CookieKeyList(deck.units)" img-size="xs"/>
                    </v-col>
                </v-row>
            </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-card outlined class="pa-4">
                <v-row v-for="(unit, indexI) in deck.units" :key="`lg_xl_${indexI}`" class="mb-3 hidden-md-and-down" align="center">
                    <v-col cols="2">
                        <Cookie v-bind:cookie-key="unit.cookie" v-bind:img-size="`middle`"/>
                    </v-col>
                    <v-col cols="6" class="d-inline-block">
                        <Topping
                            v-for="(topping, indexJ) in unit.topping" :key="`lg_index_${indexJ}`"
                            class="float-left"
                            v-bind:topping-key="topping"
                            v-bind:img-size="`small`"
                        />
                    </v-col>
                    <v-col cols="4" class="text-right">
                        {{ unit.comment }}
                    </v-col>
                </v-row>

                <div v-for="(unit, indexI) in deck.units" :key="`sm_md_${indexI}`" class="mb-3 ml-5 hidden-lg-and-up">
                    <v-row justify="center" align="center">
                        <v-col cols="3">
                            <Cookie v-bind:cookie-key="unit.cookie" v-bind:img-size="`small`"/>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="9" class="text-right">
                            {{ unit.comment }}
                        </v-col>
                    </v-row>
                    <v-row>
                        <Topping
                            v-for="(topping, indexJ) in unit.topping" :key="`sm_index_${indexJ}`"
                            class="float-left"
                            v-bind:topping-key="topping"
                            v-bind:img-size="`small`"
                        />
                    </v-row>

                </div>

                <div v-if="deck.treasures !== undefined && deck.treasures !== null" class="d-flex">
                    <Treasure class="float-left" v-for="treasure in deck.treasures" :key="treasure" :treasure-key="treasure"/>
                </div>
            </v-card>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text :to="`/deck/write?id=${deck.id}&mode=${mode}`">수정하기</v-btn>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            v-bind="attrs"
                            v-on="on"
                            text
                            @click="Vote"
                        >
                            <v-icon>mdi-thumb-up-outline</v-icon>
                        </v-btn>
                    </template>
                    <span>좋아요를 통해 더 좋은 덱을 선택할 수 있도록 도와주세요!</span>
                </v-tooltip>

            </v-card-actions>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script lang="ts">
import Vue from 'vue';
import Cookie from "@/components/Cookie.vue";
import Topping from "@/components/Topping.vue";
import DeckPreview from "@/components/DeckPreview.vue";
import Treasure from "@/components/Treasure.vue";

export default Vue.extend({
    name: 'Deck',

    props: {
        deck: {
            type: Object,
        },
        mode: {
            type: String,
            required: true,
        }
    },

    components: {
        Treasure,
        DeckPreview,
        Topping,
        Cookie,
    },

    data: () => {
        return {};
    },
    methods: {
        CookieKeyList(v: Array<any>): string[] {
            let ret: string[] = [];
            let Size = v.length;
            for (let i = 0; i < Size; i++) {
                ret.push(v[i].cookie);
            }
            return ret;
        },
        Vote() {
            this.$emit('vote', this.deck.id);
        }
    },
    filters: {
        ShortNumber(v: number) {
            const m = 1000000;
            const k = 1000;
            if (v > m) return Math.floor(v / m) + 'm';
            else if (v > k) return Math.floor(v / k) + 'k';
            return v;
        }
    }
})
</script>

<style>
.tier__S {
    background: red;
}

.tier__A {
    background: darkred;
}

.tier__B {
    background: deepskyblue;
}

.tier__C {
    background: grey;
}

.tier__S, .tier__A, .tier__B, .tier__C {
    display: table;
    width: 50px;
    height: 50px;
    text-align: center;
    border-radius: 10px;
    color: white;
}

*[class^='tier__'] > span, *[class*=' tier__'] > span {
    vertical-align: middle;
    display: table-cell;
}
</style>