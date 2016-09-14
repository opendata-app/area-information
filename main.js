var map = null;
// google.maps.Geocoder()コンストラクタのインスタンスを生成
var geocoder = new google.maps.Geocoder();
var flg = true;
var marker;
var markerList = new google.maps.MVCArray();
var markerData = [ // マーカーを立てる住所
    "札幌市中央区",
    "札幌市東区",
    "札幌市南区",
    "札幌市西区",
    "札幌市北区"
];

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
            title: "現在地"
        });
        currentPositionMarker.setMap(map);
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
var dispMarker = function() {
    if (flg) {
        // 情報アイコンを表示
        for (var i = 0; i < markerData.length; i++) {
            // geocoder.geocode()メソッドを実行 
            geocoder.geocode({'address': markerData[i]}, function(results, status) {
                // ジオコーディングが成功した場合
                if (status == google.maps.GeocoderStatus.OK) {
                    // google.maps.Marker()コンストラクタにマーカーを設置するMapオブジェクトと
                    // 変換した緯度・経度情報を渡してインスタンスを生成
                    marker = new google.maps.Marker({ // マーカーの追加
                        position: results[0].geometry.location, // マーカーを立てる位置を指定
                        // icon:'aaa.png' // 情報ごとにマーカーイメージを変更（できると見やすそう）
                    });
                    marker.setMap(map);
                    markerList.push(marker);
    
                } else {
                    // ジオコーディングが成功しなかった場合
                    console.log('Geocode was not successful for the following reason: ' + status);
                }
            });
        }
        flg = false;
    } else {
        markerList.forEach(function(marker, idx) {
            marker.setMap(null);
        });
        flg = true;
    }
};

function MarkerClear() {
    
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
