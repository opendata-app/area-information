var getLocation = function() {
            var map = {};
            // 座標情報の取得に成功したら発火する処理
            // 引数pには座標情報が入ります
            var success = function(p) {
                // 座標情報
                var lon = p.coords.longitude;
                var lat = p.coords.latitude;
        
            　  // 位置情報オブジェクトを生成
                var latlng = new google.maps.LatLng(lat,lon);
                // 地図情報
                var mapOptions = {
                    disableDefaultUI: true,
                    center: latlng, // 地図の中央に
                    zoom: 17,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    scaleControl:true
                };
                // 地図のセットアップ
             　 map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
                // 現在地を表示
                var marker = new google.maps.Marker({
                    position:latlng,
                    map:map,
                    title:"現在地"}
                );
                map.setCenter(latlng);
              
            };
            // 座標情報の取得に失敗
            var locFail = function() {
                // 座標の取得処理に失敗した場合
                alert('位置情報の取得に失敗しました');
            };
            // 現在の座標を取得
            navigator.geolocation.getCurrentPosition(success, locFail);
        }
        //  デバイスの準備ができたら
        document.addEventListener("deviceready", getLocation, true);

$(function(){

	var $jsTabs = $('.js-tabs');
	var $jsTabsLi = $('.js-tabs li');

	var tabsLiLen = $jsTabsLi.length;
	var tabsLiWid = $jsTabsLi.eq(0).width();

	//tabエリアの横幅指定
	$jsTabs.css('width',tabsLiWid * tabsLiLen);

});
