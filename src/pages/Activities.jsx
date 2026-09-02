
import React, { useEffect, useState } from "react";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

import { client } from "../sanity/client";
import { activitiesQuery } from "../sanity/queries";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    client
      .fetch(activitiesQuery)
      .then((data) => {
        setActivities(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load activities:", err);
        setError("Unable to load activities right now.");
        setLoading(false);
      });
  }, []);

  return (
    <main className="activitiesPage">
      <section className="pageHero">
        <div className="container">
          <div className="kicker">MY JOURNEY</div>

          <h1 className="pageTitle">
            All <span>Activities</span>
          </h1>

          <p>
            A collection of experiences, practical learning, farm visits,
            laboratory work, workshops, and memorable moments from my
            veterinary journey.
          </p>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          {loading && <p>Loading activities...</p>}

          {error && <p>{error}</p>}

          {!loading && !error && activities.length === 0 && (
            <p>No activities have been published yet.</p>
          )}

          {!loading && !error && activities.length > 0 && (
            <div className="cards">
              {activities.map((activity) => (
                <article className="card" key={activity.id}>
                  <img src={activity.image} alt={activity.title} />

                  <div>
                    <em>{activity.category}</em>
<small className="date">
  <CalendarDays size={13} />
  {new Date(activity.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}
</small>

                    <h3>{activity.title}</h3>

                    <p>{activity.description}</p>

                    <Link
                      className="text activityLink"
                      to={`/activities/${activity.id}`}
                    >
                      Read More <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

