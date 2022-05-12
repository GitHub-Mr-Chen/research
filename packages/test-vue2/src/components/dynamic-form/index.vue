<script>
import moment from "moment";
import { debounce } from "lodash";
import Field from "./Field";
export default {
  name: "DynamicForm",
  components: { Field },
  props: {
    formProps: {
      type: Object,
      default: () => {},
    },
    labelWidth: {
      type: String,
      default: "100px",
    },
    formItems: {
      type: Array,
      default: () => [],
    },
    // 是否垂直布局
    isVertical: {
      type: Boolean,
      default: true,
    },
    submitText: {
      type: String,
      default: "查询",
    },
    resetText: {
      type: String,
      default: "重置",
    },
  },
  data() {
    return {
      patternHtml: /<[^>]+>/g, // 匹配 html标签
      isExpand: false,
      btnItemLayout: 8,
      formItemsExpand: [],
      ruleForm: {},
      rules: {},
    };
  },
  watch: {
    formItems: {
      handler(val) {
        const ruleForm = {};
        val.forEach(({ formItemProps = {}, initialValue, tag = "input" }) => {
          if (tag === "input" && typeof initialValue === "number") {
            ruleForm[formItemProps.prop] = initialValue?.toString();
          } else {
            ruleForm[formItemProps.prop] = initialValue;
          }
        });
        // 响应式数据
        this.$set(this, "ruleForm", ruleForm);
        this.handlerExpand(this.isExpand);
      },
      deep: true,
      immediate: true,
    },
    isExpand: {
      handler(val) {
        // 查询表单是否需要折叠
        this.handlerExpand(val);
      },
    },
  },
  created() {
    this.isExpand = sessionStorage.getItem("isExpandSearchForm") === "true";
  },
  methods: {
    handlerExpand(val) {
      const isFold = this.formItems.length > 3;
      this.formItemsExpand = this.handleFormItemsExpand(this.formItems);
      if (this.isVertical || (val && isFold)) {
        this.btnItemLayout = 24;
      } else {
        this.formItemsExpand = this.handleFormItemsExpand(
          this.formItems.slice(0, 3)
        );
        const { length } = this.formItems;
        if (length >= 3) {
          this.btnItemLayout = 6;
        }
        if (length === 2) {
          this.btnItemLayout = 12;
        }
        if (length === 1) {
          this.btnItemLayout = 18;
        }
      }
    },
    // 处理 展开 收起 表单渲染
    handleFormItemsExpand(list) {
      return list.map((e, index) => {
        const { fieldProps = {}, rules, formItemProps = {}, tag } = e;
        // 设置默认提示语前缀
        const placeholder = this.handlePlaceholder(tag, formItemProps.label);

        const obj = {
          ...e,
          fieldProps: { placeholder, ...fieldProps },
          key: "item" + index + new Date().getTime(),
        };

        // 设置默认验证规则
        this.handleRules({
          tag,
          formItemProps,
          rules,
          placeholder,
        });
        return obj;
      });
    },
    handlePlaceholder(tag = "input", label) {
      let placeholder = "";
      switch (tag) {
        case "input":
          placeholder = `请输入${label}`;
          break;
        default:
          placeholder = `请选择${label}`;
          break;
      }
      return placeholder;
    },
    /**
     * @description: 默认校验验证规则
     * @param {*} tag 标签
     * @param {*} formItemProps
     * @param {*} rules 规则数组
     * @param {*} placeholder
     * @return {*}
     */
    handleRules({ tag = "input", formItemProps, rules, placeholder }) {
      const defaultRules = Array.isArray(rules) ? rules : [];
      // 必填
      if (rules?.required === true) {
        defaultRules.push({
          required: true,
          message: placeholder,
          trigger: "blur",
        });
      }
      // 默认预设校验规则
      if (tag === "input" && (rules?.validator === "default" || !rules)) {
        defaultRules.push({
          min: 0,
          max: 100,
          message: "长度在 0 到 100 个字符",
          trigger: "blur",
        });
        defaultRules.push(this.validatorDefault());
      }
      // 姓名
      if (rules?.validator === "name") {
        const regexp = /^[\u4E00-\u9FA5]{2,8}$/;
        defaultRules.push(
          this.validatorDefault(regexp, `${formItemProps.label}输入错误`)
        );
      }
      // 手机号码
      if (rules?.validator === "phone") {
        const regexp =
          /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        defaultRules.push(
          this.validatorDefault(regexp, `${formItemProps.label}输入错误`)
        );
      }
      // 身份证
      if (rules?.validator === "ID") {
        const regexp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        defaultRules.push(
          this.validatorDefault(regexp, `${formItemProps.label}输入错误`)
        );
      }
      if (rules?.validator === "url") {
        const regexp = /[a-zA-z]+:\/\/[^\s]*/;
        defaultRules.push(
          this.validatorDefault(regexp, `${formItemProps.label}输入错误`)
        );
      }
      if (rules?.validator === "email") {
        const regexp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        defaultRules.push(
          this.validatorDefault(regexp, `${formItemProps.label}输入错误`)
        );
      }
      this.rules[formItemProps.prop] = defaultRules;
    },
    validatorDefault(regexp, erroeText) {
      return {
        validator: (rule, value, callback) => {
          if (regexp) {
            if (regexp.test(value) || !value) {
              callback();
            } else {
              callback(new Error(erroeText || "输入有误"));
            }
          }
          // else if (/[`~!@#$%^&*()_+<>?:"{},/;'[\]]/.test(value)) {
          //   callback(new Error(erroeText || '请勿输入特殊字符'));
          // }
          else {
            callback();
          }
        },
        trigger: "blur",
      };
    },
    // 表单展开收起设置
    expandForm() {
      this.isExpand = !this.isExpand;
      // 保存数据到 sessionStorage
      sessionStorage.setItem("isExpandSearchForm", this.isExpand);
    },
    submitForm: debounce(
      // eslint-disable-next-line func-names
      function () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.changeParams("submitForm");
          } else {
            console.error("error submit!!");
            return false;
          }
        });
      },
      1000,
      {
        leading: true,
        trailing: false,
      }
    ),
    resetForm: debounce(
      // eslint-disable-next-line func-names
      function () {
        this.$refs.ruleForm.resetFields();
        this.changeParams("resetForm");
      },
      1000,
      {
        leading: true,
        trailing: false,
      }
    ),
    changeParams(emitName) {
      const params = {};
      this.formItems.forEach(({ formItemProps = {}, tag, fieldProps = {} }) => {
        const { type } = fieldProps;
        const { prop } = formItemProps;
        params[prop] = this.ruleForm[prop];
        // 级联组件
        if (tag === "cascader" && Array.isArray(params[prop])) {
          params[prop] = params[prop]?.[params[prop].length - 1];
        }
        // 时间组件
        if (tag === "date-picker" && params[prop]) {
          switch (type) {
            case "date":
              params[prop] = moment(params[prop]).format("YYYY-MM-DD");
              break;
            case "daterange":
              if (params[prop].length) {
                params[prop] = [
                  moment(params[prop][0]).format("YYYY-MM-DD"),
                  moment(params[prop][1]).format("YYYY-MM-DD"),
                ];
              }
              break;
            case "week":
              params[prop] = [
                moment(params[prop]).format("YYYY-MM-DD"),
                moment(params[prop]).add(6, "day").format("YYYY-MM-DD"),
              ];
              break;
            case "month":
              params[prop] = [
                moment(params[prop]).format("YYYY-MM-DD"),
                moment(params[prop]).endOf("month").format("YYYY-MM-DD"),
              ];
              break;
            case "year":
              params[prop] = [
                moment(params[prop]).format("YYYY-MM-DD"),
                moment(params[prop]).endOf("year").format("YYYY-MM-DD"),
              ];
              break;
            default:
              break;
          }
        }
      });
      this.$emit(emitName, params);
    },
  },
  render(h) {
    const {
      formProps,
      ruleForm,
      rules,
      labelWidth,
      formItemsExpand,
      btnItemLayout,
      submitText,
      resetText,
      isVertical,
      formItems,
      isExpand,
      expandForm,
      submitForm,
      resetForm,
    } = this;
    return (
      <el-form
        label-width={labelWidth}
        {...{ props: formProps }}
        ref="ruleForm"
        rules={rules}
        props={{ model: ruleForm }}
        class="dynamic-form"
      >
        <el-row>
          {formItemsExpand.map(
            ({
              formItemProps = {},
              fieldProps = {},
              tag,
              component,
              render,
              key,
            }) => {
              return (
                <el-col key={key} span={isVertical ? 24 : 6}>
                  <el-form-item {...{ props: formItemProps }}>
                    {
                      // createElement组件
                      render && render(h, ruleForm)
                    }
                    {
                      // 动态组件
                      component && (
                        <component
                          is={component}
                          v-model={ruleForm[formItemProps.prop]}
                          {...{ attrs: fieldProps }}
                        />
                      )
                    }
                    {
                      // 属性配置渲染组件
                      !render && !component && (
                        <Field
                          v-model={ruleForm[formItemProps.prop]}
                          field-props={fieldProps}
                          tag={tag}
                        ></Field>
                      )
                    }
                  </el-form-item>
                </el-col>
              );
            }
          )}
          <el-col class="btn" span={btnItemLayout}>
            <el-form-item>
              <el-button type="primary" on={{ click: submitForm }}>
                {submitText}
              </el-button>
              {resetText && (
                <el-button on={{ click: resetForm }}>{resetText}</el-button>
              )}
              {!isVertical && formItems.length > 2 && (
                <el-button type="text" on={{ click: expandForm }}>
                  {isExpand ? "收起" : "展开"}
                  <i class={`el-icon-arrow-${isExpand ? "up" : "down"}`} />
                </el-button>
              )}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    );
  },
};
</script>
<style scoped>
.dynamic-form >>> .el-input-number .el-input__inner {
  text-align: left;
}
.btn {
  text-align: right;
}

.dynamic-form .w100 {
  width: 100%;
}
</style>
