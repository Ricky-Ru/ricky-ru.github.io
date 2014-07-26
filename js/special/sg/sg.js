$(function() {
  //加载json数据
  $.getJSON("sg.utf8.json", function(data) {
    var itemTabTit = []
      , itemTabBody = []
      , itemRecommend = []
      , itemRanking = []
      , itemPrevious = [];

    $.each(data, function(key, val) {
      if( key == "girlListTab" ){
        $.each(val, function(tabKey, tabVal){
          var hrefID = tabKey+1,
              girl = [];
          if (tabKey == 0){
            itemTabTit.push('<li class="active"><a href="#panel'+hrefID+'">'+tabVal.group+'</a></li>');
          }else{
            itemTabTit.push('<li><a href="#panel'+hrefID+'">'+tabVal.group+'</a></li>');
          }

          $.each(tabVal.girl, function(girlKey, girlVal){
            var girlNum = girlKey + 1;
            girl.push('<div class="girl" data-category="' + tabVal.group
              + '" data-name="' + girlVal.name
              + '" data-bwh="[' + girlVal.bwh
              + ']" data-height="' + girlVal.height
              + '" data-type="' + girlVal.type
              + '"><a href="javascript:void(0);"><img alt="'
              + girlVal.name
              + '" class="img1" width="110" height="137" src="../img/special/sg/'
              + tabVal.group
              + '/' + girlNum + '/1s.jpg"><div class="info"><h3>'
              + girlVal.name + '</h3><p>三围：'
              + girlVal.bwh[0] + '&nbsp;'
              + girlVal.bwh[1] + '&nbsp;'
              + girlVal.bwh[2] + '<br>身高：'
              + girlVal.height + 'CM<br>类型：'
              + girlVal.type + '</p></div><img alt="'
              + girlVal.name + '" class="img2" width="110" height="90" src="../img/special/sg/'
              + tabVal.group
              + '/' + girlNum + '/2s.jpg"><img alt="'
              + girlVal.name +'" class="img3" width="110" height="90" src="../img/special/sg/'
              + tabVal.group
              + '/' + girlNum + '/3s.jpg"></a></div>');
          });

          itemTabBody.push('<li id="panel'+hrefID+'"><div class="list">'+ girl.join('') +'</div></li>');

        });
        $(itemTabTit.join('')).prependTo("#girlListTab .tabTit ul");
        $(itemTabBody.join('')).prependTo("#girlListTab .tabBody ul");
      }
      if( key == "girlRecommend" ){
        $.each(val, function(tabKey, tabVal){
          var num = tabKey +1
            , group = "小编推荐";

          itemRecommend.push('<li data-category="' + group
            + '" data-name="' + tabVal.name
            + '" data-bwh="[' + tabVal.bwh
            + ']" data-height="' + tabVal.height
            + '" data-type="' + tabVal.type
            + '"><a href="javascript:void(0);"><img alt="'
            + tabVal.name
            + '" width="156" height="235" src="../img/special/sg/'
            + group
            + '/' + num + '/1s.jpg"><span>'
            + tabVal.name + '</span></a></div>');

        });
        $(itemRecommend.join('')).prependTo("#girlListRecommend ul");

      }
      if( key == "girlRanking" ){
        $.each(val, function(tabKey, tabVal){
          var num = tabKey +1
            , group = "女神榜单";

          itemRanking.push('<li data-category="' + group
            + '" data-name="' + tabVal.name
            + '" data-bwh="[' + tabVal.bwh
            + ']" data-height="' + tabVal.height
            + '" data-type="' + tabVal.type
            + '"><a href="javascript:void(0);"><img alt="'
            + tabVal.name
            + '" width="156" height="156" src="../img/special/sg/'
            + group
            + '/' + num + '/1s.jpg"><div class="info"><span class="ord">'
            + num + '</span><span class="name">'
            + tabVal.name + '</span><span class="vote"><i></i>'
            + tabVal.vote + '</span></div><div class="mask"></div></a></div>');

        });
        $(itemRanking.join('')).prependTo("#girlListRanking ul");
      }
      if( key == "girlPrevious" ){
        $.each(val, function(tabKey, tabVal){
          var num = tabKey +1
            , group = "历届女神";

          itemPrevious.push('<li data-category="' + group
            + '" data-name="' + tabVal.name
            + '" data-bwh="[' + tabVal.bwh
            + ']" data-height="' + tabVal.height
            + '" data-type="' + tabVal.type
            + '"><a href="javascript:void(0);"><img alt="'
            + tabVal.name
            + '" width="156" height="156" src="../img/special/sg/'
            + group
            + '/' + num + '/1s.jpg"><div class="info"><span class="name">'
            + tabVal.name + '</span></div><div class="mask"></div></a></div>');

        });
        $(itemPrevious.join('')).prependTo("#girlListPrevious ul");
      }
    });

    //一手谍照 模拟滚动条
    /**/
    $("#girlListTab .tabTit").each(function(){
      var tabTit = $(this)
        , currentTab = $(this).find("li.active a").attr("href");
      $(this).find("ul").show();
      $(currentTab).show().jScrollPane({showArrows: true});

      $(this).find("li").each(function(i) {
        var a = $(this).bind("click", function() {
          if (currentTab) {
            tabTit.find("li.active").removeClass("active");
            $(currentTab).hide();
          }
          currentTab = $(this).addClass("active").find("a").attr("href");
          $(currentTab).show().jScrollPane({showArrows: true});
          return false;
        });
      });
    });
    /**/

    // 弹层
    $("#girlListTab .girl, #girlListRecommend li, #girlListRanking li, #girlListPrevious li").each(function(){
      $(this).on("click", function(){
        var dataCategory = $(this).data("category")
          , dataName = $(this).data("name")
          , dataBwh = $(this).data("bwh")
          , dataHeight = $(this).data("height")
          , dataType = $(this).data("type")
          , $domAlbum = $("#poplayer .album")
          , index = $(this).index()+1
          , imgItems = [];

        $domAlbum.find(".info strong").html(dataName);
        $domAlbum.find(".info .bwh").html(dataBwh[0] + '&nbsp;' + dataBwh[1] + '&nbsp;' + dataBwh[2]);
        $domAlbum.find(".info .height").html(dataHeight);
        $domAlbum.find(".info .type").html(dataType);

        for(var i=1; i<4; i++){
          imgItems.push('<li><img width="418" height="493" src="../img/special/sg/'
            + dataCategory
            + '/' + index
            + '/' + i
            + '.jpg" alt="'
            + dataName + '" /></li>');
        }

        $("#poplayer .wall .inner").html($('<ul/>', { 'class': 'clearfix', html: imgItems.join('') }));


        $domAlbum.tabs({
          current: 0,
          type: "click",
          content: ".wall ul",
          duration: 400,
          active: "active",
          effect: "slideH",
          pause: 4000,
          nav: true,
          width: 418,
          height: 493,
          single: 1,
          easing: "swing",
          move: 1,
          loop: true,
          offset: [0, 0, 0, 0],
          tabCon: false,
          tabConCtl: true,
          reverse: false,
          label: false,
          ctrl: false,
          showNum: true
        }, 10);

        if ($("html").hasClass("ie6")){
          var body = $("#contentWrap").get(0);
          $("#poplayerbg").css({
            width: body.scrollWidth,
            height: body.scrollHeight
          });
          $("#poplayerbg").show();
        }
        $("#poplayer").show();
      });
    });

    //关闭弹层
    $("#poplayer .closed").on("click", function(){
      $("#poplayer").hide();
      $("#poplayerbg").hide();
    });

  });

});
