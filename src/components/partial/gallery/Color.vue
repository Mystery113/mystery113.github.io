<style scoped>
.color-label {
  min-width: 72px;
}
</style>

<template>
  <div class="bg-tile-default d-flex flex-wrap align-center rounded pa-2" :class="{'premium-glow': isPremium, 'elevation-2': !isPremium}" style="min-height: 68px;">
    <currency :name="`gallery_${name}`" class="ma-1" :large="name === 'beauty'"></currency>
    <div class="color-label ma-1 ml-3" :class="`${name}--text text--${themeModifier}`">
      <span v-if="colorGain > 0">+{{ $formatNum(colorGain, true) }}</span>
    </div>
    <v-spacer></v-spacer>
    <template v-if="name !== 'beauty'">
      <currency :name="`gallery_${name}Drum`" class="ma-1"></currency>
      <div class="d-flex color-label ma-1 ml-3">
        <gb-tooltip v-if="drumChance > 0" :title-text="$vuetify.lang.t(`$vuetify.currency.gallery_${name}Drum.name`)">
          <template v-slot:activator="{ on, attrs }">
            <div :class="`${name}--text text--${themeModifier}`" v-bind="attrs" v-on="on">{{ $formatNum(drumChance * 100, true) }}%</div>
          </template>
          <div class="text-center">{{ $vuetify.lang.t('$vuetify.gooboo.chance') }}</div>
          <stat-breakdown :name="`gallery${statBaseName}DrumChance`"></stat-breakdown>
        </gb-tooltip>
      </div>
      <v-spacer></v-spacer>
    </template>
    <template v-if="name !== 'beauty'">
      <gb-tooltip :min-width="200">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ma-1" color="primary" :disabled="maxAfford < 1 || disabled" @click="convertMax" small v-bind="attrs" v-on="on">{{ $vuetify.lang.t('$vuetify.gooboo.max') }}</v-btn>
        </template>
        <div class="d-flex align-center mt-0">
          <price-tag class="ma-1" v-for="(amount, currency) in conversionPrice" :key="currency" :currency="currency" :amount="amount * maxAfford"></price-tag>
          <v-icon class="ma-1">mdi-transfer-right</v-icon>
          <price-tag class="ma-1" :currency="`gallery_${name}`" :amount="conversionMult * maxAfford" add></price-tag>
        </div>
      </gb-tooltip>
      <gb-tooltip :min-width="200">
        <template v-slot:activator="{ on, attrs }">
          <div class="ma-1" v-bind="attrs" v-on="on">
            <v-btn color="primary" :disabled="maxAfford < 1 || disabled" @click="convertOne">{{ $vuetify.lang.t('$vuetify.gallery.convert') }}</v-btn>
          </div>
        </template>
        <div class="d-flex align-center mt-0">
          <price-tag class="ma-1" v-for="(amount, currency) in conversionPrice" :key="currency" :currency="currency" :amount="amount"></price-tag>
          <v-icon class="ma-1">mdi-transfer-right</v-icon>
          <price-tag class="ma-1" :currency="`gallery_${name}`" :amount="conversionMult" add></price-tag>
        </div>
      </gb-tooltip>
    </template>
    <currency v-else name="gallery_converter" class="ma-1"></currency>
  </div>
</template>

<script>
import { capitalize } from '../../../js/utils/format';
import Currency from '../../render/Currency.vue';
import PriceTag from '../../render/PriceTag.vue';
import StatBreakdown from '../../render/StatBreakdown.vue';

export default {
  components: { Currency, StatBreakdown, PriceTag },
  props: {
    name: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    colorGain() {
      return this.$store.getters['mult/get'](`currencyGallery${ this.statBaseName }Gain`);
    },
    drumChance() {
      if (this.name === 'beauty') {
        return 0;
      }
      return this.$store.getters['mult/get'](`gallery${ this.statBaseName }DrumChance`);
    },
    themeModifier() {
      return this.$vuetify.theme.dark ? 'lighten-2' : 'darken-1';
    },
    statBaseName() {
      return capitalize(this.name);
    },
    maxAfford() {
      return this.$store.getters['gallery/maxAffordConversion'](this.name);
    },
    conversionPrice() {
      return this.$store.getters['gallery/conversionPrice'](this.name);
    },
    conversionMult() {
      return this.$store.getters['mult/get'](`gallery${ this.statBaseName }Conversion`);
    },
    isPremium() {
      if (this.name === 'beauty') {
        return false;
      }
      return this.$store.state.upgrade.item[`gallery_pretty${ this.statBaseName }`]?.level >= 1;
    }
  },
  methods: {
    convertOne() {
      this.$store.dispatch('gallery/convertColor', {toColor: this.name, max: false});
    },
    convertMax() {
      this.$store.dispatch('gallery/convertColor', {toColor: this.name, max: true});
    }
  }
}
</script>