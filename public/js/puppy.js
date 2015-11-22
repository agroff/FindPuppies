(function($){
    var canvas = document.getElementById("puppyCanvas"),
    ctx = canvas.getContext("2d");

    var img1 = new Image();

    //drawing of the test image - img1
    img1.onload = function () {
        //draw background image
        ctx.drawImage(img1, 0, 0);
        //draw a box over the top
//        ctx.fillStyle = "rgba(200, 0, 0, 0.5)";
//        ctx.fillRect(0, 0, 500, 500);

    };

    img1.src = '/images/dogs.png';

    var cursorX = 0;
    var cursorY = 50;

//    document.onmousemove = function(e){
//        cursorX = e.pageX;
//        cursorY = e.pageY;
//    };

    var effects = {};

    effects.melt = function (i, centerx, centery, radius) {
        var x, y, pos, a, b, v;
        for (y = i.height - 1; y >= 1; y -= 1) {
            for (x = 0; x < i.width; x += 1) {
                pos = 4 * (i.width * y + x);
                a = x - centerx;
                b = y - centery;
                v = 1 - (a * a + b * b) / (radius * radius);
                if (v < 0) { v = 0; }
                v = v * v;
                i.data[pos] += v * (i.data[pos - i.width * 4] - i.data[pos]);
                i.data[pos + 1] += v *
                (i.data[pos + 1 - i.width * 4] - i.data[pos + 1]);
                i.data[pos + 2] += v *
                (i.data[pos + 2 - i.width * 4] - i.data[pos + 2]);
            }
        }
    };

    function initDraw() {
        var view,
            reach = 200,
            x = -1,
            y = -1;
        try {
            view = ctx;
        } catch (err) {
            throw "Your web browser does not support " +
            "the <canvas> element!";
        }

        //canvas.addEventListener('mousemove', updmouse, false);

//        function onresize() {
//            env.location().setHash("burn");
//            view.fillStyle = "rgb(255,255,255)";
//            view.fillRect(0, 0, view.canvas.width, view.canvas.height);
//        }
//        onresize();
//        env.runOnCanvasResize(onresize);

        var rand = function(max, min){
            min = min || 1;
            return min + Math.floor(Math.random() * max)
        };

        var backwards = false;
        var initialMeltHeight = 180;
        var meltHeight = initialMeltHeight;
        function updmouse() {

            var speed = 20;

            if(backwards){
                cursorX -= speed;
            }
            else{
                cursorX += speed;
            }


            if(cursorX >= view.canvas.width){
                backwards = true;
            }
            if(cursorX < 0){
                cursorX = 0;
                cursorY += 45;
                backwards = false;
            }


            if(cursorY >= meltHeight){
                if(meltHeight < view.canvas.height - 30){
                    meltHeight += 10;
                }
                cursorY = meltHeight - initialMeltHeight;
            }

//            ctx.fillStyle = "rgba("+rand(250)+", "+rand(250)+", "+rand(250)+", 1)"
//            ctx.fillRect(cursorX,cursorY,5,5);
//            ctx.fill();



            var newx = cursorX,
                newy = cursorY,
                dx = x - newx,
                dy = y - newy;
            if (newx < 0) { return; }
            if (dx < 0) { dx = -dx; }
            if (dy < 0) { dy = -dy; }
            if (dx + dy > 0) {
                reach -= 1 + Math.round(0.1 * (dx + dy));
                if (reach < 50) { reach = 50; }
                if (reach > 100) { reach = 100; }
                x = newx;
                y = newy;
            }
        }
        function onframe() {
            setTimeout(onframe, 10);
            updmouse();
            var w = view.canvas.width,
                h = view.canvas.height,
                x1 = x - (reach * 2),
                x2 = x + (reach * 2),
                y1 = y - reach,
                y2 = y + reach,
                i,
                effect = "melt",
                limit = 100;
            if (effect === "unlimited") {
                effect = "burn";
                limit = 1000;
            }
            if (!effects[effect]) {
                throw "Unknown effect";
            }
            if (reach < limit) {
                reach += 1;
            } else {
                return;
            }
            if (x < 0) { return; }
            if (x1 < 0) { x1 = 0; }
            if (y1 < 0) { y1 = 0; }
            if (x1 > w - 1) { return; }
            if (y1 > h - 1) { return; }
            if (x2 < x1 + 1) { x2 = x1 + 1; }
            if (y2 < y1 + 1) { y2 = y1 + 1; }
            if (x2 > w) { x2 = w; }
            if (y2 > h) { y2 = h; }
            i = view.getImageData(x1, y1, x2 - x1, y2 - y1);
            effects[effect](i, x - x1, y - y1, reach);
            view.putImageData(i, x1, y1);
        }

        onframe();
    }


    window.meltPuppies = function(){
        initDraw();
    };

}(jQuery));