class Music{
    constructor(title, singer, img,file){
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }
    getName(){
        return this.title +   " - " + this.singer;
    }
}

const musicList = [
    new Music("Belki Çok Da Şey Yapmamak Lazım", "Gripin","gripin.jpg","gripin_belki_cok_da_sey_yapmamak_lazim_official_video_mp3_62299.mp3"),
    new Music("Get Lucky", "Daft Punk","getlucky.jpg","daft_punk_feat._pharrell_williams_get_lucky_official_video_mp3_62318.mp3"),
    new Music("Işıkları Söndürseler Bile", "Manga","manga.jpg","manga_isiklari_sondurseler_bile_mp3_62357.mp3"),
];