
import React, { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";

import GalleryViewer from "../components/GalleryViewer";

import { client } from "../sanity/client";
import { galleryQuery } from "../sanity/queries";

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  /*
   * LOAD GALLERY
   */
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

  /*
   * OPEN ALBUM
   */
  const openAlbum = (album) => {
    setSelectedAlbum(album);
    setSelectedImage(0);
  };

  /*
   * CLOSE VIEWER
   */
  const closeAlbum = () => {
    setSelectedAlbum(null);
    setSelectedImage(0);
  };

  return (
    <main className="galleryPage">
      {/* PAGE HERO */}
      <section className="pageHero">
        <div className="container">
          <div className="kicker">MY JOURNEY</div>

          <h1 className="pageTitle">
            Photo <span>Gallery</span>
          </h1>

          <p>
            A collection of moments, experiences, practical
            learning, veterinary activities, and memorable
            moments from my journey.
          </p>
        </div>
      </section>

      {/* GALLERY ALBUMS */}
      <section className="section soft">
        <div className="container">

          {/* LOADING */}
          {loading && <p>Loading gallery...</p>}

          {/* ERROR */}
          {error && <p>{error}</p>}

          {/* EMPTY */}
          {!loading && !error && gallery.length === 0 && (
            <p>
              No gallery images have been published yet.
            </p>
          )}

          {/* ALBUMS */}
          {!loading && !error && gallery.length > 0 && (
            <div className="galleryAlbums">
              {gallery.map((album) => {
                const images = album.images || [];

                if (images.length === 0) {
                  return null;
                }

                return (
                  <article
                    className="galleryAlbum"
                    key={album._id}
                    onClick={() => openAlbum(album)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (
                        event.key === "Enter" ||
                        event.key === " "
                      ) {
                        event.preventDefault();
                        openAlbum(album);
                      }
                    }}
                  >
                    <div className="galleryAlbumImage">
                      <img
                        src={images[0]}
                        alt={album.title}
                        loading="lazy"
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

      {/* REUSABLE PHOTO VIEWER */}
      {selectedAlbum && (
        <GalleryViewer
          album={selectedAlbum}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          onClose={closeAlbum}
        />
      )}
    </main>
  );
}

