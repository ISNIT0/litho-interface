import { LFunction } from "./LFunction";

interface MusicState {
    songIndex: number;
    volume: number;
    playing: boolean;
}

export class Music implements LFunction<MusicState> {
    state = {
        songIndex: 0,
        volume: 5,
        playing: false,
    }

    async onSelect() {
        console.log(`Songs`);
    }

    async onSwipe(direction: 'UP' | 'DOWN') {
        const dIndex = direction === 'UP' ? 1 : -1;
        if (this.state.playing) {
            songs[this.state.songIndex].pause();
        }
        this.state.songIndex = (this.state.songIndex + songs.length + dIndex) % songs.length;
        if (this.state.playing) {
            songs[this.state.songIndex].play();
        }
        console.log(`Selected [${songs[this.state.songIndex]}]`);
    }

    async onTouchDrag(prevTouch, touchNow) {
        const touchDiff = {
            x: prevTouch.x - touchNow.x,
            y: prevTouch.y - touchNow.y,
        }

        this.state.volume = this.state.volume - (touchDiff.x * 5);
        songs[this.state.songIndex].volume = Math.max(Math.min(Math.floor(this.state.volume) / 10, 1), 0);

        console.log(`Volume: `, songs[this.state.songIndex].volume);
    }

    async onTap() {
        if (this.state.playing) {
            songs[this.state.songIndex].pause();
        } else {
            songs[this.state.songIndex].play();
        }
        this.state.playing = !this.state.playing;
        console.log(`Play [${songs[this.state.songIndex]}]`);
    }

    render() {
        return `
MUSIC
--
Selected Song: ${songs[this.state.songIndex].src}
State: ${this.state.playing ? 'PLAYING' : 'PAUSED'}
Volume: ${songs[this.state.songIndex].volume}
        `;
    }
}



const songs = [new Audio(`/imperialMarch.mp3`), new Audio(`/scherzo.mp3`)];
