const param2Obj = function (url) {
  return new Map(new URL(url).searchParams);
};

describe("param2Obj", () => {
  const url =
    "https://github.com/PanJiaChen/vue-element-admin?name=bill&age=29&sex=1&field=dGVzdA==&key=%E6%B5%8B%E8%AF%95";

  it("param2Obj test", () => {
    console.log("param2Obj", param2Obj(url));
    expect(param2Obj(url)).toEqual(
      new Map([
        ["name", "bill"],
        ["age", "29"],
        ["sex", "1"],
        ["field", "dGVzdA=="],
        ["key", "测试"],
      ])
    );
  });
});
