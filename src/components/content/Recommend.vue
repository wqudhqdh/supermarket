<template>
  <div class="recommend">
    <div>
      <ul>
        <li>
          <img src="~assets/img/clock.png" />
          <span>小米秒杀</span>
        </li>
        <li>
          <img src="~assets/img/团购.png" />
          <span>企业团购</span>
        </li>
        <li>
          <img src="~assets/img/fans.png" />
          <span>米粉卡</span>
        </li>
        <li>
          <img src="~assets/img/replace.png" />
          <span>以旧换新</span>
        </li>
        <li>
          <img src="~assets/img/f.png" />
          <span>F码通道</span>
        </li>
        <li>
          <img src="~assets/img/phone-pay.png" />
          <span>话费充值</span>
        </li>
      </ul>
    </div>
    <div>
      <img src="~assets/img/recommend1.jpg" style="width: 316px" />
    </div>
    <div><img src="~assets/img/recommend2.jpg" style="width: 316px" /></div>
    <div><img src="~assets/img/recommend3.png" style="width: 316px" /></div>
  </div>
</template>
<script>
export default {
  name: "Recommend",
};
</script>
<style scoped>
.recommend {
  width: 1226px;
  height: 172px;

  margin: auto;
  margin-top: 10px;
  display: flex;
  /* justify-content: space-around; */
}
.recommend div {
  flex: 1;
}
.recommend div:nth-child(-n + 3) {
  flex: 1;
  margin-right: 10px;
}
.recommend div ul {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  background-color: #5f5750;
}
.recommend div ul li {
  flex: 1;
  min-width: 30%;
  max-width: 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
  border-top: 1px solid white;
  border-left: 1px solid white;
}
.recommend div ul li img {
  width: 24px;
  margin-bottom: 5px;
}
</style>