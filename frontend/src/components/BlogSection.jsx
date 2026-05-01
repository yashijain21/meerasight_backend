import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

const posts = [
  {
    id: 1,
    tag: "Glaucoma",
    title: "Glaucoma: The Silent Thief of Sight",
    excerpt: "Glaucoma often has no symptoms until significant vision loss occurs. Learn how early detection can save your sight.",
    date: "March 15, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1647467531427-a808b1a2f55f?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    id: 2,
    tag: "LASIK",
    title: "What is LASIK Surgery and Its Benefits?",
    excerpt: "LASIK surgery can permanently correct nearsightedness, farsightedness, and astigmatism. Discover if you're a good candidate.",
    date: "April 2, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1770217757395-f14e9c2f601b?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    id: 3,
    tag: "Eye Health",
    title: "Dry Eyes: Causes, Symptoms and Treatment",
    excerpt: "Millions suffer from dry eye syndrome. Understanding the root cause is the first step to finding lasting relief.",
    date: "April 18, 2025",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1770220174562-be196295d0a1?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
];

export default function BlogSection() {
  return (
    <section id="blog" data-testid="blog-section" className="bg-[#FAF8FF] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <p className="text-[#00A8D7] text-sm font-bold uppercase tracking-widest mb-3">In the Blogs</p>
            <h2 className="font-heading font-bold text-[#1A0A2E] text-3xl md:text-4xl lg:text-5xl leading-tight">
              Eye Health <span className="text-[#601E8E]">Insights</span>
            </h2>
          </div>
          <a href="#blog" data-testid="blog-view-all" className="flex items-center gap-2 text-[#601E8E] font-bold text-sm hover:gap-3 transition-all duration-200">
            View All Articles <ArrowRight size={16} />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              data-testid={`blog-card-${post.id}`}
              className="blog-card bg-white rounded-2xl overflow-hidden border border-purple-100 group cursor-pointer"
            >
              <div className="h-52 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-50 text-[#601E8E]">{post.tag}</span>
                  <span className="flex items-center gap-1.5 text-[#5C4B6B] text-xs"><Calendar size={12} />{post.date}</span>
                </div>
                <h3 className="font-heading font-bold text-[#1A0A2E] text-xl mb-3 group-hover:text-[#601E8E] transition-colors">{post.title}</h3>
                <p className="text-[#5C4B6B] text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#5C4B6B] text-xs">{post.readTime}</span>
                  <span className="flex items-center gap-1 text-[#601E8E] text-xs font-bold group-hover:gap-2 transition-all duration-200">
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
