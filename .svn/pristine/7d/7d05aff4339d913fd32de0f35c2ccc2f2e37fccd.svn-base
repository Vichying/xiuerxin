<template>
  <div class="details1">
    <ul>
      <li>
        <p>
          <span>操作板块：</span><span>{{ datas.plate }}</span>
        </p>
      </li>
      <li>
        <p>
          <span>操作人：</span><span>{{ datas.user }}</span>
        </p>
      </li>
      <li>
        <p>
          <span>操作时间：</span><span>{{ getTime(datas.time) }}</span>
        </p>
      </li>
      <li>
        <p>
          <span>操作后：</span>
          <span>
            <p>
              {{
                datas.action == 1 ? "新增" : datas.action == 2 ? "修改" : "删除"
              }}
            </p>
            <div
              @click="isSet && showSet(2)"
              v-if="datas.plateRouter != '/examine'"
              class="content"
              v-html="contentZh(datas.content, 2)"
            ></div>
            <div v-else class="content">
              <el-link @click="goDetails" type="primary">查看详情</el-link>
            </div>
          </span>
        </p>
      </li>
      <li v-if="datas.action == 2">
        <p>
          <span>操作前：</span>
          <span>
            <div
              @click="isSet && showSet(1)"
              v-if="datas.plateRouter != '/examine'"
              class="content"
              v-html="contentZh(datas.beforeCon, 1)"
            ></div>
            <div
              v-else
              class="content"
              v-html="contentBefore(datas.beforeCon)"
            ></div>
          </span>
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import help from "@/assets/js/common.js";
import treeTable from "@/components/common/treeTable.vue";
export default {
  name: "details1",
  data() {
    return {
      anjianList: [],
      isSet: false,
      old_tree: [],
      tree: [],
    };
  },
  props: {
    datas: {
      type: Object,
    },
  },
  components: { treeTable },
  created() {},

  methods: {
    goDetails() {
      console.log(this.datas.content);
      let content = this.datas.content["请进入详情查看"];
      let { href } = this.$router.resolve({
        path: "/examineDetails",
        query: { isPersonal: content.isPersonal, mainsId: content.id },
      });
      window.open(href, "_blank");
    },
    showSet(tag) {
      let data = [];
      if (tag == 1) {
        data = this.old_tree;
      } else {
        data = this.tree;
      }
      this.$emit("func", data);
    },

    getTime(time) {
      return this.dayjs(time).format("YYYY-MM-DD HH:mm:ss");
    },
    contentZh(val, tag) {
      let str = "";
      for (var key in val) {
        if (key == "设置权限") {
          this.isSet = true;
          str += `<p>${
            key +
            ":" +
            "<span style='color: #409EFF;font-size:14px;cursor: pointer;'>查看权限</span>"
          }<p>`;

          if (tag == 1) {
            this.old_tree = JSON.parse(val[key]);
          } else {
            this.tree = JSON.parse(val[key]);
          }
        } else {
          str += `<p>${key + ":" + val[key]}<p>`;
        }
      }
      return str;
    },

    contentAffter(val) {
      // console.log(val)
      let str = "";
      for (var key in val) {
        str += `<p>${key + ":" + val[key]}<p>`;
      }
      return str;
    },
    isJson(obj) {
      var isjson =
        typeof obj == "object" &&
        Object.prototype.toString.call(obj).toLowerCase() ==
          "[object object]" &&
        !obj.length;
      return isjson;
    },
    contentBefore(val) {
      // console.log(val)
      let str = "";
      for (var key in val) {
        //   console.log(val[key],'父级')
        if (val[key] instanceof Array && val[key].length > 0) {
          // if((typeof val[key]=='object')&&val[key].constructor==Array){
          //  console.log(val[key],'有数组的')

          for (let i = 0; i < val[key].length; i++) {
            //  console.log(val[key][i],this.isJson(val[key][i]),i)
            if (this.isJson(val[key][i])) {
              //是为对象时
              //  console.log('对象',val[key][i].hasOwnProperty("id"))
              // if(val[key][i].hasOwnProperty("id")){
              //     // this.anjianList.push(val[key][i])
              // }
              for (var keyc in val[key][i]) {
                //  console.log(keyc,'keyc')
                if (keyc != "id") {
                  let str1 = "",
                    str2 = "";
                  if (val[key][i][keyc] instanceof Array) {
                    for (let j = 0; j < val[key][i][keyc].length; j++) {
                      // console.log('数组',val[key][i][keyc][j])
                      str2 += `<p>${keyc}:</p><img style="margin-top:8px;max-width:100%;" src="${val[key][i][keyc][j]}"/>`;
                    }
                  } else {
                    //案件号
                    // console.log('不是数组',val[key][i][keyc])
                    str1 = `<p>${keyc}:${val[key][i][keyc]}</p>`;
                  }
                  str += `<div style="margin-bottom:20px">
                                        ${str1}
                                        <div style="margin-bottom:10px">
                                         ${str2}
                                        </div>
                                      </div>`;
                }
              }
            } else {
              str += `<div style="margin-bottom:20px">
                                <p>${key}:</p><img style="margin-top:8px;max-width:100%;" src="${val[key][i]}"/>
                                </div>`;
            }
          }
        } else {
          str += `<div style="margin-bottom:20px"><p>${key}:</p><img style="margin-top:8px;max-width:100%;" src="${val[key]}"/></div>`;
        }
      }
      return str;
    },
  },
};
</script>
<style lang="scss" scoped>
.details1 {
  ul {
    width: 95%;
    margin: 0 auto;
    li {
      p {
        display: flex;
        font-size: 16px;
        color: #666;
        span {
          display: block;
          width: 15%;
          &:last-child {
            width: 85%;
          }
        }
      }
      list-style: none;
      padding: 15px 0;
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>