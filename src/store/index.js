import { defineStore } from "pinia";

export const mainStore = defineStore("main", {
  state: () => {
    return {
      imgLoadStatus: false, // Wallpaper loading status
      innerWidth: null, // Current window width
      coverType: "0", // Wallpaper type
      siteStartShow: false, // Site establishment date display
      musicClick: false, // Whether music link jumps
      musicIsOk: false, // Whether music is loaded
      musicVolume: 0, // Music volume
      musicOpenState: false, // Music panel open state
      backgroundShow: false, // Wallpaper display state
      boxOpenState: false, // Box open state
      mobileOpenState: false, // Mobile open state
      mobileFuncState: false, // Mobile function area open state
      setOpenState: false, // Settings page open state
      playerState: false, // Current playback state
      playerTitle: null, // Current playing song name
      playerArtist: null, // Current playing artist name
      playerLrc: "歌詞載入中", // Current playing lyrics
      playerLrcShow: true, // Whether to display footer lyrics
      footerBlur: true, // Footer blur
      playerAutoplay: false, // Whether to autoplay
      playerLoop: "all", // Loop play "all", "one", "none"
      playerOrder: "list", // Loop order "list", "random"
    };
  },
  getters: {
    // Get lyrics
    getPlayerLrc(state) {
      return state.playerLrc;
    },
    // Get song information
    getPlayerData(state) {
      return {
        name: state.playerTitle,
        artist: state.playerArtist,
      };
    },
    // Get page width
    getInnerWidth(state) {
      return state.innerWidth;
    },
  },
  actions: {
    // Change current page width
    setInnerWidth(value) {
      this.innerWidth = value;
      if (value >= 720) {
        this.mobileOpenState = false;
        this.mobileFuncState = false;
      }
    },
    // Change playback state
    setPlayerState(value) {
      if (value) {
        this.playerState = false;
      } else {
        this.playerState = true;
      }
    },
    // Change lyrics
    setPlayerLrc(value) {
      this.playerLrc = value;
    },
    // Change song data
    setPlayerData(title, artist) {
      this.playerTitle = title;
      this.playerArtist = artist;
    },
    // Change wallpaper loading status
    setImgLoadStatus(value) {
      this.imgLoadStatus = value;
    },
  },
  persist: {
    key: "data",
    storage: window.localStorage,
    paths: [
      "coverType",
      "musicVolume",
      "siteStartShow",
      "musicClick",
      "playerLrcShow",
      "footerBlur",
      "playerAutoplay",
      "playerLoop",
      "playerOrder",
    ],
  },
});
