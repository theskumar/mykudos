$(function(){
    var db = new Firebase("https://mykudos.firebaseio.com/votes");
    function utf8_to_b64( str ) {return window.btoa(unescape(encodeURIComponent( str ))); }
    function get_url_hash(){return utf8_to_b64(window.location.hostname + window.location.pathname); }
    // function b64_to_utf8( str ) {return decodeURIComponent(escape(window.atob( str )));}
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    }
    var hash = get_url_hash();
    function unkudo(){
        var data = {}
        setCookie(hash, '', 0);
        db.child(hash).once('value', function(snap){
            data[get_url_hash()] = snap.val() - 1
            db.set(data);
        });
    }
    function kudo(){
        var data = {}
        setCookie(hash, 'true', 30);
        db.child(hash).once('value', function(snap){
            data[get_url_hash()] = snap.val() + 1
            db.set(data);
        });

    }
    db.child(hash).on('value', function(snap){
        $(".num").html(snap.val());
    });

    document.getElementById('mykudos').innerHTML = '<figure class="kudo kudoable"><a class="kudobject"> <div class="opening"><div class="circle">&nbsp;</div></div> </a> <a href="#kudo" class="count"> <span class="num">0</span> <span class="txt">Kudos</span> </a></figure>';

    // initialize kudos
    $("#mykudos .kudoable").kudoable();

    // check to see if user has already kudod
    if(getCookie(hash) == 'true') {
        $("#mykudos .kudoable").removeClass("animate").addClass("complete");
    }

    // when kudoing
    // $("#mykudos .kudo").bind("kudo:active", function(e){
    //     console.log("kudoing active");
    // });

    // when not kudoing
    // $("#mykudos .kudo").bind("kudo:inactive", function(e){
    //     console.log("kudoing inactive");
    // });

    // after kudo'd
    $("#mykudos .kudo").bind("kudo:added", function(e){
        kudo();
        var element = $(this);
        // ajax'y stuff or whatever you want
        console.log("Kodo'd:", element.data('id'), ":)");

    });

    // after removing a kudo
    $("#mykudos .kudo").bind("kudo:removed", function(e) {
        var element = $(this);
        // ajax'y stuff or whatever you want
        unkudo();
    });
});
