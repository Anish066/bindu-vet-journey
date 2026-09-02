
import React, { useEffect, useState } from "react";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { client } from "../sanity/client";

export default function ActivityDetails() {
  const { id } = useParams();

  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const query = `*[_type == "activity" && slug.current == $slug][0] {
      _id,
      "id": slug.current,
      title,
      category,
      date,
      description,
      content,
      "image": image.asset->url
    }`;

    client
      .fetch(query, { slug: id })
      .then((data) => {
        setActivity(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load activity:", err);
        setError("Unable to load this activity right now.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="notFound">
        <div className="container">
          <p>Loading activity...</p>
        </div>
      </main>
    );
  }

  if (error || !activity) {
    return (
      <main className="notFound">
        <div className="container">
          <h1>Activity not found</h1>

          <p>
            The activity you're looking for doesn't exist or may have been
            removed.
          </p>

          <Link to="/activities" className="btn primary">
            <ArrowLeft size={17} />
            Back to Activities
          </Link>
        </div>
      </main>
    );
  }

  const formattedDate = activity.date
    ? new Date(activity.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <main className="activityDetails">
      <section className="activityHero">
        <div className="container">
          <Link to="/activities" className="text backLink">
            <ArrowLeft size={17} />
            Back to Activities
          </Link>

          <div className="activityCategory">
            {activity.category}
          </div>

          <h1>{activity.title}</h1>

          <div className="activityDate">
            <CalendarDays size={16} />
            {formattedDate}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container activityContent">
          <img
            src={activity.image}
            alt={activity.title}
            className="activityFeatureImage"
          />

          <p className="activityIntro">
            {activity.description}
          </p>

          {activity.content
            .trim()
            .split("\n\n")
            .map((paragraph, index) => (
              <p key={index}>{paragraph.trim()}</p>
            ))}
        </div>
      </section>
    </main>
  );
}

