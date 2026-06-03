import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { PORTFOLIO } from '@/config/portfolio';
import { StreetSection } from '@/components/city/StreetSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin } from 'lucide-react';
import { toast } from 'sonner';

export const ContactSection = () => {
  const { social, emailjs: ejsConfig, lookingFor } = PORTFOLIO;
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      emailjs.init(ejsConfig.publicKey);
      await emailjs.send(ejsConfig.serviceId, ejsConfig.templateId, {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
        to_name: ejsConfig.toName,
      });
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: '', email: '', message: '' });
    } catch {
      toast.error('Failed to send. Please try again or email me directly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <StreetSection id="contact" emoji="📡" buildingName="Signal Tower" subtitle="Contact & Links" side="right" accentColor="text-emerald-400">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-3">Currently Looking For</h3>
            <ul className="space-y-2">
              {lookingFor.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <Button variant="outline" onClick={() => window.open(social.github, '_blank')}
              className="glass border-emerald-400/20 hover:border-emerald-400/40 justify-start gap-3 text-sm">
              <Github size={16} />{social.githubHandle}
            </Button>
            <Button variant="outline" onClick={() => window.open(social.linkedin, '_blank')}
              className="glass border-emerald-400/20 hover:border-emerald-400/40 justify-start gap-3 text-sm">
              <Linkedin size={16} />{social.linkedinHandle}
            </Button>
          </div>
        </div>
        <Card className="glass-hover">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input placeholder="Your Name" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required disabled={sending} />
              <Input type="email" placeholder="Your Email" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required disabled={sending} />
              <Textarea placeholder="Your Message" value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                required disabled={sending} rows={5} />
              <Button type="submit" disabled={sending}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-background hover:opacity-90">
                {sending ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </StreetSection>
  );
};
