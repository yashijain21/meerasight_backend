import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

const posts = [
  {
    id: 1,
    tag: "Glaucoma",
    title: "Glaucoma: The Silent Thief of Sight",
    excerpt: "Glaucoma often has no symptoms until significant vision loss occurs. Learn how early detection can save your vision.",
    date: "March 15, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1647467531427-a808b1a2f55f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwyfHxleWUlMjBnbGFzc2VzJTIwb3B0aWNzJTIwbWFjcm98ZW58MHx8fHwxNzc3NTYzNjA3fDA&ixlib=rb-4.1.0&q=85",
    tagColor: "#246B24",
  },
  {
    id: 2,
    tag: "LASIK",
    title: "What is LASIK Surgery and Its Benefits?",
    excerpt: "LASIK surgery can permanently correct nearsightedness, farsightedness, and astigmatism. Discover if you are a good candidate.",
    date: "April 2, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1770217757395-f14e9c2f601b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODd8MHwxfHNlYXJjaHwxfHxleWUlMjBkb2N0b3IlMjBvcGh0aGFsbW9sb2dpc3QlMjBleGFtaW5hdGlvbiUyMHBhdGllbnR8ZW58MHx8fHwxNzc3NTYzNTY2fDA&ixlib=rb-4.1.0&q=85",
    tagColor: "#246B24",
  },
  {
    id: 3,
    tag: "Eye Health",
    title: "Dry Eyes: Causes, Symptoms and Treatment",
    excerpt: "Millions suffer from dry eye syndrome. Understanding the root cause is the first step to finding lasting relief.",
    date: "April 18, 2025",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1770220174562-be196295d0a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODd8MHwxfHNlYXJjaHw0fHxleWUlMjBkb2N0b3IlMjBvcGh0aGFsbW9sb2dpc3QlMjBleGFtaW5hdGlvbiUyMHBhdGllbnR8ZW58MHx8fHwxNzc3NTYzNTY2fDA&ixlib=rb-4.1.0&q=85",
    tagColor: "#246B24",
  },
];

export default function BlogSection() {
  return (
    <section id="blog" data-testid="blog-section" className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <p className="text-[#246B24] text-sm font-bold uppercase tracking-widest mb-3">In the Blogs</p>
            <h2 className="font-heading font-bold text-[#0A1F0A] text-3xl md:text-4xl lg:text-5xl leading-tight">
              Eye Health <span className="text-[#246B24]">Insights</span>
            </h2>
          </div>
          <a
            href="#blog"
            data-testid="blog-view-all"
            className="flex items-center gap-2 text-[#246B24] font-bold text-sm hover:gap-3 transition-all duration-200"
          >
            View All Articles <ArrowRight size={16} />
          </a>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              data-testid={`blog-card-${post.id}`}
              className="blog-card bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] group cursor-pointer"
            >
              {/* Image */}
              <div className="h-52 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{ backgroundColor: `${post.tagColor}15`, color: post.tagColor }}
                  >
                    {post.tag}
                  </span>
                  <span className="flex items-center gap-1.5 text-[#4B6B4B] text-xs">
                    <Calendar size={12} />
                    {post.date}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-[#0A1F0A] text-xl mb-3 group-hover:text-[#246B24] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[#4B6B4B] text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#4B6B4B] text-xs">{post.readTime}</span>
                  <span className="flex items-center gap-1 text-[#246B24] text-xs font-bold group-hover:gap-2 transition-all duration-200">
                    Read More <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
