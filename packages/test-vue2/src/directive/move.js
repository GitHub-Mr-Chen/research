/* eslint-disable no-unused-vars */
const log = console.log;
let dom, x, y, isDown;
const mousedown = (event) => {
  dom.classList.add("move");

  x = event.pageX - dom.offsetLeft;
  y = event.pageY - dom.offsetTop;
  isDown = true;
};
const mousemove = ({ pageX, pageY }) => {
  if (isDown) {
    dom.style.left = `${pageX - x}px`;
    dom.style.top = `${pageY - y}px`;
  }
};
const mouseup = () => (isDown = false);

export default [
  "move",
  {
    bind: function (el, binding, vnode) {
      dom = el;
      log(binding.name);
      log(binding.value);
      log(vnode);
      dom.addEventListener("mousedown", mousedown);
      dom.addEventListener("mousemove", mousemove);
      document.addEventListener("mouseup", mouseup);
    },
    inserted: function (...e) {
      console.log("e", ...e);
      log("inserted");
    },
    update: function (...e) {
      log("update");
      console.log("e", e);
    },
    componentUpdated: function (...e) {
      log("componentUpdated");
      console.log("e", e);
    },
    unbind: function (el) {
      el.removeEventListener("mousedown", mousedown);
      el.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
      log("unbind");
    },
  },
];
