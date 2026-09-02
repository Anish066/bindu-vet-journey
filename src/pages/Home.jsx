import React, { useEffect, useState } from "react";
import {
ArrowRight,
Award,
CalendarDays,
Facebook,
GraduationCap,
Heart,
Instagram,
Linkedin,
Mail,
MapPin,
PawPrint,
Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";
import { client } from "../sanity/client";
import {
activitiesQuery,
galleryQuery,
homeQuery,
} from "../sanity/queries";

export default function Home({ go }) {
const [activities, setActivities] = useState([]);
const [gallery, setGallery] = useState([]);
const [home, setHome] = useState(null);

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


}, []);

/* FALLBACK DATA
These values appear if the Home Page in Sanity
has not been filled in yet.
*/

const name = home?.name || "Bindu Basnet";

const role = home?.role || "VETERINARY STUDENT";

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

return (
<> <main>
{/* HERO */} <section className="hero" id="home"> <div className="container heroGrid"> <div> <div className="kicker"> <Sparkles size={15} />
DOCUMENTING THE JOURNEY </div>


          <h1>
            Hi, I'm <span>{name}.</span>
          </h1>

          <h2>
            {role} <PawPrint size={27} />
          </h2>

          <p>{heroText}</p>

          <div className="actions">
            <button
              className="btn primary"
              onClick={() => go("activities")}
            >
              Explore My Activities
              <ArrowRight size={17} />
            </button>

            <button
              className="btn secondary"
              onClick={() => go("about")}
            >
              About Me
            </button>
          </div>

          <div className="facts">
            <div>
              <GraduationCap />

              <span>
                <b>Student</b>
                <small>B.V.Sc. & A.H.</small>
              </span>
            </div>

            <div>
              <MapPin />

              <span>
                <b>{location}</b>
                <small>{locationText}</small>
              </span>
            </div>

            <div>
              <Heart />

              <span>
                <b>Passionate About</b>
                <small>Animal Health & Welfare</small>
              </span>
            </div>
          </div>
        </div>

        <div className="heroImg">
          <img
            src={heroImage}
            alt={`${name}'s veterinary journey`}
          />

          <div className="quote">
            "Every animal deserves care, compassion, and a voice."
          </div>
        </div>
      </div>
    </section>

    {/* ABOUT */}
    <section className="section about" id="about">
      <div className="container aboutGrid">
        <div>
          <img
            className="portrait"
            src={profileImage}
            alt={`${name} - Veterinary student`}
          />
        </div>

        <div>
          <div className="kicker">
            <PawPrint size={15} />
            ABOUT MY JOURNEY
          </div>

          <h2 className="title">
            {aboutTitle}
          </h2>

          <p>{aboutText}</p>

          <p>
            Through farm visits, clinical exposure, laboratory work,
            workshops, seminars, and everyday student life, I am
            building my understanding of animal health and welfare.
          </p>

          <div className="stats">
            <div>
              <b>2026</b>
              <small>Graduation Journey</small>
            </div>

            <div>
              <b>B.V.Sc.</b>
              <small>Veterinary Medicine</small>
            </div>

            <div>
              <b>∞</b>
              <small>Things to Learn</small>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ACTIVITIES */}
    <section className="section soft">
      <div className="container">
        <div className="head">
          <div>
            <div className="kicker">
              <Sparkles size={15} />
              RECENT EXPERIENCES
            </div>

            <h2 className="title">
              Latest <span>Activities</span>
            </h2>
          </div>

          <button
            className="text"
            onClick={() => go("activities")}
          >
            View all activities
            <ArrowRight size={16} />
          </button>
        </div>

        {activities.length > 0 ? (
          <div className="cards">
            {activities.map((activity) => (
              <article className="card" key={activity._id}>
                <img
                  src={activity.image}
                  alt={activity.title}
                />

                <div>
                  <em>{activity.category}</em>

                  {activity.date && (
                    <small className="date">
                      <CalendarDays size={13} />

                      {new Date(
                        activity.date
                      ).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </small>
                  )}

                  <h3>{activity.title}</h3>

                  <p>{activity.description}</p>

                  <Link
                    className="text activityLink"
                    to={`/activities/${activity.id}`}
                  >
                    Read More
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p>Loading latest activities...</p>
        )}

        <div className="categories">
          <div>
            <PawPrint size={20} />

            <span>
              <b>Clinical Experiences</b>
              <small>Hands-on learning</small>
            </span>
          </div>

          <div>
            <MapPin size={20} />

            <span>
              <b>Farm Visits</b>
              <small>Field experiences</small>
            </span>
          </div>

          <div>
            <Sparkles size={20} />

            <span>
              <b>Workshops</b>
              <small>Learning & development</small>
            </span>
          </div>

          <div>
            <Heart size={20} />

            <span>
              <b>Student Life</b>
              <small>Memorable moments</small>
            </span>
          </div>
        </div>
      </div>
    </section>

    {/* GALLERY */}
<section className="section" id="gallery">
  <div className="container">
    <div className="head">
      <div>
        <div className="kicker">
          <Sparkles size={15} />
          MOMENTS
        </div>

        <h2 className="title">
          Gallery <span>Highlights</span>
        </h2>
      </div>

      <button
        className="text"
        onClick={() => go("gallery")}
      >
        View full gallery
        <ArrowRight size={16} />
      </button>
    </div>

    {gallery.length > 0 ? (
      <div className="gallery">
        {gallery.slice(0, 5).map((album) => (
          <Link
            key={album._id}
            to="/gallery"
            className="homeGalleryItem"
          >
            <img
              src={album.images?.[0]}
              alt={album.title}
            />

            <div className="homeGalleryOverlay">
              <strong>{album.title}</strong>

              {album.date && (
                <small>
                  {new Date(album.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </small>
              )}
            </div>
          </Link>
        ))}
      </div>
    ) : (
      <p>Loading gallery...</p>
    )}
  </div>
</section>

    {/* ACHIEVEMENTS */}
    <section className="section soft">
      <div className="container">
        <div className="kicker">
          <Award size={15} />
          MILESTONES
        </div>

        <h2 className="title">
          Achievements & <span>Milestones</span>
        </h2>

        <div className="achievements">
          <article>
            <div className="award">
              <GraduationCap />
            </div>

            <div>
              <h3>Veterinary Education</h3>
              <p>B.V.Sc. & A.H. student</p>
              <small>2026</small>
            </div>
          </article>

          <article>
            <div className="award">
              <Award />
            </div>

            <div>
              <h3>Certificate of Completion</h3>
              <p>One Day Seminar on Zoonotic Diseases</p>
              <small>February 2026</small>
            </div>
          </article>

          <article>
            <div className="award">
              <PawPrint />
            </div>

            <div>
              <h3>Practical Learning</h3>
              <p>Clinical and field experiences</p>
              <small>2025 – 2026</small>
            </div>
          </article>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="cta">
      <div className="container ctaIn">
        <div>
          <div className="kicker light">
            FOLLOW THE JOURNEY
          </div>

          <h2>
            Every experience tells a story.
            <span> Come along for mine.</span>
          </h2>
        </div>

        <button
          className="btn cream"
          onClick={() => go("contact")}
        >
          Get In Touch
          <ArrowRight size={17} />
        </button>
      </div>
    </section>
  </main>

  {/* FOOTER */}
  <footer id="contact">
    <div className="container footer">
      <div>
        <div className="footerBrand">
          <PawPrint />

          <span>
            <b>{name.toUpperCase()}</b>
            <small>VETERINARY JOURNEY</small>
          </span>
        </div>

        <p>
          Documenting my journey through veterinary medicine, one
          experience at a time.
        </p>

        <div className="social">
          <button aria-label="Facebook">
            <Facebook />
          </button>

          <button aria-label="Instagram">
            <Instagram />
          </button>

          <button aria-label="LinkedIn">
            <Linkedin />
          </button>

          <button aria-label="Email">
            <Mail />
          </button>
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
        <h4>Categories</h4>

        <span>Clinical Experiences</span>
        <span>Farm Visits</span>
        <span>Workshops & Seminars</span>
        <span>Student Life</span>
      </div>

      <div>
        <h4>Stay Updated</h4>

        <p>
          Subscribe to hear about the latest activities.
        </p>

        <div className="subscribe">
          <input placeholder="Enter your email" />

          <button>Subscribe</button>
        </div>
      </div>
    </div>

    <div className="container copyright">
      © 2026 {name}. All rights reserved.

      <span>Made with ♡ for animals</span>
    </div>
  </footer>
</>


);

}
