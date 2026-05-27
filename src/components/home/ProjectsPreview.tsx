import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import AnimateIn, { AnimateInGroup, AnimateInItem } from "@/components/ui/AnimateIn";
import SectionLabel from "@/components/ui/SectionLabel";
import Tag from "@/components/ui/Tag";
import { projects } from "@/lib/data/projects";

const featured = projects.filter((p) => p.featured).slice(0, 3);

// Curated field images for each featured project
const projectImages = [
  "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
];

export default function ProjectsPreview() {
  return (
    <section className="section-pad bg-[var(--color-warm)]">
      <Container>
        <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
          <AnimateIn>
            <SectionLabel number="—" label="Selected Projects" />
            <h2 className="text-headline font-serif text-[var(--color-forest)] max-w-lg">
              Work across Africa&apos;s development landscape
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <Link
              href="/projects"
              className="text-sm text-[var(--color-amber)] font-medium link-reveal shrink-0"
            >
              All projects →
            </Link>
          </AnimateIn>
        </div>

        {/* Card-style project grid with images */}
        <AnimateInGroup
          className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-[var(--color-warm-dark)]"
          stagger={0.1}
        >
          {featured.map((project, i) => (
            <AnimateInItem key={project.id}>
              <Link
                href={`/projects#${project.slug}`}
                className={`group flex flex-col h-full hover:bg-[var(--color-ghost)] transition-colors duration-300 ${
                  i < featured.length - 1
                    ? "border-b lg:border-b-0 lg:border-r border-[var(--color-warm-dark)]"
                    : ""
                }`}
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-[var(--color-mist)]">
                  <Image
                    src={projectImages[i]}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  {/* Status badge */}
                  <div className="absolute top-4 left-4">
                    <Tag
                      variant={project.status === "Active" ? "forest" : "muted"}
                    >
                      {project.status}
                    </Tag>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-mono text-[var(--color-stone)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] text-[var(--color-stone)]">·</span>
                    <span className="text-[10px] text-[var(--color-stone)] uppercase tracking-wide">
                      {project.duration}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg text-[var(--color-forest)] leading-snug mb-3 group-hover:text-[var(--color-earth)] transition-colors flex-1">
                    {project.title}
                  </h3>

                  <div className="flex items-center justify-between pt-4 border-t border-[var(--color-warm-dark)]">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[var(--color-stone)] block mb-0.5">
                        Region
                      </span>
                      <span className="text-xs text-[var(--color-ink)]">
                        {project.region}
                      </span>
                    </div>
                    <span className="text-[var(--color-amber)] text-sm group-hover:translate-x-1 transition-transform duration-200">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </AnimateInItem>
          ))}
        </AnimateInGroup>
      </Container>
    </section>
  );
}
