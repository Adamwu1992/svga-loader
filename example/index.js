import { Player } from 'svgaplayerweb'
import ReadyGo from './assets/ReadyGo.svga'

const player = new Player("#app")

player.setVideoItem(ReadyGo)
player.startAnimation()
