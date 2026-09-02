
import React, { useEffect, useState } from "react";
import {
  Award,
  CalendarDays,
  Download,
  GraduationCap,
  Heart,
  MapPin,
  PawPrint,
  ArrowRight,
} from "lucide-react";

import { client } from "../sanity/client";
import { achievementsQuery } from "../sanity/queries";

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(achievementsQuery)
      .then((data) => {
        setAchievements(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load achievements:", err);
        setLoading(false);
      });
  }, []);

  const getIcon = (category) => {
    if (category === "Education") {
      return <GraduationCap />;
    }

    if (category === "Animal Welfare") {
      return <Heart />;
    }

    if (category === "Farm & Field Experience") {
      return <MapPin />;
    }

    return <Award />;
  };

  // DOWNLOAD CERTIFICATE
  const downloadCertificate = async (url, title) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch certificate");
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${title || "certificate"}.jpg`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Certificate download failed:", error);

      // Fallback: open the image if direct download is blocked
      window.open(url, "_blank");
    }
  };

  return (
    <main>
      {/* ACHIEVEMENTS HERO */}
      <section className="section achievementsPage">
        <div className="container">
          <div className="kicker">
            <Award size={15} />
            MY JOURNEY
          </div>

          <h1 className="title">
            Achievements & <span>Milestones</span>
          </h1>

          <p className="sectionIntro">
            A collection of meaningful milestones, learning
            experiences, workshops, and achievements throughout
            my veterinary journey.
          </p>

          {/* LOADING */}
          {loading ? (
            <p>Loading achievements...</p>
          ) : achievements.length > 0 ? (
            <div className="achievements">
              {achievements.map((achievement) => (
                <article
                  className="achievementCard"
                  key={achievement._id}
                >
                  {/* CATEGORY ICON */}
                  <div className="award">
                    {getIcon(achievement.category)}
                  </div>

                  <div className="achievementContent">
                    {/* CATEGORY */}
                    <span className="achievementCategory">
                      {achievement.category}
                    </span>

                    {/* TITLE */}
                    <h2>{achievement.title}</h2>

                    {/* ORGANIZATION */}
                    {achievement.organization && (
                      <p className="achievementOrganization">
                        {achievement.organization}
                      </p>
                    )}

                    {/* DESCRIPTION */}
                    {achievement.description && (
                      <p className="achievementDescription">
                        {achievement.description}
                      </p>
                    )}

                    {/* DATE */}
                    {achievement.date && (
                      <small className="date achievementDate">
                        <CalendarDays size={14} />

                        {new Date(
                          achievement.date
                        ).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </small>
                    )}

                    {/* CERTIFICATE */}
                    {achievement.image && (
                      <div className="achievementCertificate">
                        <div className="certificateImageWrapper">
                          <img
                            src={achievement.image}
                            alt={`${achievement.title} certificate`}
                            loading="lazy"
                          />
                        </div>

                        <button
                          type="button"
                          className="text achievementLink"
                          onClick={() =>
                            downloadCertificate(
                              achievement.image,
                              achievement.title
                            )
                          }
                        >
                          Download Certificate
                          <Download size={16} />
                        </button>
                      </div>
                    )}

                    {/* EXTERNAL LINK */}
                    {achievement.link && (
                      <a
                        href={achievement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text achievementLink"
                      >
                        View Details
                        <ArrowRight size={16} />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* EMPTY STATE */
            <div className="achievementEmpty">
              <div className="award">
                <PawPrint />
              </div>

              <div>
                <h2>Every journey starts somewhere.</h2>

                <p>
                  From veterinary education to clinical
                  experiences, workshops, seminars, and field
                  learning, this space will document the
                  milestones along the way.
                </p>

                <small>
                  New achievements will appear here as they are
                  added.
                </small>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

