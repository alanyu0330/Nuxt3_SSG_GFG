<template>
  <div class="header">
    <!-- animate__bounceIn -->
    <div id="head_t">
      <div class="logo_w" @click="goHome"></div>
      <div id="menu" class="menuActive">
        <div
          v-for="(item, index) in navMenu"
          :key="index"
          @click="goAnchor(item.value)"
          :class="{ active: route.name === item.value }"
        >
          {{ guideTextFn(item.title) }}
        </div>
      </div>

      <div class="langRight" @click="langCk">
        <div class="end" id="end">
          <div class="flex-box">
            <!-- <div class="svg">
              </div> -->
            <div class="lang">
              <span :class="'en'">{{ languageName(lang) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="slide-fade">
      <div class="lang_box" v-show="langShow">
        <div class="box">
          <div class="hd">
            {{ filterFn("otherText", "switching") }} <i @click="cloneFn">X</i>
          </div>
          <div class="bd">
            <div
              @click="langChange(item.name)"
              class="item"
              v-for="item of languageData"
              :key="item.id"
            >
              <img
                :src="`https://gfgadmin.dr5kr.live/td/api/photo/${item.mapSrc}`"
              />
              <div>{{ item.local }}</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
const homeStore = useHomeStore();
import { useRoute, useRouter } from "#app";
// 获取路由对象
const route = useRoute();
const router = useRouter();

const lang = useBaseStore().lang;
const languageData = homeStore.languageData;
const langShow = ref(false);

function langChange() {}
const filterFn = (type, key) => {
  return homeStore.getDataByTypeAndKey(type, key);
};
function languageName(val) {
  const name = useHomeStore().languageData.find((el) => el.name === val);
  return name ? name.local : "";
}
function guideTextFn(val) {
  const name = useHomeStore()
    .parseVal.filter((el) => el.type === "guideText")
    .find((el) => el.name === lang);
  return name[val];
}
function goAnchor(target) {
  router.push({ name: target });
}
function goHome() {}
function langCk() {}

const navMenu = reactive([
  {
    title: "home",
    value: "home",
  },
  {
    title: "game",
    value: "gameDisplay",
  },
  {
    title: "contact",
    value: "contactUs",
  },
  {
    title: "about",
    value: "partners",
  },
]);
</script>

<style lang="less" scoped>
@design-width: 1920;
@langIco: {
  zh: url(/img/zh.png) no-repeat center left;
  en: url(/img/en.png) no-repeat center left;
  th: url(/img/th.png) no-repeat center left;
  id: url(/img/id.png) no-repeat center left;
  ko: url(/img/ko.png) no-repeat center left;
  ru: url(/img/ru.png) no-repeat center left;
  ja: url(/img/ja.png) no-repeat center left;
  vi: url(/img/vi.png) no-repeat center left;
  de: url(/img/de.png) no-repeat center left;
  sv: url(/img/sv.png) no-repeat center left;
  es: url(/img/es.png) no-repeat center left;
  it: url(/img/it.png) no-repeat center left;
  in: url(/img/in.png) no-repeat center left;
  pt: url(/img/pt.png) no-repeat center left;
  tw: url(/img/tw.png) no-repeat center left;
};
.header {
  width: 100%;
  height: 0 ./ @design-width * 100vw;
  color: #fff;
  // padding-top: 170 ./ @design-width * 100vw;
  font-size: 36 ./ @design-width * 100vw;
}
#head_t {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100 ./ @design-width * 100vw;
  top: 0 ./ @design-width * 100vw;
  left: 0;
  box-sizing: border-box;
  padding: 0 40 ./ @design-width * 100vw 0;
  background: rgba(0, 0, 0, 0.8);
  border-bottom: 12 ./ @design-width * 100vw solid;
  border-image: linear-gradient(90deg, #7e429c 0%, #501b97 100%) 2 2 2 2;
  z-index: 10;
  &.active {
    top: -200 ./ @design-width * 100vw;
  }
  .logo_w {
    width: 241 ./ @design-width * 100vw;
    height: 62 ./ @design-width * 100vw;
    background: url(/img/pc/logo_w11.png) center no-repeat;
    background-size: contain;
  }
  .menu_w {
    width: 67 ./ @design-width * 100vw;
    height: 51 ./ @design-width * 100vw;
    background: url(/img/menu_w.png) center no-repeat;
    background-size: contain;
  }
  .langRight {
    position: relative;
    .end {
      width: 165 ./ @design-width * 100vw;
      height: 45 ./ @design-width * 100vw;
      background-image: linear-gradient(90deg, #7e429c 0%, #5b1fab 100%);
      color: #fff;
      border-radius: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: url("/img/pc/finger.png"), auto;
      transition: all 0.3s;
      &:hover {
        // color: #000;
        // & ~ .lang-change {
        //   display: flex;
        // }
        // span::before {
        //   filter: invert(1);
        // }
        // .lang span::after {
        //   border-right: 2 ./ @design-width * 100vw solid #000;
        //   border-bottom: 2 ./ @design-width * 100vw solid #000;
        // }
      }
      img {
        width: 240 ./ @design-width * 100vw;
        // margin-bottom: 60 ./ @design-width * 100vw;
      }
      // .svg img {
      //   margin-right: 30 ./ @design-width * 100vw;
      // }
      .flex-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .lang {
        position: relative;
        font-size: 18 ./ @design-width * 100vw;
        font-weight: 700;
        letter-spacing: 0;
        padding: 0 12 ./ @design-width * 100vw 0 0;
        span {
          cursor: url("/img/pc/finger.png"), auto;
          display: flex;
          justify-content: center;
          align-items: center;
          &::before {
            content: "";
            display: block;
            width: 22 ./ @design-width * 100vw;
            height: 22 ./ @design-width * 100vw;
            margin-right: 10 ./ @design-width * 100vw;
            background: url(/img/pc/icon_earth.png) center no-repeat;
            background-size: contain;
            transition: all 0.3s;
          }
        }
        // each(@langIco, {
        //   .@{key} {
        //     display: flex;
        //     justify-content: center;
        //     align-items: center;
        //   }
        //   // .@{key}::before {
        //   //   content: '';
        //   //   display: block;
        //   //   width: 40 ./ @design-width * 100vw;
        //   //   height: 26 ./ @design-width * 100vw;
        //   //   margin-right: 10 ./ @design-width * 100vw;
        //   //   background: @value;
        //   //   background-size: contain;
        //   // }

        // });
      }
    }
    .lang-change {
      position: absolute;
      top: 45 ./ @design-width * 100vw;
      right: 19 ./ @design-width * 100vw;
      display: none;
      justify-content: flex-start;
      flex-flow: wrap;
      width: 120 ./ @design-width * 100vw;
      background: #000;
      color: #fff;
      transition: all 1s ease;
      border-radius: 12 ./ @design-width * 100vw;
      &:hover {
        display: flex;
      }
      li {
        width: 120 ./ @design-width * 100vw;
        height: 45 ./ @design-width * 100vw;
        line-height: 45 ./ @design-width * 100vw;

        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18 ./ @design-width * 100vw;
        // filter: grayscale(95%);
        // opacity: 0.5;
        cursor: url("/img/pc/finger.png"), auto;
        border-bottom: 1 ./ @design-width * 100vw solid
          rgba(255, 255, 255, 0.05);
        &:hover {
          color: #aa57ff;
        }
        /* each(@langIco, {
          &.@{key} {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          &.@{key}::before {
            content: '';
            display: block;
            width: 52 ./ @design-width * 100vw;
            height: 36 ./ @design-width * 100vw;
            margin-right: 14 ./ @design-width * 100vw;
            background: @value;
            background-size: contain;
          }
        }); */
      }
    }
  }
}
#head_s {
  display: flex;
  z-index: 999;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 710 ./ @design-width * 100vw;
  height: 120 ./ @design-width * 100vw;
  top: -200 ./ @design-width * 100vw;
  left: 0;
  margin: 30 ./ @design-width * 100vw 20 ./ @design-width * 100vw;
  box-sizing: border-box;
  transition: all 0.4s ease;
  border-radius: 12 ./ @design-width * 100vw;
  padding: 30 ./ @design-width * 100vw;
  box-shadow: 0 13px 15px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
  &.active {
    top: 0;
  }
  .logo_b {
    width: 162 ./ @design-width * 100vw;
    height: 60 ./ @design-width * 100vw;
    background: url(/img/logo_b.png) center no-repeat;
    background-size: contain;
  }
  .menu_r {
    width: 60 ./ @design-width * 100vw;
    height: 60 ./ @design-width * 100vw;
    background: url(/img/menu_r.png) center no-repeat;
    background-size: contain;
  }
}
#go_top {
  display: block;
  position: fixed;
  z-index: 999;
  width: 120 ./ @design-width * 100vw;
  height: 88 ./ @design-width * 100vw;
  background: url(/img/gotop.png) center no-repeat;
  background-size: contain;
  right: -120 ./ @design-width * 100vw;
  bottom: 280 ./ @design-width * 100vw;
  border-radius: 50 ./ @design-width * 100vw 0 0 50 ./ @design-width * 100vw;
  box-sizing: border-box;
  padding: 7 ./ @design-width * 100vw;
  overflow: hidden;
  cursor: url("/img/pc/finger.png"), auto;
  box-shadow: -2px 0 10px 0 rgba(0, 0, 0, 0.2);
  transition: all 0.8s ease;
  &.active {
    right: 0;
  }
}
#menu {
  display: flex;
  z-index: 9999;
  height: 95 ./ @design-width * 100vw;
  align-items: center;
  position: relative;
  left: 132 ./ @design-width * 100vw;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 220 ./ @design-width * 100vw;
    height: 95 ./ @design-width * 100vw;
    color: #fff;
    font-size: 24 ./ @design-width * 100vw;
    // padding: 0 ./ @design-width * 100vw 20 ./ @design-width * 100vw;
    position: relative;
    cursor: url("/img/pc/finger.png"), auto;
    font-family: "fontText";
    &::after {
      content: "";
      width: 0 ./ @design-width * 100vw;
      height: 0 ./ @design-width * 100vw;
      border-left: 10 ./ @design-width * 100vw solid transparent;
      border-right: 10 ./ @design-width * 100vw solid transparent;
      border-bottom: 20 ./ @design-width * 100vw solid #71379b;
      display: none;
      position: absolute;
      bottom: 0 ./ @design-width * 100vw;
      left: 50%;
      margin-left: -10 ./ @design-width * 100vw;
    }
    &.active::after {
      display: block;
    }
    &.active {
      position: relative;
      color: #aa57ff;
    }
  }
  .first {
    justify-content: space-between;
    height: 60 ./ @design-width * 100vw;
    margin-bottom: 100 ./ @design-width * 100vw;
  }
  .logo_b {
    width: 162 ./ @design-width * 100vw;
    height: 60 ./ @design-width * 100vw;
    background: url(/img/logo_b.png) center no-repeat;
    background-size: contain;
  }
  .menu_r {
    width: 60 ./ @design-width * 100vw;
    height: 60 ./ @design-width * 100vw;
    background: url(/img/menu_r.png) center no-repeat;
    background-size: contain;
  }
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(20 ./ @design-width * 100vw);
  // transform: scale(0.01);
  transform-origin: right top;
  opacity: 0;
}
.lang_box {
  background: rgba(0, 0, 0, 0.85);
  position: fixed;
  z-index: 9999;
  width: 100vw;
  height: 100%;
  overflow: hidden;
  top: 0;
  right: 0;
  transition: all 1s ease;
  .box {
    width: 940 ./ @design-width * 100vw;
    background: #181818;
    margin: 0 auto;
    margin-top: 150 ./ @design-width * 100vw;
    border-radius: 30 ./ @design-width * 100vw;
  }
  .hd {
    height: 90 ./ @design-width * 100vw;
    text-align: center;
    font-size: 26 ./ @design-width * 100vw;
    line-height: 90 ./ @design-width * 100vw;
    border-bottom: 1px solid rgb(53, 53, 53, 0.6);
    position: relative;
    i {
      position: absolute;
      right: 45 ./ @design-width * 100vw;
      cursor: url("/img/pc/finger.png"), auto;
    }
  }
  img {
    width: 56 ./ @design-width * 100vw;
    height: 56 ./ @design-width * 100vw;
    margin-right: 15 ./ @design-width * 100vw;
  }
  .bd {
    display: flex;
    flex-wrap: wrap;
    font-size: 20 ./ @design-width * 100vw;
    padding: 40 ./ @design-width * 100vw 70 ./ @design-width * 100vw;
    padding-right: 0;
    height: 430 ./ @design-width * 100vw;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .item {
    display: flex;
    width: 33.33%;
    line-height: 56 ./ @design-width * 100vw;
    margin-bottom: 45 ./ @design-width * 100vw;
    cursor: url("/img/pc/finger.png"), auto;
  }
}
</style>
