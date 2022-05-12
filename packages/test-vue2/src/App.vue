<template>
  <div id="app">
    <HelloWorld v-if="isShow" msg="Welcome to Your Vue.js App" v-move="count" />
    <DynamicForm @submitForm="submitForm" :formItems="formItems"></DynamicForm>
    <el-button type="primary" @click="close">关闭</el-button>
    <el-button @click="count++">add</el-button>
  </div>
</template>

<script lang="jsx">
import HelloWorld from "./components/HelloWorld.vue";
import DynamicForm from "./components/dynamic-form";

export default {
  name: "App",
  data() {
    return {
      formItems: [
        {
          // 可省略
          // tag: 'input',
          formItemProps: {
            label: "测试",
            prop: "inputBox",
          },
          fieldProps: {
            "prefix-icon": "el-icon-search",
          },
          // 默认预设校验规则  var validator = name phone ID url email default 其中一个
          // rules: [{ validator: 'name', required: true, message: '请填写测试输入', trigger: 'blur' }],
          rules: { required: true },
        },
        {
          tag: "radio-group",
          formItemProps: {
            label: "单选框组",
            prop: "radio",
          },
          fieldProps: {
            options: [
              { label: "1", text: "测试radio" },
              { label: "2", text: "测试radio2" },
            ],
          },
          rules: { required: true },
          initialValue: ["2"],
        },
        {
          tag: "checkbox-group",
          formItemProps: {
            label: "多选框组",
            prop: "checkbox",
          },
          fieldProps: {
            options: [
              { label: "1", text: "测试checkbox" },
              { label: "2", text: "测试checkbox2" },
            ],
          },
          rules: { required: true },
          initialValue: ["2"],
        },
        {
          tag: "cascader",
          formItemProps: {
            label: "级联示例",
            prop: "cascaderexample",
          },
          fieldProps: {
            w100: true,
            props: {
              // expandTrigger: 'hover',
              // value: 'id',
              // label: 'catalogName',
              // children: 'subMenu',
              checkStrictly: true,
            },
            options: [
              {
                value: "zhinan",
                label: "指南",
                children: [
                  {
                    value: "shejiyuanze",
                    label: "设计原则",
                    children: [
                      {
                        value: "yizhi",
                        label: "一致",
                      },
                      {
                        value: "fankui",
                        label: "反馈",
                      },
                      {
                        value: "xiaolv",
                        label: "效率",
                      },
                      {
                        value: "kekong",
                        label: "可控",
                      },
                    ],
                  },
                ],
              },
              {
                value: "daohang",
                label: "导航",
                children: [
                  {
                    value: "cexiangdaohang",
                    label: "侧向导航",
                  },
                  {
                    value: "dingbudaohang",
                    label: "顶部导航",
                  },
                ],
              },
            ],
          },
          rules: { required: true },
        },
        {
          tag: "switch",
          // formItems属性
          formItemProps: {
            label: "切换示例",
            prop: "switch",
          },
          // 校验规则
          rules: [{ required: true, message: "此为必填项", trigger: "blur" }],
          initialValue: true,
        },
        {
          tag: "input-number",
          // formItems属性
          formItemProps: {
            label: "数值",
            prop: "number",
          },
          // 标签属性
          fieldProps: {
            w100: true,
            "controls-position": "right",
          },
          // 校验规则
          rules: { required: true },
        },
        {
          tag: "date-picker",
          // formItems属性
          formItemProps: {
            label: "日期范围",
            prop: "date-picker",
          },
          // 标签属性
          fieldProps: {
            type: "daterange",
            "range-separator": "至",
            "start-placeholder": "开始日期",
            "end-placeholder": "结束日期",
            style: {
              // width: '100%',
            },
          },
          // 校验规则
          rules: { required: true },
        },
      ],
      isShow: true,
      count: 0,
    };
  },
  methods: {
    submitForm(values) {
      console.log("form", values);
    },
    close() {
      this.isShow = false;
    },
  },
  components: {
    HelloWorld,
    DynamicForm,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.hello {
  cursor: all-scroll;
}

.move {
  display: flow-root;
  position: relative;
  z-index: 10;
  background: #fff;
  box-shadow: 3px 4px 6px 0px #0000008c;
}
</style>
