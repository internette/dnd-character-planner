import { PageHero } from "../../components/PageHero";

interface DocHeroProps {
  title: string;
  eyebrow?: string;
  subtitle?: string;
}

/** A docs page title: PageHero at lg, without the swirl. */
export function DocHero({ title, eyebrow = "Bag of Holding design system", subtitle }: DocHeroProps) {
  // sb-unstyled keeps Storybook's docs typography off the hero.
  return (
    <div className="sb-unstyled cp-doc-hero">
      <PageHero size="lg" swirl={false} eyebrow={eyebrow} title={title} subtitle={subtitle} />
    </div>
  );
}
