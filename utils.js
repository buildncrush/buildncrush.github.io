function gtag() {
    dataLayer.push(arguments);
}

function addGoogleAnalytics() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.googletagmanager.com/gtag/js?id=UA-89938714-12';
    document.head.prepend(script);
    window.dataLayer = window.dataLayer || [];
    gtag('js', new Date());
    gtag('config', 'UA-89938714-12', {
        'anonymize_ip': true
    });
}
if (localStorage.getItem('allowCookies') != null && localStorage.getItem('allowCookies').toString() === "true")
    addGoogleAnalytics();

function allowCookies() {
    document.getElementById('detailedGdpr').style.display = 'none';
    document.getElementById('gdprPopup').style.display = 'none';
    localStorage.setItem('allowCookies', true);
    aiptag.gdprConsent = true;
    addGoogleAnalytics();
}

function hideBanners() {
    document.getElementById("bottom-left-banner").style.display = 'none';
    document.getElementById("bottom-banner").style.display = 'none';
}

function showBanners() {
    document.getElementById("bottom-left-banner").style.display = 'block';
    if (rectangleBannerVisible)
        document.getElementById("bottom-banner").style.display = 'block';
}

function refreshBanners() {
    aiptag.cmd.display.push(function () {
        aipDisplayTag.display('buildncrush-com_300x250');
    });

    if (rectangleBannerVisible) {
        aiptag.cmd.display.push(function () {
            aipDisplayTag.display('buildncrush-com_728x90');
        });
    }
}

window.aiptag = window.aiptag || {
    cmd: []
};
aiptag.cmd.display = aiptag.cmd.display || [];
aiptag.cmd.player = aiptag.cmd.player || [];
aiptag.gdprShowConsentTool = false;
aiptag.gdprAlternativeConsentTool = true;
aiptag.cmd.player.push(function () {
    adplayer = new aipPlayer({
        AD_WIDTH: 960,
        AD_HEIGHT: 540,
        AD_FULLSCREEN: true,
        AD_CENTERPLAYER: false,
        LOADING_TEXT: 'loading advertisement',
        PREROLL_ELEM: function () {
            return document.getElementById('preroll')
        },
        AIP_COMPLETE: function () {},
        AIP_REMOVE: function () {}
    });
});
if (localStorage.getItem('allowCookies') == null || localStorage.getItem('allowCookies').toString() === "false")
    aiptag.gdprConsent = false;


var rectangleBannerLimit = 1350;
var rectangleBannerVisible = window.innerWidth > rectangleBannerLimit;
window.addEventListener("resize", function () {
    rectangleBannerVisible = window.innerWidth > rectangleBannerLimit;
});


var hasAdblocker = false;
setTimeout(function () {
    var myRequest = new Request('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', {
        method: 'HEAD',
        mode: 'no-cors'
    });
    fetch(myRequest).then(function (response) {
        return response;
    }).then(function (response) {
        hasAdblocker = false;
    }).catch(function (e) {
        hasAdblocker = true;
    });
}, 2000);



console.log(document.referrer);
var blockedSites = ["vseigru.net", "gamelayer.ru", "gogy.com"];
var gameBlocked = false;
blockedSites.forEach(function (website) {
    if (document.referrer.includes(website))
        gameBlocked = true;
})


if (gameBlocked) {
    document.getElementById('game-blocked-notification').style.display = 'block';
} else {
    var gameInstance = UnityLoader.instantiate("gameContainer", "Build/WebGL.json", {
        onProgress: UnityProgress
    });

    function UnityProgress(gameInstance, progress) {
        if (!gameInstance.Module) {
            return;
        }
        const loader = document.querySelector("#loader");
        if (!gameInstance.progress) {
            const progress = document.querySelector("#loader .progress");
            progress.style.display = "block";
            gameInstance.progress = progress.querySelector(".full");
            loader.querySelector(".spinner").style.display = "none";
        }
        gameInstance.progress.style.transform = `scaleX(${progress})`;
        if (progress === 1) {
            loader.style.display = "none";
        }
    }
}


if (localStorage.getItem('allowCookies') == null) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            if (xmlHttp.responseText == "allow") {
                allowCookies();
            } else if (xmlHttp.responseText == "show") {
                document.getElementById('gdprPopup').style.display = 'block';
            }
        }
    }
    xmlHttp.open("GET", "https://api.buildncrush.com/gdpr", true);
    xmlHttp.send(null);
}