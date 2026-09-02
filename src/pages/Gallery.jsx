import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import { client } from "../sanity/client";
import { galleryQuery } from "../sanity/queries";

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    client
      .fetch(galleryQuery)
      .then((data) => {
        setGallery(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load gallery:", err);
        setError("Unable to load the gallery right now.");
        setLoading(false);
      });
  }, []);

  const openAlbum = (album) => {
    setSelectedAlbum(album);
    setSelectedImage(0);
  };

  const closeAlbum = () => {
    setSelectedAlbum(null);
    setSelectedImage(0);
  };

  const nextImage = () => {
    if (!selectedAlbum?.images?.length) return;

    setSelectedImage((current) =>
      current === selectedAlbum.images.length - 1
        ? 0
        : current + 1
    );
  };

  const previousImage = () => {
    if (!selectedAlbum?.images?.length) return;

    setSelectedImage((current) =>
      current === 0
        ? selectedAlbum.images.length - 1
        : current - 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!selectedAlbum) return;

      if (event.key === "Escape") {
        closeAlbum();
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
  }, [selectedAlbum]);

  return (
    <main className="galleryPage">
      <section className="pageHero">
        <div className="container">
          <div className="kicker">MY JOURNEY</div>

          <h1 className="pageTitle">
            Photo <span>Gallery</span>
          </h1>

          <p>
            A collection of moments, experiences, practical learning,
            veterinary activities, and memorable moments from my journey.
          </p>
        </div>
      </section>

      <section className="section soft">
        <div className="container">

          {loading && <p>Loading gallery...</p>}

          {error && <p>{error}</p>}

          {!loading && !error && gallery.length === 0 && (
            <p>No gallery images have been published yet.</p>
          )}

          {!loading && !error && gallery.length > 0 && (
            <div className="galleryAlbums">

              {gallery.map((album) => {
                const images = album.images || [];

                if (images.length === 0) return null;

                return (
                  <article
                    className="galleryAlbum"
                    key={album._id}
                    onClick={() => openAlbum(album)}
                  >
                    <div className="galleryAlbumImage">

                      <img
                        src={images[0]}
                        alt={album.title}
                      />

                      {images.length > 1 && (
                        <div className="photoCount">
                          {images.length} photos
                        </div>
                      )}

                    </div>

                    <div className="galleryAlbumInfo">

                      {album.category && (
                        <span className="galleryCategory">
                          {album.category}
                        </span>
                      )}

                      <h3>{album.title}</h3>

                      {album.date && (
                        <small>
                          <CalendarDays size={13} />

                          {new Date(
                            album.date
                          ).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </small>
                      )}

                    </div>
                  </article>
                );
              })}

            </div>
          )}

        </div>
      </section>

      {/* PHOTO VIEWER */}

      {selectedAlbum && selectedAlbum.images?.length > 0 && (
        <div
          className="galleryLightbox"
          onClick={closeAlbum}
        >

          <button
            className="galleryClose"
            onClick={closeAlbum}
            aria-label="Close gallery"
          >
            <X />
          </button>

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

          <div
            className="galleryViewer"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="galleryMainPhoto">

              <img
                src={selectedAlbum.images[selectedImage]}
                alt={`${selectedAlbum.title} ${selectedImage + 1}`}
              />

              <div className="galleryCounter">
                {selectedImage + 1} / {selectedAlbum.images.length}
              </div>

            </div>

            <div className="galleryViewerInfo">

              <div>
                {selectedAlbum.category && (
                  <span className="galleryCategory">
                    {selectedAlbum.category}
                  </span>
                )}

                <h2>{selectedAlbum.title}</h2>

                {selectedAlbum.date && (
                  <p>
                    <CalendarDays size={14} />

                    {new Date(
                      selectedAlbum.date
                    ).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>

              <div className="galleryThumbnails">

                {selectedAlbum.images.map((image, index) => (
                  <button
                    key={image + index}
                    className={
                      index === selectedImage
                        ? "galleryThumbnail active"
                        : "galleryThumbnail"
                    }
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                    />
                  </button>
                ))}

              </div>

            </div>

          </div>

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
      )}
    </main>
  );
}