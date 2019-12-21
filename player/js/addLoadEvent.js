
function addChannels(){//遍历表格id 并依次添加每个播放器；
    var ones=document.getElementsByClassName("one");
    for(var i=0;i<ones.length;i++){
        var val=ones[i].getAttribute("id");
        var player=jwplayer(val);
        player.setup({
            flashplayer: "js/jwplayer.flash.swf",
            file: "rtmp://192.168.32.251/live/"+val,
            stretching:'exactfit',
            height: document.documentElement.clientHeight *0.5,
            width: document.documentElement.clientWidth *0.25,
            mute:true,
            autostart:true,
            events:{
                onPause:function(){this.play(true);},//取消暂停功能
                onReady:function(){this.play(true);},
                onComplete:function(){this.play(true);}//无视频重新加载
            }
        });
        $(window).resize(showSize("#"+val));//避免循环中创建闭包，需要将resize方法指向外部闭包对象；
    }
}
//播放器窗口大小比例自适应方法；
function makeSize(ids){
    $(ids).width(document.documentElement.clientWidth *0.25);
    $(ids).height(document.documentElement.clientHeight*0.5);
}
//外部闭包保存每个播放器大小；
function showSize(ids){
    return function(){
        makeSize(ids);
    }
}

//DOM加载完成后运行JS的方法
function addLoadEvent(func){
    var oldonload=window.onload;
    if(typeof window.onload!="function"){
        window.onload=func;
    }else{
        window.onload=function(){
            oldonload();
            func();
        }
    }
}
addLoadEvent(addChannels);