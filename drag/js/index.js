function drag(params) {
    // 获取ul,li
    this.ul = document.querySelector("ul");
    this.li = document.querySelectorAll("li");
    this.liNum = this.li.length; //li数量
    this.liW = this.ul.clientWidth / 3; //li宽度
}
drag.prototype = {
    layout: function () {
        
        this.ul.style.height = this.ul.clientWidth + "px";
        for (let i = 0; i < this.liNum; i++) {
            let liW = this.ul.clientWidth / 3;
            this.li[i].style.width = this.ul.clientWidth / 3 + "px";
            this.li[i].style.height = this.ul.clientWidth / 3 + "px";

            this.li[i].style.left = liW * i;
            if (i > 2) {
                this.li[i].style.left = liW * (i - 3) + "px";
                this.li[i].style.top = liW * 1 + "px";
                // console.log(liW * (i - 3));
            }
            if (i > 5) {
                this.li[i].style.left = liW * (i - 6) + "px";
                this.li[i].style.top = liW * 2 + "px";
                // console.log(liW * (i - 6));
            }
        }
    },
    dragging: function (params) {

    }
}
var drag = new drag();
drag.layout();
// console.log(drag.li);