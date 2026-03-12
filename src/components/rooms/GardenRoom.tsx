import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Linkedin, Github, User, MapPin, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { RESUME_CONFIG } from '@/config/resume';
import GitHubStatsWidget from '@/components/GitHubStatsWidget';
import emailjs from '@emailjs/browser';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } }
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const GardenRoom = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      emailjs.init('1XEPgOlzfPoTgaput');
      await emailjs.send('service_5n5oy19', 'template_ixyj8he', {
        from_name: formData.name, from_email: formData.email, message: formData.message, to_name: 'Siddharth Ahir'
      });
      toast({ title: t('contact.success.title'), description: t('contact.success.desc') });
      setFormData({ name: '', email: '', message: '' });
    } catch {
      toast({ title: t('contact.error.title'), description: t('contact.error.desc'), variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResumeDownload = () => {
    let url = RESUME_CONFIG.url;
    if (url.includes('drive.google.com')) {
      const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
      if (fileId) url = `https://drive.google.com/uc?export=download&id=${fileId}`;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <motion.div initial="hidden" animate="visible" variants={stagger}>
        <motion.div variants={item} className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400/80 mb-3">Open Air</p>
          <h2 className="text-5xl md:text-6xl font-black">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-400">The Garden</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Let's connect — reach out or explore my open source work</p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* GitHub */}
          <motion.div variants={item} className="mb-16">
            <Card className="glass-hover text-center">
              <CardContent className="p-10 flex flex-col items-center gap-4">
                <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10">
                  <Github size={40} className="text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-foreground">github.com/sidddharthhahir</h3>
                <p className="text-muted-foreground">AI projects, experiments, and open-source contributions</p>
                <Button onClick={() => window.open('https://github.com/sidddharthhahir', '_blank')}
                  className="bg-gradient-to-r from-emerald-500 to-green-500 hover:opacity-90 text-background px-8 py-3 rounded-full hover:scale-105 transition-all">
                  <Github size={18} className="mr-2" /> View Profile
                </Button>
              </CardContent>
            </Card>
            <GitHubStatsWidget />
          </motion.div>

          {/* Contact */}
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div variants={item}>
              <h3 className="text-2xl font-bold mb-6 text-foreground">{t('contact.subtitle')}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{t('contact.lookingFor')}</p>
              <ul className="space-y-2 mb-6">
                {[t('contact.role1'), t('contact.role2'), t('contact.role3')].map((r, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0" />{r}
                  </li>
                ))}
              </ul>
              <div className="space-y-2 mb-8 p-4 rounded-xl bg-muted/30 border border-border">
                <div className="flex items-center gap-3 text-muted-foreground"><MapPin size={16} className="text-emerald-400" />{t('contact.location')}</div>
                <div className="flex items-center gap-3 text-muted-foreground"><Calendar size={16} className="text-emerald-400" />{t('contact.availability')}</div>
              </div>
              <div className="space-y-2">
                {[
                  { href: 'mailto:sidahir25820@gmail.com', icon: Mail, label: 'Email' },
                  { href: 'https://linkedin.com/in/siddharth-ahir-798754262', icon: Linkedin, label: 'LinkedIn', ext: true },
                  { href: 'https://github.com/sidddharthhahir', icon: Github, label: 'GitHub', ext: true },
                ].map((link) => (
                  <a key={link.label} href={link.href} target={link.ext ? '_blank' : undefined} rel={link.ext ? 'noopener noreferrer' : undefined}
                    className="flex items-center p-4 rounded-xl glass-hover group">
                    <link.icon className="text-emerald-400 mr-3 group-hover:scale-110 transition-transform" size={20} />
                    <span className="text-foreground/80 group-hover:text-emerald-400 transition-colors font-medium">{link.label}</span>
                  </a>
                ))}
                <button onClick={handleResumeDownload} className="flex items-center w-full p-4 rounded-xl glass-hover group">
                  <User className="text-emerald-400 mr-3 group-hover:scale-110 transition-transform" size={20} />
                  <span className="text-foreground/80 group-hover:text-emerald-400 transition-colors font-medium">{t('contact.resume')}</span>
                </button>
              </div>
            </motion.div>

            <motion.div variants={item}>
              <Card className="glass-hover">
                <CardHeader><CardTitle className="text-foreground text-xl">{t('contact.form.title')}</CardTitle></CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input type="text" name="name" placeholder={t('contact.form.name')} value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})} required disabled={isSubmitting}
                      className="bg-muted/30 border-border focus:border-emerald-500/50" />
                    <Input type="email" name="email" placeholder={t('contact.form.email')} value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})} required disabled={isSubmitting}
                      className="bg-muted/30 border-border focus:border-emerald-500/50" />
                    <Textarea name="message" placeholder={t('contact.form.message')} value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})} required disabled={isSubmitting}
                      className="bg-muted/30 border-border min-h-[120px] focus:border-emerald-500/50" />
                    <Button type="submit" disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:opacity-90 text-background font-medium py-4">
                      {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GardenRoom;
