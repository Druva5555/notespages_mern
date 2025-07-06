import React from "react";
import { Link } from "react-router";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import formateDate from "../lib/utils";
import api from "../lib/axios"; // Adjust the import based on your axios setup
import toast from "react-hot-toast";

const NoteCard = ({ note, setnotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      setnotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      toast.success("Note deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete note. Please try again.");
    }
  };
  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#c172e3]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>

        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formateDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-2">
            {/* Edit Button */}
            <button
              className="btn btn-ghost btn-xs text-primary"
              onClick={(e) => {
                e.preventDefault(); // prevent navigation
                onEdit(note);
              }}
            >
              <PenSquareIcon className="size-4" />
            </button>

            {/* Delete Button */}
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => {
                handleDelete(e, note._id);
              }}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
