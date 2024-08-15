<template>
  <div class="allGames cursorBox" id="allGames">
    <div class="container123">
      <h1 class="hotText animate__animated animate__bounceIn">
        <!-- {{ filterFn('gameOverviewText', 'title') }} -->
      </h1>
      <div class="screenBox">
        <div class="hotNav">
          <swiper ref="mySwiper2" :options="{}">
            <swiper-slide
              v-for="(item, index) in tabList"
              :class="{ active: currentType === item.value }"
              :key="index"
              class="newItem animate__animated animate__fadeInLeft"
            >
              <div class="mySwiperBox" @click="handleTab(item.value)">
                <img
                  v-if="item.value !== 'all' && currentType !== item.value"
                  :src="`/img/gameDispllay/${item.value}.png`"
                />
                <img
                  v-if="item.value !== 'all' && currentType === item.value"
                  :src="`/img/gameDispllay/${item.value}_active.png`"
                />
                <span>{{ item.title }}</span>
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <div class="searchBox">
          <div class="lfSearch">
            <el-input
              :placeholder="filterFn('otherText', 'exploreGames')"
              v-model="searchInput"
            >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <div
            class="elasticBox"
            :class="{ active: tagShow }"
            @click.stop="tagClick"
          >
            <div class="screen">
              <img :src="'/img/gameDispllay/3805.png'" />
              <div class="name">{{ filterFn("otherText", "feature") }}</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="11"
                viewBox="0 0 19 11"
                fill="none"
              >
                <path
                  d="M9.494 8.07706L1.9759 0.452625C1.62091 0.0926146 1.04433 0.0926145 0.689338 0.452625C0.334348 0.812636 0.334348 1.39737 0.689338 1.75738L8.80889 9.99176C8.99656 10.1821 9.24754 10.2738 9.494 10.2601C9.74046 10.2715 9.99144 10.1821 10.1791 9.99176L18.2987 1.75967C18.6537 1.39966 18.6537 0.81493 18.2987 0.454919C17.9437 0.0949085 17.3671 0.0949085 17.0121 0.454919L9.494 8.07706Z"
                  fill="#B9B9B9"
                />
              </svg>
            </div>
            <div
              @click.stop="preventOutsideClick"
              ref="dropdown"
              v-if="tagShow"
              class="itemBox"
            >
              <el-input
                class="ipt"
                :placeholder="filterFn('otherText', 'search')"
                v-model="searchTag"
              >
              </el-input>
              <div class="itemList">
                <div v-for="(item, index) of filteredTagList" :key="item.id">
                  <div
                    class="item"
                    :class="{ check: item.checkbox }"
                    v-if="item[item.name] && item[item.name] > 0"
                  >
                    <div class="lf">
                      <el-checkbox
                        @change="checkboxFn(item, index, 'tagList')"
                        size="medium"
                        v-model="item.checkbox"
                        >{{ labelConfigurationTextFn(item.name) }}</el-checkbox
                      >
                      <!-- <span>xxx</span> -->
                    </div>
                    <div class="rf">{{ item[item.name] }}</div>
                  </div>
                </div>
                <div class="noResultsFound" v-if="!filteredTagList.length">
                  {{ filterFn("otherText", "noResultsFound") }}
                </div>
              </div>
            </div>
          </div>
          <div class="elasticBox" @click.stop="seriesClick">
            <div class="screen">
              <img :src="'/img/gameDispllay/3804.png'" />
              <div class="name">{{ filterFn("otherText", "series") }}</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="11"
                viewBox="0 0 19 11"
                fill="none"
              >
                <path
                  d="M9.494 8.07706L1.9759 0.452625C1.62091 0.0926146 1.04433 0.0926145 0.689338 0.452625C0.334348 0.812636 0.334348 1.39737 0.689338 1.75738L8.80889 9.99176C8.99656 10.1821 9.24754 10.2738 9.494 10.2601C9.74046 10.2715 9.99144 10.1821 10.1791 9.99176L18.2987 1.75967C18.6537 1.39966 18.6537 0.81493 18.2987 0.454919C17.9437 0.0949085 17.3671 0.0949085 17.0121 0.454919L9.494 8.07706Z"
                  fill="#B9B9B9"
                />
              </svg>
            </div>
            <div
              @click.stop="preventOutsideClick"
              ref="dropdown2"
              v-if="seriesShow"
              class="itemBox"
            >
              <el-input
                class="ipt"
                :placeholder="filterFn('otherText', 'search')"
                v-model="searchSeries"
              >
              </el-input>
              <div class="itemList">
                <div v-for="(item, index) of filteredTagList2" :key="item.id">
                  <div
                    class="item"
                    :class="{ check: item.checkbox }"
                    v-if="item[item.name] && item[item.name] > 0"
                  >
                    <div class="lf">
                      <el-checkbox
                        @change="checkboxFn(item, index, 'seriesList')"
                        size="medium"
                        v-model="item.checkbox"
                        >{{ seriesTextFn(item.name) }}</el-checkbox
                      >
                      <!-- <span>xxx</span> -->
                    </div>
                    <div class="rf">{{ item[item.name] }}</div>
                  </div>
                </div>
                <div class="noResultsFound" v-if="!filteredTagList2.length">
                  {{ filterFn("otherText", "noResultsFound") }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="seriesBox">
            <swiper ref="mySwiper" :options="swiperOption">
              <swiper-slide class="item" :class="{'itemActive': itemActive === '全部'}">
                <div @click="seriesFn('全部')">{{this.filterFn('gameOverviewText', 'all')}}</div>
              </swiper-slide>
              <swiper-slide :class="[{'itemActive': itemActive === item.name}, {'hide': !item[item.name] || item[item.name] < 1}]" v-for="item of seriesList" :key="item.id" class="item">
                <div v-if="item[item.name] && item[item.name] > 0" @click="seriesFn(item.name)"> {{ seriesTextFn(item.name) }}：{{item[item.name]}}</div>
              </swiper-slide>
            </swiper>
          </div> -->
      </div>
      <div v-if="resultBox.length" class="resultBox">
        <div class="lf">
          <span class="span" v-if="resultBoxShow"></span>
          <!-- <div class="item" v-for="(item, index) of resultBox" :key="item.id">
              <span>{{ item.name }}</span>
              <svg @click="itemClear(item, index)" xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
                <path d="M8.73555 6.78277C8.87431 6.87507 8.98773 6.98486 9.1042 7.10337C9.14237 7.14135 9.14237 7.14135 9.18132 7.18009C9.26567 7.26417 9.34951 7.34874 9.43336 7.43332C9.49406 7.49403 9.55479 7.55471 9.61555 7.61536C9.74585 7.74557 9.87593 7.87599 10.0058 8.00662C10.1936 8.19547 10.3818 8.38393 10.5701 8.5723C10.8756 8.87799 11.1808 9.184 11.4858 9.4902C11.782 9.78749 12.0782 10.0846 12.3747 10.3816C12.393 10.3999 12.4113 10.4182 12.4302 10.4371C12.522 10.5291 12.6138 10.6211 12.7057 10.713C13.4664 11.4749 14.2267 12.2373 14.9866 13C15.0883 12.9539 15.1611 12.9051 15.2397 12.8261C15.2609 12.8049 15.2822 12.7836 15.3041 12.7618C15.3272 12.7385 15.3502 12.7151 15.3739 12.6911C15.3987 12.6664 15.4234 12.6416 15.4489 12.6161C15.5319 12.5329 15.6147 12.4494 15.6975 12.3659C15.7569 12.3063 15.8163 12.2467 15.8758 12.1871C16.0039 12.0586 16.1319 11.93 16.2598 11.8013C16.445 11.6149 16.6306 11.4288 16.8162 11.2428C17.1177 10.9405 17.4191 10.6382 17.7205 10.3357C17.7385 10.3176 17.7565 10.2995 17.7751 10.2809C18.0307 10.0243 18.2862 9.76756 18.5417 9.51081C18.5597 9.49275 18.5776 9.47469 18.5962 9.45609C18.6141 9.43805 18.632 9.42001 18.6505 9.40143C18.9503 9.10013 19.2504 8.79911 19.5507 8.49832C19.7192 8.32953 19.8876 8.16061 20.0556 7.99135C20.2137 7.83204 20.3722 7.67306 20.5309 7.51432C20.589 7.45611 20.647 7.39779 20.7048 7.33933C20.784 7.25929 20.8636 7.1797 20.9434 7.1002C20.966 7.07719 20.9885 7.05418 21.0118 7.03048C21.3888 6.65778 21.8183 6.47742 22.3444 6.47046C22.877 6.47482 23.2891 6.64779 23.6685 7.03223C24.0708 7.50048 24.1261 8.02079 24.0831 8.61306C24.0049 9.01095 23.754 9.35328 23.4698 9.63224C23.4445 9.65768 23.4192 9.68312 23.3931 9.70933C23.309 9.79364 23.2244 9.87744 23.1397 9.96125C23.079 10.0219 23.0183 10.0826 22.9576 10.1433C22.8273 10.2736 22.6969 10.4036 22.5662 10.5334C22.3772 10.7211 22.1887 10.9092 22.0002 11.0974C21.6944 11.4028 21.3882 11.7079 21.0819 12.0127C20.7844 12.3087 20.4872 12.6049 20.1901 12.9012C20.1717 12.9195 20.1534 12.9378 20.1345 12.9566C20.0425 13.0484 19.9505 13.1402 19.8585 13.232C19.0962 13.9924 18.3335 14.7523 17.5704 15.5118C17.6165 15.6135 17.6654 15.6862 17.7444 15.7648C17.7656 15.786 17.7869 15.8073 17.8087 15.8292C17.832 15.8522 17.8554 15.8753 17.8794 15.899C17.9166 15.9361 17.9166 15.9361 17.9545 15.9739C18.0377 16.0569 18.1212 16.1396 18.2047 16.2224C18.2644 16.2818 18.3241 16.3411 18.3837 16.4006C18.5123 16.5286 18.6409 16.6565 18.7697 16.7844C18.9562 16.9696 19.1424 17.155 19.3285 17.3405C19.6309 17.6419 19.9334 17.9432 20.236 18.2444C20.2541 18.2624 20.2722 18.2804 20.2908 18.299C20.5476 18.5545 20.8044 18.8099 21.0612 19.0652C21.0793 19.0832 21.0974 19.1012 21.116 19.1197C21.1431 19.1466 21.1431 19.1466 21.1707 19.174C21.4721 19.4737 21.7733 19.7736 22.0742 20.0738C22.2431 20.2422 22.4121 20.4105 22.5814 20.5784C22.7408 20.7365 22.8999 20.8949 23.0587 21.0535C23.1169 21.1116 23.1753 21.1695 23.2338 21.2273C23.3139 21.3065 23.3935 21.3861 23.473 21.4658C23.496 21.4883 23.5191 21.5109 23.5428 21.5341C23.9133 21.9085 24.0954 22.3469 24.1008 22.8705C24.0964 23.2992 23.9887 23.6243 23.7292 23.9672C23.7073 23.9986 23.6854 24.03 23.6628 24.0623C23.3795 24.3705 22.9592 24.5957 22.5386 24.6159C21.9017 24.6274 21.4402 24.4707 20.9762 24.026C20.841 23.8935 20.7077 23.7593 20.5744 23.6249C20.5141 23.5646 20.4537 23.5042 20.3933 23.4439C20.247 23.2978 20.1011 23.1513 19.9553 23.0047C19.7855 22.8339 19.6152 22.6635 19.445 22.4932C19.1414 22.1895 18.8382 21.8855 18.5352 21.5813C18.241 21.2859 17.9467 20.9907 17.6522 20.6958C17.634 20.6775 17.6158 20.6593 17.5971 20.6406C17.5058 20.5492 17.4145 20.4578 17.3233 20.3664C16.5675 19.6095 15.8123 18.8521 15.0574 18.0944C14.9557 18.1405 14.8829 18.1893 14.8043 18.2683C14.783 18.2895 14.7617 18.3107 14.7398 18.3326C14.7053 18.3676 14.7053 18.3676 14.67 18.4033C14.6453 18.428 14.6206 18.4528 14.5951 18.4783C14.512 18.5615 14.4293 18.645 14.3465 18.7284C14.2871 18.7881 14.2276 18.8477 14.1682 18.9073C14.0401 19.0358 13.9121 19.1644 13.7842 19.2931C13.5989 19.4795 13.4134 19.6656 13.2278 19.8516C12.9262 20.1539 12.6248 20.4562 12.3235 20.7587C12.3055 20.7768 12.2874 20.7949 12.2688 20.8135C12.0132 21.0701 11.7577 21.3268 11.5023 21.5836C11.4843 21.6016 11.4663 21.6197 11.4478 21.6383C11.4209 21.6654 11.4209 21.6654 11.3934 21.693C11.0936 21.9943 10.7935 22.2953 10.4932 22.5961C10.3247 22.7649 10.1564 22.9338 9.98838 23.103C9.83023 23.2624 9.67176 23.4213 9.51303 23.5801C9.45495 23.6383 9.39699 23.6966 9.33917 23.7551C9.25996 23.8351 9.18031 23.9147 9.10056 23.9942C9.06671 24.0287 9.06671 24.0287 9.03219 24.0639C8.65759 24.4342 8.21905 24.6163 7.69517 24.6217C7.26622 24.6173 6.94104 24.5096 6.59792 24.2502C6.56653 24.2284 6.53514 24.2065 6.5028 24.1839C6.22066 23.9248 5.98829 23.5293 5.95357 23.1439C5.95005 23.0548 5.94917 22.9663 5.94975 22.8771C5.94992 22.8457 5.9501 22.8143 5.95028 22.7819C5.95424 22.5607 5.97291 22.3659 6.067 22.1629C6.08445 22.1237 6.08445 22.1237 6.10225 22.0837C6.33078 21.6261 6.78368 21.2648 7.1413 20.9082C7.19959 20.85 7.25788 20.7917 7.31615 20.7334C7.4735 20.5762 7.63095 20.419 7.78843 20.2618C7.93658 20.114 8.08464 19.966 8.23271 19.818C8.52574 19.5252 8.81885 19.2325 9.11201 18.9398C9.39657 18.6557 9.6811 18.3716 9.96557 18.0874C9.99193 18.061 9.99193 18.0611 10.0188 18.0342C10.107 17.9461 10.1952 17.858 10.2833 17.7699C11.0133 17.0407 11.7434 16.3116 12.4735 15.5826C12.4274 15.4809 12.3786 15.4082 12.2995 15.3296C12.2783 15.3083 12.2571 15.2871 12.2352 15.2652C12.2002 15.2306 12.2002 15.2306 12.1645 15.1954C12.1398 15.1707 12.115 15.146 12.0895 15.1205C12.0062 15.0375 11.9227 14.9548 11.8392 14.872C11.7796 14.8126 11.7199 14.7532 11.6603 14.6938C11.5317 14.5658 11.403 14.4378 11.2743 14.31C11.0878 14.1248 10.9016 13.9394 10.7155 13.7539C10.4131 13.4525 10.1106 13.1512 9.808 12.85C9.78989 12.832 9.77178 12.8139 9.75312 12.7954C9.4964 12.5399 9.23958 12.2845 8.98271 12.0292C8.96464 12.0112 8.94657 11.9932 8.92796 11.9747C8.90991 11.9568 8.89187 11.9389 8.87327 11.9204C8.57183 11.6207 8.27067 11.3208 7.96973 11.0206C7.80086 10.8522 7.63186 10.6839 7.46252 10.516C7.30313 10.3579 7.14407 10.1995 6.98526 10.0409C6.92702 9.98283 6.86867 9.9249 6.81018 9.8671C6.73011 9.78793 6.65048 9.70832 6.57095 9.6286C6.54793 9.60605 6.52491 9.5835 6.50119 9.56027C6.09564 9.15044 5.95051 8.70683 5.94959 8.1437C5.95547 7.74367 6.07447 7.44478 6.31476 7.12717C6.33666 7.09579 6.35856 7.06442 6.38113 7.03209C7.00512 6.35337 7.98317 6.32824 8.73555 6.78277Z" fill="#727E95"/>
              </svg>
            </div> -->
          <swiper ref="mySwiper3" :options="{}">
            <swiper-slide
              class="item"
              v-for="(item, index) of resultBox"
              :key="item.id"
            >
              <span>{{ item.name }}</span>
              <svg
                @click="itemClear(item, index)"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="31"
                viewBox="0 0 30 31"
                fill="none"
              >
                <path
                  d="M8.73555 6.78277C8.87431 6.87507 8.98773 6.98486 9.1042 7.10337C9.14237 7.14135 9.14237 7.14135 9.18132 7.18009C9.26567 7.26417 9.34951 7.34874 9.43336 7.43332C9.49406 7.49403 9.55479 7.55471 9.61555 7.61536C9.74585 7.74557 9.87593 7.87599 10.0058 8.00662C10.1936 8.19547 10.3818 8.38393 10.5701 8.5723C10.8756 8.87799 11.1808 9.184 11.4858 9.4902C11.782 9.78749 12.0782 10.0846 12.3747 10.3816C12.393 10.3999 12.4113 10.4182 12.4302 10.4371C12.522 10.5291 12.6138 10.6211 12.7057 10.713C13.4664 11.4749 14.2267 12.2373 14.9866 13C15.0883 12.9539 15.1611 12.9051 15.2397 12.8261C15.2609 12.8049 15.2822 12.7836 15.3041 12.7618C15.3272 12.7385 15.3502 12.7151 15.3739 12.6911C15.3987 12.6664 15.4234 12.6416 15.4489 12.6161C15.5319 12.5329 15.6147 12.4494 15.6975 12.3659C15.7569 12.3063 15.8163 12.2467 15.8758 12.1871C16.0039 12.0586 16.1319 11.93 16.2598 11.8013C16.445 11.6149 16.6306 11.4288 16.8162 11.2428C17.1177 10.9405 17.4191 10.6382 17.7205 10.3357C17.7385 10.3176 17.7565 10.2995 17.7751 10.2809C18.0307 10.0243 18.2862 9.76756 18.5417 9.51081C18.5597 9.49275 18.5776 9.47469 18.5962 9.45609C18.6141 9.43805 18.632 9.42001 18.6505 9.40143C18.9503 9.10013 19.2504 8.79911 19.5507 8.49832C19.7192 8.32953 19.8876 8.16061 20.0556 7.99135C20.2137 7.83204 20.3722 7.67306 20.5309 7.51432C20.589 7.45611 20.647 7.39779 20.7048 7.33933C20.784 7.25929 20.8636 7.1797 20.9434 7.1002C20.966 7.07719 20.9885 7.05418 21.0118 7.03048C21.3888 6.65778 21.8183 6.47742 22.3444 6.47046C22.877 6.47482 23.2891 6.64779 23.6685 7.03223C24.0708 7.50048 24.1261 8.02079 24.0831 8.61306C24.0049 9.01095 23.754 9.35328 23.4698 9.63224C23.4445 9.65768 23.4192 9.68312 23.3931 9.70933C23.309 9.79364 23.2244 9.87744 23.1397 9.96125C23.079 10.0219 23.0183 10.0826 22.9576 10.1433C22.8273 10.2736 22.6969 10.4036 22.5662 10.5334C22.3772 10.7211 22.1887 10.9092 22.0002 11.0974C21.6944 11.4028 21.3882 11.7079 21.0819 12.0127C20.7844 12.3087 20.4872 12.6049 20.1901 12.9012C20.1717 12.9195 20.1534 12.9378 20.1345 12.9566C20.0425 13.0484 19.9505 13.1402 19.8585 13.232C19.0962 13.9924 18.3335 14.7523 17.5704 15.5118C17.6165 15.6135 17.6654 15.6862 17.7444 15.7648C17.7656 15.786 17.7869 15.8073 17.8087 15.8292C17.832 15.8522 17.8554 15.8753 17.8794 15.899C17.9166 15.9361 17.9166 15.9361 17.9545 15.9739C18.0377 16.0569 18.1212 16.1396 18.2047 16.2224C18.2644 16.2818 18.3241 16.3411 18.3837 16.4006C18.5123 16.5286 18.6409 16.6565 18.7697 16.7844C18.9562 16.9696 19.1424 17.155 19.3285 17.3405C19.6309 17.6419 19.9334 17.9432 20.236 18.2444C20.2541 18.2624 20.2722 18.2804 20.2908 18.299C20.5476 18.5545 20.8044 18.8099 21.0612 19.0652C21.0793 19.0832 21.0974 19.1012 21.116 19.1197C21.1431 19.1466 21.1431 19.1466 21.1707 19.174C21.4721 19.4737 21.7733 19.7736 22.0742 20.0738C22.2431 20.2422 22.4121 20.4105 22.5814 20.5784C22.7408 20.7365 22.8999 20.8949 23.0587 21.0535C23.1169 21.1116 23.1753 21.1695 23.2338 21.2273C23.3139 21.3065 23.3935 21.3861 23.473 21.4658C23.496 21.4883 23.5191 21.5109 23.5428 21.5341C23.9133 21.9085 24.0954 22.3469 24.1008 22.8705C24.0964 23.2992 23.9887 23.6243 23.7292 23.9672C23.7073 23.9986 23.6854 24.03 23.6628 24.0623C23.3795 24.3705 22.9592 24.5957 22.5386 24.6159C21.9017 24.6274 21.4402 24.4707 20.9762 24.026C20.841 23.8935 20.7077 23.7593 20.5744 23.6249C20.5141 23.5646 20.4537 23.5042 20.3933 23.4439C20.247 23.2978 20.1011 23.1513 19.9553 23.0047C19.7855 22.8339 19.6152 22.6635 19.445 22.4932C19.1414 22.1895 18.8382 21.8855 18.5352 21.5813C18.241 21.2859 17.9467 20.9907 17.6522 20.6958C17.634 20.6775 17.6158 20.6593 17.5971 20.6406C17.5058 20.5492 17.4145 20.4578 17.3233 20.3664C16.5675 19.6095 15.8123 18.8521 15.0574 18.0944C14.9557 18.1405 14.8829 18.1893 14.8043 18.2683C14.783 18.2895 14.7617 18.3107 14.7398 18.3326C14.7053 18.3676 14.7053 18.3676 14.67 18.4033C14.6453 18.428 14.6206 18.4528 14.5951 18.4783C14.512 18.5615 14.4293 18.645 14.3465 18.7284C14.2871 18.7881 14.2276 18.8477 14.1682 18.9073C14.0401 19.0358 13.9121 19.1644 13.7842 19.2931C13.5989 19.4795 13.4134 19.6656 13.2278 19.8516C12.9262 20.1539 12.6248 20.4562 12.3235 20.7587C12.3055 20.7768 12.2874 20.7949 12.2688 20.8135C12.0132 21.0701 11.7577 21.3268 11.5023 21.5836C11.4843 21.6016 11.4663 21.6197 11.4478 21.6383C11.4209 21.6654 11.4209 21.6654 11.3934 21.693C11.0936 21.9943 10.7935 22.2953 10.4932 22.5961C10.3247 22.7649 10.1564 22.9338 9.98838 23.103C9.83023 23.2624 9.67176 23.4213 9.51303 23.5801C9.45495 23.6383 9.39699 23.6966 9.33917 23.7551C9.25996 23.8351 9.18031 23.9147 9.10056 23.9942C9.06671 24.0287 9.06671 24.0287 9.03219 24.0639C8.65759 24.4342 8.21905 24.6163 7.69517 24.6217C7.26622 24.6173 6.94104 24.5096 6.59792 24.2502C6.56653 24.2284 6.53514 24.2065 6.5028 24.1839C6.22066 23.9248 5.98829 23.5293 5.95357 23.1439C5.95005 23.0548 5.94917 22.9663 5.94975 22.8771C5.94992 22.8457 5.9501 22.8143 5.95028 22.7819C5.95424 22.5607 5.97291 22.3659 6.067 22.1629C6.08445 22.1237 6.08445 22.1237 6.10225 22.0837C6.33078 21.6261 6.78368 21.2648 7.1413 20.9082C7.19959 20.85 7.25788 20.7917 7.31615 20.7334C7.4735 20.5762 7.63095 20.419 7.78843 20.2618C7.93658 20.114 8.08464 19.966 8.23271 19.818C8.52574 19.5252 8.81885 19.2325 9.11201 18.9398C9.39657 18.6557 9.6811 18.3716 9.96557 18.0874C9.99193 18.061 9.99193 18.0611 10.0188 18.0342C10.107 17.9461 10.1952 17.858 10.2833 17.7699C11.0133 17.0407 11.7434 16.3116 12.4735 15.5826C12.4274 15.4809 12.3786 15.4082 12.2995 15.3296C12.2783 15.3083 12.2571 15.2871 12.2352 15.2652C12.2002 15.2306 12.2002 15.2306 12.1645 15.1954C12.1398 15.1707 12.115 15.146 12.0895 15.1205C12.0062 15.0375 11.9227 14.9548 11.8392 14.872C11.7796 14.8126 11.7199 14.7532 11.6603 14.6938C11.5317 14.5658 11.403 14.4378 11.2743 14.31C11.0878 14.1248 10.9016 13.9394 10.7155 13.7539C10.4131 13.4525 10.1106 13.1512 9.808 12.85C9.78989 12.832 9.77178 12.8139 9.75312 12.7954C9.4964 12.5399 9.23958 12.2845 8.98271 12.0292C8.96464 12.0112 8.94657 11.9932 8.92796 11.9747C8.90991 11.9568 8.89187 11.9389 8.87327 11.9204C8.57183 11.6207 8.27067 11.3208 7.96973 11.0206C7.80086 10.8522 7.63186 10.6839 7.46252 10.516C7.30313 10.3579 7.14407 10.1995 6.98526 10.0409C6.92702 9.98283 6.86867 9.9249 6.81018 9.8671C6.73011 9.78793 6.65048 9.70832 6.57095 9.6286C6.54793 9.60605 6.52491 9.5835 6.50119 9.56027C6.09564 9.15044 5.95051 8.70683 5.94959 8.1437C5.95547 7.74367 6.07447 7.44478 6.31476 7.12717C6.33666 7.09579 6.35856 7.06442 6.38113 7.03209C7.00512 6.35337 7.98317 6.32824 8.73555 6.78277Z"
                  fill="#727E95"
                />
              </svg>
            </swiper-slide>
          </swiper>
        </div>
        <div class="clearBox" @click="allClear">
          {{ filterFn("otherText", "clearAll") }}
        </div>
      </div>
      <div class="hotMain">
        <div class="gameMain">
          <!-- <pc-game-item v-for="(item, index) in gameList" :key="index"
              v-show="currentType === 'all' || item.type === currentType" 
              :game="item" class="gameBox animate__animated animate__fadeInRight"></pc-game-item> -->

          <template v-for="(item, index) in gameList">
            <GameCard
              v-if="pcGameShow(item)"
              :key="index"
              :game="item"
              :currentType="currentType"
              :itemActive="'全部'"
              :lang="lang"
              class="gameBox animate__animated animate__fadeInRight"
            >
            </GameCard>
          </template>
          <div v-if="shouldShowNoData" class="noDataMessage">
            {{ filterFn("otherText", "noResultsFound") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import GameCard from "~/components/GameDisplay/GameCard.vue";

const lang = useBaseStore().lang;

const filterFn = useHomeStore().getDataByTypeAndKey;

const gameList = useHomeStore().gameList;

const filteredTagList = computed(() => {
  return [];
});

const filteredTagList2 = computed(() => {
  return [];
});

const currentType = ref("all");

const pcGameShow = () => true;

const shouldShowNoData = () => true;

const resultBox = reactive([]);
</script>

<style lang="less" scoped>
@design-width: 1920;
.px2vw(@name, @px) {
  @{name}: (@px / @design-width) * 100vw;
}
//全屏按钮
video::-webkit-media-controls-fullscreen-button {
  display: none !important;
  -webkit-appearance: none;
}
//播放按钮
video::-webkit-media-controls-play-button {
  display: none !important;
  -webkit-appearance: none;
}
//进度条
video::-webkit-media-controls-timeline {
  display: none !important;
  -webkit-appearance: none;
}
//观看的当前时间
video::-webkit-media-controls-current-time-display {
  display: none !important;
  -webkit-appearance: none;
}
//剩余时间
video::-webkit-media-controls-time-remaining-display {
  display: none !important;
  -webkit-appearance: none;
}
//音量按钮
video::-webkit-media-controls-mute-button {
  display: none !important;
  -webkit-appearance: none;
}
video::-webkit-media-controls-toggle-closed-captions-button {
  display: none !important;
  -webkit-appearance: none;
}
//音量的控制条
video::-webkit-media-controls-volume-slider {
  display: none !important;
  -webkit-appearance: none;
}
//所有控件
video::-webkit-media-controls-enclosure {
  display: none !important;
  -webkit-appearance: none;
}
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

.allGames {
  width: 100%;
  z-index: 88;

  &::after {
    content: "";
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: url(/img/pc/allgamesbg2.jpg) no-repeat;
    background-size: cover;
    z-index: 1;
  }

  .container123 {
    position: relative;
    z-index: 9;
    margin: 0 auto;
    width: 90%;
    max-width: 1200px;
  }
  .hotText {
    .px2vw(height, 60);
    font-size: 45 ./ @design-width * 100vw;
    color: #fff;
    font-weight: 700;
    width: 100%;
    text-align: center;
    margin: 7.8vw auto 0;
  }
  .hotMain {
    padding-top: 40px;
    .hotNav {
      .px2vw(width, 325);
      // .px2vw(height, 670);
      height: 410 ./ @design-width * 100vw;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.7);
      border-radius: 30 ./ @design-width * 100vw;
      .newItem {
        .px2vw(width, 166);
        .px2vw(height, 56);
        // width: 166 / @design-width * 100vw;
        // height: 56 / @design-width * 100vw;
        background-size: contain;
        border-radius: 50 ./ @design-width * 100vw;
        font-size: 20 ./ @design-width * 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        word-break: break-all;
        word-wrap: break-word;
        padding: 0 10 ./ @design-width * 100vw;
        margin: 20 ./ @design-width * 100vw;
        text-align: center;
        cursor: url("/img/pc/finger.png"), auto;
        &:nth-child(1) {
          margin-top: 30 ./ @design-width * 100vw;
        }
      }
      .active {
        background-image: linear-gradient(90deg, #7e429c 0%, #5b1fab 100%);
        background-size: contain;
      }
    }
    .noDataMessage {
      text-align: center;
      margin: 0 auto;
      color: #fff;
      height: 500 ./ @design-width * 100vw;
      line-height: 500 ./ @design-width * 100vw;
      font-size: 28 ./ @design-width * 100vw;
    }
    .gameMain {
      display: grid;
      grid-template-columns: repeat(5, 1fr); /* 每行5列 */
      gap: 1.25vw;
      /* 手机设备样式 */
      @media (max-width: 768px) {
        // grid-template-columns: repeat(3, 1fr); /* 每行3列 */
      }
      .gameBox {
        cursor: url("/img/pc/finger.png"), auto;
      }
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
}
.cursorBox {
  cursor: url("/img/pc/cursor.png"), auto;
}

.resultBox {
  margin: 0 180 ./ @design-width * 100vw;
  margin-top: 28 ./ @design-width * 100vw;
  display: flex;
  justify-content: space-between;
  margin-right: 183 ./ @design-width * 100vw;
  /deep/ .swiper-wrapper {
    width: unset !important;
  }
  .lf {
    display: flex;
    margin-right: 28 ./ @design-width * 100vw;
    // width: calc(100% - 28px);
    // flex-wrap: wrap;
    flex: 1;
    overflow: hidden;
    position: relative;
    .span {
      position: absolute;
      background: linear-gradient(270deg, #2d1c14 63%, #0d131c00);
      right: -142 ./ @design-width * 100vw;
      width: 198 ./ @design-width * 100vw;
      z-index: 2;
      height: 100%;
    }
  }
  .item {
    width: auto;
    background-color: #201818cc;
    padding: 0 20 ./ @design-width * 100vw;
    margin-bottom: 10 ./ @design-width * 100vw;
    align-items: center;
    display: flex;
    border-radius: 25 ./ @design-width * 100vw;
    color: #93acd3;
    font-size: 22 ./ @design-width * 100vw;
    height: 50 ./ @design-width * 100vw;
    margin-right: 20 ./ @design-width * 100vw;
    span {
      margin-right: 15 ./ @design-width * 100vw;
      width: max-content;
      font-weight: 600;
    }
    svg {
      cursor: url("/img/pc/finger.png"), auto;
    }
  }
  .clearBox {
    width: 130 ./ @design-width * 100vw;
    height: 50 ./ @design-width * 100vw;
    font-size: 22 ./ @design-width * 100vw;
    color: #fff;
    opacity: 0.8;
    border-radius: 25 ./ @design-width * 100vw;
    cursor: url("/img/pc/finger.png"), auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    background: #a82e2e;
    // position: relative;
    // z-index: 2;
    // &::after {
    //   background: linear-gradient(270deg, #0d131c 63%, #0d131c00);
    //   content: "";
    //   height: 120%;
    //   left: 0;
    //   pointer-events: none;
    //   position: absolute;
    //   top: -10%;
    //   transform: translate(-40%);
    //   width: 150%;
    //   z-index: -1;
    // }
  }
}

.screenBox {
  margin: 0 auto;
  margin: 0 0;
  .seriesBox {
    display: flex;
    background-color: rgba(0, 0, 0, 0.3);
    margin: 10 ./ @design-width * 100vw;
    overflow-y: auto;
    border-radius: 15 ./ @design-width * 100vw;
    .item {
      .px2vw(height, 46);
      width: auto !important;
      min-width: 166 ./ @design-width * 100vw;
      line-height: 46 ./ @design-width * 100vw;
      padding: 0 20 ./ @design-width * 100vw;
      flex-shrink: 0;
      text-align: center;
      cursor: url("/img/pc/finger.png"), auto;
    }
  }
  .itemActive {
    color: #e7b368;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      width: 80%;
      height: 3px;
      background: #e7b368;
      left: 10%;
      bottom: 0;
    }
  }
  .hotNav {
    width: 100%;
    display: flex;
    border-radius: 30 ./ @design-width * 100vw;
    .mySwiperBox {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      span {
        font-weight: 600 !important;
        font-size: 25 ./ @design-width * 100vw;
      }
      img {
        margin-right: 10 ./ @design-width * 100vw;
      }
    }
    .newItem {
      &:first-child {
        margin-left: 0;
      }
      .px2vw(min-width, 192) !important;
      .px2vw(height, 74);
      width: auto !important;
      background-color: rgba(0, 0, 0, 0.7);
      // width: 166 / @design-width * 100vw;
      // height: 56 / @design-width * 100vw;
      background-size: contain;
      border-radius: 15 ./ @design-width * 100vw;
      font-size: 20 ./ @design-width * 100vw;
      display: flex;
      justify-content: center;
      align-items: center;
      word-break: break-all;
      word-wrap: break-word;
      padding: 0 10 ./ @design-width * 100vw;
      margin: 10 ./ @design-width * 100vw 22 ./ @design-width * 100vw;
      text-align: center;
      cursor: url("/img/pc/finger.png"), auto;
    }
    .active {
      background-image: linear-gradient(90deg, #7e429d 0%, #5b1fab 100%);
      background-size: contain;
    }
  }
}
.hide {
  display: none !important;
}
.swiper-container {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}
.searchBox {
  display: flex;
  margin-top: 18 ./ @design-width * 100vw;
  margin-right: 3 ./ @design-width * 100vw;
  gap: 15 ./ @design-width * 100vw;
  .lfSearch {
    flex: 1;
    /deep/ .el-input__inner {
      font-size: 22 ./ @design-width * 100vw;
      font-weight: 600;
      height: 50 ./ @design-width * 100vw;
      background-color: #201818cc;
      border: 1px solid #201818cc;
      border-radius: 10 ./ @design-width * 100vw;
      color: #c0c4cc;
      padding-left: 40 ./ @design-width * 100vw;
    }
    .el-icon-search {
      font-size: 22 ./ @design-width * 100vw;
      position: relative;
      top: 0 ./ @design-width * 100vw;
      color: #b9b9b9;
      display: flex;
      align-items: center;
      margin-left: 7 ./ @design-width * 100vw;
    }
  }
  .elasticBox {
    position: relative;
    width: 285 ./ @design-width * 100vw;
    height: 50 ./ @design-width * 100vw;
    background-color: #201818cc;
    border-radius: 10 ./ @design-width * 100vw;
    cursor: url("/img/pc/finger.png"), auto;
    display: flex;
    align-items: center;
    .noResultsFound {
      color: #52617a;
      text-align: center;
      height: 10px;
      line-height: 10px;
    }
    &.active {
      background: #3f444ccc;
    }
    .screen {
      display: flex;
      padding: 0 12 ./ @design-width * 100vw;
      svg {
        position: absolute;
        top: 20 ./ @design-width * 100vw;
        right: 12 ./ @design-width * 100vw;
      }
    }
    .name {
      color: #fff;
      margin-left: 10 ./ @design-width * 100vw;
      font-size: 22 ./ @design-width * 100vw;
      position: relative;
      top: 4 ./ @design-width * 100vw;
      font-weight: 600;
    }
  }
  .itemList {
    margin-top: 10 ./ @design-width * 100vw;
    max-height: 240 ./ @design-width * 100vw;
    overflow-y: auto;
    padding: 0 10 ./ @design-width * 100vw;
    padding-right: 2px;
    &::-webkit-scrollbar {
      width: 5 ./ @design-width * 100vw;
      // height: 100 ./ @design-width * 100vw;
      // background: #727E95;
    }
    &::-webkit-scrollbar-thumb {
      background: #727e95;
      border-radius: 5 ./ @design-width * 100vw;
    }
    &::-webkit-scrollbar-track {
      background-color: #0d0d10; /* 轨道颜色 */
      border-radius: 5 ./ @design-width * 100vw; /* 圆角 */
    }
    .item {
      display: flex;
      justify-content: space-between;
      color: #727e95;
      height: 35 ./ @design-width * 100vw;
      align-items: center;
      padding: 0 10 ./ @design-width * 100vw;
      margin-top: 5 ./ @design-width * 100vw;
      border-radius: 5 ./ @design-width * 100vw;
      &:hover {
        color: #93acd3;
        .el-checkbox__label {
          color: #93acd3;
        }
        /deep/ .el-checkbox__label {
          color: #93acd3;
        }
      }
      // &:hover {
      //   background: #3f4556;
      // }
    }
    .lf {
      width: 100%;
      /deep/ .el-checkbox {
        width: 100%;
        cursor: url("/img/pc/finger.png"), auto;
      }
    }
    .lf /deep/ .el-checkbox__label {
      font-size: 22 ./ @design-width * 100vw;
      position: relative;
      top: 2 ./ @design-width * 100vw;
      font-weight: 600;
    }
    .rf {
      font-size: 22 ./ @design-width * 100vw;
      position: relative;
      top: 2 ./ @design-width * 100vw;
    }
    .check {
      color: #fff !important;
      background: #3f4556;
      /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
        color: #fff;
      }
      /deep/ .el-checkbox__input {
        // width: 20 ./ @design-width * 100vw;
        // height: 20 ./ @design-width * 100vw;
        // background: #727e95;
        position: relative;
      }
      /deep/ .el-checkbox__original {
        // background: url('/img/pc/cursor.png');
        // background-repeat: no-repeat;
      }
      /deep/ .el-checkbox__inner::after {
        display: none;
        // background: url('/img/pc/cursor.png');
        // background-repeat: no-repeat;
      }
      /deep/ .el-checkbox__inner::before {
        // display: none;
        box-sizing: content-box;
        content: "";
        border-left: 0;
        border-top: 0;
        height: 7px;
        left: 4px;
        position: absolute;
        top: 1px;
        background: url("/img/gameDispllay/3835.png");
        background-repeat: no-repeat;
        opacity: 1;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 9;
      }
    }
    /deep/ .el-checkbox__label {
      color: #727e95;
    }
    /deep/ .el-checkbox__inner {
      width: 20 ./ @design-width * 100vw;
      height: 20 ./ @design-width * 100vw;
      background: #727e95;
      border: none;
    }
  }
  .itemBox {
    // display: none;
    position: absolute;
    background: #252630;
    cursor: url("/img/pc/cursor.png"), auto;
    width: 100%;
    top: 60 ./ @design-width * 100vw;
    // padding: 10 ./ @design-width * 100vw;
    z-index: 999;
    border-radius: 10 ./ @design-width * 100vw;
    padding-bottom: 10 ./ @design-width * 100vw;
    .ipt {
      padding: 10 ./ @design-width * 100vw;
      padding-bottom: 0;
      /deep/ .el-input__inner {
        background: #15181d;
        color: #b5b4b4;
        font-size: 22 ./ @design-width * 100vw;
        border-radius: 5 ./ @design-width * 100vw;

        border: 1px solid transparent;
        font-weight: 600;
      }
      /deep/ .el-input__inner:focus {
        // border-color: #93ACD3;
      }
      /deep/ .el-input__inner:hover {
        // border-color: #93ACD3;
      }
    }
  }
}
</style>
