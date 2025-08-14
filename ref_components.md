Directory structure:
└── landing/
    ├── card.tsx
    ├── comparison.tsx
    ├── cta.tsx
    ├── demo.tsx
    ├── description.tsx
    ├── faq.tsx
    ├── grid-cards.tsx
    ├── grid-pattern.tsx
    ├── hero.tsx
    ├── logo-carousel.tsx
    ├── map.tsx
    ├── scifi-btn.tsx
    ├── section-svg.tsx
    ├── section.tsx
    ├── spotlight.tsx
    ├── testimonials.tsx
    ├── trusted-by.tsx
    └── wordmark.tsx


Files Content:

================================================
FILE: apps/docs/components/landing/card.tsx
================================================
import type { IconProps } from '@phosphor-icons/react';
import type { ComponentType } from 'react';
import { cn } from '@/lib/utils';
import { GridPatternBg } from './grid-pattern';

interface GridCard {
	title: string;
	description: string;
	icon: ComponentType<IconProps>;
}

interface SciFiGridCardProps extends GridCard {
	className?: string;
}

export const SciFiGridCard = ({
	title,
	description,
	icon: Icon,
	className,
}: SciFiGridCardProps) => {
	return (
		<div
			className={cn(
				'group relative w-full overflow-hidden',
				'min-h-[340px] sm:min-h-[380px] lg:min-h-[420px]',
				className
			)}
		>
			<div className="absolute inset-0">
				<GridPatternBg />
			</div>

			<div className="relative h-full border border-border bg-transparent px-5 transition-all duration-300 sm:px-6 lg:px-8">
				<div className="pointer-events-none absolute inset-0">
					<div className="absolute top-0 left-0 h-2 w-2 group-hover:animate-[cornerGlitch_0.6s_ease-in-out]">
						<div className="absolute top-0 left-0.5 h-0.5 w-1.5 origin-left bg-foreground" />
						<div className="absolute top-0 left-0 h-2 w-0.5 origin-top bg-foreground" />
					</div>

					<div className="-scale-x-[1] absolute top-0 right-0 h-2 w-2 group-hover:animate-[cornerGlitch_0.6s_ease-in-out]">
						<div className="absolute top-0 left-0.5 h-0.5 w-1.5 origin-left bg-foreground" />
						<div className="absolute top-0 left-0 h-2 w-0.5 origin-top bg-foreground" />
					</div>

					<div className="-scale-y-[1] absolute bottom-0 left-0 h-2 w-2 group-hover:animate-[cornerGlitch_0.6s_ease-in-out]">
						<div className="absolute top-0 left-0.5 h-0.5 w-1.5 origin-left bg-foreground" />
						<div className="absolute top-0 left-0 h-2 w-0.5 origin-top bg-foreground" />
					</div>

					<div className="-scale-[1] absolute right-0 bottom-0 h-2 w-2 group-hover:animate-[cornerGlitch_0.6s_ease-in-out]">
						<div className="absolute top-0 left-0.5 h-0.5 w-1.5 origin-left bg-foreground" />
						<div className="absolute top-0 left-0 h-2 w-0.5 origin-top bg-foreground" />
					</div>
				</div>

				<div className="relative flex h-full flex-col items-center justify-center py-6 sm:py-8">
					<div className="mb-6 rounded border border-border bg-card p-4 shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)] sm:mb-8 sm:p-5">
						<Icon
							className="h-10 w-10 text-foreground/80 transition-colors duration-300 group-hover:text-foreground sm:h-12 sm:w-12"
							weight="duotone"
						/>
					</div>

					<h3 className="px-2 pb-6 text-center font-medium text-2xl text-foreground transition-colors duration-300 group-hover:text-foreground/90 sm:pb-8 sm:text-3xl lg:pb-10">
						{title}
					</h3>

					<p className="px-2 text-center text-base text-muted-foreground/70 leading-relaxed transition-colors duration-300 group-hover:text-muted-foreground sm:text-lg">
						{description}
					</p>
				</div>
			</div>
		</div>
	);
};



================================================
FILE: apps/docs/components/landing/comparison.tsx
================================================
import { BarChart3, Check, X } from 'lucide-react';

const features = [
	{
		name: 'Cookie-free tracking',
		us: true,
		ga: false,
		plausible: true,
		fathom: true,
		benefit: 'No consent banners, higher opt-in rates',
	},
	{
		name: 'GDPR Compliant by default',
		us: true,
		ga: false,
		plausible: true,
		fathom: true,
		benefit: 'Reduce legal risk and compliance costs',
	},
	{
		name: '65x faster script',
		us: true,
		ga: false,
		plausible: false,
		fathom: false,
		benefit: 'Better Core Web Vitals and SEO rankings',
	},
	{
		name: 'Data ownership',
		us: true,
		ga: false,
		plausible: true,
		fathom: false,
		benefit: 'Full control of your valuable business data',
	},
	{
		name: 'Export raw data',
		us: true,
		ga: false,
		plausible: false,
		fathom: false,
		benefit: 'Integrate with your existing business tools',
	},
	{
		name: 'AI-powered insights',
		us: true,
		ga: false,
		plausible: false,
		fathom: false,
		benefit: 'Predictive analytics and automated recommendations',
	},
	{
		name: 'Real-time analytics',
		us: true,
		ga: true,
		plausible: true,
		fathom: true,
		benefit: 'Make data-driven decisions instantly',
	},
	{
		name: 'Self-hosting option',
		us: true,
		ga: false,
		plausible: true,
		fathom: false,
		benefit: 'Complete control over your infrastructure',
	},
	{
		name: 'Transparent pricing',
		us: true,
		ga: false,
		plausible: true,
		fathom: true,
		benefit: 'No hidden costs or surprise charges',
	},
	{
		name: 'Advanced event tracking',
		us: true,
		ga: true,
		plausible: false,
		fathom: false,
		benefit: 'Track custom user interactions and conversions',
	},
];

const FeatureRow = ({ feature }: { feature: (typeof features)[0] }) => (
	<div
		className="border-border/50 border-b transition-colors last:border-b-0 hover:bg-muted/30"
		key={feature.name}
	>
		{/* Desktop layout */}
		<div className="hidden grid-cols-6 p-4 md:grid">
			<div className="pr-4 text-foreground text-sm">{feature.name}</div>
			<div className="flex justify-center">
				{feature.us ? (
					<Check className="h-5 w-5 text-primary" />
				) : (
					<X className="h-5 w-5 text-muted-foreground" />
				)}
			</div>
			<div className="flex justify-center">
				{feature.ga ? (
					<Check className="h-5 w-5 text-muted-foreground" />
				) : (
					<X className="h-5 w-5 text-muted-foreground" />
				)}
			</div>
			<div className="flex justify-center">
				{feature.plausible ? (
					<Check className="h-5 w-5 text-muted-foreground" />
				) : (
					<X className="h-5 w-5 text-muted-foreground" />
				)}
			</div>
			<div className="flex justify-center">
				{feature.fathom ? (
					<Check className="h-5 w-5 text-muted-foreground" />
				) : (
					<X className="h-5 w-5 text-muted-foreground" />
				)}
			</div>
			<div className="text-muted-foreground text-xs">{feature.benefit}</div>
		</div>

		{/* Mobile layout */}
		<div className="space-y-3 p-4 md:hidden">
			<div className="flex items-start justify-between">
				<div className="flex-1 pr-4 font-medium text-foreground text-sm">
					{feature.name}
				</div>
				<div className="flex items-center gap-1">
					<span className="font-medium text-primary text-xs">Databuddy</span>
					{feature.us ? (
						<Check className="h-4 w-4 text-primary" />
					) : (
						<X className="h-4 w-4 text-muted-foreground" />
					)}
				</div>
			</div>

			<div className="text-muted-foreground text-xs leading-relaxed">
				{feature.benefit}
			</div>

			<div className="flex flex-wrap gap-3 pt-2">
				<div className="flex items-center gap-1">
					<span className="text-muted-foreground text-xs">GA</span>
					{feature.ga ? (
						<Check className="h-3 w-3 text-muted-foreground" />
					) : (
						<X className="h-3 w-3 text-muted-foreground" />
					)}
				</div>
				<div className="flex items-center gap-1">
					<span className="text-muted-foreground text-xs">Plausible</span>
					{feature.plausible ? (
						<Check className="h-3 w-3 text-muted-foreground" />
					) : (
						<X className="h-3 w-3 text-muted-foreground" />
					)}
				</div>
				<div className="flex items-center gap-1">
					<span className="text-muted-foreground text-xs">Fathom</span>
					{feature.fathom ? (
						<Check className="h-3 w-3 text-muted-foreground" />
					) : (
						<X className="h-3 w-3 text-muted-foreground" />
					)}
				</div>
			</div>
		</div>
	</div>
);

export default function Comparison() {
	return (
		<div className="-pr-2 relative mx-auto rounded-none border-border bg-background/95 font-geist md:w-10/12 md:border-[1.2px] md:border-b-0 md:border-l-0">
			<div className="w-full md:mx-0">
				{/* Single wide section for comparison */}
				<div className="border-border border-t-[1.2px] border-b-[1.2px] border-l-[1.2px] p-6 sm:p-8 md:border-t-0 md:p-10">
					<div className="my-1 flex items-center gap-2">
						<BarChart3 className="h-4 w-4 text-muted-foreground" />
						<p className="text-muted-foreground">Feature Comparison</p>
					</div>
					<div className="mt-2 mb-8">
						<div className="max-w-full">
							<div className="flex gap-3">
								<p className="max-w-lg font-normal text-foreground text-xl tracking-tighter md:text-2xl">
									Better than <strong>all competitors</strong> in every way.
								</p>
							</div>
						</div>
						<p className="mt-2 text-left text-muted-foreground text-sm">
							Compare Databuddy with the most popular analytics platforms and
							see why we&apos;re the clear choice.
						</p>
					</div>

					{/* Comparison table */}
					<div className="overflow-hidden rounded-xl border border-border bg-muted/20">
						{/* Desktop table header */}
						<div className="hidden grid-cols-6 border-border border-b bg-muted/50 p-4 md:grid">
							<div className="font-medium text-muted-foreground text-sm">
								Feature
							</div>
							<div className="text-center font-semibold text-primary text-sm">
								Databuddy
							</div>
							<div className="text-center font-semibold text-muted-foreground text-sm">
								Google Analytics
							</div>
							<div className="text-center font-semibold text-muted-foreground text-sm">
								Plausible
							</div>
							<div className="text-center font-semibold text-muted-foreground text-sm">
								Fathom
							</div>
							<div className="font-medium text-muted-foreground text-sm">
								Business Impact
							</div>
						</div>

						{/* Mobile header */}
						<div className="border-border border-b bg-muted/50 p-4 md:hidden">
							<div className="text-center font-semibold text-primary text-sm">
								Feature Comparison
							</div>
						</div>

						{features.map((feature) => (
							<FeatureRow feature={feature} key={feature.name} />
						))}
					</div>

					<div className="mt-6 text-center">
						<p className="text-muted-foreground text-xs">
							All features available on our free plan with up to 50,000 monthly
							pageviews
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}



================================================
FILE: apps/docs/components/landing/cta.tsx
================================================
'use client';

import { ArrowRight, Plus } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import LiquidChrome from '../bits/liquid';

const ctaItems = [
	{
		title: 'Get started',
		description:
			'Drop your site in and see what your users are doing in seconds',
		href: 'https://app.databuddy.cc',
		primary: true,
	},
	{
		title: 'Read Documentation',
		description: 'Learn how to integrate Databuddy with your tech stack.',
		href: '/docs',
		primary: false,
	},
];

export default function CTA() {
	return (
		<div className="-pr-2 relative mx-auto rounded-none border-border bg-background/95 font-geist md:w-10/12 md:border-[1.2px] md:border-b-0 md:border-l-0">
			<div className="w-full md:mx-0">
				{/* CTA grid */}
				<div className="relative grid grid-cols-1 border-border border-t-[1.2px] md:grid-cols-3 md:grid-rows-1">
					<div className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-0 z-10 hidden w-full select-none grid-cols-3 md:grid">
						<Plus className="ml-auto h-8 w-8 translate-x-[16.5px] translate-y-[.5px] text-muted-foreground" />
						<Plus className="ml-auto h-8 w-8 translate-x-[16.5px] translate-y-[.5px] text-muted-foreground" />
					</div>

					{ctaItems.map((item) => (
						<Link
							className={cn(
								'group flex transform-gpu flex-col justify-center border-border border-t-[1.2px] border-l-[1.2px] p-10 transition-colors hover:bg-muted/50 md:min-h-[240px] md:border-t-0'
							)}
							href={item.href}
							key={item.title}
							rel={
								item.href.startsWith('http') ? 'noopener noreferrer' : undefined
							}
							target={item.href.startsWith('http') ? '_blank' : undefined}
						>
							<div className="my-1 flex items-center gap-2">
								{item.primary ? (
									<div className="flex h-4 w-4 items-center justify-center rounded-sm bg-primary">
										<ArrowRight className="h-2 w-2 text-primary-foreground" />
									</div>
								) : (
									<div className="flex h-4 w-4 items-center justify-center rounded-sm border border-border">
										<ArrowRight className="h-2 w-2 text-muted-foreground" />
									</div>
								)}
								<p className="text-muted-foreground text-xs">
									{item.primary ? 'Try Now' : 'Learn More'}
								</p>
							</div>
							<div className="mt-2">
								<div className="max-w-full">
									<div className="flex items-center gap-3">
										<p
											className={cn(
												'max-w-lg font-medium text-foreground text-lg tracking-tight transition-colors group-hover:text-primary',
												item.primary && 'text-primary'
											)}
										>
											{item.title}
										</p>
										<ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
									</div>
								</div>
								<p className="mt-2 text-left text-muted-foreground text-sm">
									{item.description}
								</p>
							</div>
						</Link>
					))}
				</div>

				{/* Liquid Chrome CTA Section */}
				<div className="relative min-h-[400px] overflow-hidden border-border border-t-[1.2px] border-l-[1.2px]">
					{/* Liquid Chrome Background */}
					<div className="absolute inset-0 opacity-30">
						<LiquidChrome
							amplitude={0.4}
							frequencyX={2.5}
							frequencyY={1.8}
							interactive={false}
							speed={0.3}
						/>
					</div>

					{/* Gradient overlays for edge fading - theme aware */}
					<div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
					<div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/60" />
					<div className="absolute inset-0 bg-gradient-to-tr from-background/40 via-transparent to-transparent" />
					<div className="absolute inset-0 bg-gradient-to-bl from-transparent via-transparent to-background/40" />

					<div className="relative z-10 h-full p-10">
						<div className="flex h-full w-full flex-col items-center justify-center gap-8 text-center">
							<div className="space-y-4">
								<h2 className="font-bold text-4xl text-foreground tracking-tight md:text-5xl">
									Ready to get started?
								</h2>
								<p className="mx-auto max-w-md text-lg text-muted-foreground">
									Join developers who've ditched Google Analytics for something
									better.
								</p>
							</div>

							<div className="flex flex-col items-center gap-4 sm:flex-row">
								<a
									className="inline-flex transform items-center justify-center rounded-xl bg-primary px-8 py-4 font-semibold text-base text-primary-foreground shadow-lg transition-all duration-200 hover:scale-105 hover:bg-primary/90 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
									data-button-type="primary-cta"
									data-destination="register"
									data-section="cta"
									data-track="cta-get-started-click"
									href="https://app.databuddy.cc"
								>
									Get started
									<ArrowRight className="ml-2 h-4 w-4" />
								</a>
							</div>

							<div className="flex items-center gap-8 text-muted-foreground text-sm opacity-60">
								<span>Rivo.gg</span>
								<span>Better-auth</span>
								<span>Confinity</span>
								<span>Wouldyoubot</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}



================================================
FILE: apps/docs/components/landing/demo.tsx
================================================
'use client';

import { ArrowsOutSimple as ArrowsOutSimpleIcon } from '@phosphor-icons/react';
import { useRef } from 'react';

export default function DemoContainer() {
	const iframeRef = useRef<HTMLIFrameElement>(null);

	const handleFullscreen = () => {
		if (iframeRef.current?.requestFullscreen) {
			iframeRef.current.requestFullscreen();
		}
	};

	const dotPattern =
		"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 1'%3E%3Crect width='1' height='1' fill='%23666666'/%3E%3C/svg%3E";

	return (
		<div className="mx-auto mt-24 mb-24 w-full max-w-7xl px-8">
			<div className="group relative bg-background/80 p-2 shadow-2xl backdrop-blur-sm">
				<div
					className="-top-px absolute inset-x-0 h-px opacity-30"
					style={{
						backgroundImage: `url("${dotPattern}")`,
						WebkitMaskImage:
							'linear-gradient(to right, transparent, white 4rem, white calc(100% - 4rem), transparent)',
						maskImage:
							'linear-gradient(to right, transparent, white 4rem, white calc(100% - 4rem), transparent)',
						marginLeft: '-4rem',
						marginRight: '-4rem',
					}}
				/>

				<div
					className="-left-px absolute inset-y-0 w-px opacity-30"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 4'%3E%3Crect width='1' height='1' fill='%23666666'/%3E%3C/svg%3E")`,
						WebkitMaskImage:
							'linear-gradient(to bottom, transparent, white 4rem, white calc(100% - 4rem), transparent)',
						maskImage:
							'linear-gradient(to bottom, transparent, white 4rem, white calc(100% - 4rem), transparent)',
						marginTop: '-4rem',
						marginBottom: '-4rem',
					}}
				/>
				<div
					className="-right-px absolute inset-y-0 w-px opacity-30"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 4'%3E%3Crect width='1' height='1' fill='%23666666'/%3E%3C/svg%3E")`,
						WebkitMaskImage:
							'linear-gradient(to bottom, transparent, white 4rem, white calc(100% - 4rem), transparent)',
						maskImage:
							'linear-gradient(to bottom, transparent, white 4rem, white calc(100% - 4rem), transparent)',
						marginTop: '-4rem',
						marginBottom: '-4rem',
					}}
				/>

				<div
					className="absolute inset-x-0 h-px opacity-30"
					style={{
						bottom: '-1px',
						backgroundImage: `url("${dotPattern}")`,
						WebkitMaskImage:
							'linear-gradient(to right, transparent, white 4rem, white calc(100% - 4rem), transparent)',
						maskImage:
							'linear-gradient(to right, transparent, white 4rem, white calc(100% - 4rem), transparent)',
						marginLeft: '-4rem',
						marginRight: '-4rem',
					}}
				/>

				<iframe
					allowFullScreen
					className="h-[500px] w-full rounded border-0 bg-gradient-to-b from-transparent to-background grayscale sm:h-[600px] lg:h-[700px]"
					loading="lazy"
					ref={iframeRef}
					src="https://app.databuddy.cc/demo/OXmNQsViBT-FOS_wZCTHc"
					title="Databuddy Demo Dashboard"
				/>

				{/* Fullscreen Button & Overlay */}
				<button
					aria-label="Open demo in fullscreen"
					className="absolute inset-2 flex items-center justify-center rounded bg-background/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					onClick={handleFullscreen}
					type="button"
				>
					<div className="flex items-center gap-2 rounded border border-border bg-card/90 px-4 py-2 font-medium text-sm shadow-lg backdrop-blur-sm transition-colors hover:bg-card">
						<ArrowsOutSimpleIcon
							className="h-4 w-4 text-foreground"
							weight="fill"
						/>
						<span className="text-foreground">Click to view fullscreen</span>
					</div>
				</button>
			</div>
		</div>
	);
}



================================================
FILE: apps/docs/components/landing/description.tsx
================================================
'use client';

import { AnimatePresence, motion, type Variants } from 'motion/react';
import { useEffect, useState } from 'react';

const analyticsData = [
	{
		title: 'Bloated and Creepy',
		content:
			'Google Analytics tracks everything, slows down your site, and requires cookie banners that hurt conversion rates.',
		isActive: true,
	},
	{
		title: 'Minimal but useless',
		content:
			'Simple analytics tools give you basic metrics but lack the depth needed for meaningful business insights.',
		isActive: false,
	},
	{
		title: 'Complex Product Analysis',
		content:
			"Enterprise tools overwhelm you with features you don't need while hiding the metrics that actually matter.",
		isActive: false,
	},
];

export const Description = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [data, setData] = useState(analyticsData);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
		}, 5000);

		return () => clearInterval(interval);
	}, [data.length]);

	useEffect(() => {
		setData((prevData) =>
			prevData.map((item, index) => ({
				...item,
				isActive: index === currentIndex,
			}))
		);
	}, [currentIndex]);

	const titleVariants: Variants = {
		active: {
			opacity: 1,
			color: 'var(--color-foreground)',
			transition: { duration: 0.3 },
		},
		inactive: {
			opacity: 0.4,
			color: 'var(--color-muted-foreground)',
			transition: { duration: 0.3 },
		},
	};

	const contentVariants: Variants = {
		enter: {
			opacity: 0,
			y: 20,
		},
		center: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.4,
				ease: 'easeOut',
			},
		},
		exit: {
			opacity: 0,
			y: -20,
			transition: {
				duration: 0.3,
				ease: 'easeIn',
			},
		},
	};

	return (
		<div className="w-full pt-6 sm:pt-8">
			{/* Mobile Layout */}
			<div className="block px-4 lg:hidden">
				<div className="mb-8 text-center">
					<h2 className="mb-8 font-medium text-2xl leading-tight sm:text-3xl">
						Most Analytics Tools are
					</h2>
				</div>

				{/* Mobile Active Title */}
				<div className="mb-6 text-center">
					<h3 className="font-medium text-foreground text-xl">
						{data[currentIndex].title}
					</h3>
				</div>

				{/* Mobile Content */}
				<div className="flex min-h-[100px] items-center justify-center px-6">
					<AnimatePresence mode="popLayout">
						<motion.div
							animate="center"
							className="max-w-md text-center text-muted-foreground text-sm leading-relaxed sm:text-base"
							exit="exit"
							initial="enter"
							key={currentIndex}
							variants={contentVariants}
						>
							{data[currentIndex].content}
						</motion.div>
					</AnimatePresence>
				</div>
			</div>

			{/* Desktop Layout */}
			<div className="hidden w-full items-center justify-center lg:flex">
				<div className="flex w-full max-w-6xl items-center justify-center">
					{/* Left Column - Titles */}
					<div className="flex-1 px-8 xl:px-12">
						<h2 className="mb-8 font-medium text-2xl leading-tight xl:mb-12 xl:text-3xl">
							Most Analytics Tools are
						</h2>

						<div className="space-y-3 xl:space-y-4">
							{data.map((item, index) => (
								<motion.div
									animate={item.isActive ? 'active' : 'inactive'}
									className="cursor-pointer font-medium text-lg transition-colors duration-200 hover:opacity-80 xl:text-xl"
									key={`title-${item.title}`}
									onClick={() => setCurrentIndex(index)}
									variants={titleVariants}
								>
									{item.title}
								</motion.div>
							))}
						</div>
					</div>

					{/* Divider */}
					<div className="mx-6 h-60 w-px flex-shrink-0 bg-border xl:mx-8" />

					{/* Right Column - Content */}
					<div className="flex-1 px-8 xl:px-12">
						<div className="flex min-h-[140px] items-center xl:min-h-[180px]">
							<AnimatePresence mode="popLayout">
								<motion.div
									animate="center"
									className="max-w-md text-muted-foreground text-sm leading-relaxed xl:text-base"
									exit="exit"
									initial="enter"
									key={currentIndex}
									variants={contentVariants}
								>
									{data[currentIndex].content}
								</motion.div>
							</AnimatePresence>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};



================================================
FILE: apps/docs/components/landing/faq.tsx
================================================
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
	{
		question: 'How is Databuddy different from Google Analytics?',
		answer:
			"Databuddy is built for privacy-first analytics with no cookies required, making it GDPR and CCPA compliant out of the box. Our script is 65x faster than GA4, with a <1KB footprint that won't impact your Core Web Vitals.",
	},
	{
		question: 'Do I need to add cookie consent banners?',
		answer:
			"No. Databuddy's analytics are completely cookieless, using privacy-preserving techniques to provide accurate analytics without tracking individual users. Our customers typically see a 30% increase in conversion rates after removing those intrusive cookie banners.",
	},
	{
		question: "What's included in the free plan?",
		answer:
			"Our free plan includes up to 10,000 monthly events, real-time analytics, basic event tracking, It's perfect for small websites, personal projects, or to test Databuddy before upgrading.",
	},
	{
		question: 'How easy is it to implement Databuddy?',
		answer:
			"Implementation takes less than 5 minutes for most websites. Simply add our lightweight script to your site (we provide easy integrations for Next.js, React, WordPress, Shopify, and more), and you'll start seeing data immediately.",
	},
];

export default function FAQ() {
	return (
		<div className="mx-auto w-full max-w-5xl">
			<div className="space-y-8 lg:space-y-12">
				{/* Header Section */}
				<div className="text-center lg:text-left">
					<h2 className="mx-auto max-w-2xl font-medium text-2xl leading-tight sm:text-3xl lg:mx-0 lg:text-4xl xl:text-5xl">
						Questions we think you might like answers to
					</h2>
				</div>

				{/* FAQ Accordion */}
				<div className="w-full">
					<Accordion className="w-full space-y-4" collapsible type="single">
						{faqs.map((faq) => (
							<AccordionItem
								className="bg-background/50 transition-colors duration-200 hover:bg-background/80"
								key={faq.question}
								value={faq.question}
							>
								<AccordionTrigger className="py-4 text-left font-medium text-base hover:no-underline sm:py-6 sm:text-lg lg:text-xl">
									{faq.question}
								</AccordionTrigger>
								<AccordionContent className="pb-4 text-muted-foreground text-sm leading-relaxed sm:pb-6 sm:text-base">
									{faq.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</div>
	);
}



================================================
FILE: apps/docs/components/landing/grid-cards.tsx
================================================
'use client';

import {
	EyeIcon,
	LeafIcon,
	RocketLaunchIcon,
	ShieldIcon,
	TrendUpIcon,
	UsersFourIcon,
} from '@phosphor-icons/react';
import { SciFiGridCard } from './card';

const cards = [
	{
		id: 1,
		title: 'Privacy First Approach',
		description:
			'Build trust & reduce legal risk with built-in GDPR/CCPA compliance.',
		icon: ShieldIcon,
	},
	{
		id: 2,
		title: 'Real-time Analytics',
		description:
			'Make smarter, data-driven decisions instantly with live dashboards.',
		icon: TrendUpIcon,
	},
	{
		id: 3,
		title: 'Data Ownership',
		description: 'Full control of your valuable business data.',
		icon: UsersFourIcon,
	},
	{
		id: 4,
		title: 'Energy Efficient',
		description:
			'Up to 10x more eco-friendly with a significantly lower carbon footprint.',
		icon: LeafIcon,
	},
	{
		id: 5,
		title: 'Transparency',
		description: 'Fully transparent, no hidden fees or data games.',
		icon: EyeIcon,
	},
	{
		id: 6,
		title: 'Lightweight',
		description:
			'Lightweight, no cookies, no fingerprinting, no consent needed.',
		icon: RocketLaunchIcon,
	},
];

export const GridCards = () => {
	return (
		<div className="w-full">
			{/* Header Section */}
			<div className="mb-12 text-center lg:mb-16 lg:text-left">
				<h2 className="mx-auto max-w-4xl font-semibold text-3xl leading-tight sm:text-4xl lg:mx-0 lg:text-5xl">
					<span className="text-muted-foreground">Everything you need to </span>
					<span className="text-foreground">understand your users</span>
				</h2>
			</div>

			{/* Grid Section */}
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10 xl:gap-12">
				{cards.map((card) => (
					<div className="flex" key={card.id}>
						<SciFiGridCard
							description={card.description}
							icon={card.icon}
							title={card.title}
						/>
					</div>
				))}
			</div>
		</div>
	);
};



================================================
FILE: apps/docs/components/landing/grid-pattern.tsx
================================================
export const GridPatternBg = () => {
	return (
		<div className="relative min-h-screen w-full text-foreground/80">
			<div
				className="absolute inset-0 z-[1]"
				style={{
					background:
						'radial-gradient(ellipse 40% 16% at 50% 15%, var(--ring) 0%, transparent 70%)',
					filter: 'blur(20px)',
					opacity: 0.15,
				}}
			/>
			<div
				className="absolute inset-0"
				style={{
					backgroundImage: `
					linear-gradient(to right, var(--border) 1px, transparent 1px),
					linear-gradient(to bottom, var(--border) 1px, transparent 1px)
					`,
					backgroundSize: '30px 30px',
					maskImage:
						'radial-gradient(ellipse 40% 16% at 50% 15%, black 0%, black 40%, transparent 100%)',
					WebkitMaskImage:
						'radial-gradient(ellipse 40% 16% at 50% 15%, black 0%, black 40%, transparent 100%)',
					opacity: 0.3,
				}}
			/>
		</div>
	);
};



================================================
FILE: apps/docs/components/landing/hero.tsx
================================================
'use client';

import dynamic from 'next/dynamic';
import DemoContainer from './demo';
import { SciFiButton } from './scifi-btn';
import { Spotlight } from './spotlight';

const WorldMap = dynamic(() => import('./map').then((m) => m.WorldMap), {
	ssr: false,
	loading: () => null,
});

export default function Hero() {
	const handleGetStarted = () => {
		const newWindow = window.open(
			'https://app.databuddy.cc/login',
			'_blank',
			'noopener,noreferrer'
		);
		if (
			!newWindow ||
			newWindow.closed ||
			typeof newWindow.closed === 'undefined'
		) {
			// Handle popup blocked case if needed
		}
	};

	return (
		<section className="relative flex min-h-[100svh] w-full flex-col items-center overflow-hidden">
			<Spotlight transform="translateX(-60%) translateY(-50%)" />

			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 items-center gap-8 pt-12 pb-6 sm:pt-16 sm:pb-8 lg:grid-cols-2 lg:gap-12 lg:pt-20 lg:pb-12 xl:gap-16">
					{/* Text Content */}
					<div className="order-2 flex flex-col items-center gap-6 text-center lg:order-1 lg:items-start lg:gap-8 lg:text-left">
						<h1 className="text-balance font-semibold text-3xl leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-[72px]">
							<span className="block whitespace-normal">
								Privacy <span className="text-muted-foreground">first</span>
							</span>
							<span className="block whitespace-normal">
								Analytics for{' '}
								<span className="text-muted-foreground">devs</span>
							</span>
						</h1>

						<p className="max-w-prose text-balance font-medium text-muted-foreground text-sm leading-relaxed tracking-tight sm:text-base lg:text-lg">
							Track users, not identities. Get fast, accurate insights with zero
							cookies and 100% GDPR compliance.
						</p>

						<div className="flex w-full justify-center pt-2 lg:justify-start">
							<SciFiButton
								className="w-full sm:w-auto"
								onClick={handleGetStarted}
							>
								GET STARTED
							</SciFiButton>
						</div>
					</div>

					{/* Map Visualization */}
					<div className="order-1 flex w-full justify-center lg:order-2 lg:justify-end">
						<div className="w-full max-w-lg lg:max-w-none">
							<WorldMap />
						</div>
					</div>
				</div>
			</div>

			{/* Demo Container */}
			<div className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8 lg:pb-12">
				<DemoContainer />
			</div>
		</section>
	);
}



================================================
FILE: apps/docs/components/landing/logo-carousel.tsx
================================================
'use client';

import { AnimatePresence, motion } from 'motion/react';
// import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

// const RE_WWW_PREFIX = /^www\./;

interface Logo {
	id: number;
	name: string;
	src?: string;
}

interface LogoColumnProps {
	logos: Logo[];
	columnIndex: number;
	currentTime: number;
	isLast: boolean;
}

function LogoColumn({
	logos,
	columnIndex,
	currentTime,
	isLast,
}: LogoColumnProps) {
	const CYCLE_DURATION = 2000;
	const columnDelay = columnIndex * 200;
	const adjustedTime =
		(currentTime + columnDelay) % (CYCLE_DURATION * logos.length);
	const currentIndex = Math.floor(adjustedTime / CYCLE_DURATION);
	const currentLogo = logos[currentIndex];

	// const [imgError, setImgError] = useState(false);

	// const getHostnameFromUrl = (url: string): string => {
	// 	try {
	// 		const u = new URL(url);
	// 		return u.hostname.replace(RE_WWW_PREFIX, '');
	// 	} catch {
	// 		return '';
	// 	}
	// };

	// const faviconSrc = currentLogo.src
	// 	? `https://icons.duckduckgo.com/ip3/${getHostnameFromUrl(currentLogo.src)}.ico`
	// 	: '';

	// const showFavicon = Boolean(faviconSrc) && !imgError;

	return (
		<motion.div
			animate={{ opacity: 1, y: 0 }}
			className={`relative h-16 w-40 overflow-hidden ${isLast ? '' : 'border-r'} sm:h-20 md:h-24 md:w-64 lg:w-72`}
			initial={{ opacity: 0, y: 20 }}
			transition={{
				delay: columnIndex * 0.1,
				duration: 0.5,
				ease: [0.25, 0.1, 0.25, 1],
			}}
		>
			<AnimatePresence mode="wait">
				<motion.div
					animate={{
						y: '0%',
						opacity: 1,
						transition: {
							duration: 0.6,
							ease: [0.25, 0.46, 0.45, 0.94],
						},
					}}
					className="absolute inset-0 flex items-center justify-center gap-2"
					exit={{
						y: '-20%',
						filter: 'blur(3px)',
						opacity: 0,
						transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
					}}
					initial={{ y: '10%', opacity: 0 }}
					key={`${currentLogo.id}-${currentIndex}`}
				>
					{/* {showFavicon ? (
						<Image
							alt={`${currentLogo.name} favicon`}
							className="h-6 w-6"
							height={24}
							loading="eager"
							onError={() => setImgError(true)}
							priority
							sizes="24px"
							src={faviconSrc}
							width={24}
						/>
					) : null} */}
					<span className="truncate font-bold text-base sm:text-xl md:text-2xl">
						{currentLogo.name}
					</span>
				</motion.div>
			</AnimatePresence>
		</motion.div>
	);
}

interface LogoCarouselProps {
	columns?: number;
	logos: Logo[];
}

export function LogoCarousel({ columns = 2, logos }: LogoCarouselProps) {
	const [logoColumns, setLogoColumns] = useState<Logo[][]>([]);
	const [time, setTime] = useState(0);

	const distributeLogos = useCallback(
		(logoList: Logo[]) => {
			const shuffled = [...logoList].sort(() => Math.random() - 0.5);
			const result: Logo[][] = Array.from({ length: columns }, () => []);

			shuffled.forEach((logo, index) => {
				result[index % columns].push(logo);
			});

			const maxLength = Math.max(...result.map((col) => col.length));
			for (const col of result) {
				while (col.length < maxLength) {
					col.push(shuffled[Math.floor(Math.random() * shuffled.length)]);
				}
			}

			return result;
		},
		[columns]
	);

	useEffect(() => {
		setLogoColumns(distributeLogos(logos));
	}, [logos, distributeLogos]);

	useEffect(() => {
		const interval = setInterval(() => {
			setTime((prev) => prev + 100);
		}, 100);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="flex justify-center gap-4">
			{logoColumns.map((columnLogos, index) => (
				<LogoColumn
					columnIndex={index}
					currentTime={time}
					isLast={index === logoColumns.length - 1}
					key={`${index}-${columnLogos.map((logo) => logo.id).join('-')}`}
					logos={columnLogos}
				/>
			))}
		</div>
	);
}



================================================
FILE: apps/docs/components/landing/map.tsx
================================================
import Image from 'next/image';

export const WorldMap = () => {
	return (
		<Image
			alt="World map visualization"
			draggable={false}
			height={327}
			priority={true}
			src={'/world.svg'}
			width={559}
		/>
	);
};



================================================
FILE: apps/docs/components/landing/scifi-btn.tsx
================================================
'use client';

import { Slot } from '@radix-ui/react-slot';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SciFiButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	asChild?: boolean;
}

const SciFiButton = forwardRef<HTMLButtonElement, SciFiButtonProps>(
	({ className, asChild = false, children, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';

		return (
			<div className="group relative inline-block">
				<Comp
					className={cn(
						'relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap font-medium text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
						'h-9 rounded px-4 py-2',
						'bg-foreground/5 text-foreground backdrop-blur-[50px]',
						'shadow-[0px_-82px_68px_-109px_inset_rgba(255,255,255,0.3),0px_98px_100px_-170px_inset_rgba(255,255,255,0.6),0px_4px_18px_-8px_inset_rgba(255,255,255,0.6),0px_1px_40px_-14px_inset_rgba(255,255,255,0.3)]',
						'border border-border hover:animate-[borderGlitch_0.6s_ease-in-out]',
						'text-center font-normal tracking-[-0.18px]',
						'active:scale-[0.98]',
						className
					)}
					ref={ref}
					{...(asChild
						? {}
						: {
								type:
									(props as React.ButtonHTMLAttributes<HTMLButtonElement>)
										.type ?? 'button',
							})}
					{...props}
				>
					{children}
				</Comp>

				<div className="pointer-events-none absolute inset-0">
					<div className="absolute top-0 left-0 h-2 w-2 group-hover:animate-[cornerGlitch_0.6s_ease-in-out]">
						<div className="absolute top-0 left-0.5 h-0.5 w-1.5 origin-left bg-foreground" />
						<div className="absolute top-0 left-0 h-2 w-0.5 origin-top bg-foreground" />
					</div>

					<div className="-scale-x-[1] absolute top-0 right-0 h-2 w-2 group-hover:animate-[cornerGlitch_0.6s_ease-in-out]">
						<div className="absolute top-0 left-0.5 h-0.5 w-1.5 origin-left bg-foreground" />
						<div className="absolute top-0 left-0 h-2 w-0.5 origin-top bg-foreground" />
					</div>

					<div className="-scale-y-[1] absolute bottom-0 left-0 h-2 w-2 group-hover:animate-[cornerGlitch_0.6s_ease-in-out]">
						<div className="absolute top-0 left-0.5 h-0.5 w-1.5 origin-left bg-foreground" />
						<div className="absolute top-0 left-0 h-2 w-0.5 origin-top bg-foreground" />
					</div>

					<div className="-scale-[1] absolute right-0 bottom-0 h-2 w-2 group-hover:animate-[cornerGlitch_0.6s_ease-in-out]">
						<div className="absolute top-0 left-0.5 h-0.5 w-1.5 origin-left bg-foreground" />
						<div className="absolute top-0 left-0 h-2 w-0.5 origin-top bg-foreground" />
					</div>
				</div>
			</div>
		);
	}
);

SciFiButton.displayName = 'SciFiButton';

export { SciFiButton };



================================================
FILE: apps/docs/components/landing/section-svg.tsx
================================================
const SectionSvg = ({ crossesOffset }: { crossesOffset?: string }) => {
	return (
		<>
			<PlusSvg
				className={`-top-[0.3125rem] absolute hidden ${
					crossesOffset && crossesOffset
				} pointer-events-none lg:left-[3.6825rem] lg:block`}
			/>

			<PlusSvg
				className={`-top-[0.3125rem] absolute right-[1.4625rem] hidden ${
					crossesOffset && crossesOffset
				} pointer-events-none lg:right-[3.20rem] lg:block`}
			/>
		</>
	);
};

export default SectionSvg;

export const PlusSvg = ({ className = '' }) => {
	return (
		<svg
			aria-label="Plus"
			className={`${className} || ""`}
			fill="none"
			height="11"
			width="11"
		>
			<title>Plus</title>
			<path
				d="M7 1a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1H1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V8a1 1 0 0 1 1-1h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H8a1 1 0 0 1-1-1V1z"
				fill="#878787"
			/>
		</svg>
	);
};



================================================
FILE: apps/docs/components/landing/section.tsx
================================================
import type React from 'react';
import SectionSvg from './section-svg';

const Section = ({
	className,
	id,
	crosses,
	crossesOffset,
	customPaddings,
	children,
}: {
	className?: string;
	id: string;
	crosses?: boolean;
	crossesOffset?: string;
	customPaddings?: boolean;
	children: React.ReactNode;
}) => {
	return (
		<div
			className={`relative w-full ${customPaddings ? '' : 'py-8 sm:py-12 lg:py-16 xl:py-20'} ${className || ''} `}
			id={id}
		>
			{children}

			{/* Left border line - hidden on mobile, visible on larger screens */}
			<div className="pointer-events-none absolute top-0 left-4 hidden h-[calc(100%_+_30px)] w-px bg-stone-200 sm:left-6 lg:left-16 lg:block xl:left-16 dark:bg-border" />

			{/* Right border line - hidden on mobile, visible on larger screens */}
			<div className="pointer-events-none absolute top-0 right-4 hidden h-[calc(100%_+_30px)] w-px bg-stone-200 sm:right-6 lg:right-14 lg:block xl:right-14 dark:bg-border" />

			{crosses && <SectionSvg crossesOffset={crossesOffset} />}
		</div>
	);
};

export default Section;



================================================
FILE: apps/docs/components/landing/spotlight.tsx
================================================
import { cn } from '@/lib/utils';

type SpotlightProps = {
	className?: string;
	fill?: string;
	top?: string;
	left?: string;
	transform?: string;
};

export const Spotlight = ({
	className,
	fill,
	top,
	left,
	transform,
}: SpotlightProps) => {
	return (
		<svg
			className={cn(
				'pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%]',
				className
			)}
			fill="none"
			style={{ top, left, transform }}
			viewBox="0 0 3787 2842"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Decorative spotlight</title>
			<g filter="url(#filter)">
				<ellipse
					cx="1924.71"
					cy="273.501"
					fill={fill || 'currentColor'}
					fillOpacity="0.08"
					rx="1924.71"
					ry="273.501"
					transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
				/>
			</g>
			<defs>
				<filter
					colorInterpolationFilters="sRGB"
					filterUnits="userSpaceOnUse"
					height="2840.26"
					id="filter"
					width="3785.16"
					x="0.860352"
					y="0.838989"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feBlend
						in="SourceGraphic"
						in2="BackgroundImageFix"
						mode="normal"
						result="shape"
					/>
					<feGaussianBlur
						result="effect1_foregroundBlur_1065_8"
						stdDeviation="180"
					/>
				</filter>
			</defs>
		</svg>
	);
};



================================================
FILE: apps/docs/components/landing/testimonials.tsx
================================================
'use client';

// Credits to better-auth for the inspiration

import { XLogoIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import type { ReactElement } from 'react';
import {
	Marquee,
	MarqueeContent,
	MarqueeFade,
	MarqueeItem,
} from '@/components/ui/kibo-ui/marquee';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const testimonials = [
	{
		name: 'Dominik',
		profession: 'Founder, Rivo.gg',
		link: 'https://x.com/DominikDoesDev/status/1929921951000101188',
		description: 'Hands down one of the sexiest analytic tools out there😍',
		avatar: 'dominik.jpg',
		social: null,
	},
	{
		name: 'Bekacru',
		profession: 'Founder, Better-auth',
		description: 'this looks great!',
		avatar: 'bekacru.jpg',
	},
	{
		name: 'John Yeo',
		profession: 'Co-Founder, Autumn',
		description:
			"Actually game changing going from Framer analytics to @trydatabuddy. We're such happy customers.",
		link: 'https://x.com/johnyeo_/status/1945061131342532846',
		social: null,
		avatar:
			'https://pbs.twimg.com/profile_images/1935046528114016256/ZDKw5J0F_400x400.jpg',
	},
	{
		name: 'Axel Wesselgren',
		profession: 'Founder, Stackster',
		description:
			'Who just switched to the best data analytics platform?\n\n Me.',
		link: 'https://x.com/axelwesselgren/status/1936670098884079755',
		social: null,
		avatar:
			'https://pbs.twimg.com/profile_images/1937981565176344576/H-CnDlga_400x400.jpg',
	},
	{
		name: 'Max',
		profession: 'Founder, Pantom Studio',
		description: "won't lie @trydatabuddy is very easy to setup damn",
		link: 'https://x.com/Metagravity0/status/1945592294612017208',
		social: null,
		avatar:
			'https://pbs.twimg.com/profile_images/1929548168317837312/eP97J41s_400x400.jpg',
	},
	{
		name: 'Ahmet Kilinc',
		link: 'https://x.com/bruvimtired/status/1938972393357062401',
		social: null,
		profession: 'Software Engineer, @mail0dotcom',
		description:
			"if you're not using @trydatabuddy then your analytics are going down the drain.",
		avatar: 'ahmet.jpg',
	},
	{
		name: 'Maze',
		profession: 'Founder, OpenCut',
		link: 'https://x.com/mazeincoding/status/1943019005339455631',
		social: null,
		description: '@trydatabuddy is the only analytics i love.',
		avatar: 'maze.jpg',
	},
	{
		name: 'Yassr Atti',
		profession: 'Founder, Call',
		description: 'everything you need for analytics is at @trydatabuddy 🔥',
		link: 'https://x.com/Yassr_Atti/status/1944455392018461107',
		social: null,
		avatar: 'yassr.jpg',
	},
	{
		name: 'Ping Maxwell',
		profession: 'SWE, Better-auth',
		link: 'https://x.com/PingStruggles/status/1944862561935221168',
		social: null,
		description:
			"Databuddy is the only analytics platform I've used that I can genuinely say is actually GDPR compliant, and an absolute beast of a product.  Worth a try!",
		avatar: 'ping.jpg',
	},
	{
		name: 'Fynn',
		profession: 'Founder, Studiis',
		description:
			'it’s actually such a upgrade to switch from posthog to @trydatabuddy',
		link: 'https://x.com/_fqnn_/status/1955577969189306785',
		social: null,
		avatar:
			'https://pbs.twimg.com/profile_images/1419542734482903041/q7f5jbPq_400x400.jpg',
	},
];

function getNameInitial(name: string): string {
	const trimmed = name.trim();
	if (!trimmed) {
		return '?';
	}
	return trimmed.charAt(0).toUpperCase();
}

function TestimonialCardContent({
	testimonial,
}: {
	testimonial: (typeof testimonials)[number];
}): ReactElement {
	const socialIcon = testimonial.link?.includes('x.com') ? (
		<span
			aria-hidden
			className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground"
		>
			<XLogoIcon className="h-5 w-5" weight="duotone" />
		</span>
	) : null;

	return (
		<div className="group relative flex h-[200px] w-[300px] shrink-0 flex-col justify-between rounded border border-border bg-card/70 shadow-inner backdrop-blur-sm transition-all duration-300 hover:border-border/80 hover:shadow-primary/10 sm:h-[220px] sm:w-[350px] lg:h-[240px] lg:w-[400px]">
			<p className="text-pretty px-4 pt-4 font-light text-foreground text-sm leading-relaxed tracking-tight sm:px-5 sm:pt-5 sm:text-base lg:px-6 lg:pt-6 lg:text-base">
				"{testimonial.description}"
			</p>
			<div className="flex h-[65px] w-full items-center gap-1 border-border border-t bg-card/20 sm:h-[70px] lg:h-[75px]">
				<div className="flex w-full items-center gap-3 px-4 py-3 sm:gap-4 sm:px-5 sm:py-4 lg:px-6">
					<Avatar className="h-9 w-9 border border-border sm:h-10 sm:w-10 lg:h-11 lg:w-11">
						<AvatarImage
							src={testimonial.avatar.length > 2 ? testimonial.avatar : ''}
						/>
						<AvatarFallback className="bg-muted text-muted-foreground text-xs sm:text-sm">
							{getNameInitial(testimonial.name)}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-1 flex-col gap-0">
						<h5 className="font-medium text-foreground text-sm sm:text-base lg:text-base">
							{testimonial.name}
						</h5>
						<p className="mt-[-2px] truncate text-muted-foreground text-xs sm:text-sm lg:text-sm">
							{testimonial.profession}
						</p>
					</div>
				</div>
				{socialIcon ? (
					<>
						<div className="h-full w-[1px] bg-border" />
						<div className="flex h-full w-[55px] items-center justify-center sm:w-[65px] lg:w-[75px]">
							{socialIcon}
						</div>
					</>
				) : null}
			</div>

			<div className="pointer-events-none absolute inset-0">
				<div className="absolute top-0 left-0 h-2 w-2">
					<div className="absolute top-0 left-0.5 h-0.5 w-1.5 origin-left bg-foreground" />
					<div className="absolute top-0 left-0 h-2 w-0.5 origin-top bg-foreground" />
				</div>
				<div className="-scale-x-[1] absolute top-0 right-0 h-2 w-2">
					<div className="absolute top-0 left-0.5 h-0.5 w-1.5 origin-left bg-foreground" />
					<div className="absolute top-0 left-0 h-2 w-0.5 origin-top bg-foreground" />
				</div>
				<div className="-scale-y-[1] absolute bottom-0 left-0 h-2 w-2">
					<div className="absolute top-0 left-0.5 h-0.5 w-1.5 origin-left bg-foreground" />
					<div className="absolute top-0 left-0 h-2 w-0.5 origin-top bg-foreground" />
				</div>
				<div className="-scale-[1] absolute right-0 bottom-0 h-2 w-2">
					<div className="absolute top-0 left-0.5 h-0.5 w-1.5 origin-left bg-foreground" />
					<div className="absolute top-0 left-0 h-2 w-0.5 origin-top bg-foreground" />
				</div>
			</div>
		</div>
	);
}

function TestimonialCard({
	testimonial,
}: {
	testimonial: (typeof testimonials)[number];
}): ReactElement {
	if (testimonial.link) {
		return (
			<Link
				className="block"
				href={testimonial.link}
				rel="noopener noreferrer"
				target="_blank"
			>
				<TestimonialCardContent testimonial={testimonial} />
			</Link>
		);
	}

	return <TestimonialCardContent testimonial={testimonial} />;
}

function SlidingTestimonials({
	testimonials: rowTestimonials,
	reverse = false,
}: {
	testimonials: typeof testimonials;
	reverse?: boolean;
}): ReactElement {
	return (
		<Marquee className="relative">
			<MarqueeFade side="left" />
			<MarqueeFade side="right" />
			<MarqueeContent
				direction={reverse ? 'right' : 'left'}
				gradient={false}
				pauseOnClick
				pauseOnHover
				speed={30}
			>
				{rowTestimonials.map((t) => (
					<MarqueeItem key={`${t.name}-${t.profession}${reverse ? '-r' : ''}`}>
						<TestimonialCard testimonial={t} />
					</MarqueeItem>
				))}
			</MarqueeContent>
		</Marquee>
	);
}

export default function Testimonials(): ReactElement {
	return (
		<div className="relative w-full">
			{/* Header Section */}
			<div className="mb-8 px-4 text-center sm:px-6 lg:mb-12 lg:px-8">
				<h2 className="mb-4 font-medium text-2xl leading-tight sm:text-3xl lg:text-4xl xl:text-5xl">
					What developers are saying
				</h2>
				<p className="mx-auto max-w-2xl text-muted-foreground text-sm sm:text-base lg:text-lg">
					Join thousands of developers who trust Databuddy for their analytics
					needs
				</p>
			</div>

			{/* Testimonials Marquee */}
			<div className="flex flex-col gap-4 px-4 sm:px-0 lg:gap-5">
				<SlidingTestimonials
					testimonials={testimonials.slice(
						0,
						Math.floor(testimonials.length / 2)
					)}
				/>
				<SlidingTestimonials
					reverse
					testimonials={testimonials.slice(Math.floor(testimonials.length / 2))}
				/>
			</div>
		</div>
	);
}



================================================
FILE: apps/docs/components/landing/trusted-by.tsx
================================================
'use client';

const logos = [
	{
		id: 1,
		name: 'BETTER-AUTH',
		src: 'https://www.better-auth.com',
		style: 'font-medium font-geist',
	},
	{
		id: 2,
		name: 'Rivo',
		src: 'https://rivo.gg',
		style: 'font-bold font-barlow',
	},
	{
		id: 3,
		name: 'Confinity',
		src: 'https://www.confinity.com',
		style: 'font-semibold',
	},
	{
		id: 4,
		name: 'Autumn',
		src: 'https://useautumn.com',
		style: 'font-bold',
	},
	{
		id: 5,
		name: 'OpenCut',
		src: 'https://opencut.app',
		style: 'font-semibold',
	},
	{
		id: 6,
		name: 'Call',
		src: 'https://joincall.co',
		style: 'font-semibold',
	},
	{
		id: 7,
		name: 'Mail0',
		src: 'https://0.email',
		style: 'font-semibold',
	},
	{
		id: 8,
		name: 'ServerStats',
		src: 'https://serverstats.bot',
		style: 'font-semibold',
	},
	{
		id: 9,
		name: 'xpand',
		src: 'https://xpandconf.com',
		style: 'font-semibold',
	},
	{
		id: 10,
		name: 'oss.now',
		src: 'https://oss.now/',
		style: 'font-semibold',
	},
	{
		id: 11,
		name: 'Terabits',
		src: 'https://www.terabits.xyz',
		style: 'font-semibold',
	},
	{
		id: 12,
		name: 'Dione',
		src: 'https://getdione.app',
		style: 'font-semibold',
	},
	{
		id: 13,
		name: 'Kubiks',
		src: 'https://kubiks.ai/',
		style: 'font-semibold',
	},
	{
		id: 14,
		name: 'Lindra',
		src: 'https://lindra.ai',
		style: 'font-semibold',
	},
	{
		id: 15,
		name: 'Snowseo',
		src: 'https://snowseo.com',
		style: 'font-semibold',
	},
	{
		id: 16,
		name: 'inbound',
		src: 'https://inbound.new/',
		style: 'font-semibold',
	},
];

import { LogoCarousel } from './logo-carousel';

export const TrustedBy = () => {
	return (
		<div className="relative flex h-full w-full flex-col items-center overflow-hidden pt-6 sm:pt-8 lg:flex-row">
			{/* Mobile Layout */}
			<div className="block w-full space-y-8 text-center lg:hidden">
				<h2 className="mx-auto max-w-xs font-medium text-foreground text-xl leading-tight sm:text-2xl">
					Trusted by developers around the world
				</h2>
				<div className="w-full">
					<LogoCarousel logos={logos} />
				</div>
			</div>

			{/* Desktop Layout */}
			<div className="hidden w-full items-center lg:flex">
				<div className="flex h-24 flex-shrink-0 items-center pr-16 md:pr-20 xl:pr-24">
					<h2 className="max-w-xs font-medium text-foreground text-xl leading-tight xl:text-2xl">
						Trusted by developers around the world
					</h2>
				</div>
				<div className="border-l">
					<LogoCarousel logos={logos} />
				</div>
			</div>
		</div>
	);
};



================================================
FILE: apps/docs/components/landing/wordmark.tsx
================================================
'use client';

import {
	animate,
	motion,
	useMotionTemplate,
	useMotionValue,
} from 'motion/react';
import React, { useCallback, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export const Wordmark = () => {
	return (
		<div className="w-full">
			<div className="flex flex-col items-center gap-8 pt-12 lg:gap-12">
				{/* Logo SVG */}
				<div className="flex w-full items-center justify-center overflow-hidden">
					<div className="max-w-full">
						<MagicSVG
							className="h-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl"
							gradientFrom="#5F489D"
							gradientSize={100}
							gradientTo="#EAAEC3"
							height={149}
							strokeColor="#2C2C2C"
							width={1166}
						>
							<defs>
								<mask
									fill="black"
									height="150"
									id="path-1-outside-1_76_6"
									maskUnits="userSpaceOnUse"
									width="1166"
									x="0"
									y="-1"
								>
									<rect fill="white" height="150" width="1166" y="-1" />
									<path d="M1 145V0.999994H46.9C48.1 0.999994 50.4667 1.03333 54 1.1C57.6 1.16666 61.0667 1.39999 64.4 1.8C75.8 3.26666 85.4333 7.33333 93.3 14C101.233 20.6 107.233 29.0333 111.3 39.3C115.367 49.5667 117.4 60.8 117.4 73C117.4 85.2 115.367 96.4333 111.3 106.7C107.233 116.967 101.233 125.433 93.3 132.1C85.4333 138.7 75.8 142.733 64.4 144.2C61.1333 144.6 57.7 144.833 54.1 144.9C50.5 144.967 48.1 145 46.9 145H1ZM25.5 122.3H46.9C48.9 122.3 51.4333 122.233 54.5 122.1C57.6333 121.967 60.4 121.667 62.8 121.2C69.6 119.933 75.1333 116.9 79.4 112.1C83.6667 107.3 86.8 101.467 88.8 94.6C90.8667 87.7333 91.9 80.5333 91.9 73C91.9 65.2 90.8667 57.8667 88.8 51C86.7333 44.1333 83.5333 38.3667 79.2 33.7C74.9333 29.0333 69.4667 26.0667 62.8 24.8C60.4 24.2667 57.6333 23.9667 54.5 23.9C51.4333 23.7667 48.9 23.7 46.9 23.7H25.5V122.3ZM127.133 145L172.533 0.999994H207.833L253.233 145H228.433L187.233 15.8H192.633L151.933 145H127.133ZM152.433 113.8V91.3H228.033V113.8H152.433ZM293.998 145V23.6H247.398V0.999994H364.698V23.6H318.098V145H293.998ZM366.781 145L412.181 0.999994H447.481L492.881 145H468.081L426.881 15.8H432.281L391.581 145H366.781ZM392.081 113.8V91.3H467.681V113.8H392.081ZM510.961 145V0.999994H568.061C577.794 0.999994 585.761 2.96666 591.961 6.9C598.228 10.7667 602.861 15.7333 605.861 21.8C608.928 27.8667 610.461 34.1333 610.461 40.6C610.461 48.5333 608.561 55.2667 604.761 60.8C601.028 66.3333 595.928 70.0667 589.461 72V67C598.528 69.0667 605.394 73.3667 610.061 79.9C614.794 86.4333 617.161 93.8667 617.161 102.2C617.161 110.733 615.528 118.2 612.261 124.6C608.994 131 604.128 136 597.661 139.6C591.261 143.2 583.328 145 573.861 145H510.961ZM535.361 122.3H570.861C575.061 122.3 578.828 121.467 582.161 119.8C585.494 118.067 588.094 115.667 589.961 112.6C591.894 109.467 592.861 105.767 592.861 101.5C592.861 97.6333 592.028 94.1667 590.361 91.1C588.694 88.0333 586.261 85.6 583.061 83.8C579.861 81.9333 576.028 81 571.561 81H535.361V122.3ZM535.361 58.5H567.761C571.228 58.5 574.328 57.8333 577.061 56.5C579.794 55.1667 581.961 53.2 583.561 50.6C585.161 48 585.961 44.8 585.961 41C585.961 36 584.361 31.8333 581.161 28.5C577.961 25.1667 573.494 23.5 567.761 23.5H535.361V58.5ZM695.133 148C683.666 148 673.566 145.667 664.833 141C656.166 136.333 649.366 129.767 644.433 121.3C639.566 112.833 637.133 102.9 637.133 91.5V1.19999L661.533 0.999994V90.9C661.533 96.3 662.433 101.133 664.233 105.4C666.099 109.667 668.599 113.3 671.733 116.3C674.866 119.233 678.466 121.467 682.533 123C686.599 124.533 690.799 125.3 695.133 125.3C699.599 125.3 703.833 124.533 707.833 123C711.899 121.4 715.499 119.133 718.633 116.2C721.766 113.2 724.233 109.567 726.033 105.3C727.833 101.033 728.733 96.2333 728.733 90.9V0.999994H753.133V91.5C753.133 102.9 750.666 112.833 745.733 121.3C740.866 129.767 734.066 136.333 725.333 141C716.666 145.667 706.599 148 695.133 148ZM781.078 145V0.999994H826.978C828.178 0.999994 830.545 1.03333 834.078 1.1C837.678 1.16666 841.145 1.39999 844.478 1.8C855.878 3.26666 865.511 7.33333 873.378 14C881.311 20.6 887.311 29.0333 891.378 39.3C895.445 49.5667 897.478 60.8 897.478 73C897.478 85.2 895.445 96.4333 891.378 106.7C887.311 116.967 881.311 125.433 873.378 132.1C865.511 138.7 855.878 142.733 844.478 144.2C841.211 144.6 837.778 144.833 834.178 144.9C830.578 144.967 828.178 145 826.978 145H781.078ZM805.578 122.3H826.978C828.978 122.3 831.511 122.233 834.578 122.1C837.711 121.967 840.478 121.667 842.878 121.2C849.678 119.933 855.211 116.9 859.478 112.1C863.745 107.3 866.878 101.467 868.878 94.6C870.945 87.7333 871.978 80.5333 871.978 73C871.978 65.2 870.945 57.8667 868.878 51C866.811 44.1333 863.611 38.3667 859.278 33.7C855.011 29.0333 849.545 26.0667 842.878 24.8C840.478 24.2667 837.711 23.9667 834.578 23.9C831.511 23.7667 828.978 23.7 826.978 23.7H805.578V122.3ZM921.117 145V0.999994H967.017C968.217 0.999994 970.584 1.03333 974.117 1.1C977.717 1.16666 981.184 1.39999 984.517 1.8C995.917 3.26666 1005.55 7.33333 1013.42 14C1021.35 20.6 1027.35 29.0333 1031.42 39.3C1035.48 49.5667 1037.52 60.8 1037.52 73C1037.52 85.2 1035.48 96.4333 1031.42 106.7C1027.35 116.967 1021.35 125.433 1013.42 132.1C1005.55 138.7 995.917 142.733 984.517 144.2C981.251 144.6 977.817 144.833 974.217 144.9C970.617 144.967 968.217 145 967.017 145H921.117ZM945.617 122.3H967.017C969.017 122.3 971.551 122.233 974.617 122.1C977.751 121.967 980.517 121.667 982.917 121.2C989.717 119.933 995.251 116.9 999.517 112.1C1003.78 107.3 1006.92 101.467 1008.92 94.6C1010.98 87.7333 1012.02 80.5333 1012.02 73C1012.02 65.2 1010.98 57.8667 1008.92 51C1006.85 44.1333 1003.65 38.3667 999.317 33.7C995.051 29.0333 989.584 26.0667 982.917 24.8C980.517 24.2667 977.751 23.9667 974.617 23.9C971.551 23.7667 969.017 23.7 967.017 23.7H945.617V122.3ZM1090.1 145V86L1041.1 0.999994H1069.2L1102.3 58.4L1135.3 0.999994H1163.4L1114.5 86V145H1090.1Z" />
								</mask>
							</defs>
							<g id="DATABUDDY">
								<path
									d="M1 145H0V146H1V145ZM1 0.999992V-7.62939e-06H0V0.999992H1ZM54 1.1L53.9811 2.09982L53.9815 2.09983L54 1.1ZM64.4 1.8L64.5276 0.808136L64.5191 0.807121L64.4 1.8ZM93.3 14L92.6535 14.7629L92.6605 14.7687L93.3 14ZM111.3 39.3L110.37 39.6683L111.3 39.3ZM111.3 106.7L110.37 106.332L111.3 106.7ZM93.3 132.1L93.9427 132.866L93.9434 132.866L93.3 132.1ZM64.4 144.2L64.5215 145.193L64.5276 145.192L64.4 144.2ZM54.1 144.9L54.0815 143.9L54.1 144.9ZM25.5 122.3H24.5V123.3H25.5V122.3ZM54.5 122.1L54.4575 121.101L54.4566 121.101L54.5 122.1ZM62.8 121.2L62.6169 120.217L62.6091 120.218L62.8 121.2ZM79.4 112.1L78.6526 111.436L79.4 112.1ZM88.8 94.6L87.8424 94.3118L87.8399 94.3204L88.8 94.6ZM88.8 51L87.8424 51.2882L88.8 51ZM79.2 33.7L78.462 34.3748L78.4672 34.3804L79.2 33.7ZM62.8 24.8L62.5831 25.7762L62.5982 25.7795L62.6133 25.7824L62.8 24.8ZM54.5 23.9L54.4566 24.899L54.4676 24.8995L54.4787 24.8998L54.5 23.9ZM25.5 23.7V22.7H24.5V23.7H25.5ZM1 145H2V0.999992H1H0V145H1ZM1 0.999992V1.99999H46.9V0.999992V-7.62939e-06H1V0.999992ZM46.9 0.999992V1.99999C48.089 1.99999 50.4464 2.03313 53.9811 2.09982L54 1.1L54.0189 0.100174C50.487 0.0335312 48.111 -7.62939e-06 46.9 -7.62939e-06V0.999992ZM54 1.1L53.9815 2.09983C57.5502 2.16591 60.9832 2.39716 64.2809 2.79287L64.4 1.8L64.5191 0.807121C61.1501 0.402832 57.6498 0.167412 54.0185 0.100174L54 1.1ZM64.4 1.8L64.2724 2.79182C75.5037 4.23678 84.9506 8.23503 92.6535 14.7629L93.3 14L93.9465 13.2371C85.9161 6.43162 76.0963 2.29654 64.5276 0.808174L64.4 1.8ZM93.3 14L92.6605 14.7687C100.456 21.2542 106.361 29.546 110.37 39.6683L111.3 39.3L112.23 38.9317C108.106 28.5206 102.011 19.9458 93.9396 13.2312L93.3 14ZM111.3 39.3L110.37 39.6683C114.386 49.806 116.4 60.9129 116.4 73H117.4H118.4C118.4 60.6871 116.347 49.3273 112.23 38.9317L111.3 39.3ZM117.4 73H116.4C116.4 85.0871 114.386 96.194 110.37 106.332L111.3 106.7L112.23 107.068C116.347 96.6727 118.4 85.3129 118.4 73H117.4ZM111.3 106.7L110.37 106.332C106.361 116.455 100.455 124.781 92.6567 131.334L93.3 132.1L93.9434 132.866C102.012 126.085 108.106 117.479 112.23 107.068L111.3 106.7ZM93.3 132.1L92.6573 131.334C84.9542 137.797 75.506 141.763 64.2724 143.208L64.4 144.2L64.5276 145.192C76.094 143.704 85.9124 139.603 93.9427 132.866L93.3 132.1ZM64.4 144.2L64.2785 143.207C61.049 143.603 57.6502 143.834 54.0815 143.9L54.1 144.9L54.1185 145.9C57.7498 145.833 61.2177 145.597 64.5215 145.193L64.4 144.2ZM54.1 144.9L54.0815 143.9C50.4799 143.967 48.0892 144 46.9 144V145V146C48.1108 146 50.5201 145.966 54.1185 145.9L54.1 144.9ZM46.9 145V144H1V145V146H46.9V145ZM25.5 122.3V123.3H46.9V122.3V121.3H25.5V122.3ZM46.9 122.3V123.3C48.92 123.3 51.4691 123.233 54.5434 123.099L54.5 122.1L54.4566 121.101C51.3976 121.234 48.88 121.3 46.9 121.3V122.3ZM54.5 122.1L54.5425 123.099C57.7125 122.964 60.5305 122.66 62.9909 122.182L62.8 121.2L62.6091 120.218C60.2695 120.673 57.5542 120.969 54.4575 121.101L54.5 122.1ZM62.8 121.2L62.9831 122.183C69.9835 120.879 75.7216 117.743 80.1474 112.764L79.4 112.1L78.6526 111.436C74.5451 116.057 69.2165 118.988 62.6169 120.217L62.8 121.2ZM79.4 112.1L80.1474 112.764C84.5233 107.841 87.7234 101.872 89.7601 94.8796L88.8 94.6L87.8399 94.3204C85.8766 101.061 82.81 106.759 78.6526 111.436L79.4 112.1ZM88.8 94.6L89.7576 94.8882C91.8538 87.9234 92.9 80.626 92.9 73H91.9H90.9C90.9 80.4407 89.8796 87.5432 87.8424 94.3118L88.8 94.6ZM91.9 73H92.9C92.9 65.1109 91.8547 57.6798 89.7576 50.7118L88.8 51L87.8424 51.2882C89.8786 58.0536 90.9 65.2891 90.9 73H91.9ZM88.8 51L89.7576 50.7118C87.6525 43.7175 84.3824 37.8115 79.9328 33.0195L79.2 33.7L78.4672 34.3804C82.6842 38.9218 85.8142 44.5492 87.8424 51.2882L88.8 51ZM79.2 33.7L79.938 33.0252C75.5147 28.1872 69.849 25.1214 62.9867 23.8176L62.8 24.8L62.6133 25.7824C69.0843 27.0119 74.352 29.8795 78.462 34.3748L79.2 33.7ZM62.8 24.8L63.0169 23.8238C60.538 23.2729 57.7035 22.9679 54.5213 22.9002L54.5 23.9L54.4787 24.8998C57.5632 24.9654 60.2621 25.2604 62.5831 25.7762L62.8 24.8ZM54.5 23.9L54.5434 22.9009C51.4691 22.7673 48.92 22.7 46.9 22.7V23.7V24.7C48.8801 24.7 51.3976 24.7661 54.4566 24.899L54.5 23.9ZM46.9 23.7V22.7H25.5V23.7V24.7H46.9V23.7ZM25.5 23.7H24.5V122.3H25.5H26.5V23.7H25.5ZM127.133 145L126.179 144.699L125.769 146H127.133V145ZM172.533 0.999992V-7.62939e-06H171.8L171.579 0.69931L172.533 0.999992ZM207.833 0.999992L208.787 0.69931L208.566 -7.62939e-06H207.833V0.999992ZM253.233 145V146H254.597L254.187 144.699L253.233 145ZM228.433 145L227.48 145.304L227.702 146H228.433V145ZM187.233 15.8V14.8H185.864L186.28 16.1038L187.233 15.8ZM192.633 15.8L193.587 16.1005L193.996 14.8H192.633V15.8ZM151.933 145V146H152.666L152.887 145.3L151.933 145ZM152.433 113.8H151.433V114.8H152.433V113.8ZM152.433 91.3V90.3H151.433V91.3H152.433ZM228.033 91.3H229.033V90.3H228.033V91.3ZM228.033 113.8V114.8H229.033V113.8H228.033ZM127.133 145L128.087 145.301L173.487 1.30068L172.533 0.999992L171.579 0.69931L126.179 144.699L127.133 145ZM172.533 0.999992V1.99999H207.833V0.999992V-7.62939e-06H172.533V0.999992ZM207.833 0.999992L206.879 1.30068L252.279 145.301L253.233 145L254.187 144.699L208.787 0.69931L207.833 0.999992ZM253.233 145V144H228.433V145V146H253.233V145ZM228.433 145L229.386 144.696L188.186 15.4962L187.233 15.8L186.28 16.1038L227.48 145.304L228.433 145ZM187.233 15.8V16.8H192.633V15.8V14.8H187.233V15.8ZM192.633 15.8L191.679 15.4995L150.979 144.7L151.933 145L152.887 145.3L193.587 16.1005L192.633 15.8ZM151.933 145V144H127.133V145V146H151.933V145ZM152.433 113.8H153.433V91.3H152.433H151.433V113.8H152.433ZM152.433 91.3V92.3H228.033V91.3V90.3H152.433V91.3ZM228.033 91.3H227.033V113.8H228.033H229.033V91.3H228.033ZM228.033 113.8V112.8H152.433V113.8V114.8H228.033V113.8ZM293.998 145H292.998V146H293.998V145ZM293.998 23.6H294.998V22.6H293.998V23.6ZM247.398 23.6H246.398V24.6H247.398V23.6ZM247.398 0.999992V-7.62939e-06H246.398V0.999992H247.398ZM364.698 0.999992H365.698V-7.62939e-06H364.698V0.999992ZM364.698 23.6V24.6H365.698V23.6H364.698ZM318.098 23.6V22.6H317.098V23.6H318.098ZM318.098 145V146H319.098V145H318.098ZM293.998 145H294.998V23.6H293.998H292.998V145H293.998ZM293.998 23.6V22.6H247.398V23.6V24.6H293.998V23.6ZM247.398 23.6H248.398V0.999992H247.398H246.398V23.6H247.398ZM247.398 0.999992V1.99999H364.698V0.999992V-7.62939e-06H247.398V0.999992ZM364.698 0.999992H363.698V23.6H364.698H365.698V0.999992H364.698ZM364.698 23.6V22.6H318.098V23.6V24.6H364.698V23.6ZM318.098 23.6H317.098V145H318.098H319.098V23.6H318.098ZM318.098 145V144H293.998V145V146H318.098V145ZM366.781 145L365.828 144.699L365.417 146H366.781V145ZM412.181 0.999992V-7.62939e-06H411.448L411.228 0.69931L412.181 0.999992ZM447.481 0.999992L448.435 0.69931L448.215 -7.62939e-06H447.481V0.999992ZM492.881 145V146H494.245L493.835 144.699L492.881 145ZM468.081 145L467.129 145.304L467.351 146H468.081V145ZM426.881 15.8V14.8H425.513L425.929 16.1038L426.881 15.8ZM432.281 15.8L433.235 16.1005L433.645 14.8H432.281V15.8ZM391.581 145V146H392.315L392.535 145.3L391.581 145ZM392.081 113.8H391.081V114.8H392.081V113.8ZM392.081 91.3V90.3H391.081V91.3H392.081ZM467.681 91.3H468.681V90.3H467.681V91.3ZM467.681 113.8V114.8H468.681V113.8H467.681ZM366.781 145L367.735 145.301L413.135 1.30068L412.181 0.999992L411.228 0.69931L365.828 144.699L366.781 145ZM412.181 0.999992V1.99999H447.481V0.999992V-7.62939e-06H412.181V0.999992ZM447.481 0.999992L446.528 1.30068L491.928 145.301L492.881 145L493.835 144.699L448.435 0.69931L447.481 0.999992ZM492.881 145V144H468.081V145V146H492.881V145ZM468.081 145L469.034 144.696L427.834 15.4962L426.881 15.8L425.929 16.1038L467.129 145.304L468.081 145ZM426.881 15.8V16.8H432.281V15.8V14.8H426.881V15.8ZM432.281 15.8L431.327 15.4995L390.627 144.7L391.581 145L392.535 145.3L433.235 16.1005L432.281 15.8ZM391.581 145V144H366.781V145V146H391.581V145ZM392.081 113.8H393.081V91.3H392.081H391.081V113.8H392.081ZM392.081 91.3V92.3H467.681V91.3V90.3H392.081V91.3ZM467.681 91.3H466.681V113.8H467.681H468.681V91.3H467.681ZM467.681 113.8V112.8H392.081V113.8V114.8H467.681V113.8ZM510.961 145H509.961V146H510.961V145ZM510.961 0.999992V-7.62939e-06H509.961V0.999992H510.961ZM591.961 6.89999L591.425 7.74447L591.436 7.75103L591.961 6.89999ZM605.861 21.8L604.965 22.2433L604.969 22.2511L605.861 21.8ZM604.761 60.8L603.937 60.2339L603.932 60.2407L604.761 60.8ZM589.461 72H588.461V73.3427L589.747 72.9581L589.461 72ZM589.461 67L589.683 66.025L588.461 65.7464V67H589.461ZM610.061 79.9L609.247 80.4812L609.251 80.4867L610.061 79.9ZM612.261 124.6L611.37 124.145L612.261 124.6ZM597.661 139.6L597.175 138.726L597.171 138.728L597.661 139.6ZM535.361 122.3H534.361V123.3H535.361V122.3ZM582.161 119.8L582.608 120.694L582.615 120.691L582.622 120.687L582.161 119.8ZM589.961 112.6L589.11 112.075L589.107 112.08L589.961 112.6ZM590.361 91.1L589.482 91.5775L590.361 91.1ZM583.061 83.8L582.557 84.6638L582.564 84.6677L582.571 84.6716L583.061 83.8ZM535.361 81V80H534.361V81H535.361ZM535.361 58.5H534.361V59.5H535.361V58.5ZM583.561 50.6L582.709 50.0759L583.561 50.6ZM581.161 28.5L581.882 27.8075L581.161 28.5ZM535.361 23.5V22.5H534.361V23.5H535.361ZM510.961 145H511.961V0.999992H510.961H509.961V145H510.961ZM510.961 0.999992V1.99999H568.061V0.999992V-7.62939e-06H510.961V0.999992ZM568.061 0.999992V1.99999C577.665 1.99999 585.43 3.9408 591.425 7.74441L591.961 6.89999L592.497 6.05559C586.092 1.99252 577.924 -7.62939e-06 568.061 -7.62939e-06V0.999992ZM591.961 6.89999L591.436 7.75103C597.558 11.5283 602.055 16.3593 604.965 22.2433L605.861 21.8L606.757 21.3567C603.667 15.1073 598.898 10.0051 592.486 6.04896L591.961 6.89999ZM605.861 21.8L604.969 22.2511C607.968 28.1853 609.461 34.2981 609.461 40.6H610.461H611.461C611.461 33.9686 609.887 27.548 606.753 21.3489L605.861 21.8ZM610.461 40.6H609.461C609.461 48.3688 607.603 54.8957 603.937 60.2339L604.761 60.8L605.585 61.3661C609.519 55.6376 611.461 48.6978 611.461 40.6H610.461ZM604.761 60.8L603.932 60.2407C600.33 65.58 595.422 69.174 589.174 71.0419L589.461 72L589.747 72.9581C596.433 70.9594 601.726 67.0866 605.59 61.3593L604.761 60.8ZM589.461 72H590.461V67H589.461H588.461V72H589.461ZM589.461 67L589.239 67.975C598.107 69.9964 604.745 74.1783 609.247 80.4812L610.061 79.9L610.875 79.3188C606.043 72.555 598.948 68.1369 589.683 66.025L589.461 67ZM610.061 79.9L609.251 80.4867C613.857 86.8435 616.161 94.07 616.161 102.2H617.161H618.161C618.161 93.6634 615.732 86.0232 610.871 79.3133L610.061 79.9ZM617.161 102.2H616.161C616.161 110.605 614.553 117.91 611.37 124.145L612.261 124.6L613.152 125.055C616.502 118.49 618.161 110.862 618.161 102.2H617.161ZM612.261 124.6L611.37 124.145C608.197 130.363 603.473 135.22 597.175 138.726L597.661 139.6L598.147 140.474C604.782 136.78 609.792 131.637 613.152 125.055L612.261 124.6ZM597.661 139.6L597.171 138.728C590.958 142.223 583.204 144 573.861 144V145V146C583.451 146 591.564 144.177 598.151 140.472L597.661 139.6ZM573.861 145V144H510.961V145V146H573.861V145ZM535.361 122.3V123.3H570.861V122.3V121.3H535.361V122.3ZM570.861 122.3V123.3C575.196 123.3 579.119 122.439 582.608 120.694L582.161 119.8L581.714 118.906C578.536 120.494 574.926 121.3 570.861 121.3V122.3ZM582.161 119.8L582.622 120.687C586.11 118.874 588.849 116.35 590.815 113.12L589.961 112.6L589.107 112.08C587.34 114.983 584.879 117.26 581.7 118.913L582.161 119.8ZM589.961 112.6L590.812 113.125C592.857 109.81 593.861 105.922 593.861 101.5H592.861H591.861C591.861 105.611 590.931 109.123 589.11 112.075L589.961 112.6ZM592.861 101.5H593.861C593.861 97.4849 592.994 93.851 591.24 90.6225L590.361 91.1L589.482 91.5775C591.061 94.4823 591.861 97.7818 591.861 101.5H592.861ZM590.361 91.1L591.24 90.6225C589.478 87.3818 586.906 84.8156 583.551 82.9284L583.061 83.8L582.571 84.6716C585.616 86.3844 587.91 88.6849 589.482 91.5775L590.361 91.1ZM583.061 83.8L583.565 82.9362C580.183 80.9636 576.168 80 571.561 80V81V82C575.887 82 579.539 82.903 582.557 84.6638L583.061 83.8ZM571.561 81V80H535.361V81V82H571.561V81ZM535.361 81H534.361V122.3H535.361H536.361V81H535.361ZM535.361 58.5V59.5H567.761V58.5V57.5H535.361V58.5ZM567.761 58.5V59.5C571.358 59.5 574.612 58.8075 577.499 57.3988L577.061 56.5L576.622 55.6012C574.044 56.8592 571.097 57.5 567.761 57.5V58.5ZM577.061 56.5L577.499 57.3988C580.404 55.9819 582.714 53.885 584.413 51.1241L583.561 50.6L582.709 50.0759C581.208 52.515 579.185 54.3514 576.622 55.6012L577.061 56.5ZM583.561 50.6L584.413 51.1241C586.131 48.3321 586.961 44.94 586.961 41H585.961H584.961C584.961 44.66 584.191 47.6679 582.709 50.0759L583.561 50.6ZM585.961 41H586.961C586.961 35.7651 585.277 31.3431 581.882 27.8075L581.161 28.5L580.44 29.1925C583.445 32.3235 584.961 36.2349 584.961 41H585.961ZM581.161 28.5L581.882 27.8075C578.45 24.2324 573.697 22.5 567.761 22.5V23.5V24.5C573.292 24.5 577.472 26.1009 580.44 29.1925L581.161 28.5ZM567.761 23.5V22.5H535.361V23.5V24.5H567.761V23.5ZM535.361 23.5H534.361V58.5H535.361H536.361V23.5H535.361ZM664.833 141L664.359 141.88L664.362 141.882L664.833 141ZM644.433 121.3L643.566 121.798L643.569 121.803L644.433 121.3ZM637.133 1.19999L637.125 0.200027L636.133 0.208153V1.19999H637.133ZM661.533 0.999992H662.533V-0.00823212L661.525 3.05176e-05L661.533 0.999992ZM664.233 105.4L663.311 105.789L663.317 105.801L664.233 105.4ZM671.733 116.3L671.041 117.022L671.049 117.03L671.733 116.3ZM707.833 123L708.191 123.934L708.199 123.931L707.833 123ZM718.633 116.2L719.316 116.93L719.324 116.922L718.633 116.2ZM728.733 0.999992V-7.62939e-06H727.733V0.999992H728.733ZM753.133 0.999992H754.133V-7.62939e-06H753.133V0.999992ZM745.733 121.3L744.869 120.797L744.866 120.802L745.733 121.3ZM725.333 141L724.862 140.118L724.859 140.12L725.333 141ZM695.133 148V147C683.804 147 673.871 144.696 665.304 140.118L664.833 141L664.362 141.882C673.261 146.638 683.528 149 695.133 149V148ZM664.833 141L665.307 140.12C656.802 135.54 650.137 129.103 645.297 120.797L644.433 121.3L643.569 121.803C648.595 130.43 655.531 137.127 664.359 141.88L664.833 141ZM644.433 121.3L645.3 120.802C640.534 112.51 638.133 102.755 638.133 91.5H637.133H636.133C636.133 103.045 638.598 113.156 643.566 121.798L644.433 121.3ZM637.133 91.5H638.133V1.19999H637.133H636.133V91.5H637.133ZM637.133 1.19999L637.141 2.19996L661.541 1.99996L661.533 0.999992L661.525 3.05176e-05L637.125 0.200027L637.133 1.19999ZM661.533 0.999992H660.533V90.9H661.533H662.533V0.999992H661.533ZM661.533 90.9H660.533C660.533 96.4116 661.452 101.38 663.311 105.789L664.233 105.4L665.154 105.011C663.414 100.886 662.533 96.1884 662.533 90.9H661.533ZM664.233 105.4L663.317 105.801C665.232 110.179 667.806 113.924 671.041 117.022L671.733 116.3L672.424 115.578C669.393 112.676 666.967 109.154 665.149 104.999L664.233 105.4ZM671.733 116.3L671.049 117.03C674.28 120.054 677.992 122.357 682.18 123.936L682.533 123L682.886 122.064C678.94 120.577 675.453 118.413 672.416 115.57L671.733 116.3ZM682.533 123L682.18 123.936C686.359 125.511 690.679 126.3 695.133 126.3V125.3V124.3C690.92 124.3 686.84 123.555 682.886 122.064L682.533 123ZM695.133 125.3V126.3C699.717 126.3 704.072 125.513 708.191 123.934L707.833 123L707.475 122.066C703.594 123.554 699.482 124.3 695.133 124.3V125.3ZM707.833 123L708.199 123.931C712.381 122.285 716.089 119.951 719.316 116.93L718.633 116.2L717.949 115.47C714.91 118.315 711.418 120.515 707.467 122.069L707.833 123ZM718.633 116.2L719.324 116.922C722.563 113.822 725.105 110.072 726.954 105.689L726.033 105.3L725.111 104.911C723.361 109.061 720.969 112.578 717.941 115.478L718.633 116.2ZM726.033 105.3L726.954 105.689C728.813 101.282 729.733 96.3468 729.733 90.9H728.733H727.733C727.733 96.1199 726.852 100.785 725.111 104.911L726.033 105.3ZM728.733 90.9H729.733V0.999992H728.733H727.733V90.9H728.733ZM728.733 0.999992V1.99999H753.133V0.999992V-7.62939e-06H728.733V0.999992ZM753.133 0.999992H752.133V91.5H753.133H754.133V0.999992H753.133ZM753.133 91.5H752.133C752.133 102.752 749.699 112.506 744.869 120.797L745.733 121.3L746.597 121.803C751.633 113.161 754.133 103.048 754.133 91.5H753.133ZM745.733 121.3L744.866 120.802C740.094 129.104 733.432 135.538 724.862 140.118L725.333 141L725.804 141.882C734.7 137.128 741.638 130.43 746.6 121.798L745.733 121.3ZM725.333 141L724.859 140.12C716.36 144.696 706.461 147 695.133 147V148V149C706.738 149 716.972 146.638 725.807 141.88L725.333 141ZM781.078 145H780.078V146H781.078V145ZM781.078 0.999992V-7.62939e-06H780.078V0.999992H781.078ZM834.078 1.1L834.059 2.09982L834.06 2.09983L834.078 1.1ZM844.478 1.8L844.606 0.808136L844.597 0.807121L844.478 1.8ZM873.378 14L872.732 14.7629L872.739 14.7687L873.378 14ZM891.378 39.3L890.448 39.6683L891.378 39.3ZM891.378 106.7L890.448 106.332L891.378 106.7ZM873.378 132.1L874.021 132.866L874.021 132.866L873.378 132.1ZM844.478 144.2L844.6 145.193L844.606 145.192L844.478 144.2ZM834.178 144.9L834.16 143.9L834.178 144.9ZM805.578 122.3H804.578V123.3H805.578V122.3ZM834.578 122.1L834.536 121.101L834.535 121.101L834.578 122.1ZM842.878 121.2L842.695 120.217L842.687 120.218L842.878 121.2ZM859.478 112.1L858.731 111.436L859.478 112.1ZM868.878 94.6L867.921 94.3118L867.918 94.3204L868.878 94.6ZM868.878 51L867.921 51.2882L868.878 51ZM859.278 33.7L858.54 34.3748L858.545 34.3804L859.278 33.7ZM842.878 24.8L842.661 25.7762L842.676 25.7795L842.691 25.7824L842.878 24.8ZM834.578 23.9L834.535 24.899L834.546 24.8995L834.557 24.8998L834.578 23.9ZM805.578 23.7V22.7H804.578V23.7H805.578ZM781.078 145H782.078V0.999992H781.078H780.078V145H781.078ZM781.078 0.999992V1.99999H826.978V0.999992V-7.62939e-06H781.078V0.999992ZM826.978 0.999992V1.99999C828.167 1.99999 830.524 2.03313 834.059 2.09982L834.078 1.1L834.097 0.100174C830.565 0.0335312 828.189 -7.62939e-06 826.978 -7.62939e-06V0.999992ZM834.078 1.1L834.06 2.09983C837.628 2.16591 841.061 2.39716 844.359 2.79287L844.478 1.8L844.597 0.807121C841.228 0.402832 837.728 0.167412 834.097 0.100174L834.078 1.1ZM844.478 1.8L844.351 2.79182C855.582 4.23678 865.029 8.23503 872.732 14.7629L873.378 14L874.025 13.2371C865.994 6.43162 856.174 2.29654 844.606 0.808174L844.478 1.8ZM873.378 14L872.739 14.7687C880.534 21.2542 886.439 29.546 890.448 39.6683L891.378 39.3L892.308 38.9317C888.184 28.5206 882.089 19.9458 874.018 13.2312L873.378 14ZM891.378 39.3L890.448 39.6683C894.464 49.806 896.478 60.9129 896.478 73H897.478H898.478C898.478 60.6871 896.426 49.3273 892.308 38.9317L891.378 39.3ZM897.478 73H896.478C896.478 85.0871 894.464 96.194 890.448 106.332L891.378 106.7L892.308 107.068C896.426 96.6727 898.478 85.3129 898.478 73H897.478ZM891.378 106.7L890.448 106.332C886.439 116.455 880.533 124.781 872.735 131.334L873.378 132.1L874.021 132.866C882.09 126.085 888.184 117.479 892.308 107.068L891.378 106.7ZM873.378 132.1L872.735 131.334C865.032 137.797 855.584 141.763 844.351 143.208L844.478 144.2L844.606 145.192C856.172 143.704 865.991 139.603 874.021 132.866L873.378 132.1ZM844.478 144.2L844.357 143.207C841.127 143.603 837.728 143.834 834.16 143.9L834.178 144.9L834.197 145.9C837.828 145.833 841.296 145.597 844.6 145.193L844.478 144.2ZM834.178 144.9L834.16 143.9C830.558 143.967 828.167 144 826.978 144V145V146C828.189 146 830.598 145.966 834.197 145.9L834.178 144.9ZM826.978 145V144H781.078V145V146H826.978V145ZM805.578 122.3V123.3H826.978V122.3V121.3H805.578V122.3ZM826.978 122.3V123.3C828.998 123.3 831.547 123.233 834.622 123.099L834.578 122.1L834.535 121.101C831.476 121.234 828.958 121.3 826.978 121.3V122.3ZM834.578 122.1L834.621 123.099C837.791 122.964 840.609 122.66 843.069 122.182L842.878 121.2L842.687 120.218C840.348 120.673 837.632 120.969 834.536 121.101L834.578 122.1ZM842.878 121.2L843.061 122.183C850.062 120.879 855.8 117.743 860.226 112.764L859.478 112.1L858.731 111.436C854.623 116.057 849.295 118.988 842.695 120.217L842.878 121.2ZM859.478 112.1L860.226 112.764C864.601 107.841 867.802 101.872 869.838 94.8796L868.878 94.6L867.918 94.3204C865.955 101.061 862.888 106.759 858.731 111.436L859.478 112.1ZM868.878 94.6L869.836 94.8882C871.932 87.9234 872.978 80.626 872.978 73H871.978H870.978C870.978 80.4407 869.958 87.5432 867.921 94.3118L868.878 94.6ZM871.978 73H872.978C872.978 65.1109 871.933 57.6798 869.836 50.7118L868.878 51L867.921 51.2882C869.957 58.0536 870.978 65.2891 870.978 73H871.978ZM868.878 51L869.836 50.7118C867.731 43.7175 864.461 37.8115 860.011 33.0195L859.278 33.7L858.545 34.3804C862.762 38.9218 865.892 44.5492 867.921 51.2882L868.878 51ZM859.278 33.7L860.016 33.0252C855.593 28.1872 849.927 25.1214 843.065 23.8176L842.878 24.8L842.691 25.7824C849.162 27.0119 854.43 29.8795 858.54 34.3748L859.278 33.7ZM842.878 24.8L843.095 23.8238C840.616 23.2729 837.782 22.9679 834.599 22.9002L834.578 23.9L834.557 24.8998C837.641 24.9654 840.34 25.2604 842.661 25.7762L842.878 24.8ZM834.578 23.9L834.622 22.9009C831.547 22.7673 828.998 22.7 826.978 22.7V23.7V24.7C828.958 24.7 831.476 24.7661 834.535 24.899L834.578 23.9ZM826.978 23.7V22.7H805.578V23.7V24.7H826.978V23.7ZM805.578 23.7H804.578V122.3H805.578H806.578V23.7H805.578ZM921.117 145H920.117V146H921.117V145ZM921.117 0.999992V-7.62939e-06H920.117V0.999992H921.117ZM974.117 1.1L974.098 2.09982L974.099 2.09983L974.117 1.1ZM984.517 1.8L984.645 0.808136L984.636 0.807121L984.517 1.8ZM1013.42 14L1012.77 14.7629L1012.78 14.7687L1013.42 14ZM1031.42 39.3L1030.49 39.6683L1031.42 39.3ZM1031.42 106.7L1030.49 106.332L1031.42 106.7ZM1013.42 132.1L1014.06 132.866L1014.06 132.866L1013.42 132.1ZM984.517 144.2L984.639 145.193L984.645 145.192L984.517 144.2ZM974.217 144.9L974.199 143.9L974.217 144.9ZM945.617 122.3H944.617V123.3H945.617V122.3ZM974.617 122.1L974.575 121.101L974.574 121.101L974.617 122.1ZM982.917 121.2L982.734 120.217L982.726 120.218L982.917 121.2ZM999.517 112.1L998.77 111.436L999.517 112.1ZM1008.92 94.6L1007.96 94.3118L1007.96 94.3204L1008.92 94.6ZM1008.92 51L1007.96 51.2882L1008.92 51ZM999.317 33.7L998.579 34.3748L998.584 34.3804L999.317 33.7ZM982.917 24.8L982.7 25.7762L982.715 25.7795L982.731 25.7824L982.917 24.8ZM974.617 23.9L974.574 24.899L974.585 24.8995L974.596 24.8998L974.617 23.9ZM945.617 23.7V22.7H944.617V23.7H945.617ZM921.117 145H922.117V0.999992H921.117H920.117V145H921.117ZM921.117 0.999992V1.99999H967.017V0.999992V-7.62939e-06H921.117V0.999992ZM967.017 0.999992V1.99999C968.206 1.99999 970.564 2.03313 974.098 2.09982L974.117 1.1L974.136 0.100174C970.604 0.0335312 968.228 -7.62939e-06 967.017 -7.62939e-06V0.999992ZM974.117 1.1L974.099 2.09983C977.667 2.16591 981.1 2.39716 984.398 2.79287L984.517 1.8L984.636 0.807121C981.267 0.402832 977.767 0.167412 974.136 0.100174L974.117 1.1ZM984.517 1.8L984.39 2.79182C995.621 4.23678 1005.07 8.23503 1012.77 14.7629L1013.42 14L1014.06 13.2371C1006.03 6.43162 996.214 2.29654 984.645 0.808174L984.517 1.8ZM1013.42 14L1012.78 14.7687C1020.57 21.2542 1026.48 29.546 1030.49 39.6683L1031.42 39.3L1032.35 38.9317C1028.22 28.5206 1022.13 19.9458 1014.06 13.2312L1013.42 14ZM1031.42 39.3L1030.49 39.6683C1034.5 49.806 1036.52 60.9129 1036.52 73H1037.52H1038.52C1038.52 60.6871 1036.46 49.3273 1032.35 38.9317L1031.42 39.3ZM1037.52 73H1036.52C1036.52 85.0871 1034.5 96.194 1030.49 106.332L1031.42 106.7L1032.35 107.068C1036.46 96.6727 1038.52 85.3129 1038.52 73H1037.52ZM1031.42 106.7L1030.49 106.332C1026.48 116.455 1020.57 124.781 1012.77 131.334L1013.42 132.1L1014.06 132.866C1022.13 126.085 1028.22 117.479 1032.35 107.068L1031.42 106.7ZM1013.42 132.1L1012.77 131.334C1005.07 137.797 995.623 141.763 984.39 143.208L984.517 144.2L984.645 145.192C996.211 143.704 1006.03 139.603 1014.06 132.866L1013.42 132.1ZM984.517 144.2L984.396 143.207C981.166 143.603 977.767 143.834 974.199 143.9L974.217 144.9L974.236 145.9C977.867 145.833 981.335 145.597 984.639 145.193L984.517 144.2ZM974.217 144.9L974.199 143.9C970.597 143.967 968.206 144 967.017 144V145V146C968.228 146 970.637 145.966 974.236 145.9L974.217 144.9ZM967.017 145V144H921.117V145V146H967.017V145ZM945.617 122.3V123.3H967.017V122.3V121.3H945.617V122.3ZM967.017 122.3V123.3C969.037 123.3 971.586 123.233 974.661 123.099L974.617 122.1L974.574 121.101C971.515 121.234 968.997 121.3 967.017 121.3V122.3ZM974.617 122.1L974.66 123.099C977.83 122.964 980.648 122.66 983.108 122.182L982.917 121.2L982.726 120.218C980.387 120.673 977.671 120.969 974.575 121.101L974.617 122.1ZM982.917 121.2L983.1 122.183C990.101 120.879 995.839 117.743 1000.26 112.764L999.517 112.1L998.77 111.436C994.662 116.057 989.334 118.988 982.734 120.217L982.917 121.2ZM999.517 112.1L1000.26 112.764C1004.64 107.841 1007.84 101.872 1009.88 94.8796L1008.92 94.6L1007.96 94.3204C1005.99 101.061 1002.93 106.759 998.77 111.436L999.517 112.1ZM1008.92 94.6L1009.87 94.8882C1011.97 87.9234 1013.02 80.626 1013.02 73H1012.02H1011.02C1011.02 80.4407 1010 87.5432 1007.96 94.3118L1008.92 94.6ZM1012.02 73H1013.02C1013.02 65.1109 1011.97 57.6798 1009.87 50.7118L1008.92 51L1007.96 51.2882C1010 58.0536 1011.02 65.2891 1011.02 73H1012.02ZM1008.92 51L1009.87 50.7118C1007.77 43.7175 1004.5 37.8115 1000.05 33.0195L999.317 33.7L998.584 34.3804C1002.8 38.9218 1005.93 44.5492 1007.96 51.2882L1008.92 51ZM999.317 33.7L1000.06 33.0252C995.632 28.1872 989.966 25.1214 983.104 23.8176L982.917 24.8L982.731 25.7824C989.201 27.0119 994.469 29.8795 998.579 34.3748L999.317 33.7ZM982.917 24.8L983.134 23.8238C980.655 23.2729 977.821 22.9679 974.638 22.9002L974.617 23.9L974.596 24.8998C977.68 24.9654 980.379 25.2604 982.7 25.7762L982.917 24.8ZM974.617 23.9L974.661 22.9009C971.586 22.7673 969.037 22.7 967.017 22.7V23.7V24.7C968.997 24.7 971.515 24.7661 974.574 24.899L974.617 23.9ZM967.017 23.7V22.7H945.617V23.7V24.7H967.017V23.7ZM945.617 23.7H944.617V122.3H945.617H946.617V23.7H945.617ZM1090.1 145H1089.1V146H1090.1V145ZM1090.1 86H1091.1V85.7324L1090.97 85.5006L1090.1 86ZM1041.1 0.999992V-7.62939e-06H1039.37L1040.24 1.49942L1041.1 0.999992ZM1069.2 0.999992L1070.07 0.500443L1069.78 -7.62939e-06H1069.2V0.999992ZM1102.3 58.4L1101.44 58.8995L1102.3 60.4041L1103.17 58.8984L1102.3 58.4ZM1135.3 0.999992V-7.62939e-06H1134.72L1134.43 0.501579L1135.3 0.999992ZM1163.4 0.999992L1164.27 1.49866L1165.13 -7.62939e-06H1163.4V0.999992ZM1114.5 86L1113.63 85.5013L1113.5 85.7329V86H1114.5ZM1114.5 145V146H1115.5V145H1114.5ZM1090.1 145H1091.1V86H1090.1H1089.1V145H1090.1ZM1090.1 86L1090.97 85.5006L1041.97 0.500565L1041.1 0.999992L1040.24 1.49942L1089.24 86.4994L1090.1 86ZM1041.1 0.999992V1.99999H1069.2V0.999992V-7.62939e-06H1041.1V0.999992ZM1069.2 0.999992L1068.34 1.49954L1101.44 58.8995L1102.3 58.4L1103.17 57.9004L1070.07 0.500443L1069.2 0.999992ZM1102.3 58.4L1103.17 58.8984L1136.17 1.49841L1135.3 0.999992L1134.43 0.501579L1101.43 57.9016L1102.3 58.4ZM1135.3 0.999992V1.99999H1163.4V0.999992V-7.62939e-06H1135.3V0.999992ZM1163.4 0.999992L1162.53 0.501335L1113.63 85.5013L1114.5 86L1115.37 86.4987L1164.27 1.49866L1163.4 0.999992ZM1114.5 86H1113.5V145H1114.5H1115.5V86H1114.5ZM1114.5 145V144H1090.1V145V146H1114.5V145Z"
									fill="#292524"
									mask="url(#path-1-outside-1_76_6)"
								/>
							</g>
						</MagicSVG>
					</div>
				</div>
			</div>
		</div>
	);
};

interface MagicSVGProps {
	children: React.ReactNode;
	width: number;
	height: number;
	className?: string;
	gradientSize?: number;
	gradientFrom?: string;
	gradientTo?: string;
	strokeWidth?: number;
	fill?: string;
	strokeColor?: string;
}

export function MagicSVG({
	children,
	width,
	height,
	className,
	gradientSize = 50,
	gradientFrom = '#9E7AFF',
	gradientTo = '#FE8BBB',
	strokeWidth = 1,
	fill = 'none',
	strokeColor = '#2C2C2C',
}: MagicSVGProps) {
	const svgRef = useRef<SVGSVGElement>(null);

	const animatedX = useMotionValue(-gradientSize * 2);
	const animatedY = useMotionValue(-gradientSize * 2);

	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			if (svgRef.current) {
				const { left, top } = svgRef.current.getBoundingClientRect();
				const clientX = e.clientX;
				const clientY = e.clientY;
				const newX = clientX - left;
				const newY = clientY - top;

				animate(animatedX, newX, {
					type: 'spring',
					stiffness: 150,
					damping: 25,
					mass: 0.8,
				});

				animate(animatedY, newY, {
					type: 'spring',
					stiffness: 150,
					damping: 25,
					mass: 0.8,
				});
			}
		},
		[animatedX, animatedY]
	);

	const handleMouseLeave = useCallback(() => {
		animate(animatedX, -gradientSize * 2, {
			type: 'spring',
			stiffness: 100,
			damping: 30,
		});

		animate(animatedY, -gradientSize * 2, {
			type: 'spring',
			stiffness: 100,
			damping: 30,
		});
	}, [animatedX, animatedY, gradientSize]);

	const handleMouseEnter = useCallback(() => {
		document.addEventListener('mousemove', handleMouseMove);
	}, [handleMouseMove]);

	useEffect(() => {
		const svgElement = svgRef.current;
		if (svgElement) {
			svgElement.addEventListener('mouseenter', handleMouseEnter);
			svgElement.addEventListener('mouseleave', handleMouseLeave);
		}
		return () => {
			if (svgElement) {
				svgElement.removeEventListener('mouseenter', handleMouseEnter);
				svgElement.removeEventListener('mouseleave', handleMouseLeave);
			}
			document.removeEventListener('mousemove', handleMouseMove);
		};
	}, [handleMouseEnter, handleMouseLeave, handleMouseMove]);

	useEffect(() => {
		animatedX.set(-gradientSize * 2);
		animatedY.set(-gradientSize * 2);
	}, [gradientSize, animatedX, animatedY]);

	const gradientId = 'magic-gradient-wordmark';
	const maskId = 'magic-mask-wordmark';

	return (
		<motion.svg
			aria-label="Magic SVG"
			className={cn('cursor-pointer transition-all duration-300', className)}
			fill="none"
			height={height}
			ref={svgRef}
			style={{ maxWidth: '100%', height: 'auto' }}
			viewBox={`0 0 ${width} ${height}`}
			width={width}
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Magic SVG</title>
			<defs>
				<motion.radialGradient
					cx={useMotionTemplate`${animatedX}px`}
					cy={useMotionTemplate`${animatedY}px`}
					gradientUnits="userSpaceOnUse"
					id={gradientId}
					r={gradientSize}
				>
					<stop offset="0%" stopColor={gradientFrom} />
					<stop offset="70%" stopColor={gradientTo} />
					<stop offset="100%" stopColor="transparent" />
				</motion.radialGradient>

				<mask id={maskId}>
					<rect fill="black" height="100%" width="100%" />
					<motion.circle
						cx={useMotionTemplate`${animatedX}px`}
						cy={useMotionTemplate`${animatedY}px`}
						fill="white"
						r={gradientSize}
					/>
				</mask>
			</defs>

			{React.Children.map(children, (child) => {
				if (React.isValidElement(child)) {
					const childType = (child as React.ReactElement).type;
					if (
						childType === 'defs' ||
						childType === 'mask' ||
						childType === 'clipPath'
					) {
						return child;
					}
				}
				return null;
			})}

			<g>
				{React.Children.map(children, (child) => {
					if (React.isValidElement(child)) {
						const childType = (child as React.ReactElement).type;
						if (
							childType !== 'defs' &&
							childType !== 'mask' &&
							childType !== 'clipPath'
						) {
							return React.cloneElement(
								child as React.ReactElement<React.SVGProps<SVGElement>>,
								{
									stroke: strokeColor,
									strokeWidth,
									fill,
								}
							);
						}
					}
					return null;
				})}
			</g>

			<g mask={`url(#${maskId})`}>
				{React.Children.map(children, (child) => {
					if (React.isValidElement(child)) {
						const childType = (child as React.ReactElement).type;
						if (
							childType !== 'defs' &&
							childType !== 'mask' &&
							childType !== 'clipPath'
						) {
							return React.cloneElement(
								child as React.ReactElement<React.SVGProps<SVGElement>>,
								{
									stroke: `url(#${gradientId})`,
									strokeWidth: strokeWidth + 1,
									fill,
								}
							);
						}
					}
					return null;
				})}
			</g>
		</motion.svg>
	);
}


