import React from "react";
import Navbar from "../components/navbar";
import RateLimitedUI from "../components/ratelimitedui";
import api from "../lib/axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import NoteCard from "../components/Notecard";

const Homepage = () => {
  const [isRateLimited, setIsRateLimited] = React.useState(false);
  const [notes, setnotes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fectchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setnotes(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        if (error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to fetch notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fectchNotes();
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading notes...</div>
        )}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setnotes={setnotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
