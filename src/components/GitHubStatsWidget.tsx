import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, Code, Activity } from 'lucide-react';

interface GitHubStats {
  publicRepos: number;
  followers: number;
  totalStars: number;
  topLanguages: string[];
}

const AnimatedCounter = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = Date.now();
          const animate = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            setCount(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(animate);
          };
          animate();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{count}</span>;
};

const GitHubStatsWidget = () => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userRes = await fetch('https://api.github.com/users/sidddharthhahir');
        const userData = await userRes.json();

        const reposRes = await fetch('https://api.github.com/users/sidddharthhahir/repos?per_page=100&sort=updated');
        const reposData = await reposRes.json();

        const totalStars = Array.isArray(reposData) 
          ? reposData.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0)
          : 0;

        const langCount: Record<string, number> = {};
        if (Array.isArray(reposData)) {
          reposData.forEach((repo: any) => {
            if (repo.language) {
              langCount[repo.language] = (langCount[repo.language] || 0) + 1;
            }
          });
        }
        const topLanguages = Object.entries(langCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 4)
          .map(([lang]) => lang);

        setStats({
          publicRepos: userData.public_repos || 0,
          followers: userData.followers || 0,
          totalStars,
          topLanguages,
        });
      } catch (error) {
        console.error('Failed to fetch GitHub stats:', error);
        // Fallback stats
        setStats({
          publicRepos: 15,
          followers: 5,
          totalStars: 8,
          topLanguages: ['Python', 'TypeScript', 'JavaScript', 'HTML'],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statItems = stats
    ? [
        { label: 'Repositories', value: stats.publicRepos, icon: Code },
        { label: 'Stars Earned', value: stats.totalStars, icon: Star },
        { label: 'Followers', value: stats.followers, icon: Activity },
      ]
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto mt-12"
    >
      <div className="backdrop-blur-2xl bg-black/30 border border-white/15 rounded-2xl p-8 hover:border-emerald-400/30 transition-all duration-500">
        {loading ? (
          <div className="flex items-center justify-center gap-3 py-8">
            <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-gray-400">Loading GitHub stats...</span>
          </div>
        ) : stats ? (
          <>
            <div className="flex items-center justify-center gap-3 mb-8">
              <Github size={24} className="text-emerald-400" />
              <h3 className="text-xl font-bold text-gray-200">Live GitHub Activity</h3>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              {statItems.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.4 }}
                  className="text-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-400/20 transition-all duration-300"
                >
                  <stat.icon size={20} className="text-emerald-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {stats.topLanguages.length > 0 && (
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <span className="text-sm text-gray-400">Top languages:</span>
                {stats.topLanguages.map((lang, i) => (
                  <motion.span
                    key={lang}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="px-3 py-1 text-xs rounded-full backdrop-blur-xl bg-emerald-500/15 text-emerald-300 border border-emerald-400/25"
                  >
                    {lang}
                  </motion.span>
                ))}
              </div>
            )}
          </>
        ) : null}
      </div>
    </motion.div>
  );
};

export default GitHubStatsWidget;
