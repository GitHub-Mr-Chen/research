// Field.js 原子组件
const optionsMap = (h, options, tag) =>
  options.map((item) => {
    return h(
      `el-${tag}`,
      {
        props: item,
      },
      item.text
    );
  });
export default {
  props: {
    fieldProps: {
      type: Object,
      required: true,
    },
    tag: {
      type: String,
      default: "input",
    },
    value: {
      type: [String, Number, Object, Array, Boolean],
    },
  },
  render(h) {
    return h(`el-${this.tag}`, {
      class: {
        w100: this.fieldProps.w100,
      },
      style: this.fieldProps.style,
      props: {
        ...this.fieldProps,
        // 多选框组,值必须为数组
        value:
          this.tag === "checkbox-group" && !Array.isArray(this.value)
            ? []
            : this.value,
      },
      attrs: this.fieldProps,
      on: {
        input: (value) => {
          this.$emit("input", value);
        },
        ...this.fieldProps.on,
      },
      scopedSlots: {
        default: () => {
          const options = this.fieldProps?.options || [];
          const tagMap = {
            select: optionsMap(h, options, "option"),
            "radio-group": optionsMap(h, options, "radio"),
            "checkbox-group": optionsMap(h, options, "checkbox"),
          };
          return tagMap[this.tag];
        },
        prefix: () => {
          const prefix = this.fieldProps["prefix-icon"];
          return typeof prefix === "string" ? null : prefix(h);
        },
        suffix: () => {
          const suffix = this.fieldProps["suffix-icon"];
          return typeof suffix === "string" ? null : suffix(h);
        },
      },
    });
  },
};
