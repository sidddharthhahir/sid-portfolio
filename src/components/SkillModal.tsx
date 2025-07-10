
import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill: {
    name: string;
    icon: any;
    description: string;
    detailedDescription: string;
    keyProjects: Array<{
      name: string;
      url?: string;
    }>;
  } | null;
}

const SkillModal = ({ isOpen, onClose, skill }: SkillModalProps) => {
  if (!skill) return null;

  const IconComponent = skill.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="backdrop-blur-2xl bg-black/90 border border-white/20 text-gray-200 max-w-md mx-auto relative"
        aria-describedby="skill-modal-description"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl pr-8">
            <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl">
              <IconComponent size={32} className="text-cyan-400" />
            </div>
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {skill.name}
            </span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6" id="skill-modal-description">
          <div>
            <h4 className="text-lg font-semibold text-cyan-400 mb-3">About This Skill</h4>
            <p className="text-gray-300 leading-relaxed">
              {skill.detailedDescription}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-cyan-400 mb-3">Key Projects</h4>
            <div className="space-y-2">
              {skill.keyProjects.map((project, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg backdrop-blur-xl bg-white/5 border border-white/10">
                  <span className="text-gray-200 font-medium">{project.name}</span>
                  {project.url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(project.url, '_blank')}
                      className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                      aria-label={`View ${project.name} project`}
                    >
                      <ExternalLink size={16} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 text-gray-400 hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-200 z-10"
          aria-label="Close modal"
        >
          <X size={20} />
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SkillModal;
