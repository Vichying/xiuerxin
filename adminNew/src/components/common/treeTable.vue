<template>
  <div>
    <div v-if="treeData && treeData.length != 0">
      <div class="head">
        <ul>
          <li>系统</li>
          <li>一级菜单</li>
          <li>二级菜单</li>
          <li>操作</li>
        </ul>
      </div>
      <div class="tableBox">
        <div class="ord">
          <div v-for="item in treeData" :key="item.id" class="box">
            <div class="fu">
              <el-checkbox
                :disabled="isSelect"
                v-model="item.checked"
                @change="checkedBtn(item)"
                >{{ item.name }}</el-checkbox
              >
            </div>
            <div class="zi">
              <div class="item" v-for="it in item.child" :key="it.id">
                <div class="er">
                  <el-checkbox
                    :disabled="isSelect"
                    v-model="it.checked"
                    @change="checkedBtn(it)"
                    >{{ it.name }}</el-checkbox
                  >
                </div>
                <div class="opt">
                            <span v-for="its in it.child" :key="its.id">
                    <el-checkbox
                      :disabled="isSelect"
                      v-model="its.checked"
                      @change="checkedBtn(its)"
                      >{{ its.name }}</el-checkbox
                    ></span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sys">
          <el-checkbox
            v-model="checkAll"
            @change="checkAllFunc"
            :disabled="isSelect"
            >修尔信后台</el-checkbox
          >
        </div>
      </div>
    </div>
    <div v-else>
      <h3 style="text-align: center">暂无内容！</h3>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      checkAll: false,
      selectId: [],
      tree: [],
      old_tree: [],
    };
  },

  props: ["treeData", "row", "isSelect"],
  computed: {
    ...mapGetters(["getToken"]),
  },
  created() {},
  methods: {
    ...mapActions({
      sysrolesUpdate: "loginModule/sysrolesUpdate",
      insertJournal: "loginModule/insertJournal",
    }),
    dab(obj) {
      let arr = [];
      obj.forEach((v) => {
        if (v.child && v.child.length != 0) {
          arr.push(v);
          v.child.forEach((a) => {
            a.pid = v.id;
            arr.push(a);
            if (a.child && a.child.length != 0) {
              a.child.forEach((b) => {
                b.pid = a.id;
                arr.push(b);
              });
            }
          });
        }
      });
      this.treeData.forEach((v) => {
        arr.forEach((i) => {
          if (v.id == i.id) {
            v.checked = true;
          }
          if (v.child && v.child.length != 0) {
            v.child.forEach((a) => {
              if (a.id == i.id && i.pid == v.id) {
                a.checked = true;
              }
              if (a.child && a.child.length != 0) {
                a.child.forEach((b) => {
                  if (b.id == i.id && i.pid == a.id) {
                    b.checked = true;
                  }
                });
              }
            });
          }
        });
      });
      // console.log(this.treeData, "tree");
      this.checkAll = this.treeData.some((v) => {
        return v.checked == true;
      });

      this.old_tree = JSON.parse(JSON.stringify(this.treeData));
      this.$forceUpdate();
    },
    logOption(content, tag, beforeCon) {
      let data = {
        plate: "角色管理",
        plateRouter: "/character",
        user: this.$store.state.userInfo.identity_name,
        // userId:this.$store.state.user.info.userId,
        userId: 111,
        action: tag,
        time: new Date(),
        content: content,
      };
      if (beforeCon) {
        data.beforeCon = beforeCon;
      }
      this.insertJournal(data);
    },
    async sysrolesUpdateFun() {
      if (this.selectId && this.selectId.length == 0) {
        this.$emit("hideDia");
        return;
      }
      // console.log(this.row);
      let opt = {
        token: this.getToken,
        id: this.row.id, //角色id
        role_name: this.row.role_name, //角色名称
        check_ids: this.selectId,
      };
      let res = await this.sysrolesUpdate(opt);
      if (res.code != 1) {
        return this.$message.error(res.msg);
      }
      this.$message.success("设置成功！");
      this.selectId = [];
      this.$emit("func");
      // console.log(this.tree, "tree");
      // console.log(this.old_tree, "old1");
      let beforeCon = {
        角色ID: this.row.id,
        角色名称: this.row.role_name,
        是否启用: this.row.status == 1 ? "启用" : "禁用",
        创建时间: this.row.create_time,
        设置权限: JSON.stringify(this.old_tree),
      };
      let content = {
        角色ID: this.row.id,
        角色名称: this.row.role_name,
        是否启用: this.row.status == 1 ? "启用" : "禁用",
        创建时间: this.row.create_time,
        设置权限: JSON.stringify(this.tree),
      };
      this.logOption(content, 2, beforeCon);
    },
    getSelectId() {
      this.selectId = [];
      this.treeData.forEach((v) => {
        if (v.checked) {
          let o = {};
          o.id = v.id;
          if (v.child && v.child.length != 0) {
            o.child = [];
            v.child.forEach((a) => {
              if (a.checked) {
                let o1 = {};
                o1.id = a.id;
                if (a.child && a.child.length != 0) {
                  o1.child = [];
                  a.child.forEach((b) => {
                    if (b.checked) {
                      let o2 = {};
                      o2.id = b.id;
                      o1.child.push(o2);
                    }
                  });
                }
                o.child.push(o1);
              }
            });
          }
          this.selectId.push(o);
        }
      });
      // console.log(this.selectId);
    },
    checkedBtn(item) {
      this.checkFn(item);
      if (item.type == 1) {
        // 点击一级
      } else if (item.type == 2) {
        // 点击二级
        if (item.checked) {
          this.treeData.find((v) => {
            return item.pid == v.id;
          }).checked = item.checked;
        } else {
          this.treeData.forEach((v) => {
            if (v.child && v.child.length != 0) {
              v.checked = v.child.some((a) => {
                return a.checked == true;
              });
            }
          });
        }
      } else {
        // 点击三级
        if (item.checked) {
          this.treeData.forEach((v) => {
            v.child.forEach((a) => {
              if (a.child && a.child.length != 0) {
                let bool = a.child.some((b) => {
                  return b.checked == true;
                });
                if (bool) {
                  a.checked = true;
                }
              }
              if (v.child && v.child.length != 0)
                v.checked = v.child.some((c) => {
                  return c.checked == true;
                });
            });
          });
        }
      }
      this.checkAll = this.treeData.some((v) => {
        return v.checked == true;
      });
      this.tree = JSON.parse(JSON.stringify(this.treeData));
      this.getSelectId();
      this.$forceUpdate();
    },
    checkFn(item) {
      if (item.child && item.child.length != 0) {
        item.child.forEach((v) => {
          v.checked = item.checked;
          this.checkFn(v);
        });
      }
    },
    checkAllFunc() {
      this.treeData.forEach((v) => {
        v.checked = this.checkAll;
        this.checkFn(v);
      });
      this.getSelectId();
      this.tree = JSON.parse(JSON.stringify(this.treeData));
    },
  },
};
</script>

<style lang="scss" scoped>
.head {
  ul {
    display: flex;
    li {
      list-style: none;
      text-align: center;
      line-height: 40px;
      border: 1px solid #ccc;
      border-bottom: 0;
      border-right: 0;
      width: 160px;
      &:last-child {
        flex: 1;
        border-right: 1px solid #ccc;
      }
    }
  }
}
.tableBox {
  display: flex;
  .sys {
    order: 2;
    width: 160px;
    border: 1px solid #ccc;
    border-right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ord {
    flex: 1;
    order: 3;
  }
  .box {
    display: flex;
    border: 1px solid #ccc;
    border-top: 0;
    &:first-child {
      border-top: 1px solid #ccc;
    }
  }
  .fu {
    width: 160px;
    display: flex;
    align-items: center;
    border-right: 1px solid #ccc;
    padding-left: 20px;
    box-sizing: border-box;
  }
  .zi {
    flex: 1;
    line-height: 40px;
    min-height: 40px;
    .item {
      display: flex;
      width: 100%;
      border-bottom: 1px solid #ccc;
      &:last-child {
        border-bottom: 0;
      }
    }
    .er {
      width: 160px;
      border-right: 1px solid #ccc;
      padding-left: 20px;

      display: flex;
      align-items: center;
    }
    .opt {
      flex: 1;

      span {
        margin: 0 20px;
      }
    }
  }
}
</style>