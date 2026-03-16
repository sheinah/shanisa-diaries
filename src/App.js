import { useEffect, useRef, useState } from "react";

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "system-ui, -apple-system, sans-serif";
const MONO = "'Courier New', monospace";

const PINK = "#f7b8c8";
const PINK_LIGHT = "#fde8ef";
const PINK_DARK = "#c2607a";
const LAVENDER = "#c9b8f0";
const LAV_LIGHT = "#ede8fb";
const LAV_DARK = "#6b4faa";
const MINT = "#a8e6cf";
const MINT_LIGHT = "#e2f8ef";
const MINT_DARK = "#2e8b63";
const PEACH = "#ffd3a5";
const PEACH_LIGHT = "#fff0e0";
const PEACH_DARK = "#b3692a";
const INK = "#2d2040";
const MUTED = "#8a7fa0";
const BG = "#fdf8ff";
const BORDER = "#ede8f5";
const WHITE = "#ffffff";

const PLACEHOLDER_IMG = null;

const initialProjects = [
  {
    id: 1,
    title: "BMI Calculator",
    desc: "A Flutter app that calculates BMI based on user input. One of my early projects where I learned how to build interactive UI with Dart.",
    stack: ["Flutter", "Dart"],
    live: "#",
    repo: "https://github.com/sheinah/BMI_Calculate_Flutter.git",
  },
  {
    id: 2,
    title: "Taskly Dailist",
    desc: "A daily task manager app built with Flutter. I focused on clean UI and simple state management to help users organize their day.",
    stack: ["Flutter", "Dart"],
    live: "#",
    repo: "https://github.com/sheinah/Taskly_Dailist.git",
  },
  {
    id: 3,
    title: "Mi Card",
    desc: "A personal business card app built during the Complete Flutter Bootcamp. My introduction to layouts, columns, and rows in Flutter.",
    stack: ["Flutter", "Dart"],
    live: "#",
    repo: "https://github.com/sheinah/mi_card_flutter.git",
  },
];

const initialPosts = [
  {
    id: 1,
    title: "The day I decided to learn Flutter (with zero coding knowledge)",
    date: "2023-02-10",
    preview:
      "I had never opened a code editor before. I barely knew what an app was made of. But something just clicked that day and I thought, why not try...",
    content:
      "I had never opened a code editor before. I barely knew what an app was made of. But something just clicked that day and I thought, why not try.\n\nI was not a tech person at all. My background was business. I spent years in banking, then hospitality, then art. None of it involved writing a single line of code. But I kept seeing these beautiful apps on my phone and something in me wanted to know how they were made.\n\nSo I googled it. I found Flutter. The screenshots looked gorgeous. I thought if I could make something that looked like that, it would be worth it.\n\nThe first thing I did was download VS Code. I had no idea what it was. I just followed a tutorial and typed what it told me to type. When the app actually opened on my phone I sat there for a moment and just stared at it.\n\nI made that. Me.\n\nThat feeling was enough to keep going.",
  },
  {
    id: 2,
    title:
      "What nobody tells you about learning to code as a complete beginner",
    date: "2023-06-18",
    preview:
      "Everyone online makes it look so easy. Watch this video, follow this tutorial, build this app. But they skip the part where you sit there completely lost...",
    content:
      "Everyone online makes it look so easy. Watch this video, follow this tutorial, build this app. But they skip the part where you sit there completely lost for two hours because of a missing comma.\n\nThat was me, a lot.\n\nI remember spending an entire evening trying to fix an error I did not understand at all. I copied it into Google. I read Stack Overflow answers that made no sense. I tried changing random things and hoping something would work.\n\nEventually it did. I still do not fully know why.\n\nBut here is what I learned from all of that. The confusion is normal. The stuck feeling is normal. It does not mean you are bad at this. It just means you are learning something real.\n\nI also learned that you do not need to understand everything to move forward. Sometimes you just need to keep going and the understanding comes later. That was a big shift for me.\n\nIf you are just starting out and you feel lost, you are exactly where you should be.",
  },
];

const PAGES = [
  "home",
  "about",
  "portfolio",
  "blog",
  "services",
  "resume",
  "contact",
];
const NAV_LABELS = [
  "home",
  "about",
  "portfolio",
  "journal",
  "services",
  "resume",
  "contact",
];

const tagColors = [
  { bg: PINK_LIGHT, color: PINK_DARK },
  { bg: LAV_LIGHT, color: LAV_DARK },
  { bg: MINT_LIGHT, color: MINT_DARK },
  { bg: PEACH_LIGHT, color: PEACH_DARK },
];

function Tag({ children, idx = 0 }) {
  const c = tagColors[idx % 4];
  return (
    <span
      style={{
        fontFamily: MONO,
        fontSize: 10,
        color: c.color,
        background: c.bg,
        borderRadius: 20,
        padding: "3px 10px",
        marginRight: 5,
        marginBottom: 5,
        display: "inline-block",
        letterSpacing: "0.03em",
        fontWeight: 500,
      }}>
      {children}
    </span>
  );
}

function Section({ emoji, title, color, children }) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 16,
        }}>
        <span style={{ fontSize: 18 }}>{emoji}</span>
        <h3
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: 20,
            color,
            fontWeight: 400,
            margin: 0,
          }}>
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function ExpCard({ role, company, period, desc, color, dot }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 14,
        marginBottom: 14,
        paddingLeft: 16,
        borderLeft: `2px dashed ${dot}`,
        position: "relative",
      }}>
      <div
        style={{
          position: "absolute",
          left: -7,
          top: 4,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: color,
          border: `2px solid ${dot}`,
        }}
      />
      <div
        style={{
          background: WHITE,
          border: `0.5px solid ${BORDER}`,
          borderRadius: 14,
          padding: "1rem 1.25rem",
          flex: 1,
        }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 4,
            marginBottom: 4,
          }}>
          <p style={{ fontSize: 14, color: INK, fontWeight: 600, margin: 0 }}>
            {role}
          </p>
          <span
            style={{
              fontSize: 11,
              color: MUTED,
              background: color,
              borderRadius: 20,
              padding: "2px 10px",
            }}>
            {period}
          </span>
        </div>
        <p
          style={{
            fontSize: 12,
            color: MUTED,
            margin: "0 0 6px",
            fontStyle: "italic",
          }}>
          {company}
        </p>
        <p style={{ fontSize: 13, color: MUTED, margin: 0, lineHeight: 1.7 }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

function FloatingBlob({ top, left, size, color, delay }) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width: size,
        height: size,
        borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
        background: color,
        opacity: 0.18,
        pointerEvents: "none",
        animation: `blob ${3 + delay}s ease-in-out infinite alternate`,
        animationDelay: `${delay}s`,
        zIndex: 0,
      }}
    />
  );
}

function Emoji({ children, style = {} }) {
  return <span style={{ fontSize: 20, ...style }}>{children}</span>;
}

function ProjectCard({ p, onDelete, idx = 0 }) {
  const accent = [PINK, LAVENDER, MINT, PEACH][idx % 4];
  const accentLight = [PINK_LIGHT, LAV_LIGHT, MINT_LIGHT, PEACH_LIGHT][idx % 4];
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 20,
        padding: "1.5rem",
        background: WHITE,
        border: `1.5px solid ${hovered ? accent : BORDER}`,
        position: "relative",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 8px 28px ${accent}55` : "none",
      }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: accentLight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 12,
          fontSize: 20,
        }}>
        {["📱", "✅", "🪪"][idx % 3]}
      </div>
      {onDelete && (
        <button
          onClick={() => onDelete(p.id)}
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            background: "none",
            border: "none",
            color: "#ccc",
            cursor: "pointer",
            fontSize: 16,
          }}>
          ×
        </button>
      )}
      <h3
        style={{
          fontFamily: SERIF,
          fontSize: 16,
          color: INK,
          margin: "0 0 8px",
          fontWeight: 400,
          fontStyle: "italic",
        }}>
        {p.title}
      </h3>
      <p
        style={{
          color: MUTED,
          fontSize: 13,
          marginBottom: 14,
          lineHeight: 1.7,
        }}>
        {p.desc}
      </p>
      <div style={{ marginBottom: 14 }}>
        {p.stack.map((t, i) => (
          <Tag key={t} idx={idx + i}>
            {t}
          </Tag>
        ))}
      </div>
      <div style={{ display: "flex", gap: 14 }}>
        {p.live !== "#" && (
          <a
            href={p.live}
            style={{ fontSize: 12, color: PINK_DARK, textDecoration: "none" }}>
            ↗ live app
          </a>
        )}
        <a
          href={p.repo}
          target="_blank"
          rel="noreferrer"
          style={{ fontSize: 12, color: MUTED, textDecoration: "none" }}>
          ⌥ source
        </a>
      </div>
    </div>
  );
}

function AddProjectModal({ onAdd, onClose }) {
  const [form, setForm] = useState({
    title: "",
    desc: "",
    stack: "",
    live: "",
    repo: "",
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const submit = () => {
    if (!form.title.trim()) return;
    onAdd({
      ...form,
      stack: form.stack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      id: Date.now(),
    });
    onClose();
  };
  const inp = {
    width: "100%",
    boxSizing: "border-box",
    background: BG,
    border: `1px solid ${BORDER}`,
    borderRadius: 10,
    color: INK,
    fontFamily: SANS,
    fontSize: 13,
    padding: "9px 12px",
    outline: "none",
    marginBottom: 10,
  };
  const lbl = {
    fontSize: 11,
    color: MUTED,
    display: "block",
    marginBottom: 4,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  };
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#00000033",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <div
        style={{
          background: WHITE,
          border: `1.5px solid ${LAVENDER}`,
          borderRadius: 24,
          padding: "2rem",
          width: 420,
          maxWidth: "92vw",
        }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}>
          <span
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              color: INK,
              fontSize: 17,
            }}>
            ✨ Add a new project
          </span>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#bbb",
              cursor: "pointer",
              fontSize: 20,
            }}>
            ×
          </button>
        </div>
        <label style={lbl}>project title</label>
        <input
          style={inp}
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="e.g. Flutter Weather App"
        />
        <label style={lbl}>description</label>
        <textarea
          style={{ ...inp, resize: "vertical", minHeight: 72 }}
          value={form.desc}
          onChange={(e) => set("desc", e.target.value)}
          placeholder="What did you build and learn?"
        />
        <label style={lbl}>tech stack (comma-separated)</label>
        <input
          style={inp}
          value={form.stack}
          onChange={(e) => set("stack", e.target.value)}
          placeholder="Flutter, Dart, Firebase"
        />
        <label style={lbl}>live url</label>
        <input
          style={inp}
          value={form.live}
          onChange={(e) => set("live", e.target.value)}
          placeholder="https://..."
        />
        <label style={lbl}>repo url</label>
        <input
          style={inp}
          value={form.repo}
          onChange={(e) => set("repo", e.target.value)}
          placeholder="https://github.com/..."
        />
        <button
          onClick={submit}
          style={{
            width: "100%",
            background: `linear-gradient(135deg, ${PINK}, ${LAVENDER})`,
            color: WHITE,
            border: "none",
            borderRadius: 12,
            padding: "11px 0",
            fontFamily: SANS,
            fontSize: 13,
            cursor: "pointer",
            marginTop: 4,
            fontWeight: 500,
          }}>
          Save project 🎉
        </button>
      </div>
    </div>
  );
}

function BlogEditor({ post, onSave, onClose }) {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [aiPrompt, setAiPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const runAI = async () => {
    if (!aiPrompt.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system:
            "You are a writing assistant for Shanisa, a woman from Bangkok who taught herself Flutter from zero coding experience. She has a business background (banking, hospitality, art) and started learning in 2023. Write in her voice: warm, honest, a little casual, sometimes vulnerable. Use short sentences. No em dashes. No formal transitions like 'however' or 'furthermore'. Write like a real person journaling or texting a friend. Be specific and imperfect. Output only the blog content with no preamble and no markdown formatting.",
          messages: [
            {
              role: "user",
              content: `Post title: "${title}"\n\nContent so far:\n${content}\n\nInstruction: ${aiPrompt}`,
            },
          ],
        }),
      });
      const data = await res.json();
      const text = data.content?.find((b) => b.type === "text")?.text || "";
      setContent((prev) => (prev ? prev + "\n\n" + text : text));
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
    setAiPrompt("");
  };

  const save = () => {
    if (!title.trim()) return;
    onSave({
      id: post?.id || Date.now(),
      title,
      content,
      preview: content.slice(0, 100) + "...",
      date: post?.date || new Date().toISOString().slice(0, 10),
    });
    onClose();
  };

  const inp = {
    width: "100%",
    boxSizing: "border-box",
    background: BG,
    border: `1px solid ${BORDER}`,
    borderRadius: 10,
    color: INK,
    fontFamily: SANS,
    fontSize: 13,
    padding: "9px 12px",
    outline: "none",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#00000022",
        zIndex: 100,
        display: "flex",
        alignItems: "stretch",
        justifyContent: "flex-end",
      }}>
      <div
        style={{
          background: WHITE,
          borderLeft: `1.5px solid ${LAVENDER}`,
          width: "min(580px, 100vw)",
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
          gap: 12,
          overflowY: "auto",
        }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 4,
          }}>
          <span
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              color: INK,
              fontSize: 17,
            }}>
            📝 {post ? "Edit entry" : "New journal entry"}
          </span>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#bbb",
              cursor: "pointer",
              fontSize: 20,
            }}>
            ×
          </button>
        </div>
        <input
          style={{
            ...inp,
            fontFamily: SERIF,
            fontSize: 18,
            fontStyle: "italic",
            background: WHITE,
            border: "none",
            borderBottom: `1px solid ${BORDER}`,
            borderRadius: 0,
            padding: "8px 0",
          }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Entry title..."
        />
        <textarea
          style={{
            ...inp,
            flex: 1,
            minHeight: 240,
            resize: "none",
            lineHeight: 1.8,
          }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your story here..."
        />
        <div
          style={{
            background: LAV_LIGHT,
            border: `1px solid ${LAVENDER}`,
            borderRadius: 14,
            padding: "14px",
          }}>
          <div
            style={{
              fontSize: 11,
              color: LAV_DARK,
              marginBottom: 8,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}>
            ✨ AI writing assist
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              style={{ ...inp, flex: 1, background: WHITE }}
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runAI()}
              placeholder="e.g. expand this, make it more personal..."
            />
            <button
              onClick={runAI}
              disabled={loading}
              style={{
                background: `linear-gradient(135deg, ${LAVENDER}, ${PINK})`,
                color: WHITE,
                border: "none",
                borderRadius: 10,
                padding: "9px 16px",
                fontSize: 12,
                cursor: loading ? "default" : "pointer",
                opacity: loading ? 0.6 : 1,
                whiteSpace: "nowrap",
                fontWeight: 500,
              }}>
              {loading ? "..." : "run →"}
            </button>
          </div>
        </div>
        <button
          onClick={save}
          style={{
            background: `linear-gradient(135deg, ${PINK}, ${LAVENDER})`,
            color: WHITE,
            border: "none",
            borderRadius: 12,
            padding: "11px 0",
            fontSize: 13,
            cursor: "pointer",
            fontWeight: 500,
          }}>
          Save entry 💾
        </button>
      </div>
    </div>
  );
}

const useTyping = (words, speed = 80) => {
  const [display, setDisplay] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[wi];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setDisplay(word.slice(0, ci + 1));
          if (ci + 1 === word.length) setTimeout(() => setDeleting(true), 1400);
          else setCi((c) => c + 1);
        } else {
          setDisplay(word.slice(0, ci - 1));
          if (ci - 1 === 0) {
            setDeleting(false);
            setWi((w) => (w + 1) % words.length);
            setCi(0);
          } else setCi((c) => c - 1);
        }
      },
      deleting ? speed / 2 : speed,
    );
    return () => clearTimeout(timeout);
  }, [ci, deleting, wi, words, speed]);
  return display;
};

export default function App() {
  const [page, setPage] = useState("home");
  const [prevPage, setPrevPage] = useState("home");
  const [animating, setAnimating] = useState(false);
  const [projects, setProjects] = useState(initialProjects);
  const [posts, setPosts] = useState(initialPosts);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [viewPost, setViewPost] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const fileRef = useRef();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImgUrl(ev.target.result);
      try {
        localStorage.setItem("fp_imgurl", ev.target.result);
      } catch {}
    };
    reader.readAsDataURL(file);
  };

  const typedText = useTyping([
    "Flutter developer 💙",
    "self-taught coder 💻",
    "UX/UI designer 🎨",
    "lifelong learner ✨",
  ]);

  useEffect(() => {
    try {
      const p = localStorage.getItem("fp_projects2");
      const b = localStorage.getItem("fp_posts2");
      const img = localStorage.getItem("fp_imgurl");
      if (p) setProjects(JSON.parse(p));
      if (b) setPosts(JSON.parse(b));
      if (img) setImgUrl(img);
    } catch {}
  }, []);

  const saveProjects = (ps) => {
    setProjects(ps);
    try {
      localStorage.setItem("fp_projects2", JSON.stringify(ps));
    } catch {}
  };
  const savePosts = (bs) => {
    setPosts(bs);
    try {
      localStorage.setItem("fp_posts2", JSON.stringify(bs));
    } catch {}
  };
  const addProject = (p) => saveProjects([p, ...projects]);
  const deleteProject = (id) =>
    saveProjects(projects.filter((p) => p.id !== id));
  const savePost = (post) => {
    const exists = posts.find((p) => p.id === post.id);
    if (exists) savePosts(posts.map((p) => (p.id === post.id ? post : p)));
    else savePosts([post, ...posts]);
  };
  const deletePost = (id) => savePosts(posts.filter((p) => p.id !== id));

  const nav = (p) => {
    if (p === page) return;
    setAnimating(true);
    setTimeout(() => {
      setPage(p);
      setViewPost(null);
      setAnimating(false);
    }, 220);
  };

  const skills = [
    "Flutter",
    "Dart",
    "Firebase",
    "Python",
    "Git",
    "Figma",
    "REST APIs",
    "SQL",
    "JavaScript",
    "Node.js",
    "AI Generative",
    "n8n Automation",
    "UI Design",
  ];

  const style = `
    @keyframes blob { 0%{border-radius:60% 40% 70% 30%/50% 60% 40% 50%;transform:translate(0,0) scale(1)} 100%{border-radius:40% 60% 30% 70%/60% 40% 70% 30%;transform:translate(10px,15px) scale(1.05)} }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
    @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    .page-wrap { animation: fadeUp 0.32s ease both; }
    .float { animation: float 3.5s ease-in-out infinite; }
    .float2 { animation: float 4.2s ease-in-out infinite; animation-delay: 0.6s; }
    .float3 { animation: float 3s ease-in-out infinite; animation-delay: 1.1s; }
    .spin-slow { animation: spin 12s linear infinite; }
    .nav-btn:hover { background: ${PINK_LIGHT} !important; }
    .post-row:hover h3 { color: ${PINK_DARK} !important; }
  `;

  return (
    <div
      style={{
        background: BG,
        minHeight: "100vh",
        fontFamily: SANS,
        color: INK,
        position: "relative",
        overflow: "hidden",
      }}>
      <style>{style}</style>

      {/* Nav */}
      <nav
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${BORDER}`,
          padding: "0 2rem",
          height: 58,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}>
        <div
          onClick={() => nav("home")}
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: 19,
            color: INK,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}>
          <span style={{ fontSize: 20 }}>🌸</span> shanisa diaries
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          {NAV_LABELS.map((n, i) => (
            <button
              key={n}
              onClick={() => nav(PAGES[i])}
              className="nav-btn"
              style={{
                background: page === PAGES[i] ? PINK_LIGHT : "none",
                border: "none",
                color: page === PAGES[i] ? PINK_DARK : MUTED,
                fontSize: 13,
                cursor: "pointer",
                padding: "6px 13px",
                borderRadius: 20,
                fontWeight: page === PAGES[i] ? 600 : 400,
                transition: "all 0.2s",
              }}>
              {n}
            </button>
          ))}
        </div>
      </nav>

      <main
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "3rem 1.5rem 6rem",
          opacity: animating ? 0 : 1,
          transition: "opacity 0.22s ease",
        }}
        className="page-wrap">
        {/* HOME */}
        {page === "home" && (
          <div>
            {/* Hero */}
            <div
              style={{
                position: "relative",
                borderRadius: 28,
                background: `linear-gradient(135deg, ${PINK_LIGHT} 0%, ${LAV_LIGHT} 50%, ${MINT_LIGHT} 100%)`,
                padding: "3rem 2rem 2.5rem",
                marginBottom: "2.5rem",
                overflow: "hidden",
              }}>
              <FloatingBlob
                top="10%"
                left="60%"
                size="180px"
                color={LAVENDER}
                delay={0}
              />
              <FloatingBlob
                top="50%"
                left="75%"
                size="120px"
                color={MINT}
                delay={1}
              />
              <FloatingBlob
                top="-20%"
                left="80%"
                size="140px"
                color={PEACH}
                delay={2}
              />
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "flex",
                  gap: "2rem",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}>
                <div className="float" style={{ flexShrink: 0 }}>
                  <div
                    onClick={() => fileRef.current.click()}
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      border: `4px solid ${WHITE}`,
                      overflow: "hidden",
                      boxShadow: `0 8px 30px ${PINK}88`,
                      cursor: "pointer",
                      background: PINK_LIGHT,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: 4,
                      position: "relative",
                    }}>
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt="Shanisa"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <>
                        <span style={{ fontSize: 28 }}>🌸</span>
                        <span
                          style={{
                            fontSize: 10,
                            color: PINK_DARK,
                            fontWeight: 600,
                            textAlign: "center",
                            lineHeight: 1.3,
                            padding: "0 8px",
                          }}>
                          tap to upload photo
                        </span>
                      </>
                    )}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 6,
                        right: 6,
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: PINK,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        boxShadow: `0 2px 8px ${PINK}88`,
                      }}>
                      📷
                    </div>
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p
                    style={{
                      fontSize: 12,
                      color: PINK_DARK,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                      fontWeight: 600,
                    }}>
                    hi there! 👋
                  </p>
                  <h1
                    style={{
                      fontFamily: SERIF,
                      fontSize: 32,
                      fontWeight: 400,
                      color: INK,
                      lineHeight: 1.25,
                      margin: "0 0 10px",
                      fontStyle: "italic",
                    }}>
                    I'm Shanisa,
                    <br />a {typedText}
                    <span
                      style={{
                        borderRight: `2px solid ${PINK_DARK}`,
                        marginLeft: 1,
                        animation: "spin 1s steps(1) infinite",
                      }}>
                      {" "}
                    </span>
                  </h1>
                  <p
                    style={{
                      color: MUTED,
                      fontSize: 14,
                      lineHeight: 1.8,
                      maxWidth: 400,
                      marginBottom: 20,
                    }}>
                    No IT background, no coding experience — just curiosity and
                    a lot of Google searches. Started from zero in 2023 and
                    never looked back. 🚀
                  </p>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <button
                      onClick={() => nav("blog")}
                      style={{
                        background: `linear-gradient(135deg, ${PINK}, ${LAVENDER})`,
                        color: WHITE,
                        border: "none",
                        borderRadius: 24,
                        padding: "10px 22px",
                        fontSize: 13,
                        cursor: "pointer",
                        fontWeight: 600,
                        boxShadow: `0 4px 16px ${PINK}77`,
                      }}>
                      Read my journal ✨
                    </button>
                    <button
                      onClick={() => nav("portfolio")}
                      style={{
                        background: WHITE,
                        color: PINK_DARK,
                        border: `1.5px solid ${PINK}`,
                        borderRadius: 24,
                        padding: "10px 22px",
                        fontSize: 13,
                        cursor: "pointer",
                        fontWeight: 500,
                      }}>
                      See my projects 📱
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Fun stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 12,
                marginBottom: "2.5rem",
              }}>
              {[
                { emoji: "📅", val: "2023", label: "started coding" },
                {
                  emoji: "📱",
                  val: `${projects.length}`,
                  label: "flutter projects",
                },
                {
                  emoji: "📝",
                  val: `${posts.length}`,
                  label: "journal entries",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="float"
                  style={{
                    background: [PINK_LIGHT, LAV_LIGHT, MINT_LIGHT][i],
                    borderRadius: 18,
                    padding: "1.2rem",
                    textAlign: "center",
                    animationDelay: `${i * 0.3}s`,
                  }}>
                  <div style={{ fontSize: 26, marginBottom: 4 }}>{s.emoji}</div>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: INK,
                      fontFamily: SERIF,
                    }}>
                    {s.val}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: MUTED,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Latest posts */}
            <div style={{ marginBottom: "2.5rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}>
                <p
                  style={{
                    fontSize: 13,
                    color: INK,
                    fontWeight: 600,
                    margin: 0,
                  }}>
                  Latest journal entries 📖
                </p>
                <button
                  onClick={() => nav("blog")}
                  style={{
                    background: "none",
                    border: "none",
                    color: PINK_DARK,
                    fontSize: 12,
                    cursor: "pointer",
                  }}>
                  see all →
                </button>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {posts.slice(0, 2).map((post, i) => (
                  <div
                    key={post.id}
                    className="post-row"
                    onClick={() => {
                      setViewPost(post);
                      nav("blog");
                    }}
                    style={{
                      cursor: "pointer",
                      padding: "1.1rem 1.25rem",
                      background: WHITE,
                      border: `1px solid ${BORDER}`,
                      borderRadius: 16,
                      display: "flex",
                      gap: 14,
                      alignItems: "flex-start",
                      transition: "all 0.2s",
                    }}>
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 12,
                        background: [PINK_LIGHT, LAV_LIGHT][i],
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                        flexShrink: 0,
                      }}>
                      {["💭", "🌱"][i]}
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: 11,
                          color: MUTED,
                          margin: "0 0 4px",
                        }}>
                        {post.date}
                      </p>
                      <h3
                        style={{
                          fontFamily: SERIF,
                          fontStyle: "italic",
                          fontSize: 15,
                          color: INK,
                          fontWeight: 400,
                          margin: "0 0 4px",
                          transition: "color 0.2s",
                        }}>
                        {post.title}
                      </h3>
                      <p
                        style={{
                          fontSize: 12,
                          color: MUTED,
                          margin: 0,
                          lineHeight: 1.5,
                        }}>
                        {post.preview.slice(0, 70)}...
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest projects */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}>
                <p
                  style={{
                    fontSize: 13,
                    color: INK,
                    fontWeight: 600,
                    margin: 0,
                  }}>
                  Recent projects 📱
                </p>
                <button
                  onClick={() => nav("portfolio")}
                  style={{
                    background: "none",
                    border: "none",
                    color: PINK_DARK,
                    fontSize: 12,
                    cursor: "pointer",
                  }}>
                  see all →
                </button>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: 12,
                }}>
                {projects.slice(0, 2).map((p, i) => (
                  <ProjectCard key={p.id} p={p} idx={i} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ABOUT */}
        {page === "about" && (
          <div className="page-wrap">
            <div
              style={{
                position: "relative",
                borderRadius: 28,
                background: `linear-gradient(135deg, ${LAV_LIGHT}, ${PEACH_LIGHT})`,
                padding: "2.5rem 2rem",
                marginBottom: "2rem",
                overflow: "hidden",
                display: "flex",
                gap: "2rem",
                alignItems: "center",
                flexWrap: "wrap",
              }}>
              <FloatingBlob
                top="0%"
                left="70%"
                size="150px"
                color={LAVENDER}
                delay={0.5}
              />
              <div className="float" style={{ flexShrink: 0 }}>
                <div
                  onClick={() => fileRef.current.click()}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    border: `4px solid ${WHITE}`,
                    overflow: "hidden",
                    boxShadow: `0 6px 24px ${LAVENDER}88`,
                    cursor: "pointer",
                    background: LAV_LIGHT,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: 3,
                  }}>
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt="Shanisa"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <>
                      <span style={{ fontSize: 24 }}>🌸</span>
                      <span
                        style={{
                          fontSize: 9,
                          color: LAV_DARK,
                          fontWeight: 600,
                          textAlign: "center",
                          padding: "0 6px",
                          lineHeight: 1.3,
                        }}>
                        tap to upload
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <p
                  style={{
                    fontSize: 12,
                    color: LAV_DARK,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                    fontWeight: 600,
                  }}>
                  my story 💜
                </p>
                <h2
                  style={{
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: 28,
                    color: INK,
                    margin: 0,
                  }}>
                  About Shanisa
                </h2>
              </div>
            </div>
            <p
              style={{
                color: MUTED,
                lineHeight: 1.9,
                marginBottom: 14,
                fontSize: 15,
              }}>
              Hi! I'm Shanisa, a freelance Flutter developer and UX/UI designer
              based in Bangkok, Thailand 🇹🇭. My background is in business — I
              studied Business Administration at Ramkhamhaeng University and
              worked in banking, hospitality, and the art world.
            </p>
            <p
              style={{
                color: MUTED,
                lineHeight: 1.9,
                marginBottom: 14,
                fontSize: 15,
              }}>
              In 2023 I decided to try coding. I picked Flutter because the apps
              looked beautiful and that was honestly enough of a reason. I took
              courses on FutureSkill and Udemy, figured things out slowly, and
              kept going even when I had no idea what I was doing.
            </p>
            <p
              style={{
                color: MUTED,
                lineHeight: 1.9,
                marginBottom: 28,
                fontSize: 15,
              }}>
              This blog is where I write about that journey. The real version of
              it, not the highlight reel. 🌸
            </p>

            <p
              style={{
                fontSize: 12,
                color: INK,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 14,
              }}>
              Skills I've picked up 🛠️
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                marginBottom: 32,
              }}>
              {skills.map((s, i) => (
                <Tag key={s} idx={i}>
                  {s}
                </Tag>
              ))}
            </div>

            <p
              style={{
                fontSize: 12,
                color: INK,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}>
              My journey 🗓️
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                {
                  date: "Early 2023",
                  note: "Discovered Flutter with zero coding knowledge and decided to go for it",
                  emoji: "🌱",
                },
                {
                  date: "Mid 2023",
                  note: "Built my first Hello World app — felt like actual magic",
                  emoji: "✨",
                },
                {
                  date: "Late 2023",
                  note: "Completed my first real Flutter app and pushed it to GitHub",
                  emoji: "📱",
                },
                {
                  date: "2024",
                  note: "Started with a contract company for small Flutter projects",
                  emoji: "💼",
                },
                {
                  date: "Now",
                  note: "Freelance Flutter developer, learning full stack and AI automation",
                  emoji: "🚀",
                },
              ].map((e, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 16,
                    paddingBottom: 20,
                    paddingLeft: 20,
                    borderLeft: `2px dashed ${LAVENDER}`,
                    position: "relative",
                  }}>
                  <div
                    style={{
                      position: "absolute",
                      left: -14,
                      top: 0,
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: [
                        PINK_LIGHT,
                        LAV_LIGHT,
                        MINT_LIGHT,
                        PEACH_LIGHT,
                        PINK_LIGHT,
                      ][i],
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                    }}>
                    {e.emoji}
                  </div>
                  <div style={{ paddingTop: 2 }}>
                    <p
                      style={{
                        fontSize: 11,
                        color: PINK_DARK,
                        margin: "0 0 4px",
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                      }}>
                      {e.date}
                    </p>
                    <p style={{ fontSize: 14, color: INK, margin: 0 }}>
                      {e.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PORTFOLIO */}
        {page === "portfolio" && (
          <div className="page-wrap">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: 24,
              }}>
              <div>
                <p
                  style={{
                    fontSize: 12,
                    color: MINT_DARK,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                    fontWeight: 600,
                  }}>
                  things I've made 📱
                </p>
                <h2
                  style={{
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: 30,
                    color: INK,
                    margin: 0,
                  }}>
                  My projects
                </h2>
              </div>
              <button
                onClick={() => setShowAddProject(true)}
                style={{
                  background: `linear-gradient(135deg, ${MINT_LIGHT}, ${PEACH_LIGHT})`,
                  color: MINT_DARK,
                  border: `1px solid ${MINT}`,
                  borderRadius: 20,
                  padding: "8px 16px",
                  fontSize: 12,
                  cursor: "pointer",
                  fontWeight: 500,
                }}>
                + add project ✨
              </button>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 14,
              }}>
              {projects.map((p, i) => (
                <ProjectCard
                  key={p.id}
                  p={p}
                  onDelete={deleteProject}
                  idx={i}
                />
              ))}
            </div>
            {!projects.length && (
              <p style={{ color: MUTED, fontSize: 14, fontStyle: "italic" }}>
                No projects yet — add your first one!
              </p>
            )}
          </div>
        )}

        {/* BLOG */}
        {page === "blog" && !viewPost && (
          <div className="page-wrap">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: 24,
              }}>
              <div>
                <p
                  style={{
                    fontSize: 12,
                    color: LAV_DARK,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                    fontWeight: 600,
                  }}>
                  journal 📖
                </p>
                <h2
                  style={{
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: 30,
                    color: INK,
                    margin: 0,
                  }}>
                  My entries
                </h2>
              </div>
              <button
                onClick={() => {
                  setEditPost(null);
                  setShowEditor(true);
                }}
                style={{
                  background: `linear-gradient(135deg, ${LAV_LIGHT}, ${PINK_LIGHT})`,
                  color: LAV_DARK,
                  border: `1px solid ${LAVENDER}`,
                  borderRadius: 20,
                  padding: "8px 16px",
                  fontSize: 12,
                  cursor: "pointer",
                  fontWeight: 500,
                }}>
                + write entry ✍️
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {posts.map((post, i) => (
                <div
                  key={post.id}
                  className="post-row"
                  style={{
                    background: WHITE,
                    border: `1px solid ${BORDER}`,
                    borderRadius: 18,
                    padding: "1.25rem",
                    display: "flex",
                    gap: 14,
                    transition: "all 0.2s",
                    cursor: "pointer",
                  }}
                  onClick={() => setViewPost(post)}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: [
                        PINK_LIGHT,
                        LAV_LIGHT,
                        MINT_LIGHT,
                        PEACH_LIGHT,
                      ][i % 4],
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      flexShrink: 0,
                    }}>
                    {["💭", "🌱", "✨", "💙"][i % 4]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p
                      style={{ fontSize: 11, color: MUTED, margin: "0 0 5px" }}>
                      {post.date}
                    </p>
                    <h3
                      style={{
                        fontFamily: SERIF,
                        fontStyle: "italic",
                        fontSize: 17,
                        color: INK,
                        fontWeight: 400,
                        margin: "0 0 6px",
                        transition: "color 0.2s",
                      }}>
                      {post.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        color: MUTED,
                        margin: "0 0 10px",
                        lineHeight: 1.6,
                      }}>
                      {post.preview.slice(0, 80)}...
                    </p>
                    <div style={{ display: "flex", gap: 14 }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setViewPost(post);
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          color: PINK_DARK,
                          fontSize: 12,
                          cursor: "pointer",
                          padding: 0,
                          fontWeight: 500,
                        }}>
                        read →
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditPost(post);
                          setShowEditor(true);
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#bbb",
                          fontSize: 12,
                          cursor: "pointer",
                          padding: 0,
                        }}>
                        edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePost(post.id);
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#ddd",
                          fontSize: 12,
                          cursor: "pointer",
                          padding: 0,
                        }}>
                        delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {!posts.length && (
                <p style={{ color: MUTED, fontSize: 14, fontStyle: "italic" }}>
                  No entries yet — write your first one! 🌸
                </p>
              )}
            </div>
          </div>
        )}

        {/* POST VIEW */}
        {page === "blog" && viewPost && (
          <div className="page-wrap">
            <button
              onClick={() => setViewPost(null)}
              style={{
                background: PINK_LIGHT,
                border: "none",
                color: PINK_DARK,
                fontSize: 12,
                cursor: "pointer",
                padding: "7px 14px",
                borderRadius: 20,
                marginBottom: 28,
                fontWeight: 500,
              }}>
              ← back to journal
            </button>
            <p
              style={{
                fontSize: 11,
                color: MUTED,
                marginBottom: 10,
                letterSpacing: "0.04em",
              }}>
              {viewPost.date}
            </p>
            <h1
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: 28,
                color: INK,
                marginBottom: 28,
                lineHeight: 1.4,
              }}>
              {viewPost.title}
            </h1>
            <div
              style={{
                color: MUTED,
                lineHeight: 1.95,
                whiteSpace: "pre-wrap",
                fontSize: 15,
              }}>
              {viewPost.content}
            </div>
          </div>
        )}

        {/* SERVICES */}
        {page === "services" && (
          <div className="page-wrap">
            <div
              style={{
                borderRadius: 28,
                background: `linear-gradient(135deg, ${MINT_LIGHT}, ${LAV_LIGHT})`,
                padding: "2.5rem 2rem",
                marginBottom: "2rem",
                overflow: "hidden",
                position: "relative",
              }}>
              <FloatingBlob
                top="-10%"
                left="65%"
                size="150px"
                color={MINT}
                delay={0.5}
              />
              <p
                style={{
                  fontSize: 12,
                  color: MINT_DARK,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                  fontWeight: 600,
                  position: "relative",
                  zIndex: 1,
                }}>
                what I do ✨
              </p>
              <h2
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: 30,
                  color: INK,
                  marginBottom: 10,
                  position: "relative",
                  zIndex: 1,
                }}>
                My services
              </h2>
              <p
                style={{
                  color: MUTED,
                  fontSize: 14,
                  lineHeight: 1.8,
                  maxWidth: 460,
                  position: "relative",
                  zIndex: 1,
                }}>
                I help individuals and small businesses build beautiful,
                functional digital products. Here's what I can do for you 🌸
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 16,
                marginBottom: "2.5rem",
              }}>
              {[
                {
                  emoji: "📱",
                  title: "Flutter App Development",
                  color: PINK_LIGHT,
                  tc: PINK_DARK,
                  border: PINK,
                  desc: "I build clean, cross-platform mobile apps using Flutter and Dart. From simple utilities to full-featured apps with Firebase backend.",
                  includes: [
                    "iOS & Android apps",
                    "Firebase integration",
                    "State management",
                    "Clean UI implementation",
                    "GitHub delivery",
                  ],
                },
                {
                  emoji: "🎨",
                  title: "UI/UX Design",
                  color: LAV_LIGHT,
                  tc: LAV_DARK,
                  border: LAVENDER,
                  desc: "I design wireframes, mobile app interfaces, and landing pages with a focus on usability and visual appeal using Figma.",
                  includes: [
                    "Mobile app design",
                    "Wireframing",
                    "Landing page design",
                    "Design system basics",
                    "Figma handoff",
                  ],
                },
                {
                  emoji: "🤖",
                  title: "AI Integration",
                  color: MINT_LIGHT,
                  tc: MINT_DARK,
                  border: MINT,
                  desc: "I integrate AI features into your apps using tools like Claude API and generative AI workflows.",
                  includes: [
                    "Claude API integration",
                    "AI-powered features",
                    "Chatbot integration",
                    "Prompt engineering",
                    "Generative AI tools",
                  ],
                },
                {
                  emoji: "💬",
                  title: "Freelance Consultation",
                  color: PEACH_LIGHT,
                  tc: PEACH_DARK,
                  border: PEACH,
                  desc: "Not sure where to start? I offer 1-on-1 sessions for beginners who want to learn Flutter or plan their first app project.",
                  includes: [
                    "1-on-1 sessions",
                    "Flutter learning path",
                    "Project planning",
                    "Tech stack advice",
                    "Code review",
                  ],
                },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    background: WHITE,
                    border: `1.5px solid ${BORDER}`,
                    borderRadius: 20,
                    padding: "1.5rem",
                    transition: "all 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = s.border;
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = `0 8px 28px ${s.border}44`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = BORDER;
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: s.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                      marginBottom: 14,
                    }}>
                    {s.emoji}
                  </div>
                  <h3
                    style={{
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      fontSize: 17,
                      color: INK,
                      fontWeight: 400,
                      margin: "0 0 8px",
                    }}>
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: MUTED,
                      lineHeight: 1.7,
                      marginBottom: 14,
                    }}>
                    {s.desc}
                  </p>
                  <div
                    style={{
                      borderTop: `0.5px solid ${BORDER}`,
                      paddingTop: 12,
                    }}>
                    {s.includes.map((item, j) => (
                      <div
                        key={j}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          marginBottom: 6,
                        }}>
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: s.border,
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ fontSize: 12, color: MUTED }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              style={{
                background: `linear-gradient(135deg, ${PINK_LIGHT}, ${LAV_LIGHT})`,
                borderRadius: 20,
                padding: "2rem",
                textAlign: "center",
              }}>
              <p style={{ fontSize: 22, marginBottom: 8 }}>🌸</p>
              <h3
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: 22,
                  color: INK,
                  marginBottom: 10,
                }}>
                Ready to work together?
              </h3>
              <p
                style={{
                  color: MUTED,
                  fontSize: 14,
                  marginBottom: 20,
                  lineHeight: 1.7,
                }}>
                I'd love to hear about your project. Let's build something
                great!
              </p>
              <button
                onClick={() => nav("contact")}
                style={{
                  background: `linear-gradient(135deg, ${PINK}, ${LAVENDER})`,
                  color: WHITE,
                  border: "none",
                  borderRadius: 24,
                  padding: "11px 28px",
                  fontSize: 13,
                  cursor: "pointer",
                  fontWeight: 600,
                  boxShadow: `0 4px 16px ${PINK}77`,
                }}>
                Get in touch 💌
              </button>
            </div>
          </div>
        )}

        {/* RESUME */}
        {page === "resume" && (
          <div className="page-wrap">
            <div
              style={{
                borderRadius: 28,
                background: `linear-gradient(135deg, ${PEACH_LIGHT}, ${PINK_LIGHT})`,
                padding: "2.5rem 2rem",
                marginBottom: "2rem",
                overflow: "hidden",
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 16,
              }}>
              <FloatingBlob
                top="-20%"
                left="70%"
                size="160px"
                color={PEACH}
                delay={0.3}
              />
              <div style={{ position: "relative", zIndex: 1 }}>
                <p
                  style={{
                    fontSize: 12,
                    color: PEACH_DARK,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                    fontWeight: 600,
                  }}>
                  my background 📄
                </p>
                <h2
                  style={{
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: 30,
                    color: INK,
                    margin: "0 0 6px",
                  }}>
                  Resume
                </h2>
                <p style={{ color: MUTED, fontSize: 13, margin: 0 }}>
                  Shanisa Churat · Bangkok, Thailand · sheinah.ch@gmail.com
                </p>
              </div>
              <button
                onClick={() => window.print()}
                style={{
                  background: WHITE,
                  color: PEACH_DARK,
                  border: `1px solid ${PEACH}`,
                  borderRadius: 20,
                  padding: "9px 18px",
                  fontSize: 12,
                  cursor: "pointer",
                  fontWeight: 500,
                  position: "relative",
                  zIndex: 1,
                }}>
                🖨️ print / save PDF
              </button>
            </div>

            {/* Experience */}
            <Section emoji="💼" title="Work Experience" color={PINK_DARK}>
              {[
                {
                  role: "Freelance Flutter Developer",
                  company: "Self-employed",
                  period: "2024 – Present",
                  desc: "Building cross-platform mobile apps for clients using Flutter and Dart. Delivering UI/UX design, Firebase integration, and AI-powered features.",
                },
                {
                  role: "Flutter Developer (Contract)",
                  company: "Contract Company",
                  period: "2024",
                  desc: "Worked on small Flutter projects for clients, focusing on clean UI implementation and app performance.",
                },
                {
                  role: "Software Developer",
                  company: "Fling.AI",
                  period: "2023 – 2024",
                  desc: "Developed mobile features using Flutter. Collaborated with design and product teams on AI-integrated applications.",
                },
                {
                  role: "Personal Assistant to Director",
                  company: "PAJ'Art Co., Ltd. (Arnaud Nazare-Aga)",
                  period: "Prior",
                  desc: "Supported studio director in Bangkok and Paris. Managed operations for a French Pop Art studio.",
                },
              ].map((e, i) => (
                <ExpCard
                  key={i}
                  {...e}
                  color={[PINK_LIGHT, LAV_LIGHT, MINT_LIGHT, PEACH_LIGHT][i]}
                  dot={[PINK, LAVENDER, MINT, PEACH][i]}
                />
              ))}
            </Section>

            {/* Education */}
            <Section emoji="🎓" title="Education" color={LAV_DARK}>
              {[
                {
                  role: "Flutter Framework & Mobile Development",
                  company: "FutureSkill & Udemy",
                  period: "2023 – 2024",
                  desc: "Completed courses covering Flutter, Dart, Firebase, and full-stack mobile development from scratch.",
                },
                {
                  role: "Python for Business Analysis",
                  company: "Udemy",
                  period: "2023",
                  desc: "Learned Python fundamentals and data analysis concepts.",
                },
                {
                  role: "Bachelor of Business Administration (BBA)",
                  company: "Ramkhamhaeng University",
                  period: "Attended",
                  desc: "Studied business administration. Left before completing the degree to pursue a career in tech and software development.",
                },
              ].map((e, i) => (
                <ExpCard
                  key={i}
                  {...e}
                  color={[LAV_LIGHT, MINT_LIGHT, PEACH_LIGHT][i]}
                  dot={[LAVENDER, MINT, PEACH][i]}
                />
              ))}
            </Section>

            {/* Skills */}
            <Section emoji="🛠️" title="Skills" color={MINT_DARK}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: 12,
                }}>
                {[
                  {
                    cat: "Mobile",
                    items: ["Flutter", "Dart", "Firebase"],
                    color: PINK_LIGHT,
                    tc: PINK_DARK,
                  },
                  {
                    cat: "Frontend",
                    items: ["JavaScript", "HTML/CSS"],
                    color: MINT_LIGHT,
                    tc: MINT_DARK,
                  },
                  {
                    cat: "Design",
                    items: ["Figma", "UI/UX", "Wireframing"],
                    color: PEACH_LIGHT,
                    tc: PEACH_DARK,
                  },
                  {
                    cat: "AI & Tools",
                    items: ["Claude API", "AI Generative", "Git", "VS Code"],
                    color: PINK_LIGHT,
                    tc: PINK_DARK,
                  },
                ].map((g, i) => (
                  <div
                    key={i}
                    style={{
                      background: g.color,
                      borderRadius: 14,
                      padding: "1rem",
                    }}>
                    <p
                      style={{
                        fontSize: 11,
                        color: g.tc,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        margin: "0 0 8px",
                      }}>
                      {g.cat}
                    </p>
                    {g.items.map((item) => (
                      <div
                        key={item}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          marginBottom: 5,
                        }}>
                        <div
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            background: g.tc,
                          }}
                        />
                        <span style={{ fontSize: 13, color: INK }}>{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </Section>

            {/* Languages */}
            <Section emoji="🌏" title="Languages" color={PEACH_DARK}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {[
                  {
                    lang: "Thai",
                    level: "Native",
                    color: PINK_LIGHT,
                    tc: PINK_DARK,
                  },
                  {
                    lang: "English",
                    level: "Professional",
                    color: LAV_LIGHT,
                    tc: LAV_DARK,
                  },
                ].map((l) => (
                  <div
                    key={l.lang}
                    style={{
                      background: l.color,
                      borderRadius: 12,
                      padding: "10px 18px",
                    }}>
                    <p
                      style={{
                        fontSize: 14,
                        color: INK,
                        fontWeight: 500,
                        margin: "0 0 2px",
                      }}>
                      {l.lang}
                    </p>
                    <p
                      style={{
                        fontSize: 11,
                        color: l.tc,
                        margin: 0,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}>
                      {l.level}
                    </p>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* CONTACT */}
        {page === "contact" && (
          <div className="page-wrap">
            <div
              style={{
                borderRadius: 28,
                background: `linear-gradient(135deg, ${PEACH_LIGHT}, ${PINK_LIGHT})`,
                padding: "2.5rem 2rem",
                marginBottom: "2rem",
                overflow: "hidden",
                position: "relative",
              }}>
              <FloatingBlob
                top="-10%"
                left="70%"
                size="160px"
                color={PEACH}
                delay={0.3}
              />
              <p
                style={{
                  fontSize: 12,
                  color: PEACH_DARK,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                  fontWeight: 600,
                  position: "relative",
                  zIndex: 1,
                }}>
                say hello 👋
              </p>
              <h2
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: 30,
                  color: INK,
                  marginBottom: 12,
                  position: "relative",
                  zIndex: 1,
                }}>
                Get in touch
              </h2>
              <p
                style={{
                  color: MUTED,
                  fontSize: 14,
                  lineHeight: 1.8,
                  maxWidth: 440,
                  position: "relative",
                  zIndex: 1,
                }}>
                Whether you're a fellow beginner, want to collaborate, or just
                want to say hi — I'd love to hear from you! You can find me on
                all platforms under my name Shanisa Churat 🌸
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                {
                  label: "email",
                  value: "sheinah.ch@gmail.com",
                  href: "mailto:sheinah.ch@gmail.com",
                  emoji: "📧",
                  color: PINK_LIGHT,
                  tc: PINK_DARK,
                },
                {
                  label: "github",
                  value: "github.com/sheinah",
                  href: "https://github.com/sheinah",
                  emoji: "🐙",
                  color: LAV_LIGHT,
                  tc: LAV_DARK,
                },
                {
                  label: "linkedin",
                  value: "Shanisa Churat",
                  href: "https://www.linkedin.com/in/shanisa-churat-289a34254/",
                  emoji: "💼",
                  color: MINT_LIGHT,
                  tc: MINT_DARK,
                },
                {
                  label: "instagram",
                  value: "@sheinah_sh",
                  href: "https://www.instagram.com/sheinah_sh/",
                  emoji: "📸",
                  color: PEACH_LIGHT,
                  tc: PEACH_DARK,
                },
                {
                  label: "dribbble",
                  value: "SHANISA0498",
                  href: "https://www.dribbble.com/SHANISA0498",
                  emoji: "🎨",
                  color: PINK_LIGHT,
                  tc: PINK_DARK,
                },
                {
                  label: "stackoverflow",
                  value: "Sheinah Shanisa Churat",
                  href: "https://stackoverflow.com/users/19659362/sheinah-shanisa-churat",
                  emoji: "💡",
                  color: LAV_LIGHT,
                  tc: LAV_DARK,
                },
              ].map((l, i) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "center",
                    padding: "14px 16px",
                    background: WHITE,
                    border: `1px solid ${BORDER}`,
                    borderRadius: 16,
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = l.color)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = WHITE)
                  }>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 12,
                      background: l.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      flexShrink: 0,
                    }}>
                    {l.emoji}
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 11,
                        color: MUTED,
                        margin: "0 0 2px",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}>
                      {l.label}
                    </p>
                    <p
                      style={{
                        fontSize: 14,
                        color: l.tc,
                        margin: 0,
                        fontWeight: 500,
                      }}>
                      {l.value}
                    </p>
                  </div>
                  <span
                    style={{ marginLeft: "auto", color: MUTED, fontSize: 16 }}>
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </main>

      {showAddProject && (
        <AddProjectModal
          onAdd={addProject}
          onClose={() => setShowAddProject(false)}
        />
      )}
      {showEditor && (
        <BlogEditor
          post={editPost}
          onSave={(post) => {
            savePost(post);
          }}
          onClose={() => {
            setShowEditor(false);
            setEditPost(null);
          }}
        />
      )}
    </div>
  );
}
