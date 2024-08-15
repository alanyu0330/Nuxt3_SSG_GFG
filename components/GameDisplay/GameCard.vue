<template>
  <div class="game-item-component" @click="toGameDetails(game.gameId)">
    <div v-if="game.gameId" class="cover">
      <!-- <NuxtImg class="placeholderImage" src="/img/images/gfg_y.png" /> -->
      <NuxtImg
        class="gameImage"
        :src="imgFn(game)"
        loading="lazy"
        :data-id="game.gameId"
        :alt="game.name"
        placeholder="/img/images/gfg_y.png"
      />
    </div>
    <div class="info-wrap">
      <!-- <span>{{ filterFn('popularGameText', 'tag') }}</span> -->
      <div class="name">{{ filterName(game, "game") }}</div>
      <p class="time">{{ game && game.date }}</p>
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
const toGameDetails = () => {};
const filterName = () => "123";
const imgFn = (item) => {
  const foundItem = item.computerData.find((ele) => ele.name2 === "封面");
  const defaultImageUrl = `/img/1001.png`;
  if (useBaseStore().lang === "简体中文") {
    return (
      "https://gfgadmin.dr5kr.live/td/api/photo/" + foundItem.chinese ||
      defaultImageUrl
    );
  } else {
    return "https://gfgadmin.dr5kr.live/td/api/photo/" + foundItem.english;
  }
};
</script>

<style lang="less" scoped>
@design-width: 1920;
.game-item-component {
  border-radius: 10px;
  overflow: hidden;
  color: #fff;
  // box-shadow: 0 10px 10px 0 rgba(0,0,0,.3);

  .cover {
    position: relative;
    padding-top: 128.3%;
    overflow: hidden;

    img {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: auto;
    }
    .placeholderImage {
      z-index: 1;
    }
    .gameImage {
      z-index: 2;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .info-wrap {
    position: relative;
    z-index: 3;
    top: 0 ./ @design-width * 100vw;
    padding: 15 ./ @design-width * 100vw 25 ./ @design-width * 100vw 40 ./
      @design-width * 100vw 25 ./ @design-width * 100vw;
    font-size: 20 ./ @design-width * 100vw;
    background: #1e1e1e;
  }
  .name {
    margin: 18 ./ @design-width * 100vw auto;
    font-size: 30 ./ @design-width * 100vw;
    font-weight: 600;
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
