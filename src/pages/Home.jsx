import Hero from "../sections/Hero";
import Services from "../sections/Services";
import Cases from "../sections/Cases";
import HowWeWork from "../sections/HowWeWork";
import PostDelivery from "../sections/PostDelivery";
import Contact from "../sections/Contact";

export default function Home({ t }) {
  return (
    <main>
      <Hero t={t.hero} whatsappText={t.whatsappText} />
      <Services t={t.services} />
      <Cases t={t.cases} />
      <HowWeWork t={t.how} />
      <PostDelivery t={t.plans} />
      <Contact t={t.contact} whatsappText={t.whatsappText} />
    </main>
  );
}
