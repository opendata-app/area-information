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
        // google.maps.Geocoder()コンストラクタのインスタンスを生成
        var geocoder = new google.maps.Geocoder();
        
        markerData = [ // マーカーを立てる住所
            "札幌市中央区",
            "札幌市北区",
            "札幌市南区"
        ];
        
        // 情報アイコンを表示
        for (var i = 0; i < markerData.length; i++) {
            // geocoder.geocode()メソッドを実行 
            geocoder.geocode({'address': markerData[i]}, function(results, status) {
                // ジオコーディングが成功した場合
                if (status == google.maps.GeocoderStatus.OK) {
                    // google.maps.Marker()コンストラクタにマーカーを設置するMapオブジェクトと
                    // 変換した緯度・経度情報を渡してインスタンスを生成
                    marker[i] = new google.maps.Marker({ // マーカーの追加
                        position: results[0].geometry.location, // マーカーを立てる位置を指定
                        map: map, // マーカーを立てる地図を指定
                        // icon:'aaa.png' // 情報ごとにマーカーイメージを変更（できると見やすそう）
                    });
                    
                    // 試しに付けてみたけど動かない。付ける余裕ないかもしれないけど付いたら便利そう。
                    // infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
                    //     content: '<div class="sample">' + markerData[i]['name'] + '</div>' // 吹き出しに表示する内容
                    // });
                    
                    // markerEvent(i); // マーカーにクリックイベントを追加
                } else {
                    // ジオコーディングが成功しなかった場合
                    console.log('Geocode was not successful for the following reason: ' + status);
                }
            });
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

function deleteMarker() {
    var latlng = new google.maps.LatLng(35.539001,134.228468);
var marker = new google.maps.Marker({
  positon: latlng,
  map: map
});

    marker.setMap(null);
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
