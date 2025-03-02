import React from 'react';
import { motion } from 'framer-motion';
import NavBar from '../components/HomepageComponents/NavBar.jsx';
import Header from '../components/HomepageComponents/Header.jsx';
import Services from '../components/HomepageComponents/Services.jsx';
import LearnMore from '../components/HomepageComponents/LearnMore.jsx';
import AboutUs from '../components/HomepageComponents/AboutUs.jsx';
import Footer from '../components/HomepageComponents/Footer.jsx';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 }, // Start slightly below with opacity 0
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } // Animate to normal position
};

const Home = () => {
  return (
    <>
      <section className={"homePage"}>
        <NavBar />

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
          <Header />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
          <Services />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
          <LearnMore />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
          <AboutUs />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
          <Footer />
        </motion.div>
      </section>
    </>
  );
}

export default Home;
