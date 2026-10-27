"use client";

import { useCallback, useEffect, useState } from "react";
import VideoModal, { type ActiveVideo } from "./VideoModal";

export default function HomeVideoModal() {
  const [video, setVideo] = useState<ActiveVideo | null>(null);
  const closeVideo = useCallback(() => setVideo(null), []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-video-id]");
      if (!target) return;
      const id = target.dataset.videoId;
      if (!id) return;
      setVideo({ id, title: target.dataset.videoTitle || "Course video" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return <VideoModal video={video} onClose={closeVideo} />;
}
