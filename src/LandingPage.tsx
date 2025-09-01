import { Carousel } from "./Carousel";
import styles from "./LandingPage.module.scss";

const LandingPage = () => {
  // Demo data
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Lead Developer",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "UI/UX Designer",
      image: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      name: "Emma Johnson",
      role: "Product Manager",
      image: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 4,
      name: "David Kim",
      role: "Frontend Engineer",
      image: "https://i.pravatar.cc/150?img=4",
    },
    {
      id: 5,
      name: "Lisa Zhang",
      role: "Backend Developer",
      image: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 6,
      name: "Alex Thompson",
      role: "DevOps Engineer",
      image: "https://i.pravatar.cc/150?img=6",
    },
  ];

  const showcase = [
    {
      id: 1,
      title: "E-commerce Gallery",
      category: "Shopping",
      image: "https://picsum.photos/400/300?random=1",
    },
    {
      id: 2,
      title: "Portfolio Showcase",
      category: "Creative",
      image: "https://picsum.photos/400/300?random=2",
    },
    {
      id: 3,
      title: "Product Features",
      category: "SaaS",
      image: "https://picsum.photos/400/300?random=3",
    },
    {
      id: 4,
      title: "Image Slider",
      category: "Photography",
      image: "https://picsum.photos/400/300?random=4",
    },
    {
      id: 5,
      title: "Testimonials",
      category: "Reviews",
      image: "https://picsum.photos/400/300?random=5",
    },
    {
      id: 6,
      title: "News Feed",
      category: "Media",
      image: "https://picsum.photos/400/300?random=6",
    },
  ];

  const scrollToDemo = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={`${styles.logo} ${styles.floating}`}>FlowCarousel</h1>
          <p className={styles.tagline}>Where performance flows naturally</p>
          <p className={styles.subtitle}>
            A next-generation React carousel with intelligent infinite mode,
            automatic responsiveness, and world-class performance. Built with
            modern SCSS architecture and accessibility in mind.
          </p>

          <div className={styles.cta}>
            <button
              className={`${styles.ctaButton} ${styles.primary}`}
              onClick={scrollToDemo}
            >
              🚀 See It In Action
            </button>
            <a
              href="https://github.com/notlesz/flow-carousel"
              className={`${styles.ctaButton} ${styles.secondary}`}
            >
              ⭐ Star on GitHub
            </a>
          </div>

          {/* Performance Metrics */}
          <div className={`${styles.metrics} ${styles.fadeInUp}`}>
            <div className={styles.metric}>
              <div className={styles.metricValue}>63%</div>
              <div className={styles.metricLabel}>Smaller Bundle</div>
              <div className={styles.metricDescription}>From 106KB to 39KB</div>
            </div>
            <div className={styles.metric}>
              <div className={styles.metricValue}>60fps</div>
              <div className={styles.metricLabel}>Guaranteed</div>
              <div className={styles.metricDescription}>
                RequestAnimationFrame
              </div>
            </div>
            <div className={styles.metric}>
              <div className={styles.metricValue}>100%</div>
              <div className={styles.metricLabel}>Accessible</div>
              <div className={styles.metricDescription}>ARIA + Keyboard</div>
            </div>
            <div className={styles.metric}>
              <div className={styles.metricValue}>0ms</div>
              <div className={styles.metricLabel}>Layout Shift</div>
              <div className={styles.metricDescription}>Stable experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Why Choose <span className={styles.highlight}>FlowCarousel</span>?
        </h2>
        <p className={styles.sectionSubtitle}>
          Built from the ground up with modern best practices and innovative
          features that set new standards in the carousel ecosystem.
        </p>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎯</div>
            <h3 className={styles.featureTitle}>Intelligent Infinite Mode</h3>
            <p className={styles.featureDescription}>
              Automatically shows 30% of the next item as a preview, giving
              users a visual hint that more content is available. No
              configuration needed.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📱</div>
            <h3 className={styles.featureTitle}>Auto-Responsive</h3>
            <p className={styles.featureDescription}>
              Adapts automatically to any screen size with intelligent
              breakpoints. Uses ResizeObserver for optimal performance.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h3 className={styles.featureTitle}>Lightning Fast</h3>
            <p className={styles.featureDescription}>
              63% smaller bundle than alternatives. Modern SCSS architecture
              with CSS that's cacheable and doesn't block JavaScript.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎨</div>
            <h3 className={styles.featureTitle}>Modern Architecture</h3>
            <p className={styles.featureDescription}>
              Built with SCSS + CSS Modules, ITCSS methodology, and design
              tokens. No more styled-components bloat.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>♿</div>
            <h3 className={styles.featureTitle}>Accessibility First</h3>
            <p className={styles.featureDescription}>
              Complete ARIA implementation, keyboard navigation (including
              Home/End), and screen reader support built-in.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔬</div>
            <h3 className={styles.featureTitle}>Physics-Based Gestures</h3>
            <p className={styles.featureDescription}>
              Realistic momentum scrolling with velocity calculations. Smooth,
              natural interactions that feel right.
            </p>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section id="demo" className={`${styles.section} ${styles.demoSection}`}>
        <h2 className={styles.demoTitle}>🎬 See FlowCarousel in Action</h2>

        <div className={styles.demoGrid}>
          <div className={styles.demoCard}>
            <h3 className={styles.demoCardTitle}>🏢 Team Showcase</h3>
            <p className={styles.demoCardDescription}>
              Standard responsive mode with 3 items per page. Notice the clean
              indicators and smooth transitions.
            </p>
            <Carousel
              responsive={{
                xs: { showItems: 1, gap: 10 },
                sm: { showItems: 2, gap: 15 },
                md: { showItems: 3, gap: 20 },
              }}
              totalItems={teamMembers.length}
              name="team-showcase"
              ariaLabel="Team members carousel"
              infinite={false}
              autoplay
              autoplayInterval={3000}
            >
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  style={{
                    background: "white",
                    borderRadius: "15px",
                    padding: "1.5rem",
                    textAlign: "center",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                    color: "#333",
                  }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      marginBottom: "1rem",
                      objectFit: "cover",
                    }}
                  />
                  <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>
                    {member.name}
                  </h4>
                  <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>
                    {member.role}
                  </p>
                </div>
              ))}
            </Carousel>
          </div>

          <div className={styles.demoCard}>
            <h3 className={styles.demoCardTitle}>
              🎨 Portfolio Gallery (Infinite)
            </h3>
            <p className={styles.demoCardDescription}>
              Infinite mode with preview! See how 30% of the next item shows,
              indicating more content. No indicators in infinite mode.
            </p>
            <Carousel
              responsive={{
                xs: { showItems: 1, gap: 10 },
                sm: { showItems: 2, gap: 15 },
                md: { showItems: 3, gap: 20 },
              }}
              totalItems={showcase.length}
              name="portfolio-showcase"
              ariaLabel="Portfolio showcase with infinite preview"
              infinite={true}
              enableMomentum
              swipeThreshold={60}
            >
              {showcase.map((item) => (
                <div
                  key={item.id}
                  style={{
                    position: "relative",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                    background: "white",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      padding: "1rem",
                      color: "#333",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "#4ecdc4",
                        fontWeight: "600",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {item.category}
                    </div>
                    <h4 style={{ margin: 0, fontSize: "1rem" }}>
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className={styles.section}>
        <div className={styles.codeSection}>
          <h2 className={styles.sectionTitle}>💻 Simple to Use</h2>
          <p className={styles.sectionSubtitle}>
            Get started in seconds with our intuitive API
          </p>

          <div className={styles.codeBlock}>
            <pre>
              {`// Install FlowCarousel
npm install flow-carousel

// Import and use
import { Carousel } from 'flow-carousel';

function App() {
  return (
    <Carousel
      responsive={{
        xs: { showItems: 1, gap: 8 },
        md: { showItems: 3, gap: 16 }
      }}
      totalItems={items.length}
      infinite={true}
      autoplay
    >
      {items.map(item => (
        <YourComponent key={item.id} {...item} />
      ))}
    </Carousel>
  );
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className={styles.installSection}>
        <h2 className={styles.sectionTitle}>🚀 Ready to Flow?</h2>
        <p className={styles.sectionSubtitle}>
          Join thousands of developers already using FlowCarousel
        </p>

        <div className={styles.installCommand}>npm install flow-carousel</div>

        <div className={styles.cta}>
          <a
            href="https://github.com/yourorg/flow-carousel"
            className={`${styles.ctaButton} ${styles.primary}`}
          >
            📚 View Documentation
          </a>
          <a
            href="https://github.com/yourorg/flow-carousel/issues"
            className={`${styles.ctaButton} ${styles.secondary}`}
          >
            💬 Get Support
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href="https://github.com/yourorg/flow-carousel">GitHub</a>
          <a href="https://npmjs.com/package/flow-carousel">NPM</a>
          <a href="https://github.com/yourorg/flow-carousel/issues">Issues</a>
          <a href="https://github.com/yourorg/flow-carousel/blob/main/LICENSE">
            License
          </a>
        </div>

        <p>
          Built with ❤️ for the React community
          <br />
          <small>FlowCarousel - Where performance flows naturally</small>
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
