import Hero from "../sections/Hero";
import Solutions from "../sections/Solutions";
import HowItWorks from "../sections/HowItWorks";
import PostDelivery from "../sections/PostDelivery";
import Lab from "../sections/Lab";
import About from "../sections/About";
import Contact from "../sections/Contact";

export default function Home({ onOpenChat }) {
  return (
    <>
      <Hero onOpenChat={onOpenChat} />
      <Solutions onOpenChat={onOpenChat} />
      <HowItWorks />
      <PostDelivery />
      <Lab />
      <About />
      <Contact onOpenChat={onOpenChat} />
    </>
  );
}
