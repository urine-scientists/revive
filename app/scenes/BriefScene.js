import DialogManager from "../managers/DialogManager";
import Button from "../objects/Button";
import Game from "../core/Game";
import {Howl, Howler} from 'howler';

export default class BriefScene extends PIXI.Container {
    constructor() {
        super();

        let turnButton = new Button({
            text: 'sound',
            x: 20,
            y: 30
        });
        this.addChild(turnButton);

        let sound = new Howl({
            src: ["app/assets/sounds/bgm_maoudamashii_acoustic51.mp3"]
        });

        let soundOn = true;
        turnButton.on('click', function (e) {
            Game.getInstance().nextTurn();
            if (soundOn) {
                sound.play();
            } else {
                sound.stop();
            }
            soundOn = !soundOn;
        });

        let dialogManager = new DialogManager();
        let dialog = dialogManager.getDialog();
        dialog.x = 30;
        dialog.y = 60;
        this.addChild(dialog);

    }
}