import { defineStore } from "pinia";
import fakeData from "@/assets/fakeData.json";

interface HomeStore {
  data: any;
}

export const useHomeStore = defineStore("homeStore", {
  state: (): HomeStore => ({
    data: fakeData,
  }),
  getters: {
    parseVal(): any[] {
      const { items } = this.data;
      return items.map((el: any) => {
        return {
          ...el,
          ...JSON.parse(el.jsonString),
        };
      });
    },
    // 语言
    languageData(): any {
      return this.parseVal.filter((el: any) => el.type === "language");
    },
    // 轮播图
    swiperData(): any {
      return this.parseVal.filter((ele: any) => ele.type === "carousel");
    },
    // 热门游戏
    hotGameList(): any {
      return this.parseVal.filter((ele: any) => ele.type === "popularGame");
    },
    // 关于我们
    aboutUs(): any[] {
      return this.parseVal.filter((el) => el.type === "aboutUs");
    },
    aboutData(): any[] {
      const keys = ["tableData1", "tableData2", "tableData3", "tableData4"];
      const result: any[] = [];
      this.aboutUs.forEach((el) => {
        if (keys.includes(el.key2) && el.name === "简体中文") {
          const index = parseInt(el.key2.match(/\d+/)[0]) - 1;
          result[index] = el;
        }
      });
      return result;
    },
    // 游戏展示
    gamePresentation(): any[] {
      return this.parseVal.filter((el: any) => el.type === "gamePresentation");
    },
    gameShowCaseList(): any[] {
      return new Array(5).fill(0).map((_, index) => {
        return this.gamePresentation.filter(
          (el) => el.key2 === `tableData${index + 1}`,
        );
      });
    },
    gameList(): any[] {
      return this.parseVal
        .filter((el: any) => el.type === "config")
        .filter((el) => el.isShow);
    },
  },
  actions: {
    getDataByTypeAndKey(type: string, key: string): string {
      const targetType = this.parseVal.filter((el: any) => el.type === type);
      const item = targetType.find((el: any) => el.key1 === "简体中文");
      return item ? item[key] : "";
    },
    officialCertificationImg(val: string, key: string): string {
      const targetType = this.parseVal.filter((el) => el.type === val);
      const item = targetType.find((ele) => ele.name === key);
      return item
        ? "https://gfgadmin.dr5kr.live/td/api/photo/" + item["computerSrc"]
        : "";
    },
  },
});
