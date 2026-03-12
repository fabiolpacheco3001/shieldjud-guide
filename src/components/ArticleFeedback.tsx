import { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown, Send, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";

/** Config flag — set to false to hide feedback section */
const FEEDBACK_VISIBLE = true;

interface FeedbackData {
  likes: number;
  dislikes: number;
  userVote: "like" | "dislike" | null;
  comments: { author: string; text: string; date: string }[];
}

function getFeedback(slug: string): FeedbackData {
  const stored = localStorage.getItem(`article-feedback-${slug}`);
  if (stored) return JSON.parse(stored);
  return { likes: 0, dislikes: 0, userVote: null, comments: [] };
}

function saveFeedback(slug: string, data: FeedbackData) {
  localStorage.setItem(`article-feedback-${slug}`, JSON.stringify(data));
}

interface Props {
  slug: string;
  visible?: boolean;
}

const ArticleFeedback = ({ slug, visible = FEEDBACK_VISIBLE }: Props) => {
  const [feedback, setFeedback] = useState<FeedbackData>(() => getFeedback(slug));
  const [commentText, setCommentText] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    setFeedback(getFeedback(slug));
    setShowComments(false);
  }, [slug]);

  if (!visible) return null;

  const handleVote = (type: "like" | "dislike") => {
    setFeedback((prev) => {
      const next = { ...prev };
      if (prev.userVote === type) {
        // Undo vote
        next[type === "like" ? "likes" : "dislikes"]--;
        next.userVote = null;
      } else {
        // Remove previous vote if any
        if (prev.userVote === "like") next.likes--;
        if (prev.userVote === "dislike") next.dislikes--;
        // Add new vote
        next[type === "like" ? "likes" : "dislikes"]++;
        next.userVote = type;
      }
      saveFeedback(slug, next);
      return next;
    });
  };

  const handleComment = () => {
    if (!commentText.trim()) return;
    setFeedback((prev) => {
      const next = {
        ...prev,
        comments: [
          ...prev.comments,
          {
            author: authorName.trim() || "Anônimo",
            text: commentText.trim(),
            date: new Date().toLocaleDateString("pt-BR"),
          },
        ],
      };
      saveFeedback(slug, next);
      return next;
    });
    setCommentText("");
  };

  return (
    <div className="mt-8 pt-6 border-t border-border space-y-5">
      {/* Like / Dislike */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">Este artigo foi útil?</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleVote("like")}
            className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border transition-colors ${
              feedback.userVote === "like"
                ? "bg-primary/10 border-primary text-primary"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
            }`}
          >
            <ThumbsUp size={15} />
            <span>{feedback.likes}</span>
          </button>
          <button
            onClick={() => handleVote("dislike")}
            className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border transition-colors ${
              feedback.userVote === "dislike"
                ? "bg-destructive/10 border-destructive/50 text-destructive"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
            }`}
          >
            <ThumbsDown size={15} />
            <span>{feedback.dislikes}</span>
          </button>
        </div>
      </div>

      {/* Comments toggle */}
      <button
        onClick={() => setShowComments(!showComments)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <MessageSquare size={15} />
        <span>Comentários ({feedback.comments.length})</span>
        {showComments ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {showComments && (
        <div className="space-y-4">
          {/* Existing comments */}
          {feedback.comments.length > 0 && (
            <div className="space-y-3">
              {feedback.comments.map((c, i) => (
                <div key={i} className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-foreground">{c.author}</span>
                    <span className="text-xs text-muted-foreground">· {c.date}</span>
                  </div>
                  <p className="text-sm text-foreground">{c.text}</p>
                </div>
              ))}
            </div>
          )}

          {/* New comment form */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Seu nome (opcional)"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full text-sm bg-background border border-border rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <div className="flex gap-2">
              <textarea
                placeholder="Deixe seu comentário..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={2}
                className="flex-1 text-sm bg-background border border-border rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              />
              <button
                onClick={handleComment}
                disabled={!commentText.trim()}
                className="self-end px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleFeedback;
