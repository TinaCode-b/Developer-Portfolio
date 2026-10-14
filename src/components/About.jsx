export default function About() {
  return (
    <section className="section" aria-labelledby="about-title">
      <div className="container split">
        <h2 id="about-title" className="section__title">
          About
        </h2>
        <div className="prose">
          <p>
            I'm Ernestina, a web developer and student at KNUST (Kwame Nkrumah University of Science
            and Technology). I'm learning to build for the web from first principles, and this site
            is a record of that progress.
          </p>
          <p>
            It started as plain semantic HTML and CSS. Today it's a React app with client-side
            routing, a live feed of my GitHub projects, and a focus on accessibility, SEO, and
            performance.
          </p>
        </div>
      </div>
    </section>
  );
}
