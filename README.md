# 简单的图片轮播
  用typescript编写的一个图片轮播，手机电脑都可以使用，支持拖动。没做前进后退按钮，若有需要可自己加，调用实列里面的run()和back()方法即可。

# 如何使用它
  您可以使用ts编译好了的js，也可使用ts，引入文件即可。
  
  只需var yourName = new PicReturn('picBox', 2000, 'points', 'pointSelected'); 便可使用。
  
  参数说明：
  
  picBox：您所有图片的父级元素的className --必填
  
  2000：时间，多久动一次  --必填
  
  points：您所有的小点点的父级元素的className  --选填，不填就没有小点点导航
  
  pointSelected：小点点选中时候的className  --跟随上一个参数，points参数填了它必须填。若没填，它也不填

# 注意事项
  1：它只支持到ie10和它以上的浏览器
  
  2：它里面的z-index最高为1
  
  3：如果需要修改过场动画可以去找PicReturn Class里面的setThreeStyle这个方法，left代表左边隐藏的图片，middle代表正在显示的图片，right代表右边隐藏的图片。可自行调整样式，过场动画是由transition实现的。
  
  4：加链接可以往html里的location自定义属性里加，不需要链接可以不加。
  
  5：实测iPhone和安卓可以运行，pc兼容不了ie10以下的浏览器。
  
