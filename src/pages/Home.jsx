
import React, { useEffect, useState } from "react";
import GalleryViewer from "../components/GalleryViewer";

import {
  ArrowRight,
  Award,
  CalendarDays,
  Heart,
  Instagram,
  Mail,
  MapPin,
  PawPrint,
  Sparkles,
  GraduationCap,
} from "lucide-react";

import { Link } from "react-router-dom";

import { client } from "../sanity/client";
import {
  activitiesQuery,
  galleryQuery,
  homeQuery,
  achievementsQuery,
} from "../sanity/queries";

export default function Home({ go }) {
  const [activities, setActivities] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [home, setHome] = useState(null);
  const [achievements, setAchievements] = useState([]);

  const [selectedGalleryAlbum, setSelectedGalleryAlbum] =
    useState(null);

  const [selectedGalleryImage, setSelectedGalleryImage] =
    useState(0);

  /* SUBSCRIBE */

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribeError, setSubscribeError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    setSubscribeError("");
    setSubscribed(false);

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setSubscribeError("Please enter your email address.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(trimmedEmail)) {
      setSubscribeError("Please enter a valid email address.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(
        "https://formspree.io/f/xyeywree",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: trimmedEmail,
          }),
        }
      );

      if (response.ok) {
        setSubscribed(true);
        setEmail("");
      } else {
        setSubscribeError(
          "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("Subscription error:", error);

      setSubscribeError(
        "Unable to subscribe right now. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* LOAD SANITY CONTENT */

  useEffect(() => {
    client
      .fetch(activitiesQuery)
      .then((data) => setActivities(data.slice(0, 3)))
      .catch((err) =>
        console.error("Failed to load activities:", err)
      );

    client
      .fetch(galleryQuery)
      .then((data) => setGallery(data.slice(0, 6)))
      .catch((err) =>
        console.error("Failed to load gallery:", err)
      );

    client
      .fetch(homeQuery)
      .then((data) => setHome(data))
      .catch((err) =>
        console.error("Failed to load home page:", err)
      );

    client
      .fetch(achievementsQuery)
      .then((data) => setAchievements(data))
      .catch((err) =>
        console.error("Failed to load achievements:", err)
      );
  }, []);

  /* FALLBACK DATA */

  const name = home?.name || "Bindu Basnet";

  const role =
    home?.role || "VETERINARY STUDENT";

  const heroText =
    home?.heroText ||
    "A passionate veterinary student documenting experiences, discoveries, and meaningful moments from my journey in animal health and welfare.";

  const heroImage =
    home?.heroImage ||
    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85";

  const location = home?.location || "Nepal";

  const locationText =
    home?.locationText || "Learning every day";

  const aboutTitle =
    home?.aboutTitle ||
    "Learning to care, one experience at a time.";

  const aboutText =
    home?.aboutText ||
    "Veterinary medicine is more than treating animals. It is about understanding, compassion, responsibility, and continuously learning from every experience.";

  const profileImage =
    home?.profileImage ||
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=85";

  const featuredAchievements = achievements
    .filter(
      (achievement) => achievement.featured !== false
    )
    .slice(0, 3);

  return (
    <>
      <main className="homePage">

        {/* =========================
            HERO
        ========================= */}

        <section className="homeHero" id="home">
          <div className="container homeHeroGrid">

            <div className="homeHeroContent">

              <div className="homeEyebrow">
                <span></span>
                VETERINARY JOURNEY
              </div>

              <h1>
                Hi, I'm{" "}
                <span>{name}.</span>
              </h1>

              <div className="homeHeroRole">
                <PawPrint size={18} />
                {role}
              </div>

              <p className="homeHeroText">
                {heroText}
              </p>

              <div className="homeHeroActions">

                <button
                  className="homePrimaryButton"
                  onClick={() => go("activities")}
                >
                  Explore my journey
                  <ArrowRight size={17} />
                </button>

                <button
                  className="homeTextButton"
                  onClick={() => go("about")}
                >
                  More about me
                  <ArrowRight size={16} />
                </button>

              </div>

              <div className="homeHeroMeta">

                <div>
                  <GraduationCap size={18} />

                  <span>
                    <b>B.V.Sc. & A.H.</b>
                    <small>Veterinary Medicine</small>
                  </span>
                </div>

                <div>
                  <MapPin size={18} />

                  <span>
                    <b>{location}</b>
                    <small>{locationText}</small>
                  </span>
                </div>

              </div>

            </div>

            <div className="homeHeroVisual">

              <div className="homeHeroImageFrame">
                <img
                  src={heroImage}
                  alt={`${name}'s veterinary journey`}
                />
              </div>

              <div className="homeHeroBadge">
                <Heart size={17} />

                <span>
                  Learning with
                  <b>compassion</b>
                </span>
              </div>

              <div className="homeHeroNumber">
                <span>01</span>
                <small>MY JOURNEY</small>
              </div>

            </div>

          </div>
        </section>


        {/* =========================
            INTRO STRIP
        ========================= */}

        <section className="homeIntroStrip">
          <div className="container homeIntroInner">

            <div className="homeIntroIcon">
              <PawPrint />
            </div>

            <div>
              <span>MY APPROACH</span>

              <h2>
                Learning medicine through
                <em>experience, empathy & curiosity.</em>
              </h2>
            </div>

            <p>
              From classrooms to farms, clinics and
              laboratories, every experience adds another
              piece to the journey.
            </p>

          </div>
        </section>


        {/* =========================
            ABOUT
        ========================= */}

        <section
          className="section homeAboutSection"
          id="about"
        >

          <div className="container homeAboutGrid">

            <div className="homeAboutImage">

              <img
                src={profileImage}
                alt={`${name} - Veterinary student`}
                loading="lazy"
              />

              <div className="homeAboutStamp">
                <PawPrint size={18} />

                <span>
                  STUDENT
                  <b>VETERINARIAN</b>
                </span>
              </div>

            </div>


            <div className="homeAboutContent">

              <div className="homeSectionKicker">
                <PawPrint size={14} />
                ABOUT THE JOURNEY
              </div>

              <h2 className="homeSectionTitle">
                {aboutTitle}
              </h2>

              <p className="homeAboutLead">
                {aboutText}
              </p>

              <p>
                Through farm visits, clinical exposure,
                laboratory work, workshops, seminars and
                everyday student life, I am building my
                understanding of animal health and welfare.
              </p>

              <div className="homeAboutStats">

                <div>
                  <b>2026</b>
                  <span>Graduation Journey</span>
                </div>

                <div>
                  <b>B.V.Sc.</b>
                  <span>Veterinary Medicine</span>
                </div>

                <div>
                  <b>∞</b>
                  <span>Things to Learn</span>
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =========================
            ACTIVITIES
        ========================= */}

        <section className="section homeActivitiesSection">

          <div className="container">

            <div className="homeSectionHeader">

              <div>
                <div className="homeSectionKicker">
                  <Sparkles size={14} />
                  RECENT EXPERIENCES
                </div>

                <h2 className="homeSectionTitle">
                  Learning beyond
                  <span>the classroom.</span>
                </h2>
              </div>

              <button
                className="homeViewLink"
                onClick={() => go("activities")}
              >
                View all activities
                <ArrowRight size={16} />
              </button>

            </div>


            {activities.length > 0 ? (

              <div className="homeActivityGrid">

                {activities.map((activity, index) => (

                  <article
                    className={`homeActivityCard ${
                      index === 0 ? "featured" : ""
                    }`}
                    key={activity._id}
                  >

                    <div className="homeActivityImage">

                      <img
                        src={activity.image}
                        alt={activity.title}
                        loading="lazy"
                      />

                      <span>
                        {String(index + 1).padStart(2, "0")}
                      </span>

                    </div>

                    <div className="homeActivityContent">

                      <div className="homeActivityTop">

                        <em>
                          {activity.category}
                        </em>

                        {activity.date && (
                          <small>
                            <CalendarDays size={12} />

                            {new Date(
                              activity.date
                            ).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </small>
                        )}

                      </div>

                      <h3>
                        {activity.title}
                      </h3>

                      <p>
                        {activity.description}
                      </p>

                      <Link
                        to={`/activities/${activity.id}`}
                        className="homeActivityLink"
                      >
                        Read experience
                        <ArrowRight size={15} />
                      </Link>

                    </div>

                  </article>

                ))}

              </div>

            ) : (
              <p className="homeLoading">
                Loading latest activities...
              </p>
            )}

          </div>

        </section>


        {/* =========================
            GALLERY
        ========================= */}

        <section
          className="section homeGallerySection"
          id="gallery"
        >

          <div className="container">

            <div className="homeSectionHeader">

              <div>

                <div className="homeSectionKicker">
                  <Sparkles size={14} />
                  PHOTO JOURNAL
                </div>

                <h2 className="homeSectionTitle">
                  Moments from
                  <span>the journey.</span>
                </h2>

              </div>

              <button
                className="homeViewLink"
                onClick={() => go("gallery")}
              >
                Explore gallery
                <ArrowRight size={16} />
              </button>

            </div>


            {gallery.length > 0 ? (

              <div className="homeEditorialGallery">

                {gallery.slice(0, 5).map(
                  (album, index) => (

                    <button
                      key={album._id}
                      type="button"
                      className={`homeGalleryPhoto photo-${
                        index + 1
                      }`}
                      onClick={() => {
                        setSelectedGalleryAlbum(album);
                        setSelectedGalleryImage(0);
                      }}
                    >

                      <img
                        src={album.images?.[0]}
                        alt={album.title}
                        loading="lazy"
                      />

                      <div className="homeGalleryPhotoOverlay">

                        <span>
                          {album.category ||
                            "JOURNEY"}
                        </span>

                        <strong>
                          {album.title}
                        </strong>

                        {album.date && (
                          <small>
                            {new Date(
                              album.date
                            ).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </small>
                        )}

                      </div>

                    </button>

                  )
                )}

              </div>

            ) : (
              <p className="homeLoading">
                Loading gallery...
              </p>
            )}

          </div>

        </section>


        {/* =========================
            ACHIEVEMENTS
        ========================= */}

        <section className="section homeMilestonesSection">

          <div className="container">

            <div className="homeSectionHeader">

              <div>

                <div className="homeSectionKicker">
                  <Award size={14} />
                  MILESTONES
                </div>

                <h2 className="homeSectionTitle">
                  Small steps,
                  <span>meaningful milestones.</span>
                </h2>

              </div>

              <button
                className="homeViewLink"
                onClick={() =>
                  go("achievements")
                }
              >
                View all achievements
                <ArrowRight size={16} />
              </button>

            </div>


            {featuredAchievements.length > 0 ? (

              <div className="homeMilestoneGrid">

                {featuredAchievements.map(
                  (achievement, index) => (

                    <article
                      className="homeMilestone"
                      key={achievement._id}
                    >

                      <div className="homeMilestoneNumber">
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </div>

                      <div className="homeMilestoneIcon">

                        {achievement.category ===
                        "Education" ? (
                          <GraduationCap />
                        ) : achievement.category ===
                          "Animal Welfare" ? (
                          <Heart />
                        ) : achievement.category ===
                          "Farm & Field Experience" ? (
                          <MapPin />
                        ) : (
                          <Award />
                        )}

                      </div>

                      <div className="homeMilestoneContent">

                        <span>
                          {achievement.category}
                        </span>

                        <h3>
                          {achievement.title}
                        </h3>

                        {achievement.organization && (
                          <p className="organization">
                            {achievement.organization}
                          </p>
                        )}

                        {achievement.date && (
                          <small>
                            {new Date(
                              achievement.date
                            ).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </small>
                        )}

                      </div>

                      {achievement.image && (
                        <a
                          href={achievement.image}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="homeMilestoneArrow"
                          aria-label={`View certificate for ${achievement.title}`}
                        >
                          <ArrowRight size={17} />
                        </a>
                      )}

                    </article>

                  )
                )}

              </div>

            ) : (
              <div className="homeMilestoneEmpty">
                <Award size={22} />

                <span>
                  New achievements will appear here
                  as the journey continues.
                </span>
              </div>
            )}

          </div>

        </section>


        {/* =========================
            CTA
        ========================= */}

        <section className="homeCTA">

          <div className="container homeCTAInner">

            <div className="homeCTAIcon">
              <PawPrint />
            </div>

            <div>

              <div className="homeSectionKicker light">
                KEEP EXPLORING
              </div>

              <h2>
                There is always
                <span>more to learn.</span>
              </h2>

              <p>
                Follow the experiences, discoveries and
                moments that continue to shape this
                veterinary journey.
              </p>

            </div>

            <button
              className="homeCTAButton"
              onClick={() => go("contact")}
            >
              Get in touch
              <ArrowRight size={17} />
            </button>

          </div>

        </section>

      </main>


      {/* GALLERY VIEWER */}

      {selectedGalleryAlbum && (
        <GalleryViewer
          album={selectedGalleryAlbum}
          selectedImage={selectedGalleryImage}
          setSelectedImage={
            setSelectedGalleryImage
          }
          onClose={() => {
            setSelectedGalleryAlbum(null);
            setSelectedGalleryImage(0);
          }}
        />
      )}


      {/* FOOTER */}

      <footer id="contact">

        <div className="container footer">

          <div>

            <div className="footerBrand">
              <PawPrint />

              <span>
                <b>{name.toUpperCase()}</b>

                <small>
                  VETERINARY JOURNEY
                </small>
              </span>
            </div>

            <p>
              Documenting my journey through veterinary
              medicine, one experience at a time.
            </p>

            <div className="social">

              <a
                href="https://www.instagram.com/b_end_u?igsh=MWxpamx5aGNodHR0cQ=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram />
              </a>

              <a
                href="mailto:bindubasnet58@gmail.com"
                aria-label="Email"
              >
                <Mail />
              </a>

            </div>

          </div>


          <div>

            <h4>Quick Links</h4>

            <button onClick={() => go("home")}>
              Home
            </button>

            <button onClick={() => go("about")}>
              About
            </button>

            <button onClick={() => go("activities")}>
              Activities
            </button>

            <button onClick={() => go("gallery")}>
              Gallery
            </button>

          </div>


          <div>

            <h4>Explore</h4>

            <button
              onClick={() => go("achievements")}
            >
              Achievements
            </button>

            <span>Clinical Experiences</span>
            <span>Farm Visits</span>
            <span>Workshops & Seminars</span>
            <span>Student Life</span>

          </div>


          {/* SUBSCRIBE */}

          <div>

            <h4>Stay Updated</h4>

            <p>
              Subscribe to hear about the latest
              activities and experiences.
            </p>

            <form
              className="subscribe"
              onSubmit={handleSubscribe}
            >

              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSubscribeError("");
                  setSubscribed(false);
                }}
                placeholder="Enter your email"
                aria-label="Email address"
                disabled={isSubmitting}
              />

              <button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Sending..."
                  : "Subscribe"}
              </button>

            </form>

            {subscribeError && (
              <small className="subscribeMessage error">
                {subscribeError}
              </small>
            )}

            {subscribed && (
              <small className="subscribeMessage success">
                Thanks for subscribing! 🐾
              </small>
            )}

          </div>

        </div>


        <div className="container copyright">

          <span>
            © 2026 {name}. All rights reserved.
          </span>

          <span>
            Made with ♡ for animals
          </span>

        </div>

      </footer>
    </>
  );
}

