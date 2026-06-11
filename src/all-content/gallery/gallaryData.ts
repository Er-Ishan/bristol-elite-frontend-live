// import gallery1 from "../../assets/images/gallery/gallery-1.png";
// import gallery2 from "../../assets/images/gallery/gallary-2.png";
// import gallery3 from "../../assets/images/gallery/gallery-3.png";
// import gallery4 from "../../assets/images/gallery/gallery-4.png";
// import gallery5 from "../../assets/images/gallery/gallery-5.png";
// import gallery6 from "../../assets/images/gallery/gallery-6.png";

import video1 from "../../assets/images/videos/video-1.mp4";
import video2 from "../../assets/images/videos/video-2.mp4";
import video3 from "../../assets/images/videos/video-3.mov";
// import video4 from "../../assets/images/videos/video-4.mov";
import video5 from "../../assets/images/videos/video-5.mp4";


type GalleryItem = {
    id: number;
    image?: string;
    video?: string;
    link: string;
};

export const galleryData: GalleryItem[] = [
    {
        id: 1,
        video: video1,
        link: "/inner/product-details",
    },
    {
        id: 2,
        video: video2,
        link: "/inner/product-details",
    },
    {
        id: 3,
        video: video3,
        link: "/inner/product-details",
    },
    {
        id: 4,
        video: video5,
        link: "/inner/product-details",
    }
];
