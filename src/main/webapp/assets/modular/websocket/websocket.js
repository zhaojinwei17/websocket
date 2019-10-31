function func(data){
    alert(data);
}
layui.use(['table', 'form', 'laydate','layer','laytpl'], function () {
    var $ = layui.$;
    var table = layui.table;
    var form = layui.form;
    var laydate = layui.laydate;
    var layer = layui.layer;
    var laytpl = layui.laytpl;

    var sid=createUUID();
    console.log("this sid :" + sid)
    var socket;

    //连接服务端
    if(typeof(WebSocket) == "undefined") {
        console.log("您的浏览器不支持WebSocket");
    }else{
        console.log("您的浏览器支持WebSocket");
        //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
        //等同于socket = new WebSocket("ws://localhost:8083/checkcentersys/websocket/20");
        socket = new WebSocket("ws://localhost:8080/websocket/"+sid);
        //打开事件
        socket.onopen = function() {
            console.log("Socket 已打开");
            //socket.send("这是来自客户端的消息" + location.href + new Date());
        };
        //获得消息事件
        socket.onmessage = onmessage;
        //关闭事件
        socket.onclose = function() {
            console.log("Socket已关闭");
        };
        //发生了错误事件
        socket.onerror = function() {
            alert("Socket发生了错误");
            //此时可以尝试刷新页面
        }
        //离开页面时，关闭socket
        //jquery1.8中已经被废弃，3.0中已经移除
        // $(window).unload(function(){
        //     socket.close();
        //});
    }

    function onmessage(msg){
        var data=JSON.parse(msg.data);
        if(data.from && data.from.sid!=sid){
            var d = {
                "self": "" ,
                "friend": data.from.sid,
                "message": data.message,
                "align": "left"
            }
            laytpl(item.innerHTML).render(d, function(html){
                $("#msg-card").append(html);
            });
        }else{
            $("#message").val("");
        }
    }

    //搜索
    $('#send').on('click', function(){
        socket.send($("#message").val());
        var d = {
            "self": sid,
            "friend": "",
            "message": $("#message").val(),
            "align": "right"
        }
        laytpl(item.innerHTML).render(d, function(html){
            $("#msg-card").append(html);
        });

        // $.ajax({
        //     type : "get",    //请求类型
        //     url : "http://localhost:80/jsonp/test.do",//请求的 URL地址
        //     dataType : "json",//返回的数据类型
        //     success: function (data) {
        //         console.log(data);
        //     },
        //     error:function (data) {
        //         alert(data.result);
        //     }
        // });
        // var  obj = document.createElement('script');
        // $(obj).attr("src","http://localhost:80/jsonp/test.do")
        // document.getElementsByTagName('body')[0].append(obj);
    });

    function random4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    function createUUID() {
        return (random4() + random4() + "-" + random4() + "-" + random4() + "-" + random4() + random4());
    };
});