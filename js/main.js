//原理是利用css3的transform，给每次变换给video不同的class，从而引发页面重新渲染。
//找到有几个video
var wrap_items = $(".item");
var i_m = wrap_items.length;
var m = i_m * 100;//避免下面频繁赋值(解决m--为负值时赋值)
//暂停前面视频，开始现在视频
function videoPause(num) {
    for (var n = 1; n <= 5; n++) {
        $(".video" + n).get(0).pause();
        $(".video" + n).get(0).currentTime = 0;
    }
    $(".video" + num).get(0).play()
}
//向右转
function right(num) {
    m++;
    //暂时把所有的item的class去除掉
    for (var i = 0; i < i_m; i++) {
        $(wrap_items[i]).removeClass();
    }
    //每一个都赋予新的class
    $(wrap_items[m % i_m]).attr("class", "item show");
    $(wrap_items[(m + 1) % i_m]).attr("class", "item rightItem");
    $(wrap_items[(m + 2) % i_m]).attr("class", "item out");
    $(wrap_items[(m + 3) % i_m]).attr("class", "item out");
    $(wrap_items[(m + 4) % i_m]).attr("class", "item leftItem");
    //把从传入的num参数，传递给videoPause并调用它
    var num = num;
    videoPause(num);
}
//向左转
function left(num) {
    m--;
    //这个是当m减到负数时重新赋值
    if (m == -1) {
        m = 100 * i_m;
    }
    //暂时把所有的item的class去除掉
    for (var i = 0; i < i_m; i++) {
        $(wrap_items[i]).removeClass();
    }
    //每一个都赋予新的class
    $(wrap_items[m % i_m]).attr("class", "item show");
    $(wrap_items[(m + 1) % i_m]).attr("class", "item rightItem");
    $(wrap_items[(m + 2) % i_m]).attr("class", "item out");
    $(wrap_items[(m + 3) % i_m]).attr("class", "item out");
    $(wrap_items[(m + 4) % i_m]).attr("class", "item leftItem");
    //把从传入的num参数，传递给videoPause并调用它
    var num = num;
    videoPause(num);
};
//绑定左右视频click事件
//遍历所有video,绑定click事件，只有左右调用函数，其他不操作
wrap_items.each(function (i) {
    //绑定左右click事件
    $(this).click(function () {
        if ($(this).attr("class") == "item rightItem") {
            //取得点击的video的num，调用right并传参
            var numimg = $(this).children("video").attr("class");
            var num = numimg.slice(5);
            right(num);
        } else if ($(this).attr("class") == "item leftItem") {
            //取得点击的video的num，调用left并传参
            var numimg = $(this).children("video").attr("class");
            var num = numimg.slice(5);
            left(num);
        }
    });
});

//footerclick事件
$("#footer a div").click(function () {
    //这个事件的初始位置就是第一个，它不受左右视频的click事件的影响，所以要重新定义个z
    var z = i_m;
    //取得点击的那个的num
    var numimg = $(this).attr("class");
    var num = numimg.slice(3);
    z = z + parseInt(num) - 1;
    //暂时把所有的item的class去除掉
    for (var i = 0; i < i_m; i++) {
        $(wrap_items[i]).removeClass();
    }
    //每一个都赋予新的class
    $(wrap_items[z % i_m]).attr("class", "item show");
    $(wrap_items[(z + 1) % i_m]).attr("class", "item rightItem");
    $(wrap_items[(z + 2) % i_m]).attr("class", "item out");
    $(wrap_items[(z + 3) % i_m]).attr("class", "item out");
    for (var x = 4; x < i_m; x++) {
        $(wrap_items[(z + x) % i_m]).attr("class", "item leftItem");
    }
    //调用暂停视频
    videoPause(num);
    //给全局m赋值（这个事件可以影响左右视频click事件所以要改变全局的m）
    m = z;
})






    
