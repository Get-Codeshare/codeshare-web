import { ReactNode } from 'react';
import Card from './Card';
import Image from 'next/image';

interface FeatureCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  icon?: ReactNode;
  children?: ReactNode;
}

export default function FeatureCard({ title, description, imageUrl, icon, children }: FeatureCardProps) {
  return (
    <Card className="flex flex-col text-center h-full group-hover:bg-card/80 backdrop-blur-sm">
      {/* Icon or Image */}
      <div className="flex justify-center mb-6">
        {imageUrl ? (
          <div className="relative w-full h-48 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
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
        {children}
      </div>
    </Card>
  );
}