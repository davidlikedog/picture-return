var PicReturn = /** @class */ (function () {
    function PicReturn(className, timeOut, pointsClass, pointSelectStyle) {
        if (timeOut === void 0) { timeOut = null; }
        if (pointsClass === void 0) { pointsClass = null; }
        if (pointSelectStyle === void 0) { pointSelectStyle = null; }
        this.className = className;
        this.timeOut = timeOut;
        this.pointsClass = pointsClass;
        this.pointSelectStyle = pointSelectStyle;
        this.pictureBox = document.getElementsByClassName(this.className)[0];
        this.allPicture = [];
        this.allPoint = [];
        this.allPictureNormal = [];
        this.threeStyle = [];
        this.currentIndex = 0;
        if (pointsClass !== null) {
            this.pointsBox = document.getElementsByClassName(this.pointsClass)[0];
        }
        else {
            this.pointsBox = null;
        }
    }
    PicReturn.prototype.getOneWidth = function () {
        this.oneWidth = this.pictureBox.childNodes[1].childNodes[1].clientWidth;
        this.oneHeight = this.pictureBox.childNodes[1].childNodes[1].clientHeight;
    };
    PicReturn.prototype.fixOnesLocation = function () {
        var i = 0;
        for (var _i = 0, _a = this.pictureBox.childNodes; _i < _a.length; _i++) {
            var one = _a[_i];
            if (one.nodeType === 1) {
                one.setAttribute("style", this.threeStyle[2]);
                this.allPicture.push(one);
                this.allPictureNormal.push(one);
                i++;
            }
        }
        this.allPicture[0].setAttribute("style", this.threeStyle[1]);
        this.allPicture[this.allPicture.length - 1].setAttribute("style", this.threeStyle[0]);
    };
    PicReturn.prototype.getAllPoint = function () {
        if (this.pointsBox !== null) {
            for (var i = 0; i < this.pointsBox.childNodes.length; i++) {
                if (this.pointsBox.childNodes[i].nodeType === 1) {
                    this.allPoint.push(this.pointsBox.childNodes[i]);
                }
            }
        }
    };
    PicReturn.prototype.loopPoint = function () {
        if (this.pointsBox !== null) {
            var pointClassName = this.pointsBox.childNodes[1].classList[0];
            for (var i = 0; i < this.allPicture.length - 1; i++) {
                this.pointsBox.appendChild(this.pointsBox.childNodes[1]);
                var onePoint = document.createElement('div');
                onePoint.classList.add(pointClassName);
                this.pointsBox.appendChild(onePoint);
            }
        }
    };
    PicReturn.prototype.changePointColor = function (pointArr, currentIndex) {
        for (var _i = 0, pointArr_1 = pointArr; _i < pointArr_1.length; _i++) {
            var one = pointArr_1[_i];
            one.classList.remove(this.pointSelectStyle);
        }
        pointArr[currentIndex].classList.add(this.pointSelectStyle);
    };
    PicReturn.prototype.pointGuide = function () {
        var _this = this;
        var _loop_1 = function (i) {
            this_1.allPoint[i].addEventListener('mouseover', function () {
                clearInterval(_this.time);
                _this.currentIndex = i - 1;
                var sliceElseFirst = _this.allPictureNormal.slice(0, i);
                var sliceElseSecond = _this.allPictureNormal.slice(i);
                _this.allPicture = sliceElseSecond.concat(sliceElseFirst);
                var one = _this.allPicture.pop();
                _this.allPicture.unshift(one);
                for (var s = 0; s < _this.allPicture.length; s++) {
                    if (s > i) {
                        _this.allPicture[s].setAttribute("style", _this.threeStyle[2]);
                    }
                }
                _this.run();
            });
            this_1.allPoint[i].addEventListener('mouseout', function () {
                _this.interval();
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.allPoint.length; i++) {
            _loop_1(i);
        }
    };
    PicReturn.prototype.mouseUp = function (goToNewPage, upX, downX, touch) {
        if (touch === void 0) { touch = false; }
        var URL = this.allPicture[0].getAttribute('location');
        if (goToNewPage && !touch && URL !== null)
            window.open(URL);
        if (upX - downX >= 5) {
            this.back();
        }
        else if (upX - downX <= -5) {
            this.run();
        }
        this.interval();
    };
    PicReturn.prototype.mouseDirection = function () {
        var _this = this;
        var downX = 0;
        var upX = 0;
        var currentX = 0;
        var currentLeftX = -this.oneWidth;
        var currentRightX = this.oneWidth;
        var goToNewPage = false;
        var isMouseDown = false;
        function down(event, time, touch) {
            if (touch === void 0) { touch = false; }
            if (!touch) {
                isMouseDown = true;
                downX = event.clientX;
            }
            else {
                downX = event.changedTouches[0].clientX;
            }
            clearInterval(time);
            goToNewPage = true;
        }
        function move(event, allPicture, touch) {
            if (touch === void 0) { touch = false; }
            var howLong = 0;
            if (!touch) {
                howLong = event.clientX - downX;
            }
            else {
                howLong = event.changedTouches[0].clientX - downX;
            }
            allPicture[0].style.left = currentX + howLong + "px";
            allPicture[0].style.transition = "none";
            allPicture[allPicture.length - 1].style.left = currentLeftX + howLong + "px";
            allPicture[allPicture.length - 1].style.transition = "none";
            allPicture[1].style.left = currentRightX + howLong + "px";
            allPicture[1].style.transition = "none";
            goToNewPage = false;
        }
        this.pictureBox.onmousedown = function (event) {
            if (event.buttons === 1) {
                down(event, _this.time);
            }
        };
        this.pictureBox.onmousemove = function (event) {
            if (isMouseDown && event.buttons === 1) {
                move(event, _this.allPicture);
            }
        };
        this.pictureBox.onmouseup = function (event) {
            if (event.button === 0) {
                isMouseDown = false;
                upX = event.clientX;
                _this.mouseUp(goToNewPage, upX, downX);
            }
        };
        this.pictureBox.ontouchstart = function (event) {
            down(event, _this.time, true);
        };
        this.pictureBox.ontouchmove = function (event) {
            move(event, _this.allPicture, true);
        };
        this.pictureBox.ontouchend = function (event) {
            upX = event.changedTouches[0].clientX;
            _this.mouseUp(goToNewPage, upX, downX, true);
        };
    };
    PicReturn.prototype.run = function () {
        this.allPicture[0].setAttribute("style", this.threeStyle[0]);
        this.allPicture[1].setAttribute("style", this.threeStyle[1]);
        this.allPicture[2].setAttribute("style", this.threeStyle[2]);
        var one = this.allPicture.shift();
        this.allPicture.push(one);
        this.currentIndex++;
        if (this.currentIndex >= this.allPicture.length) {
            this.currentIndex = 0;
        }
        if (this.pointsBox !== null)
            this.changePointColor(this.allPoint, this.currentIndex);
    };
    PicReturn.prototype.back = function () {
        this.allPicture[0].setAttribute("style", this.threeStyle[2]);
        this.allPicture[this.allPicture.length - 1].setAttribute("style", this.threeStyle[1]);
        this.allPicture[this.allPicture.length - 2].setAttribute("style", this.threeStyle[0]);
        var one = this.allPicture.pop();
        this.allPicture.unshift(one);
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.allPicture.length - 1;
        }
        if (this.pointsBox !== null)
            this.changePointColor(this.allPoint, this.currentIndex);
    };
    PicReturn.prototype.setThreeStyle = function () {
        this.threeStyle.push("position: absolute;left: -" + this.oneWidth + "px;top: 0;z-index: -1;");
        this.threeStyle.push("position: absolute;left: 0;top: 0;z-index: 1;");
        this.threeStyle.push("position: absolute;left: " + this.oneWidth + "px;top: 0;z-index: -1;");
    };
    PicReturn.prototype.interval = function () {
        var _this = this;
        this.time = setInterval(function () {
            _this.run();
        }, this.timeOut);
    };
    PicReturn.prototype.start = function () {
        this.getOneWidth();
        this.setThreeStyle();
        this.fixOnesLocation();
        this.loopPoint();
        this.getAllPoint();
        if (this.pointsBox !== null)
            this.changePointColor(this.allPoint, this.currentIndex);
        this.pointGuide();
        this.pictureBox.style.height = this.oneHeight + 'px';
        this.mouseDirection();
        this.interval();
    };
    return PicReturn;
}());
var pictureReturn = new PicReturn('picBox', 2000, 'points', 'pointSelected');
pictureReturn.start();
