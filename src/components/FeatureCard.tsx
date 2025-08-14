import { ReactNode } from 'react';
import Card from './Card';
import Image from 'next/image';
import { cn } from '@/lib/utils'; // Make sure this import is present

interface FeatureCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  icon?: ReactNode;
  children?: ReactNode;
}

export default function FeatureCard({ title, description, imageUrl, icon, children }: FeatureCardProps) {
  // Define the glow/shadow style to reuse it
  const glowAndShadowClasses = "bg-card/50 backdrop-blur-sm shadow-[0px_-82px_68px_-109px_inset_rgba(255,255,255,0.1),0px_98px_100px_-170px_inset_rgba(255,255,255,0.2),0px_4px_18px_-8px_inset_rgba(255,255,255,0.2),0px_1px_40px_-14px_inset_rgba(255,255,255,0.1)]";

  return (
    <Card className="flex flex-col text-center h-full group-hover:bg-card/80 backdrop-blur-sm">
      {/* Icon or Image */}
      <div className="flex justify-center mb-6">
        {imageUrl === "keyboard-shortcut" || imageUrl === "cli-terminal" || imageUrl === "web-platform" ? (
          // MODIFIED: Unified the container style for all three demos
          <div className={cn("relative w-full aspect-video rounded-lg overflow-hidden border border-border flex items-center justify-center", glowAndShadowClasses)}>
            {children}
          </div>
        ) : imageUrl ? (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted/20 shadow-lg">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : icon ? (
          <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-accent/10 text-accent">
            {icon}
          </div>
        ) : null}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">{description}</p>
        {imageUrl !== "keyboard-shortcut" && imageUrl !== "cli-terminal" && imageUrl !== "web-platform" && children}
      </div>
    </Card>
  );
}