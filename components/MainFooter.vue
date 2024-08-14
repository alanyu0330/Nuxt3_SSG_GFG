<template>
  <div class="footer">
    <!-- <div class="footerIcon">
      <img :src="require('@/assets/img/pc/contactUs/1.png')" width="30"/>
      <img :src="require('@/assets/img/pc/contactUs/2.png')" width="30"/>
      <img :src="require('@/assets/img/pc/contactUs/3.png')" width="30"/>
      <img :src="require('@/assets/img/pc/contactUs/4.png')" width="30"/>
      <img :src="require('@/assets/img/pc/contactUs/5.png')" width="30"/>
      <img :src="require('@/assets/img/pc/contactUs/6.png')" width="30"/>
    </div> -->
    <div class="footerImg">
      <img :src="'/img/pc/contactUs/7.png'" />
    </div>
    <!-- <div class="footerLink">
      <span>Privacy Statement</span>
      <span>Terms Of Use</span>
      <span>Regulatory</span>
    </div> -->
    <div class="footerNews">
      {{ footText() }}
    </div>
  </div>
</template>

<script setup>
const footText = () => {
  var name = useHomeStore()
    .parseVal.filter((ele) => ele.type === "guideText")
    .find((ele) => ele.name === useBaseStore().lang);
  return name["bottom"];
};
</script>

<style lang="less" scoped>
@design-width: 1920;
.footer {
  background-color: #0f0f0f;
  padding: 30 ./ @design-width * 100vw 0;
  text-align: center;
  .footerIcon {
    margin-bottom: 80 ./ @design-width * 100vw;
    img {
      margin: 0 5 ./ @design-width * 100vw;
    }
  }
  .footerLink {
    margin: 0px 0 20 ./ @design-width * 100vw;
    span {
      height: 30 ./ @design-width * 100vw;
      line-height: 30 ./ @design-width * 100vw;
      font-weight: 700;
      font-size: 16 ./ @design-width * 100vw;
      display: inline-block;
      padding: 0 20 ./ @design-width * 100vw;
      &:not(:last-child) {
        border-right: 1px solid #fff;
      }
    }
  }
  .footerImg {
    img {
      width: 743 ./ @design-width * 100vw;
    }
    margin-bottom: 50 ./ @design-width * 100vw;
  }
  .footerNews {
    width: 70%;
    margin: 0 auto;
    color: #999;
    line-height: 20 ./ @design-width * 100vw;
    font-size: 16 ./ @design-width * 100vw;
  }
}
</style>
