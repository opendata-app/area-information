var map = null;

// マップ表示
var getLocation = function() {
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
        var currentPositionMarker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "現在地"
        });
        map.setCenter(latlng);
    };
    
    // 座標情報の取得に失敗
    var locFail = function() {
        // 座標の取得処理に失敗した場合
        alert('位置情報の取得に失敗しました');
    };
    
    // 現在の座標を取得
    navigator.geolocation.getCurrentPosition(success, locFail);
};
        
//  デバイスの準備ができたら
document.addEventListener("deviceready", getLocation, true);

// 情報表示
var dispMarker = function(){
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
        var currentPositionMarker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "現在地"
        });
        map.setCenter(latlng);
        abcd();
    };
    
    // 座標情報の取得に失敗
    var locFail = function() {
        // 座標の取得処理に失敗した場合
        alert('位置情報の取得に失敗しました');
    };
    
    // 現在の座標を取得
    navigator.geolocation.getCurrentPosition(success, locFail);
    
    abcd = function() {
        var marker = [];
        var infoWindow = [];
        markerData = [ // マーカーを立てる場所名・緯度・経度
            {
                name: 'TAM 東京',
                lat: 35.6954806,
                lng: 139.76325010000005
            }, {
                name: '小川町駅',
                lat: 35.6951212,
                lng: 139.76610649999998
            }, {
                name: '淡路町駅',
                lat: 35.69496,
                lng: 139.76746000000003
            }, {
                name: '御茶ノ水駅',
                lat: 35.6993529,
                lng: 139.76526949999993
            }, {
                name: '神保町駅',
                lat: 35.695932,
                lng: 139.75762699999996
            }, {
                name: '新御茶ノ水駅',
                lat: 35.696932,
                lng: 139.76543200000003
            }
        ];
        // 情報アイコンを表示
        for (var i = 0; i < markerData.length; i++) {
            markerLatLng = new google.maps.LatLng({lat: markerData[i]['lat'], lng: markerData[i]['lng']}); // 緯度経度のデータ作成
            marker[i] = new google.maps.Marker({ // マーカーの追加
                position: markerLatLng, // マーカーを立てる位置を指定
                map: map, // マーカーを立てる地図を指定
                // icon:'aaa.png' // 情報ごとにマーカーイメージを変更（できると見やすそう）
            });
            
            // 試しに付けてみたけど動かない。付ける余裕ないかもしれないけど付いたら便利そう。
            // infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
            //     content: '<div class="sample">' + markerData[i]['name'] + '</div>' // 吹き出しに表示する内容
            // });
     
            // markerEvent(i); // マーカーにクリックイベントを追加
        }
    };
};

// マーカーにクリックイベントを追加
// 動かない
function markerEvent(i) {
    marker[i].addListener('click', function() { // マーカーをクリックしたとき
        infoWindow[i].open(map, marker[i]); // 吹き出しの表示
    });
}

// タブ
$(function(){
    var $jsTabs = $('.js-tabs');
	var $jsTabsLi = $('.js-tabs li');

	var tabsLiLen = $jsTabsLi.length;
	var tabsLiWid = $jsTabsLi.eq(0).width();

	//tabエリアの横幅指定
	$jsTabs.css('width',tabsLiWid * tabsLiLen);
});
