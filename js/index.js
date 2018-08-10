var PicReturn = /** @class */ (function () {
    function PicReturn(className, timeOut, pointsClass, pointSelectStyle) {
        if (timeOut === void 0) { timeOut = null; }
        if (pointsClass === void 0) { pointsClass = null; }
        if (pointSelectStyle === void 0) { pointSelectStyle = null; }
        this.className = className;
        this.timeOut = timeOut;
        this.pointsClass = pointsClass;
        this.pointSelectStyle = pointSelectStyle;
        this.threeStyle = {
            left: null,
            middle: null,
            right: null
        };
        this.mouseData = {
            isMouseDown: null,
            downX: null,
            goToNewPage: null,
            currentX: 0,
            currentLeftX: null,
            currentRightX: null,
            upX: null
        };
        this.pictureBox = document.getElementsByClassName(this.className)[0];
        this.allPicture = [];
        this.allPoint = [];
        this.allPictureNormal = [];
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
                one.setAttribute("style", this.threeStyle.right);
                this.allPicture.push(one);
                this.allPictureNormal.push(one);
                i++;
            }
        }
        this.allPicture[0].setAttribute("style", this.threeStyle.middle);
        this.allPicture[this.allPicture.length - 1].setAttribute("style", this.threeStyle.left);
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
            this.pointClassName = this.pointsBox.childNodes[1].className;
            for (var i = 0; i < this.allPicture.length - 1; i++) {
                this.pointsBox.appendChild(this.pointsBox.childNodes[1]);
                var onePoint = document.createElement('div');
                // onePoint.classList.add(this.pointClassName);
                onePoint.setAttribute("class", this.pointClassName); //ie9
                this.pointsBox.appendChild(onePoint);
            }
        }
    };
    PicReturn.prototype.changePointColor = function (pointArr, currentIndex) {
        for (var _i = 0, pointArr_1 = pointArr; _i < pointArr_1.length; _i++) {
            var one = pointArr_1[_i];
            // one.classList.remove(this.pointSelectStyle);
            one.setAttribute("class", this.pointClassName); //ie9
        }
        // pointArr[currentIndex].classList.add(this.pointSelectStyle);
        pointArr[currentIndex].setAttribute("class", this.pointClassName + " " + this.pointSelectStyle); //ie9
    };
    PicReturn.prototype.pointGuideCommonMethod = function (i) {
        clearInterval(this.time);
        this.currentIndex = i - 1;
        var sliceElseFirst = this.allPictureNormal.slice(0, i);
        var sliceElseSecond = this.allPictureNormal.slice(i);
        this.allPicture = sliceElseSecond.concat(sliceElseFirst);
        var one = this.allPicture.pop();
        this.allPicture.unshift(one);
        for (var s = 0; s < this.allPicture.length; s++) {
            if (s > i) {
                this.allPictureNormal[s].setAttribute("style", this.threeStyle.right);
            }
            else if (s < i) {
                this.allPictureNormal[s].setAttribute("style", this.threeStyle.left);
            }
        }
        this.run();
    };
    PicReturn.prototype.pointGuide = function () {
        var _this = this;
        var _loop_1 = function (i) {
            if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                this_1.allPoint[i].addEventListener('touchstart', function () {
                    _this.pointGuideCommonMethod(i);
                });
                this_1.allPoint[i].addEventListener('touchend', function () {
                    _this.interval();
                });
            }
            else {
                this_1.allPoint[i].addEventListener('mouseover', function () {
                    _this.pointGuideCommonMethod(i);
                });
                this_1.allPoint[i].addEventListener('mouseout', function () {
                    _this.interval();
                });
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.allPoint.length; i++) {
            _loop_1(i);
        }
    };
    PicReturn.prototype.down = function (event, time, touch) {
        if (touch === void 0) { touch = false; }
        this.mouseData.currentLeftX = -this.oneWidth;
        this.mouseData.currentRightX = this.oneWidth;
        if (!touch) {
            this.mouseData.isMouseDown = true;
            this.mouseData.downX = event.clientX;
        }
        else {
            this.mouseData.downX = event.changedTouches[0].clientX;
        }
        clearInterval(time);
        this.mouseData.goToNewPage = true;
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
    PicReturn.prototype.move = function (event, allPicture, touch) {
        if (touch === void 0) { touch = false; }
        var howLong = 0;
        if (!touch) {
            howLong = event.clientX - this.mouseData.downX;
        }
        else {
            howLong = event.changedTouches[0].clientX - this.mouseData.downX;
        }
        allPicture[0].style.left = this.mouseData.currentX + howLong + "px";
        allPicture[0].style.transition = "none";
        allPicture[allPicture.length - 1].style.left = this.mouseData.currentLeftX + howLong + "px";
        allPicture[allPicture.length - 1].style.transition = "none";
        allPicture[1].style.left = this.mouseData.currentRightX + howLong + "px";
        allPicture[1].style.transition = "none";
        this.mouseData.goToNewPage = false;
    };
    PicReturn.prototype.mouseDirection = function () {
        var _this = this;
        this.pictureBox.onmousedown = function (event) {
            event.preventDefault();
            if (event.buttons === 1) {
                _this.down(event, _this.time);
            }
        };
        this.pictureBox.onmousemove = function (event) {
            if (_this.mouseData.isMouseDown && event.buttons === 1) {
                _this.move(event, _this.allPicture);
            }
        };
        this.pictureBox.onmouseup = function (event) {
            if (event.button === 0) {
                _this.mouseData.isMouseDown = false;
                _this.mouseData.upX = event.clientX;
                _this.mouseUp(_this.mouseData.goToNewPage, _this.mouseData.upX, _this.mouseData.downX);
            }
        };
        this.pictureBox.ontouchstart = function (event) {
            event.preventDefault();
            _this.down(event, _this.time, true);
        };
        this.pictureBox.ontouchmove = function (event) {
            _this.move(event, _this.allPicture, true);
        };
        this.pictureBox.ontouchend = function (event) {
            _this.mouseData.upX = event.changedTouches[0].clientX;
            _this.mouseUp(_this.mouseData.goToNewPage, _this.mouseData.upX, _this.mouseData.downX, true);
        };
    };
    PicReturn.prototype.run = function () {
        this.allPicture[0].setAttribute("style", this.threeStyle.left);
        this.allPicture[1].setAttribute("style", this.threeStyle.middle);
        this.allPicture[2].setAttribute("style", this.threeStyle.right);
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
        this.allPicture[0].setAttribute("style", this.threeStyle.right);
        this.allPicture[this.allPicture.length - 1].setAttribute("style", this.threeStyle.middle);
        this.allPicture[this.allPicture.length - 2].setAttribute("style", this.threeStyle.left);
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
        this.threeStyle.left = "position: absolute;left: -" + this.oneWidth + "px;top: 0;z-index: -1;";
        this.threeStyle.middle = "position: absolute;left: 0;top: 0;z-index: 1;";
        this.threeStyle.right = "position: absolute;left: " + this.oneWidth + "px;top: 0;z-index: -1;";
    };
    PicReturn.prototype.interval = function () {
        var _this = this;
        this.time = setInterval(function () {
            _this.run();
        }, this.timeOut);
    };
    PicReturn.prototype.widthChangeFixHeight = function () {
        var _this = this;
        this.pictureBox.style.height = this.oneHeight + 'px';
        window.onresize = function () {
            _this.getOneWidth();
            _this.setThreeStyle();
            _this.pictureBox.style.height = _this.oneHeight + 'px';
        };
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
        this.widthChangeFixHeight();
        this.mouseDirection();
        this.interval();
    };
    return PicReturn;
}());
var pictureReturn = new PicReturn('picBox', 2000, 'points', 'pointSelected');
pictureReturn.start();
