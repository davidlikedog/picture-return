class PicReturn {
    private readonly pictureBox: any;
    private readonly pointsBox: any;
    private oneWidth: number;
    private oneHeight: number;
    private allPicture: Array<any>;
    private readonly allPoint: Array<any>;
    private readonly allPictureNormal: Array<any>;
    private time: number;
    private currentIndex: number;
    private readonly threeStyle: Array<string>;

    constructor(private className: string, private timeOut: number = null, private pointsClass: string = null,
                private pointSelectStyle: string = null) {
        this.pictureBox = document.getElementsByClassName(this.className)[0];
        this.allPicture = [];
        this.allPoint = [];
        this.allPictureNormal = [];
        this.threeStyle = [];
        this.currentIndex = 0;
        if (pointsClass !== null) {
            this.pointsBox = document.getElementsByClassName(this.pointsClass)[0];
        } else {
            this.pointsBox = null;
        }
    }

    getOneWidth() {
        this.oneWidth = this.pictureBox.childNodes[1].childNodes[1].clientWidth;
        // this.oneWidth = this.pictureBox.getElementsByTagName('img')[0].clientWidth;
        this.oneHeight = this.pictureBox.childNodes[1].childNodes[1].clientHeight;
    }

    fixOnesLocation() {
        let i = 0;
        for (let one of this.pictureBox.childNodes) {
            if (one.nodeType === 1) {
                one.style = this.threeStyle[2];
                this.allPicture.push(one);
                this.allPictureNormal.push(one);
                i++;
            }
        }
        this.allPicture[0].style = this.threeStyle[1];
        this.allPicture[this.allPicture.length - 1].style = this.threeStyle[0];
    }

    getAllPoint() {
        if (this.pointsBox !== null) {
            for (let i = 0; i < this.pointsBox.childNodes.length; i++) {
                if (this.pointsBox.childNodes[i].nodeType === 1) {
                    this.allPoint.push(this.pointsBox.childNodes[i]);
                }
            }
        }
    }

    loopPoint() {
        if (this.pointsBox !== null) {
            let pointClassName: string = this.pointsBox.childNodes[1].classList[0];
            for (let i = 0; i < this.allPicture.length - 1; i++) {
                this.pointsBox.appendChild(this.pointsBox.childNodes[1]);
                let onePoint: any = document.createElement('div');
                onePoint.classList.add(pointClassName);
                this.pointsBox.appendChild(onePoint);
            }
        }
    }

    changePointColor(pointArr, currentIndex) {
        for (let one of pointArr) {
            one.classList.remove(this.pointSelectStyle);
        }
        pointArr[currentIndex].classList.add(this.pointSelectStyle);
    }

    pointGuide() {
        for (let i = 0; i < this.allPoint.length; i++) {
            this.allPoint[i].addEventListener('mouseover', () => {
                clearInterval(this.time);
                this.currentIndex = i - 1;
                let sliceElseFirst: Array<any> = this.allPictureNormal.slice(0, i);
                let sliceElseSecond: Array<any> = this.allPictureNormal.slice(i);
                this.allPicture = sliceElseSecond.concat(sliceElseFirst);
                let one: any = this.allPicture.pop();
                this.allPicture.unshift(one);
                for (let s = 0; s < this.allPicture.length; s++) {
                    if (s > i) {
                        this.allPicture[s].style = this.threeStyle[2];
                    }
                }
                this.run();
            });
            this.allPoint[i].addEventListener('mouseout', () => {
                this.interval();
            });
        }
    }

    mouseUp(goToNewPage, upX, downX, touch: boolean = false) {
        const URL: string = this.allPicture[0].getAttribute('location');
        if (goToNewPage && !touch && URL !== null) window.open(URL);
        if (upX - downX >= 5) {
            this.back();
        } else if (upX - downX <= -5) {
            this.run();
        }
        this.interval();
    }

    mouseDirection() {
        let downX: number = 0;
        let upX: number = 0;
        let currentX: number = 0;
        let currentLeftX: number = -this.oneWidth;
        let currentRightX: number = this.oneWidth;
        let goToNewPage: boolean = false;
        let isMouseDown: boolean = false;

        function down(event, time, touch: boolean = false) {
            if (!touch) {
                isMouseDown = true;
                downX = event.clientX;
            } else {
                downX = event.changedTouches[0].clientX
            }
            clearInterval(time);
            goToNewPage = true;
        }

        function move(event, allPicture, touch: boolean = false) {
            let howLong: number = 0;
            if (!touch) {
                howLong = event.clientX - downX;
            } else {
                howLong = event.changedTouches[0].clientX - downX;
            }
            allPicture[0].style.left = `${currentX + howLong}px`;
            allPicture[allPicture.length - 1].style.left = `${currentLeftX + howLong}px`;
            allPicture[1].style.left = `${currentRightX + howLong}px`;
            goToNewPage = false;
        }

        this.pictureBox.onmousedown = (event) => {
            if (event.buttons === 1) {
                down(event, this.time);
            }
        };
        this.pictureBox.onmousemove = (event) => {
            if (isMouseDown && event.buttons === 1) {
                move(event, this.allPicture);
            }
        };
        this.pictureBox.onmouseup = (event) => {
            if (event.button === 0) {
                isMouseDown = false;
                upX = event.clientX;
                this.mouseUp(goToNewPage, upX, downX);
            }
        };

        this.pictureBox.ontouchstart = (event) => {
            down(event, this.time, true);
        };
        this.pictureBox.ontouchmove = (event) => {
            move(event, this.allPicture, true);
        };
        this.pictureBox.ontouchend = (event) => {
            upX = event.changedTouches[0].clientX;
            this.mouseUp(goToNewPage, upX, downX, true);
        };
    }

    run() {
        this.allPicture[0].style = this.threeStyle[0];
        this.allPicture[1].style = this.threeStyle[1];
        this.allPicture[2].style = this.threeStyle[2];
        let one: any = this.allPicture.shift();
        this.allPicture.push(one);
        this.currentIndex++;
        if (this.currentIndex >= this.allPicture.length) {
            this.currentIndex = 0;
        }
        if (this.pointsBox !== null) this.changePointColor(this.allPoint, this.currentIndex);
    }

    back() {
        this.allPicture[0].style = this.threeStyle[2];
        this.allPicture[this.allPicture.length - 1].style = this.threeStyle[1];
        this.allPicture[this.allPicture.length - 2].style = this.threeStyle[0];
        let one: any = this.allPicture.pop();
        this.allPicture.unshift(one);
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.allPicture.length - 1;
        }
        if (this.pointsBox !== null) this.changePointColor(this.allPoint, this.currentIndex);
    }

    setThreeStyle() {
        this.threeStyle.push(`position: absolute;left: -${this.oneWidth}px;top: 0;z-index: -1;`);
        this.threeStyle.push(`position: absolute;left: 0;top: 0;z-index: 1;`);
        this.threeStyle.push(`position: absolute;left: ${this.oneWidth}px;top: 0;z-index: -1;`);
    }

    interval() {
        this.time = setInterval(() => {
            this.run();
        }, this.timeOut);
    }

    start() {
        this.getOneWidth();
        this.setThreeStyle();
        this.fixOnesLocation();
        this.loopPoint();
        this.getAllPoint();
        if (this.pointsBox !== null) this.changePointColor(this.allPoint, this.currentIndex);
        this.pointGuide();
        this.pictureBox.style.height = this.oneHeight + 'px';
        this.mouseDirection();
        this.interval();
    }
}

let pictureReturn = new PicReturn('picBox', 2000, 'points', 'pointSelected');
pictureReturn.start();