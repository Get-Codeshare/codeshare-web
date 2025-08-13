import { ReactNode } from 'react';
import BlueprintCard from './BlueprintCard';
import Image from 'next/image';

interface FeatureCardProps {
  title: string;
  description: string;
  imageUrl: string;
  children?: ReactNode;
}

export default function FeatureCard({ title, description, imageUrl }: FeatureCardProps) {
  return (
    <BlueprintCard className="flex flex-col text-center">
      {/* The image is now clearly displayed without a fade */}
      <div className="relative h-60 w-full mb-6 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100">
        <Image
          src={imageUrl}
          alt={`${title} screenshot`}
          fill
          style={{ objectFit: 'cover', objectPosition: 'top' }}
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-neutral-600 flex-grow">
        {description}
      </p>
    </BlueprintCard>
  );
}