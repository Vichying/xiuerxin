<template>
  <div class="update">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      style="margin-bottom: 20px"
    >
      <el-form-item
        label="文章标题:"
        :label-width="formLabelWidth"
        prop="title"
      >
        <el-input v-model="ruleForm.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="文章类型:"
        :label-width="formLabelWidth"
        prop="types_id"
      >
        <el-select v-model="ruleForm.types_id" placeholder="请选择">
          <el-option
            v-for="item in types"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="文章来源:"
        :label-width="formLabelWidth"
        prop="source"
      >
        <el-select v-model="ruleForm.source" placeholder="请选择">
          <el-option
            v-for="item in source"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否推荐:" :label-width="formLabelWidth">
        <el-radio v-model="ruleForm.recommend" label="1">是</el-radio>
        <el-radio v-model="ruleForm.recommend" label="0">否</el-radio>
      </el-form-item>
      <el-form-item
        label="推荐封面:"
        :label-width="formLabelWidth"
        prop="imgid"
      >
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :file-list="ruleForm.fileList1"
          :on-change="handleChange1"
          :auto-upload="false"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item
        style="height: 420px"
        label="内容:"
        :label-width="formLabelWidth"
      >
        <editor @editor="editorCon" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import editor from "./editor.vue";
export default {
  name: "insert",
  data() {
    return {
      ruleForm: {
        title: "",
        types_id: "",
        recommend: "0",
        source: "",
        fileList1: [],
        imgid: "",
        contents: "",
      },
      dialogVisible: false,
      dialogImageUrl: "",
      types: [],
      source: [],
      formLabelWidth: "120px",
      imgurls: "",
      rules: {
        title: [{ required: true, trigger: "blur", message: "请填文章标题" }],
        types_id: [
          { required: true, trigger: "blur", message: "请选择文章类型" },
        ],
        source: [
          { required: true, trigger: "blur", message: "请选择文章来源" },
        ],
        imgid: [{ required: true, trigger: "blur", message: "请上次推荐图片" }],
      },
    };
  },
  props: {},
  components: {
    editor,
  },
  created() {
    this.Bind();
  },
  methods: {
    ...mapActions({
      insertArt: "loginModule/insertArt",
      getArtTypeList: "loginModule/getArtTypeList",
      getArtSourceList: "loginModule/getArtSourceList",
      uploadFile: "loginModule/uploadFile",
      insertJournal: "loginModule/insertJournal",
    }),
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    editorCon(val) {
      this.ruleForm.contents = val;
    },
    handleChange1(file, fileList) {
      var formdata = new FormData();
      formdata.append("formdata", file.raw);
      this.uploadFile(formdata).then((res) => {
        if (res.code == 1) {
          this.ruleForm.imgid = res.data.formdata[0];
          this.ruleForm.fileList1 = fileList.slice(-1);
          this.imgurls = res.data.formdata_details[0].urls;
        } else {
          this.$message({
            type: "warning",
            message: res.msg,
          });
        }
      });
    },
    cancel() {
      this.$emit("formok", false);
    },
    Bind() {
      let data = {
        token : this.$store.state.token,
        column: ["*"],
        filter: {},
        offset: 0,
        limit: 0,
      };
      this.getArtTypeList(data).then((res) => {
        if (res.code == 1) {
          for (let i = 0; i < res.data.list.length; i++) {
            this.types.push({
              value: res.data.list[i].id,
              label: res.data.list[i].name,
            });
          }
        }
      });
      this.getArtSourceList(data).then((res) => {
        if (res.code == 1) {
          for (let i = 0; i < res.data.list.length; i++) {
            this.source.push({
              value: res.data.list[i].id,
              label: res.data.list[i].name,
            });
          }
        }
      });
    },
    getNameType(val) {
      for (let i = 0; i < this.types.length; i++) {
        if (parseInt(this.types[i].value) == parseInt(val)) {
          return this.types[i].label;
        }
      }
    },
    getSource(id) {
      for (let i = 0; i < this.source.length; i++) {
        if (parseInt(id) == parseInt(this.source[i].value)) {
          return this.source[i].label;
        }
      }
    },
    submit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          let a = {
            token : this.$store.state.token,
            title: this.ruleForm.title, //标题
            types_id: this.ruleForm.types_id, //文章类型id
            contents: this.ruleForm.contents, //内容
            image_link: this.ruleForm.imgid, //图片id  非必填
            recommend: this.ruleForm.recommend, //是否推荐    1推荐 0不推荐
            source: this.ruleForm.source, //文章来源id
          };
          this.insertArt(a).then((res) => {
            if (res.code == 1) {
              this.$message({
                message: "操作成功！",
                type: "success",
              });
              let data = {
                plate: "文章管理",
                plateRouter: "/article",
                user: this.$store.state.userInfo.identity_name,
                // userId:this.$store.state.user.info.userId,
                userId: 111,
                action: 1,
                time: new Date(),
                content: {
                  文章标题: this.ruleForm.title,
                  文章类型: this.getNameType(this.ruleForm.types_id),
                  文章来源: this.getSource(this.ruleForm.source),
                  是否推荐:
                    parseInt(this.ruleForm.recommend) == 1 ? "是" : "否",
                  推荐封面: `<img style="max-height: 100%;max-width: 100%;" src="${this.imgurls}"/>`,
                  内容: this.ruleForm.contents,
                },
              };
              this.insertJournal(data);
              this.$emit("formok", "aaa");
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.dialog-footer {
  text-align: right;
}
</style>