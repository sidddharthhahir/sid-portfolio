
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Edit, Save, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface EditableSectionProps {
  content: string;
  onUpdate: (content: string) => void;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
}

export const EditableSection: React.FC<EditableSectionProps> = ({
  content,
  onUpdate,
  multiline = false,
  className = "",
  placeholder = "Enter content..."
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempContent, setTempContent] = useState(content);
  const { toast } = useToast();

  const handleSave = () => {
    onUpdate(tempContent);
    setIsEditing(false);
    toast({
      title: "Content Updated",
      description: "Your changes have been saved successfully!"
    });
  };

  const handleCancel = () => {
    setTempContent(content);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-4">
        {multiline ? (
          <Textarea
            value={tempContent}
            onChange={(e) => setTempContent(e.target.value)}
            className={`bg-black/40 border-cyan-400/50 text-gray-200 ${className}`}
            placeholder={placeholder}
            rows={multiline ? 6 : 1}
          />
        ) : (
          <Input
            value={tempContent}
            onChange={(e) => setTempContent(e.target.value)}
            className={`bg-black/40 border-cyan-400/50 text-gray-200 ${className}`}
            placeholder={placeholder}
          />
        )}
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700"
          >
            <Save size={16} className="mr-1" />
            Save
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-200"
          >
            <X size={16} className="mr-1" />
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative">
      <div className={className}>
        {content}
      </div>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => setIsEditing(true)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400 hover:text-cyan-300 absolute -top-2 -right-2"
      >
        <Edit size={16} />
      </Button>
    </div>
  );
};

export default EditableSection;
