var map = null;
var wifiFlg = true;
var taxiFlg = true;
var toiletFlg = true;
var parkFlg = true;
var aedFlg = true;
var earthquakeFlg = true;
var fireFlg = true;
var landslideFlg = true;
var floodFlg = true;
var refugeFlg = true;
var marker;
var currentInfoWindow = null;    //最後に開いた情報ウィンドウを記憶
// google.maps.Geocoder()コンストラクタのインスタンスを生成
var geocoder = new google.maps.Geocoder();

// 各マーカーリストの作成
$(function () {
    setTimeout(function () {
        readTaxiMarker();
    }, 0);
    setTimeout(function () {
        readWifiMarker();
    }, 2000);
    setTimeout(function () {
        readParkMarker();
    }, 4000);
    setTimeout(function () {
        readToiletMarker();
    }, 6000);
    setTimeout(function () {
        readAEDMarker();
    }, 8000);
    setTimeout(function () {
        readEarthquakeMarker();
    }, 10000);
    setTimeout(function () {
        readLandslideMarker();
    }, 12000);
    setTimeout(function () {
        readFireMarker();
    }, 14000);
    setTimeout(function () {
        readFloodMarker();
    }, 16000);
    setTimeout(function () {
        readRefugeMarker();
    }, 18000);
});

// タブ表示・非表示状態情報の保持
$(function () {
    if ("none" == localStorage.getItem('toilet')) {
        displayButton('toilet');
    }
    if ("none" == localStorage.getItem('wifi')) {
        displayButton('wifi');
    }
    if ("none" == localStorage.getItem('taxi')) {
        displayButton('taxi');
    }
    if ("none" == localStorage.getItem('park')) {
        displayButton('park');
    }
    if ("none" == localStorage.getItem('aed')) {
        displayButton('aed');
    }
});

// ファイルの読み込み
function getTextFile (fname) {
    var text = null;
    var ajax = new XMLHttpRequest();
    with (ajax) {
        onload = function () {
            readyState == 4 && status == 200 && (text = responseText);
        };
        open('GET', fname, false);
        send(null);
    };
    return text;
}

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
            title: "現在地",
            icon:'./pic/location.png'
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

// アイコン表示
function dispAEDMarker() {
    if (aedFlg) {
        $("#aed img").attr("src", "./pic/AEDExecute.png");
        // 情報アイコンを表示
        AEDMarkerList.forEach(function(marker, idx) {
            marker.setMap(map);
        });
        aedFlg = false;
    } else {
        $("#aed img").attr("src", "./pic/AED.png");
        AEDMarkerList.forEach(function(marker, idx) {
            marker.setMap(null);
        });
        aedFlg = true;
    }
};

function dispWifiMarker() {
    if (wifiFlg) {
        $("#wifi img").attr("src", "./pic/WiFiExecute.png");
        // 情報アイコンを表示
        wifiMarkerList.forEach(function(marker, idx) {
            marker.setMap(map);
        });
        wifiFlg = false;
    } else {
        $("#wifi img").attr("src", "./pic/WiFi.png");
        wifiMarkerList.forEach(function(marker, idx) {
            marker.setMap(null);
        });
        wifiFlg = true;
    }
};

function dispTaxiMarker() {
    if (taxiFlg) {
        $("#taxi img").attr("src", "./pic/TAXIExecute.png");
        // 情報アイコンを表示
        taxiMarkerList.forEach(function(marker, idx) {
            marker.setMap(map);
        });
        taxiFlg = false;
    } else {
        $("#taxi img").attr("src", "./pic/TAXI.png");
        taxiMarkerList.forEach(function(marker, idx) {
            marker.setMap(null);
        });
        taxiFlg = true;
    }
};

function dispToiletMarker() {
    if (toiletFlg) {
        $("#toilet img").attr("src", "./pic/ToiletExecute.png");
        // 情報アイコンを表示
        toiletMarkerList.forEach(function(marker, idx) {
            marker.setMap(map);
        });
        toiletFlg = false;
    } else {
        $("#toilet img").attr("src", "./pic/Toilet.png");
        toiletMarkerList.forEach(function(marker, idx) {
            marker.setMap(null);
        });
        toiletFlg = true;
    }
};

function dispParkMarker() {
    if (parkFlg) {
        $("#park img").attr("src", "./pic/PARKExecute.png");
        // 情報アイコンを表示
        parkMarkerList.forEach(function(marker, idx) {
            marker.setMap(map);
        });
        parkFlg = false;
    } else {
        $("#park img").attr("src", "./pic/PARK.png");
        parkMarkerList.forEach(function(marker, idx) {
            marker.setMap(null);
        });
        parkFlg = true;
    }
};

function dispEarthquakeMarker() {
    if (earthquakeFlg) {
        // 情報アイコンを表示
        earthquakeMarkerList.forEach(function(marker, idx) {
            marker.setMap(map);
        });
        $('#earthquake_switch').text('ON');
        earthquakeFlg = false;
    } else {
        earthquakeMarkerList.forEach(function(marker, idx) {
            marker.setMap(null);
        });
        $('#earthquake_switch').text('OFF');
        earthquakeFlg = true;
    }
};

function dispLandslideMarker() {
    if (landslideFlg) {
        // 情報アイコンを表示
        landslideMarkerList.forEach(function(marker, idx) {
            marker.setMap(map);
        });
        $('#landslide_switch').text('ON');
        landslideFlg = false;
    } else {
        landslideMarkerList.forEach(function(marker, idx) {
            marker.setMap(null);
        });
        $('#landslide_switch').text('OFF');
        landslideFlg = true;
    }
};

function dispFireMarker() {
    if (fireFlg) {
        // 情報アイコンを表示
        fireMarkerList.forEach(function(marker, idx) {
            marker.setMap(map);
        });
        $('#fire_switch').text('ON');
        fireFlg = false;
    } else {
        fireMarkerList.forEach(function(marker, idx) {
            marker.setMap(null);
        });
        $('#fire_switch').text('OFF');
        fireFlg = true;
    }
};

function dispFloodMarker() {
    if (floodFlg) {
        // 情報アイコンを表示
        floodMarkerList.forEach(function(marker, idx) {
            marker.setMap(map);
        });
        $('#flood_switch').text('ON');
        floodFlg = false;
    } else {
        floodMarkerList.forEach(function(marker, idx) {
            marker.setMap(null);
        });
        $('#flood_switch').text('OFF');
        floodFlg = true;
    }
};

function dispRefugeMarker() {
    if (refugeFlg) {
        // 情報アイコンを表示
        refugeMarkerList.forEach(function(marker, idx) {
            marker.setMap(map);
        });
        $('#refuge_switch').text('ON');
        refugeFlg = false;
    } else {
        refugeMarkerList.forEach(function(marker, idx) {
            marker.setMap(null);
        });
        $('#refuge_switch').text('OFF');
        refugeFlg = true;
    }
};

// マーカーにクリックイベントを追加
function markerEvent(marker, msg) {
    var infoWindow = new google.maps.InfoWindow({
        content: msg
    });
    google.maps.event.addListener(marker, 'click', function(event) {
        if (currentInfoWindow) {
            currentInfoWindow.close(); // 先に開いた情報ウィンドウがあれば、closeする
        }
        infoWindow.open(marker.getMap(), marker); // 情報ウィンドウを開く
        currentInfoWindow = infoWindow;
    });
}

// タブ表示の切り替え
function displayButton(id) {
    if ($('#' + id).css("display") != 'none') {
        $('#' + id).css("display", "none");
        $('#' + id + '_switch').text('OFF');
        localStorage.setItem(id, "none");
    } else {
        $('#' + id).css("display", "");
        $('#' + id + '_switch').text('ON');
        localStorage.setItem(id, "");
    }
}

// 設定のアコーディオンメニュー
$(function(){
    $("#tabMenu a").on("click", function() {
        if ($("#tabBoxes li a").css("display") != "none") {
            $("#tabBoxes li a").hide();
        } else {
            $("#disasterInformationBoxes li a").hide();
            $("#applicationInfo").hide();
            $("#tabBoxes li a").show();
        }
    });
    return false;
});

$(function(){
    $("#disasterInformationMenu a").on("click", function() {
        if ($("#disasterInformationBoxes li a").css("display") != "none") {
            $("#disasterInformationBoxes li a").hide();
        } else {
            $("#tabBoxes li a").hide();
            $("#applicationInfo").hide();
            $("#disasterInformationBoxes li a").show();
        }
    });
    return false;
});

$(function(){
    $("#application a").on("click", function() {
        if ($("#applicationInfo").css("display") != "none") {
            $("#applicationInfo").hide();
        } else {
            $("#tabBoxes li a").hide();
            $("#disasterInformationBoxes li a").hide();
            $("#applicationInfo").show();
        }
    });
    return false;
});

// タブ
$(function () {
    var $jsTabs = $('.js-tabs');
    var $jsTabsLi = $('.js-tabs li');

    var tabsLiLen = $jsTabsLi.length;
    var tabsLiWid = $jsTabsLi.eq(0).width();

    //tabエリアの横幅指定
    $jsTabs.css('width',tabsLiWid * tabsLiLen);
});

// 設定メニュー
$(function () {
  var $body = $('body');
  $('#js__sideMenuBtn').on('click', function () {
    $body.toggleClass('side-open');
    $('#js__overlay').on('click', function () {
      $body.removeClass('side-open');
    });
  });
});

// マーカーを読み込む
function readWifiMarker() {
    // google.maps.MVCArray()コンストラクタのインスタンスを生成
    wifiMarkerList = new google.maps.MVCArray();
    // 情報アイコンを表示
    var str = getTextFile("./data/wifi.txt");
    var data = str.split("\n");
    var i = 0;
    setTimeout(function a() {
        console.log(data[i]);
        if (!(i < data.length)) return;
        geocoder.geocode({'address': data[i]}, function(results, status) {
            // ジオコーディングが成功した場合
            if (status == google.maps.GeocoderStatus.OK) {
                // google.maps.Marker()コンストラクタにマーカーを設置するMapオブジェクトと
                // 変換した緯度・経度情報を渡してインスタンスを生成
                marker = new google.maps.Marker({ // マーカーの追加
                    position: results[0].geometry.location, // マーカーを立てる位置を指定
                    icon:'./icon/WiFiMarker.png' // 情報ごとにマーカーイメージを変更
                });
                markerEvent(marker, results[0].formatted_address); // マーカーにクリックイベントを追加
                wifiMarkerList.push(marker);
            } else {
                // ジオコーディングが成功しなかった場合
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    i ++;
    setTimeout(a, 20000);
    });
}

function readTaxiMarker() {
    // google.maps.MVCArray()コンストラクタのインスタンスを生成
    taxiMarkerList = new google.maps.MVCArray();
    // 情報アイコンを表示
    var str = getTextFile("./data/taxi.txt");
    var data = str.split("\n");
    var str = getTextFile("./data/taxi_info.txt");
    var infoData = str.split("\n");
    var i = 0;
    setTimeout(function a() {
        console.log(data[i]);
        if (!(i < data.length)) return;
        geocoder.geocode({'address': data[i]}, function(results, status) {
            // ジオコーディングが成功した場合
            if (status == google.maps.GeocoderStatus.OK) {
                // google.maps.Marker()コンストラクタにマーカーを設置するMapオブジェクトと
                // 変換した緯度・経度情報を渡してインスタンスを生成
                marker = new google.maps.Marker({ // マーカーの追加
                    position: results[0].geometry.location, // マーカーを立てる位置を指定
                    icon:'./icon/TAXIMarker.png' // 情報ごとにマーカーイメージを変更
                });
                markerEvent(marker, infoData[i - 1]); // マーカーにクリックイベントを追加
                taxiMarkerList.push(marker);
            } else {
                // ジオコーディングが成功しなかった場合
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    i ++;
    setTimeout(a, 20000);
    });
}

function readParkMarker() {
    // google.maps.MVCArray()コンストラクタのインスタンスを生成
    parkMarkerList = new google.maps.MVCArray();
    // 情報アイコンを表示
    var str = getTextFile("./data/park.txt");
    var data = str.split("\n");
    var i = 0;
    setTimeout(function a() {
        console.log(data[i]);
        if (!(i < data.length)) return;
        geocoder.geocode({'address': data[i]}, function(results, status) {
            // ジオコーディングが成功した場合
            if (status == google.maps.GeocoderStatus.OK) {
                // google.maps.Marker()コンストラクタにマーカーを設置するMapオブジェクトと
                // 変換した緯度・経度情報を渡してインスタンスを生成
                marker = new google.maps.Marker({ // マーカーの追加
                    position: results[0].geometry.location, // マーカーを立てる位置を指定
                    icon:'./icon/PARKMarker.png' // 情報ごとにマーカーイメージを変更
                });
                markerEvent(marker, results[0].formatted_address); // マーカーにクリックイベントを追加
                parkMarkerList.push(marker);
            } else {
                // ジオコーディングが成功しなかった場合
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    i ++;
    setTimeout(a, 20000);
    });
}

function readToiletMarker() {
    // google.maps.MVCArray()コンストラクタのインスタンスを生成
    toiletMarkerList = new google.maps.MVCArray();
    // 情報アイコンを表示
    var str = getTextFile("./data/toilet.txt");
    var data = str.split("\n");
    var i = 0;
    setTimeout(function a() {
        console.log(data[i]);
        if (!(i < data.length)) return;
        geocoder.geocode({'address': data[i]}, function(results, status) {
            // ジオコーディングが成功した場合
            if (status == google.maps.GeocoderStatus.OK) {
                // google.maps.Marker()コンストラクタにマーカーを設置するMapオブジェクトと
                // 変換した緯度・経度情報を渡してインスタンスを生成
                marker = new google.maps.Marker({ // マーカーの追加
                    position: results[0].geometry.location, // マーカーを立てる位置を指定
                    icon:'./icon/ToiletMarker.png' // 情報ごとにマーカーイメージを変更
                });
                markerEvent(marker, results[0].formatted_address); // マーカーにクリックイベントを追加
                toiletMarkerList.push(marker);
            } else {
                // ジオコーディングが成功しなかった場合
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    i ++;
    setTimeout(a, 20000);
    });
}

function readAEDMarker() {
    // google.maps.MVCArray()コンストラクタのインスタンスを生成
    AEDMarkerList = new google.maps.MVCArray();
    // 情報アイコンを表示
    var str = getTextFile("./data/AED.txt");
    var data = str.split("\n");
    var str = getTextFile("./data/AED_info.txt");
    var infoData = str.split("\n");
    var i = 0;
    setTimeout(function a() {
        console.log(data[i]);
        if (!(i < data.length)) return;
        geocoder.geocode({'address': data[i]}, function(results, status) {
            // ジオコーディングが成功した場合
            if (status == google.maps.GeocoderStatus.OK) {
                // google.maps.Marker()コンストラクタにマーカーを設置するMapオブジェクトと
                // 変換した緯度・経度情報を渡してインスタンスを生成
                marker = new google.maps.Marker({ // マーカーの追加
                    position: results[0].geometry.location, // マーカーを立てる位置を指定
                    icon:'./icon/AEDMarker.png' // 情報ごとにマーカーイメージを変更
                });
                markerEvent(marker, infoData[i - 1]); // マーカーにクリックイベントを追加
                AEDMarkerList.push(marker);
            } else {
                // ジオコーディングが成功しなかった場合
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    i ++;
    setTimeout(a, 20000);
    });
}

function readEarthquakeMarker() {
    // google.maps.MVCArray()コンストラクタのインスタンスを生成
    earthquakeMarkerList = new google.maps.MVCArray();
    // 情報アイコンを表示
    var str = getTextFile("./data/earthquake.txt");
    var data = str.split("\n");
    var i = 0;
    setTimeout(function a() {
        console.log(data[i]);
        if (!(i < data.length)) return;
        geocoder.geocode({'address': data[i]}, function(results, status) {
            // ジオコーディングが成功した場合
            if (status == google.maps.GeocoderStatus.OK) {
                // google.maps.Marker()コンストラクタにマーカーを設置するMapオブジェクトと
                // 変換した緯度・経度情報を渡してインスタンスを生成
                marker = new google.maps.Marker({ // マーカーの追加
                    position: results[0].geometry.location, // マーカーを立てる位置を指定
                    icon:'./icon/ESCAPEMarker.png' // 情報ごとにマーカーイメージを変更
                });
                markerEvent(marker, results[0].formatted_address); // マーカーにクリックイベントを追加
                earthquakeMarkerList.push(marker);
            } else {
                // ジオコーディングが成功しなかった場合
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    i ++;
    setTimeout(a, 20000);
    });
}

function readLandslideMarker() {
    // google.maps.MVCArray()コンストラクタのインスタンスを生成
    landslideMarkerList = new google.maps.MVCArray();
    // 情報アイコンを表示
    var str = getTextFile("./data/landslide.txt");
    var data = str.split("\n");
    var i = 0;
    setTimeout(function a() {
        console.log(data[i]);
        if (!(i < data.length)) return;
        geocoder.geocode({'address': data[i]}, function(results, status) {
            // ジオコーディングが成功した場合
            if (status == google.maps.GeocoderStatus.OK) {
                // google.maps.Marker()コンストラクタにマーカーを設置するMapオブジェクトと
                // 変換した緯度・経度情報を渡してインスタンスを生成
                marker = new google.maps.Marker({ // マーカーの追加
                    position: results[0].geometry.location, // マーカーを立てる位置を指定
                    icon:'./icon/ESCAPEMarker.png' // 情報ごとにマーカーイメージを変更
                });
                markerEvent(marker, results[0].formatted_address); // マーカーにクリックイベントを追加
                landslideMarkerList.push(marker);
            } else {
                // ジオコーディングが成功しなかった場合
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    i ++;
    setTimeout(a, 20000);
    });
}

function readFireMarker() {
    // google.maps.MVCArray()コンストラクタのインスタンスを生成
    fireMarkerList = new google.maps.MVCArray();
    // 情報アイコンを表示
    var str = getTextFile("./data/fire.txt");
    var data = str.split("\n");
    var i = 0;
    setTimeout(function a() {
        console.log(data[i]);
        if (!(i < data.length)) return;
        geocoder.geocode({'address': data[i]}, function(results, status) {
            // ジオコーディングが成功した場合
            if (status == google.maps.GeocoderStatus.OK) {
                // google.maps.Marker()コンストラクタにマーカーを設置するMapオブジェクトと
                // 変換した緯度・経度情報を渡してインスタンスを生成
                marker = new google.maps.Marker({ // マーカーの追加
                    position: results[0].geometry.location, // マーカーを立てる位置を指定
                    icon:'./icon/ESCAPEMarker.png' // 情報ごとにマーカーイメージを変更
                });
                markerEvent(marker, results[0].formatted_address); // マーカーにクリックイベントを追加
                fireMarkerList.push(marker);
            } else {
                // ジオコーディングが成功しなかった場合
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    i ++;
    setTimeout(a, 20000);
    });
}

function readFloodMarker() {
    // google.maps.MVCArray()コンストラクタのインスタンスを生成
    floodMarkerList = new google.maps.MVCArray();
    // 情報アイコンを表示
    var str = getTextFile("./data/flood.txt");
    var data = str.split("\n");
    var i = 0;
    setTimeout(function a() {
        console.log(data[i]);
        if (!(i < data.length)) return;
        geocoder.geocode({'address': data[i]}, function(results, status) {
            // ジオコーディングが成功した場合
            if (status == google.maps.GeocoderStatus.OK) {
                // google.maps.Marker()コンストラクタにマーカーを設置するMapオブジェクトと
                // 変換した緯度・経度情報を渡してインスタンスを生成
                marker = new google.maps.Marker({ // マーカーの追加
                    position: results[0].geometry.location, // マーカーを立てる位置を指定
                    icon:'./icon/ESCAPEMarker.png' // 情報ごとにマーカーイメージを変更
                });
                markerEvent(marker, results[0].formatted_address); // マーカーにクリックイベントを追加
                floodMarkerList.push(marker);
            } else {
                // ジオコーディングが成功しなかった場合
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    i ++;
    setTimeout(a, 20000);
    });
}

function readRefugeMarker() {
    // google.maps.MVCArray()コンストラクタのインスタンスを生成
    refugeMarkerList = new google.maps.MVCArray();
    // 情報アイコンを表示
    var str = getTextFile("./data/refuge.txt");
    var data = str.split("\n");
    var i = 0;
    setTimeout(function a() {
        console.log(data[i]);
        if (!(i < data.length)) return;
        geocoder.geocode({'address': data[i]}, function(results, status) {
            // ジオコーディングが成功した場合
            if (status == google.maps.GeocoderStatus.OK) {
                // google.maps.Marker()コンストラクタにマーカーを設置するMapオブジェクトと
                // 変換した緯度・経度情報を渡してインスタンスを生成
                marker = new google.maps.Marker({ // マーカーの追加
                    position: results[0].geometry.location, // マーカーを立てる位置を指定
                    icon:'./icon/ESCAPEMarker.png' // 情報ごとにマーカーイメージを変更
                });
                markerEvent(marker, results[0].formatted_address); // マーカーにクリックイベントを追加
                refugeMarkerList.push(marker);
            } else {
                // ジオコーディングが成功しなかった場合
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    i ++;
    setTimeout(a, 20000);
    });
}