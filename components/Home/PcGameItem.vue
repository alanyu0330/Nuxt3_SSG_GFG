<template>
  <div class="game-item-component" @click="toGameDetails(game.gameId)">
    <div v-if="game.gameId" class="cover">
      <img :src="imgFn(game)" :data-id="game.gameId" :alt="game.name" />
    </div>
    <div class="info-wrap">
      <span>{{ filterFn("popularGameText", "tag") }}</span>
      <div class="name">{{ filterName(game, "game") }}</div>
      <p class="time">{{ game.gameItem && game.gameItem.date }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
// 定义 props
const props = defineProps({
  game: {
    type: Object,
    required: true,
    default: () => {
      return {
        // 游戏id
        id: 0,
        // 名称
        name: "",
        // 时间
        time: "",
      };
    },
  },
});

const homeStore = useHomeStore();

const lang = ref("简体中文");

const imgFn = (val) => {
  console.log(val, "valalsdlasldlasd");
  const item = val.gameItem.computerData.find((ele) => ele.name2 === "封面");
  if (lang.value === "简体中文") {
    return "https://gfgadmin.dr5kr.live/td/api/photo/" + item.chinese;
  } else {
    return "https://gfgadmin.dr5kr.live/td/api/photo/" + item.english;
  }
};

const filterName = (val, key) => {
  const item = val.gameItem.descriptionData.find(
    (ele) => ele.name === lang.value,
  );
  console.log(
    val.gameItem.descriptionData,
    lang.value,
    "itemitemitemitemitemitem",
  );
  return item[key];
};

const filterFn = (type, key) => {
  return homeStore.getDataByTypeAndKey(type, key);
};

const toGameDetails = (id) => {
  this.$router.push({
    path: "/pc/gameDisplayDetails",
    query: {
      id,
    },
  });
};
</script>

<style lang="less" scoped>
@design-width: 1920;
.game-item-component {
  border-radius: 25px;
  overflow: hidden;
  color: #fff;
  box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.3);

  .info-wrap {
    padding: 25 ./ @design-width * 100vw 25 ./ @design-width * 100vw 40 ./
      @design-width * 100vw 25 ./ @design-width * 100vw;
    font-size: 20 ./ @design-width * 100vw;
    background: #1e1e1e;
  }

  .cover {
    // height: 476 ./ @design-width * 100vw;
    height: 476 ./ @design-width * 100vw;
    img {
      width: 100%;
      height: 476 ./ @design-width * 100vw;
    }
  }

  .name {
    margin: 18 ./ @design-width * 100vw auto;
    font-size: 30 ./ @design-width * 100vw;
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow-y: hidden;
    line-height: 45 ./ @design-width * 100vw;
    font-family: "fontText";
  }
  ::-webkit-scrollbar {
    display: none;
  }
}
</style>
