
import React, { useEffect } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

export default function GalleryViewer({
  album,
  selectedImage,
  setSelectedImage,
  onClose,
}) {
  if (!album?.images?.length) {
    return null;
  }

  const nextImage = () => {
    setSelectedImage((current) =>
      current === album.images.length - 1
        ? 0
        : current + 1
    );
  };

  const previousImage = () => {
    setSelectedImage((current) =>
      current === 0
        ? album.images.length - 1
        : current - 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }

      if (event.key === "ArrowLeft") {
        previousImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [album, onClose]);

  return (
    <div
      className="galleryLightbox"
      onClick={onClose}
    >
      {/* CLOSE */}
      <button
        className="galleryClose"
        onClick={onClose}
        aria-label="Close gallery"
      >
        <X />
      </button>

      {/* PREVIOUS */}
      <button
        className="galleryNav galleryPrev"
        onClick={(event) => {
          event.stopPropagation();
          previousImage();
        }}
        aria-label="Previous photo"
      >
        <ChevronLeft />
      </button>

      {/* VIEWER */}
      <div
        className="galleryViewer"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="galleryMainPhoto">
          <img
            src={album.images[selectedImage]}
            alt={`${album.title} ${
              selectedImage + 1
            }`}
          />

          <div className="galleryCounter">
            {selectedImage + 1} /{" "}
            {album.images.length}
          </div>
        </div>

        <div className="galleryViewerInfo">
          <div>
            {album.category && (
              <span className="galleryCategory">
                {album.category}
              </span>
            )}

            <h2>{album.title}</h2>

            {album.date && (
              <p>
                <CalendarDays size={14} />

                {new Date(
                  album.date
                ).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            )}
          </div>

          {/* THUMBNAILS */}
          <div className="galleryThumbnails">
            {album.images.map((image, index) => (
              <button
                key={image + index}
                className={
                  index === selectedImage
                    ? "galleryThumbnail active"
                    : "galleryThumbnail"
                }
                onClick={() =>
                  setSelectedImage(index)
                }
              >
                <img
                  src={image}
                  alt={`Thumbnail ${
                    index + 1
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* NEXT */}
      <button
        className="galleryNav galleryNext"
        onClick={(event) => {
          event.stopPropagation();
          nextImage();
        }}
        aria-label="Next photo"
      >
        <ChevronRight />
      </button>
    </div>
  );
}

