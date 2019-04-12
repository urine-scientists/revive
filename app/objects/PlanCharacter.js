export default class PlanCharacter extends PIXI.Container {


    constructor() {
        super();
        this.mentalPoint = 0;
        this.maxMentalPoint = 10.0;
        this.tempMentalPoint = 0;
        this.characterName = "anonymous";
        this.id = 0;
        this.data = null;
        this.resource = 0;

        // Visual 관련
        this.spriteImage = new PIXI.Sprite();
        this.mentalBar = new PIXI.Container();
        this.outerMentalBar = new PIXI.Graphics();
        this.innerMentalBar = new PIXI.Graphics();

        this.initialPositionX = 0;
        this.initialPositionY = 0;


        // 로직 관련
        this.isDeployed = false;
    }

    setData() {
        this.characterName = this.data.name;
        this.mentalPoint = this.data.mentalPoint;

        // 이거 포인터처럼 작동하나??
        this.tempMentalPoint = this.data.mentalPoint;
        this.setMentalPoint(this.mentalPoint / this.maxMentalPoint);
        this.spriteImage.addChild(this.mentalBar);
    }

    setSpriteImage(t) {
        this.spriteImage.texture = t;
        this.spriteImage.interactive = true;
        this.spriteImage.buttonMode = true;

        this.spriteImage.anchor.set(0.5);

        this.addChild(this.spriteImage);


    }

    deployed(resource, requiredMentalPoint) {
        this.isDeployed = true;
        this.resource = resource;
        this.tempMentalPoint = this.mentalPoint - requiredMentalPoint;

        // 넘겨주기 용 데이터
        this.data.mentalPoint = this.tempMentalPoint;
        // 임시 보여주기
        this.setMentalPoint(this.tempMentalPoint / this.maxMentalPoint);


    }

    undeployed() {
        this.isDeployed = false;

        this.resource = 0;
        this.tempMentalPoint = this.mentalPoint;
        // 넘겨주기용 데이터
        this.data.mentalPoint = this.tempMentalPoint;
        this.setMentalPoint(this.tempMentalPoint / this.maxMentalPoint);
    }

    setInitialpoint(x, y) {
        this.initialPositionX = x;
        this.initialPositionY = y;
    }

    returnToInitialPoint() {
        this.spriteImage.x = this.initialPositionX;
        this.spriteImage.y = this.initialPositionY;
    }


    setMentalPoint(a = 1.0) {
        // 멘탈바 배경
        //this.mentalBar.removeChildren();
        // 현재 아래 주석처리된 코드가 안되므로 이걸로 대체


        this.mentalBar.removeChildren();


        // new 로 만들지 않으면 어째서인지 부를때마다 계속해서 생성한다. ex) 150, 150*0.9 ... 이런식으로 덧씌워진다.
        this.outerMentalBar = new PIXI.Graphics();
        this.outerMentalBar.beginFill(0xb2b2b2);
        this.outerMentalBar.drawRect(0, 0, 150, 10);
        this.outerMentalBar.endFill();
        this.mentalBar.addChild(this.outerMentalBar);

        // 멘탈바 게이지
        this.innerMentalBar = new PIXI.Graphics();
        this.innerMentalBar.beginFill(0xff6dd8);
        this.innerMentalBar.drawRect(0, 0, 150 * a, 8);
        this.innerMentalBar.endFill();
        this.mentalBar.addChild(this.innerMentalBar);


    }
}
