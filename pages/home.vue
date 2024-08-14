<template>
  <MainHeader />

  <div class="main">
    <div>
      <div class="banner-box">
        <swiper ref="mySwiper" :options="swiperOption">
          <swiper-slide class="swiper-slide">
            <img :src="'/img/pc/home/banner/banner.png'" />
            <img class="img1" :src="'/img/pc/home/banner/roles.png'" />
            <img class="img2" :src="'/img/pc/home/banner/light1.png'" />
            <img class="img3" :src="'/img/pc/home/banner/light3.png'" />
            <img class="img4" :src="'/img/pc/home/banner/lightbg.png'" />
            <img class="img5" :src="'/img/pc/home/banner/light2.png'" />
            <img class="img6" :src="'/img/pc/home/banner/light4.png'" />
          </swiper-slide>

          <swiper-slide>
            <img src="/img/pc/finger.png" alt="" />
          </swiper-slide>
          <swiper-slide
            v-for="item of swiperData"
            :key="item.id"
            class="swiper-slide"
          >
            <img
              :src="
                'https://gfgadmin.dr5kr.live/td/api/photo/' + item.computerSrc
              "
            />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>

      <div class="newGames" id="newGames">
        <div class="video-container" id="videoContainer">
          <div class="video-title bounceInBox">
            {{ filterFn("filmText", "title") }}
          </div>
          <div class="video-footer">
            <div v-if="!videoShow" class="video-bg" @click="videoBg">
              <img :src="'/img/pc/home/play.png'" class="" />
            </div>
            <!--  -->
            <video
              id="bg_video"
              ref="videoPlayer"
              controls
              x5-video-player-fullscreen="true"
              x5-playsinline
              playsinline
              webkit-playsinline
              preload="auto"
              :poster="
                'https://gfgadmin.dr5kr.live/td/api/photo/' +
                viedoFn('film', 'computerSrc')
              "
            >
              <!-- <source v-if="videoShow" src="/img/mobile/SLOTS_vidio.mp4" type="video/mp4" /> -->
              <source
                v-if="videoShow"
                :src="
                  'https://gfgadmin.dr5kr.live/td/' +
                  viedoFn('film', 'computerViedo')
                "
                type="video/mp4"
              />
            </video>
          </div>
        </div>
        <!-- <div class="newTit">{{ $t("newGames") }}</div> -->
        <div class="popular-box">
          <div class="popular-games-title bounceInBox">
            {{ filterFn("popularGameText", "title") }}
          </div>
          <div class="popular-games-explain bounceInBox">
            {{ filterFn("popularGameText", "text") }}
          </div>
          <div class="gameMain">
            <img
              :src="'/img/mobile/star_light.png'"
              class="breathe-div swiper-star1"
            />
            <img
              :src="'/img/mobile/star_light.png'"
              class="breathe-div swiper-star2"
            />
            <img
              :src="'/img/mobile/star_light.png'"
              class="breathe-div swiper-star3"
            />
            <img
              :src="'/img/mobile/star_light.png'"
              class="breathe-div swiper-star5"
            />
            <img
              :src="'/img/mobile/star_light.png'"
              class="breathe-div swiper-star6"
            />
            <img
              :src="'/img/mobile/star_light.png'"
              class="breathe-div swiper-star4"
            />

            <div
              class="gameBox"
              v-for="(item, index) in hotGameList"
              :key="index"
            >
              <PcGameItem
                :parseVal="parseVal"
                class="animate__animated gameFlipOutYBox"
                :game="item"
              ></PcGameItem>
            </div>
          </div>
        </div>
      </div>
      <div class="platForm">
        <div class="platForm-title bounceInBox">
          {{ filterFn("propagateText", "title") }}
        </div>
        <div
          class="platForm-title2 bounceInBox"
          v-html="filterFn('propagateText', 'text')"
        ></div>
        <div class="img-box">
          <img class="img" src="/img/pc/home/yjzs.png" alt="" />

          <img :src="'/img/mobile/b.png'" class="finish-animate" />
          <img :src="'/img/mobile/b.png'" class="finish-animate3" />
          <img :src="'/img/mobile/b.png'" class="finish-animate4" />
          <img :src="'/img/mobile/b.png'" class="finish-animate6" />

          <div class="seaShell">
            <img
              class="seaShell-img1"
              :src="'/img/mobile/rainbow-new.png'"
              alt=""
            />
            <img
              class="seaShell-img2"
              :src="'/img/mobile/star_light-new.png'"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="games" id="games">
        <div class="tit bounceInBox">
          {{ filterFn("gamePresentationText", "title") }}
        </div>
        <div
          class="des bounceInBox"
          v-html="filterFn('gamePresentationText', 'text')"
        ></div>

        <div class="scroll_arr">
          <ClientOnly>
            <vue3-seamless-scroll
              v-for="(game, index) in gameShowcaseList"
              :key="index"
              :list="game"
              :class-option="classOptions[index]"
              touch="false"
              class="warp scroll"
            >
              <ul class="ul-item">
                <li v-for="(item, index) in game" :key="index" class="li-item">
                  <img :src="imgFn(item)" @click="toGameDetails(item.gameId)" />
                </li>
              </ul>
            </vue3-seamless-scroll>
          </ClientOnly>
        </div>
        <!-- <a class="gamesMore" @click="goToGames">{{ $t("games_more") }}</a> -->
      </div>
      <div class="aboutUs" id="aboutUs" ref="aboutUs">
        <div class="aboutUsTit bounceInBox">
          {{ filterFn("aboutUsText", "title") }}
        </div>
        <div
          class="aboutUsDes bounceInBox"
          v-html="filterFn('aboutUsText', 'text')"
        ></div>
        <div class="usMain">
          <div
            v-for="(item, index) in aboutData"
            :key="index"
            class="about-item animate__animated rubberBandBox"
          >
            <ClientOnly>
              <AnimatedCounter
                :ref="setAboutNumRefs(index)"
                :value="Number(item.num)"
                :duration="1000"
                class="counter"
                style="color: #ab72f8"
              ></AnimatedCounter>
            </ClientOnly>
            <p>{{ item.text }}</p>
          </div>
        </div>
      </div>
      <div class="qwrz" id="qw" style="position: relative">
        <div class="night">
          <div class="shooting_star"></div>
          <div class="shooting_star"></div>
          <div class="shooting_star"></div>
          <div class="shooting_star"></div>
        </div>
        <div class="night2">
          <div class="shooting_star"></div>
          <div class="shooting_star"></div>
          <div class="shooting_star"></div>
          <div class="shooting_star"></div>
        </div>
        <p
          class="animate__animated bounceInBox"
          :class="{ animate__bounceIn: animate18 }"
        >
          {{ filterFn("officialCertificationText", "title") }}
        </p>
        <div class="qw_mid">
          <span
            class="animate__animated bounceInBox"
            :class="{ animate__bounceIn: animate19 }"
            v-html="filterFn('officialCertificationText', 'text')"
          ></span>
        </div>
        <div class="q4box">
          <div style="width: 30%">
            <div class="animateTxt animate__animated fadeInRight">
              <div class="q1">
                <img
                  :src="
                    officialCertificationImg('officialCertificationImg', '框1')
                  "
                />
              </div>
              {{
                filterCertificationFn(
                  "officialCertification",
                  "text",
                  "tableData1",
                )
              }}
            </div>
            <div class="animateTxt animate__animated fadeInRight">
              <div class="q3">
                <img
                  :src="
                    officialCertificationImg('officialCertificationImg', '框3')
                  "
                />
              </div>
              {{
                filterCertificationFn(
                  "officialCertification",
                  "text",
                  "tableData3",
                )
              }}
            </div>
          </div>
          <div style="width: 40%; text-align: center">
            <img
              class="animate__animated2 animate__animated fadeInRight"
              :src="
                officialCertificationImg('officialCertificationImg', '主图')
              "
            />
          </div>
          <div style="width: 30%">
            <div class="animateTxt animate__animated fadeInRight">
              <div class="q2">
                <img
                  :src="
                    officialCertificationImg('officialCertificationImg', '框2')
                  "
                />
              </div>
              {{
                filterCertificationFn(
                  "officialCertification",
                  "text",
                  "tableData2",
                )
              }}
            </div>
            <div class="animateTxt animate__animated fadeInRight">
              <div class="q4">
                <img
                  :src="
                    officialCertificationImg('officialCertificationImg', '框4')
                  "
                />
              </div>
              {{
                filterCertificationFn(
                  "officialCertification",
                  "text",
                  "tableData4",
                )
              }}
            </div>
          </div>
        </div>
      </div>
      <div class="about" id="about">
        <div class="tit bounceInBox">
          {{ filterFn("partnersText", "title") }}
        </div>
        <div
          class="des bounceInBox"
          v-html="filterFn('partnersText', 'text')"
        ></div>
        <div class="light animate__animated fadeInRight">
          <img :src="officialCertificationImg('partnersImg', '框1')" />
          <img :src="officialCertificationImg('partnersImg', '框2')" />
          <img :src="officialCertificationImg('partnersImg', '框3')" />
          <img :src="officialCertificationImg('partnersImg', '框4')" />
          <img :src="officialCertificationImg('partnersImg', '框5')" />
          <img :src="officialCertificationImg('partnersImg', '框6')" />
          <img :src="officialCertificationImg('partnersImg', '框7')" />
          <img :src="officialCertificationImg('partnersImg', '框8')" />
        </div>
      </div>
      <div class="vision" id="vision">
        <div class="visionBg">
          <div class="tit bounceInBox">
            {{ filterFn("contactUsText", "title") }}
          </div>
          <div
            class="des bounceInBox"
            v-html="filterFn('contactUsText', 'text')"
          ></div>
        </div>
        <div class="info-circle">
          <a
            :href="
              contactUsFn(
                'contactUs',
                includesFn ? 'gfg126-Email' : 'Email',
                'link',
              )
            "
            target="_blank"
            class="item emailBg zoomInLeft animate__animated"
          >
            <span>{{
              contactUsFn(
                "contactUs",
                includesFn ? "gfg126-Email" : "Email",
                "text",
              )
            }}</span>
          </a>
          <a
            :href="
              contactUsFn(
                'contactUs',
                includesFn ? 'gfg126-Skype' : 'Skype',
                'link',
              )
            "
            target="_blank"
            class="item skypeBg zoomInDown animate__animated"
          >
            <span>{{
              contactUsFn(
                "contactUs",
                includesFn ? "gfg126-Skype" : "Skype",
                "text",
              )
            }}</span>
          </a>
          <a
            :href="
              contactUsFn(
                'contactUs',
                includesFn ? 'gfg126-Telegram' : 'Telegram',
                'link',
              )
            "
            target="_blank"
            class="item teleBg zoomInRight animate__animated"
          >
            <span>{{
              contactUsFn(
                "contactUs",
                includesFn ? "gfg126-Telegram" : "Telegram",
                "text",
              )
            }}</span>
          </a>
        </div>
      </div>
      <MainFooter />
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, nextTick } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import MainHeader from "~/components/MainHeader.vue";
import MainFooter from "~/components/MainFooter.vue";
import PcGameItem from "~/components/Home/PcGameItem.vue";
// import vueSeamlessScroll from "vue3-seamless-scroll";

const homeStore = useHomeStore();

const swiperOption = reactive({
  pagination: {
    el: ".swiper-pagination", // 分页器容器的css选择器或HTML元素
    clickable: true, // 分页器是否可点击
  },
});

const swiperData = homeStore.swiperData;
const hotGameList = homeStore.hotGameList;
const gameShowcaseList = homeStore.gameShowCaseList;
const aboutData = homeStore.aboutData;

const classOptions = [
  {
    step: 0.4,
    limitMoveNum: 2,
    direction: 1,
    openTouch: false,
  },
  {
    step: 0.8,
    limitMoveNum: 2,
    direction: 1,
    openTouch: false,
  },
  {
    step: 0.3,
    limitMoveNum: 2,
    direction: 1,
    openTouch: false,
  },
  {
    step: 0.9,
    limitMoveNum: 2,
    direction: 1,
    openTouch: false,
  },
  {
    step: 0.5,
    limitMoveNum: 2,
    direction: 1,
    openTouch: false,
  },
];

const aboutNumRefs = ref([]);

const setAboutNumRefs = (index) => (el) => (aboutNumRefs.value[index] = el);

const filterFn = homeStore.getDataByTypeAndKey;
const officialCertificationImg = homeStore.officialCertificationImg;

const imgFn = (game) => {
  if (!game) return;
  const item = game.gameItem.computerData.find((ele) => ele.name2 === "封面");
  if (useBaseStore().lang === "简体中文") {
    return "https://gfgadmin.dr5kr.live/td/api/photo/" + item.chinese;
  } else {
    return "https://gfgadmin.dr5kr.live/td/api/photo/" + item.english;
  }
};
const viedoFn = () => "";
const filterCertificationFn = () => "";
const contactUsFn = () => "";

const loadObserve = async () => {
  await nextTick();
  // 文字动画
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 当元素进入视窗时添加类名
        entry.target.classList.add("animate__bounceIn");
      } else {
        // 当元素离开视窗时移除类名
        entry.target.classList.remove("animate__bounceIn");
      }
    });
  });
  const cards = document.querySelectorAll(".bounceInBox");
  console.log("fffffffffffffffffff");
  cards.forEach((card, index) => {
    card.dataset.index = index;
    observer.observe(card, index);
  });
  console.log(cards, "cardscardscardscards");
  // 向右到左的动画
  const observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 当元素进入视窗时添加类名
        entry.target.classList.add("animate__fadeInRight");
      } else {
        // 当元素离开视窗时移除类名
        entry.target.classList.remove("animate__fadeInRight");
      }
    });
  });
  const cards2 = document.querySelectorAll(".fadeInRight");
  cards2.forEach((card, index) => {
    card.dataset.index = index;
    observer2.observe(card, index);
  });

  // 联系的动画
  const observer3 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 当元素进入视窗时添加类名
        entry.target
          .querySelector(".zoomInLeft")
          .classList.add("animate__lightSpeedInLeft");
        entry.target
          .querySelector(".zoomInRight")
          .classList.add("animate__lightSpeedInRight");
        entry.target
          .querySelector(".zoomInDown")
          .classList.add("animate__zoomInDown");
      } else {
        // 当元素离开视窗时移除类名
        entry.target
          .querySelector(".zoomInLeft")
          .classList.remove("animate__lightSpeedInLeft");
        entry.target
          .querySelector(".zoomInRight")
          .classList.remove("animate__lightSpeedInRight");
        entry.target
          .querySelector(".zoomInDown")
          .classList.remove("animate__zoomInDown");
      }
    });
  });
  const cards3 = document.querySelectorAll(".info-circle");
  cards3.forEach((card, index) => {
    card.dataset.index = index;
    observer3.observe(card, index);
  });

  // 热门游戏动画
  const observer4 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 当元素进入视窗时添加类名
        if (entry.target.dataset.index < 2) {
          entry.target.classList.add("animate__rotateInDownLeft");
        } else {
          entry.target.classList.add("animate__rotateInDownRight");
        }
      } else {
        // 当元素离开视窗时移除类名
        if (entry.target.dataset.index < 2) {
          entry.target.classList.remove("animate__rotateInDownLeft");
        } else {
          entry.target.classList.remove("animate__rotateInDownRight");
        }
      }
    });
  });
  const cards4 = document.querySelectorAll(".gameFlipOutYBox");
  cards4.forEach((card, index) => {
    card.dataset.index = index;
    observer4.observe(card, index);
  });

  // 动画
  const observer5 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 当元素进入视窗时添加类名
        entry.target.classList.add("animate__rubberBand");
        for (let i = 0; i < 4; i++) {
          const el = aboutNumRefs.value[i];
          console.log(el.value);
          if (el) {
            // el.value.startAnimation();
          }
        }
      } else {
        // 当元素离开视窗时移除类名
        entry.target.classList.remove("animate__rubberBand");
      }
    });
  });
  const cards5 = document.querySelectorAll(".rubberBandBox");
  cards5.forEach((card, index) => {
    card.dataset.index = index;
    observer5.observe(card, index);
  });
};

onMounted(() => {
  loadObserve();
});
</script>

<style lang="less">
@import "@/components/Home/css/shootingStar.less";
@import "@/components/Home/css/finish.less";
@import "@/components/Home/css/seaShell.less";
@import "@/components/Home/css/banner.less";
.main {
  background: #000;
  min-height: 100vh;
  overflow-x: hidden;
  // margin-top: 100 ./ @design-width * 95vw;
}
.color3 {
  color: #333;
}
@design-width: 1920;
.px2vw(@name, @px) {
  @{name}: (@px / @design-width) * 100vw;
}
.newGames {
  width: 100%;
  // height: 100vh;
  background-color: #000;
  background-size: 100% 100%;
  background-image: url(/img/pc/home/bg4.png);
  background-repeat: no-repeat;
  color: #fff;
  padding: 7.2vw 0;
  background-size: cover;
  .newTit {
    font-family: "fontTitle";
    font-size: 45 ./ @design-width * 100vw;
    font-weight: 700;
    letter-spacing: 0;
    margin: 0 auto 3.1vw;
    text-align: center;
    color: #fff;
  }
  .newDes {
    font-family: "fontText";
    padding: 0.5vw 3.1vw;
    line-height: 2vw;
    font-size: 24 ./ @design-width * 100vw;
    letter-spacing: 0;
    text-align: center;
  }
  .newsH {
    width: 70vw;
    margin: 1vw auto;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #9960ff;
    cursor: url("/img/pc/finger.png"), auto;
    .newsSpan {
      font-weight: 600;
    }
    img {
      .px2vw(width, 33);
      .px2vw(height, 28);
      margin: 0 0.5vw;
    }
  }

  .gameMain {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin: 0 auto;
    position: relative;
    margin-top: 70 ./ @design-width * 100vw;
    .gameBox {
      .px2vw(width, 340);
      .px2vw(padding, 15);
      cursor: url("/img/pc/finger.png"), auto;
    }
  }
}
.platForm {
  position: relative;
  width: 100%;
  padding-top: 100 ./ @design-width * 100vw;
  background-size: 100% 100%;
  background-image: url(/img/pc/home/bg3.png);
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  .img-box {
    position: relative;
  }
  .img {
    padding: 0 200 ./ @design-width * 100vw;
    width: 100%;
  }
}
.games {
  width: 100%;
  // height: 100vh;
  background-image: url(/img/pc/home/bg2.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  color: #fff;
  padding: 2.2vw 0 6.2vw;
  padding-top: 55 ./ @design-width * 100vw;
  .tit {
    font-family: "fontText";
    font-size: 45 ./ @design-width * 100vw;
    font-weight: 700;
    letter-spacing: 0;
    margin: 0vw auto 20 ./ @design-width * 100vw;
    text-align: center;
  }
  .des {
    font-family: MicrosoftYaHei;
    padding: 70 ./ @design-width * 100vw 22.1vw;
    padding-top: 0;
    line-height: 30 ./ @design-width * 100vw;
    font-size: 24 ./ @design-width * 100vw;
    letter-spacing: 0;
    text-align: center;
  }
  .newTit {
    font-family: "fontTitle";
    font-size: 45 ./ @design-width * 100vw;
    font-weight: 700;
    letter-spacing: 0;
    margin: 0 auto 3.1vw;
    text-align: center;
    color: #3b2121;
  }
  .newDes {
    font-family: "fontText";
    padding: 0.5vw 3.1vw;
    line-height: 30 ./ @design-width * 100vw;
    font-size: 24 ./ @design-width * 100vw;
    letter-spacing: 0;
    text-align: center;
  }
  .newsH {
    width: 70vw;
    margin: 1vw auto;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #9960ff;
    cursor: url("/img/pc/finger.png"), auto;
    .newsSpan {
      font-weight: 600;
    }
    img {
      .px2vw(width, 33);
      .px2vw(height, 28);
      margin: 0 0.5vw;
    }
  }
  .gamesBoxImg {
    // .px2vw(height, 2270);
    // width: 100%;
    // background: url(/img/pc/gameDisplay.png) center no-repeat;
    // background-size: contain;
    // margin: 2.6vw auto;
    // &.zh {
    //   background: url(/img/pc/gameDisplay_zh.png) center no-repeat;
    //   background-size: contain;
    // }
  }
  .gamesMore {
    .px2vw(height, 100);
    width: 70vw;
    margin: 0 auto 1vw;
    font-size: 45 ./ @design-width * 100vw;
    font-weight: 700;
    color: #fff;
    background-image: linear-gradient(90deg, #9960ff 0%, #5f7eff 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100 ./ @design-width * 100vw;
    cursor: url("/img/pc/finger.png"), auto;
  }
  /* .scroll_arr {
    width: 90vw;
    height: 850 ./ @design-width * 100vw;
    margin-top: 100 ./ @design-width * 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
      .warp:nth-child(2),
      .warp:nth-child(4){
          height: 750 ./ @design-width * 100vw;
      }
    .warp {
      width: 100%;
      height: 850 ./ @design-width * 100vw;
      margin: 0 auto;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      ul {
        list-style: none;
        padding: 0;
        margin: 0 auto;
        &.ul-item {
          display: flex;
          flex-direction:column;
          height: 850 ./ @design-width * 100vw;
          .li-item {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 114 ./ @design-width * 100vw;
            height: 245 ./ @design-width * 100vw;
            margin: 5 ./ @design-width * 100vw;
          }
          
          .game {
            display: block;
            width: 114 ./ @design-width * 100vw;
            height: 245;
            // padding: 2 ./ @design-width * 100vw;
            border-radius: 36 ./ @design-width * 100vw;
            background: transparent;
            box-shadow: 2px 2px 15px 0 rgba(0,0,0,.18);
            img {
              width: 114 ./ @design-width * 100vw;
              height: 245 ./ @design-width * 100vw;
            }
          }
        }
      }
    }
  } */
}
.aboutUs {
  .px2vw(height, 944);
  width: 100%;
  background: url(/img/pc/aboutUs_bg.jpg);
  background-size: cover;
  color: #000;
  padding: 4.7vw 0;
  .aboutUsTit {
    font-size: 45 ./ @design-width * 100vw;
    font-weight: 700;
    letter-spacing: 0;
    margin: 0vw auto 20 ./ @design-width * 100vw;
    text-align: center;
    color: #fff;
    font-family: "fontText";
  }
  .aboutUsDes {
    padding: 0 22.2vw;
    padding-bottom: 160 ./ @design-width * 100vw;
    padding-top: 0;
    line-height: 30 ./ @design-width * 100vw;
    font-size: 24 ./ @design-width * 100vw;
    letter-spacing: 0;
    text-align: center;
    color: #e7e7e7;
    font-family: MicrosoftYaHei;
  }
  .usMain {
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin: 0 auto;
    > .about-item {
      .px2vw(width, 269);
      .px2vw(height, 278);
      margin: 1vw 0px;
      background: url(/img/pc/aboutUs_frame.png) center no-repeat;
      background-size: contain;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      padding: 0.8vw 1.5vw;
      // > h2 {
      //   font-size: 80 ./ @design-width * 100vw;
      //   font-family: usFont;
      //   color: #ab72f8;
      // }
      p {
        width: 82%;
        font-size: 24 ./ @design-width * 100vw;
        color: #fff;
        text-align: center;
        line-height: 30 ./ @design-width * 100vw;
      }
      .counter {
        font-size: 66 ./ @design-width * 100vw;
        font-family: usFont;
        font-weight: bold;
        color: #9f9d9d;
      }
    }
  }
}
.about {
  font-family: "fontTitle";
  width: 100%;
  // background: #fff;
  color: #fff;
  padding: 8.3vw 0;
  background-image: url(/img/pc/home/bg.png);
  background-size: cover;
  background-repeat: no-repeat;
  .tit {
    font-size: 45 ./ @design-width * 100vw;
    font-family: "fontText";
    font-weight: 700;
    letter-spacing: 0;
    margin-bottom: 20 ./ @design-width * 100vw;
    text-align: center;
  }
  .des {
    padding: 0.5vw 22.2vw;
    line-height: 30 ./ @design-width * 100vw;
    font-size: 24 ./ @design-width * 100vw;
    letter-spacing: 0;
    text-align: center;
    margin-bottom: 3.1vw;
    color: #fff;
    font-family: MicrosoftYaHei;
  }
  .light {
    display: flex;
    width: 80%;
    height: auto;
    justify-content: center;
    flex-flow: wrap;
    margin: 0 auto;
    img {
      .px2vw(margin, 5);
      .px2vw(width, 340);
      .px2vw(height, 120);
    }
  }
}
.vision {
  .px2vw(height, 950);
  width: 100%;
  background: url(/img/pc/contactUs/contactbg.png);
  background-size: cover;
  background-repeat: no-repeat;
  color: #fff;
  // padding: 5vw 0 0;
  padding-top: 0;
  .visionBg {
    background: linear-gradient(90deg, #501b97, #7e429c);
    padding: 20 ./ @design-width * 100vw 0;
    margin-bottom: 200 ./ @design-width * 100vw;
  }
  .tit {
    font-family: "fontText";
    font-size: 45 ./ @design-width * 100vw;
    font-weight: 700;
    letter-spacing: 0;
    margin-top: 30 ./ @design-width * 100vw;
    margin-bottom: 30 ./ @design-width * 100vw;
    text-align: center;
  }
  .des {
    padding: 0.5vw 22.2vw;
    line-height: 30 ./ @design-width * 100vw;
    font-size: 24 ./ @design-width * 100vw;
    letter-spacing: 0;
    text-align: center;
    margin-bottom: 40 ./ @design-width * 100vw;
    font-family: MicrosoftYaHei;
  }
  #line_video {
    width: 100%;
  }
}
.copyright {
  font-family: "fontText";
  padding: 1rem;
  width: 100%;
  background: #000;
  color: rgba(255, 255, 255, 0.5);
  font-size: 14 ./ @design-width * 100vw;
  text-align: center;
}

.info-circle {
  .px2vw(padding, 15);
  width: 70%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  .item {
    .px2vw(width, 256);
    .px2vw(height, 255);
    position: relative;
    cursor: url("/img/pc/finger.png"), auto;
    span {
      .px2vw(top, 178);
      color: #fff;
      font-size: 14 ./ @design-width * 100vw;
      position: relative;
      display: block;
      height: auto;
      left: 0;
      width: 70%;
      line-height: 20 ./ @design-width * 100vw;
      word-wrap: break-word;
      margin: 0 auto;
      text-align: center;
    }
  }
  .teleBg {
    background: url(/img/pc/telegrambg.png) center no-repeat;
    background-size: contain;
  }
  .skypeBg {
    background: url(/img/pc/skypebg.png) center no-repeat;
    background-size: contain;
  }
  .emailBg {
    background: url(/img/pc/emailbg.png) center no-repeat;
    background-size: contain;
  }
}
.qwrz {
  position: relative;
  z-index: 1;
  width: 100%;
  // height: 1600px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background: #fafbfd;
  background: linear-gradient(45deg, #501b97, #7e429c);
  // background: url('/img/mobile/qwrz.png');
  // background-repeat: no-repeat;
  // background-size: cover;
  // margin-top: -255px;
  > p {
    font-family: "fontText" !important;
    font-size: 45 ./ @design-width * 100vw;
    color: #fff;
    letter-spacing: -1px;
    margin-bottom: 30 ./ @design-width * 100vw;
    font-weight: bold;
    padding-top: 60 ./ @design-width * 100vw;
  }
  .qw_mid {
    width: 60%;
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    margin-bottom: 120 ./ @design-width * 100vw;
    text-align: center;
    span {
      // width: 60%;
      color: #fff;
      padding: 20px;
      line-height: 30 ./ @design-width * 100vw;
      font-size: 24 ./ @design-width * 100vw;
      font-family: MicrosoftYaHei;
      color: #fff;
    }
    // img {
    //   width: 50%;
    // }
  }
  .q4box {
    width: 80%;
    display: flex;
    // flex-flow: wrap;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
    z-index: 1; /* 将上方 div 置于上层 */
    // background: url('/img/mobile/wizar2.gif)');
    .animate__animated2 {
      width: 80%;
      margin: -50px auto 0;
    }
    .animateTxt {
      width: 70%;
      min-height: 282 ./ @design-width * 100vw;
      // font-size: 20px;
      padding: 90 ./ @design-width * 100vw 25 ./ @design-width * 100vw 41 ./
        @design-width * 100vw 39 ./ @design-width * 100vw;
      margin: 0 auto 100px;
      line-height: 1.1;
      text-overflow: ellipsis;
      overflow: hidden;
      background: #2d114c;
      opacity: 0.8;
      border-radius: 40 ./ @design-width * 100vw;
      // margin-left: 24px;
      word-break: break-all;
      font-size: 20 ./ @design-width * 100vw;
      height: 423 ./ @design-width * 100vw;
      img {
        display: inline-block;
        width: 100%;
        height: 100%;
        // width: 199px;
        // height: 39px;

        // background: url('/img/mobile/q1.png') no-repeat center;
        // background-size: contain;
      }
      .q1 {
        margin-bottom: 30 ./ @design-width * 100vw;
        height: 58 ./ @design-width * 100vw;
      }
      .q2 {
        margin-bottom: 30 ./ @design-width * 100vw;
        height: 44 ./ @design-width * 100vw;
      }
      .q3 {
        margin-bottom: 30 ./ @design-width * 100vw;
        margin-right: 40 ./ @design-width * 100vw;
        height: 56 ./ @design-width * 100vw;
      }
      .q4 {
        margin-bottom: 30 ./ @design-width * 100vw;
        height: 60 ./ @design-width * 100vw;
      }
    }
  }
}
.swiper-pagination-bullet {
  background: #fff;
}
.swiper-pagination-bullet-active {
  background: #fff;
}

.video-container {
  text-align: center;
  width: 1080 ./ @design-width * 100vw;
  margin: auto;
  .video-title {
    font-family: "fontText";
    font-size: 45 ./ @design-width * 100vw;
    font-weight: 700;
    letter-spacing: 0;
    margin: 0 auto 3.1vw;
    text-align: center;
    color: #fff;
  }
  .video-bg {
    position: absolute;
    width: 100%;
    top: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    z-index: 3;
    background: lab(0 0 0 / 0.5);
    img {
      position: absolute;
      width: 244 ./ @design-width * 100vw;
      height: 244 ./ @design-width * 100vw;
      top: 50%;
      cursor: url("/img/pc/finger.png"), auto;
      margin-top: -122 ./ @design-width * 100vw;
    }
  }
  .video-footer {
    width: 1080 ./ @design-width * 100vw;
    // height: 750 ./ @design-width * 100vw;
    position: relative;
    display: flex;
    align-items: center;
    margin: 0 auto;

    #bg_video {
      width: 1080 ./ @design-width * 100vw;
      height: 550 ./ @design-width * 100vw;
    }
    .play-button {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20vw;
      height: 20vw;
      transform: translate(-50%, -50%);
      background-size: cover;
      border: none;
      border-radius: 50%;
      padding: 20px;
      cursor: url("/img/pc/finger.png"), auto;
    }
  }
}
.scroll_arr {
  width: 100%;
  // height: 850px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20 ./ @design-width * 100vw 200 ./ @design-width * 100vw;
  padding-top: 39px;
  .warp {
    width: 100%;
    height: 900 ./ @design-width * 100vw;
    overflow: hidden;
    &:nth-child(2n) {
      height: 900 ./ @design-width * 100vw;
      margin-top: -110 ./ @design-width * 100vw;
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0 auto;
      &.ul-item {
        display: flex;
        flex-direction: column;
        .li-item {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 244 ./ @design-width * 100vw;
          height: 535 ./ @design-width * 100vw;
          margin: 20 ./ @design-width * 100vw;
          cursor: url("/img/pc/finger.png"), auto;
        }
        img {
          display: block;
          width: 244 ./ @design-width * 100vw;
          height: 535 ./ @design-width * 100vw;
          border-radius: 6 ./ @design-width * 100vw;
          background: transparent;
          box-shadow: 2px 2px 15 ./ @design-width * 100vw 0 rgba(0, 0, 0, 0.18);
        }
      }
    }
  }
}
.platForm-title {
  width: 100%;
  position: absolute;
  top: 55 ./ @design-width * 100vw;
  text-align: center;
  font-size: 45 ./ @design-width * 100vw;
  font-weight: bold;
  color: #ffffff;
  line-height: 44 ./ @design-width * 100vw;
  text-transform: uppercase;
  // margin: 0 auto;
  font-family: "fontText";
}
.platForm-title2 {
  width: 100%;
  position: absolute;
  top: 130 ./ @design-width * 100vw;
  text-align: center;
  font-size: 24 ./ @design-width * 100vw;
  color: #ffffff;
  line-height: 30 ./ @design-width * 100vw;
  font-family: MicrosoftYaHei;
}
.popular-box {
  position: relative;
}
.popular-games-title {
  width: 100%;
  text-align: center;
  font-size: 45 ./ @design-width * 100vw;
  font-weight: bold;
  color: #ffffff;
  line-height: 44 ./ @design-width * 100vw;
  text-transform: uppercase;
  margin-top: 100 ./ @design-width * 100vw;
  font-family: "fontText";
  margin-bottom: 20 ./ @design-width * 100vw;
}
.popular-games-explain {
  width: 100%;
  padding: 0.5vw 22.1vw;
  padding-top: 0;
  text-align: center;
  font-size: 24 ./ @design-width * 100vw;
  color: #ffffff;
  line-height: 30 ./ @design-width * 100vw;
  font-family: MicrosoftYaHei;
}

.breathe-div {
  width: 100 ./ @design-width * 100vw;
  height: 100 ./ @design-width * 100vw;
  border-radius: 50%;
  text-align: center;
  cursor: url("/img/pc/finger.png"), auto;
  overflow: hidden;
  -webkit-animation-timing-function: ease-in-out;
  -webkit-animation-name: breathe;
  -webkit-animation-duration: 1500ms;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-direction: alternate;
}

.swiper-star1 {
  position: absolute;
  top: -100 ./ @design-width * 100vw;
  left: 190 ./ @design-width * 100vw;
  width: 150 ./ @design-width * 100vw;
  height: 150 ./ @design-width * 100vw;
  animation-delay: 0s;
  -webkit-animation-name: breathe3;
}
.swiper-star3 {
  position: absolute;
  top: 660 ./ @design-width * 100vw;
  left: 210 ./ @design-width * 100vw;
  width: 80 ./ @design-width * 100vw;
  height: 80 ./ @design-width * 100vw;
  animation-delay: 0s;
  -webkit-animation-name: breathe3;
}
.swiper-star2 {
  position: absolute;
  top: 75 ./ @design-width * 100vw;
  left: 120 ./ @design-width * 100vw;
  width: 150 ./ @design-width * 100vw;
  height: 150 ./ @design-width * 100vw;
  animation-delay: 1s;
  -webkit-animation-name: breathe3;
}
.swiper-star4 {
  position: absolute;
  width: 50 ./ @design-width * 100vw;
  height: 50 ./ @design-width * 100vw;
  top: -80 ./ @design-width * 100vw;
  right: 240 ./ @design-width * 100vw;
  animation-duration: 4s;
  animation-delay: 2s;
}
.swiper-star5 {
  position: absolute;
  top: -20 ./ @design-width * 100vw;
  right: 170 ./ @design-width * 100vw;
  width: 50 ./ @design-width * 100vw;
  height: 50 ./ @design-width * 100vw;
  animation-duration: 4s;
  animation-delay: 1s;
}
.swiper-star6 {
  position: absolute;
  top: 200 ./ @design-width * 100vw;
  right: 130 ./ @design-width * 100vw;
  animation-delay: 2s;
  -webkit-animation-name: breathe2;
}

@-webkit-keyframes breathe2 {
  0% {
    opacity: 0.2;
  }

  100% {
    opacity: 1;
  }
}

@-webkit-keyframes breathe3 {
  0% {
    opacity: 0.2;
  }

  100% {
    opacity: 0.7;
  }
}

@-webkit-keyframes breathe {
  0% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
}

/* 流星特效 */
.night {
  position: relative;
  width: 100%;
  height: 100% ./ @design-width * 100vw;
  transform: rotateZ(145deg);
  position: absolute;
  left: -400 ./ @design-width * 100vw;
  top: 700 ./ @design-width * 100vw;
}

.night2 {
  position: relative;
  width: 100%;
  height: 100% ./ @design-width * 100vw;
  transform: rotateZ(145deg);
  position: absolute;
  left: 440 ./ @design-width * 100vw;
  top: 400 ./ @design-width * 100vw;
}

.cursorBox {
  cursor: url("/img/pc/cursor.png"), auto;
}
.bg000 {
  background: #000;
  height: 100vh;
}
</style>
