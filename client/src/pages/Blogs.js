import React from 'react';
import '../styles/main.css';
import Footer from '../components/Footer';
const blogContent = [
  {
    paragraph: "Laptop batteries, especially lithium-ion and nickel-cadmium types, are recyclable for materials like lithium, cobalt, and nickel. These batteries contain chemicals such as lithium, cobalt oxide, and cadmium, all of which are hazardous if mishandled. When disposed of improperly, these metals can leach into soil and water, contaminating ecosystems and drinking supplies. Cadmium is highly toxic, affecting the kidneys and bones, while lithium can ignite and cause landfill fires.",
    image: "/images/blogs/blog1.jpg"
  },
  {
    paragraph: "Circuit boards in mobile phones can be recycled to extract gold, silver, palladium, and copper. They contain toxic substances such as lead, brominated flame retardants (BFRs), and polyvinyl chloride (PVC). Improper dismantling releases these toxins into the air and water. Lead affects the nervous system, especially in children, while BFRs disrupt endocrine functions and persist in the environment, contaminating food chains.",
    image: "/images/blogs/blog2.jpg"
  },
  {
    paragraph: "CRT (Cathode Ray Tube) monitors have recyclable parts like glass, copper yokes, and ferrous metals. They contain large amounts of leaded glass and phosphor compounds. Lead in CRTs can cause neurological and developmental damage in children and contaminate soil and water when dumped. The phosphors used also contain cadmium and mercury, which are both carcinogenic and persistent in the environment.",
    image: "/images/blogs/blog3.jpg"
  },
  {
    paragraph: "Recyclable parts include glass panels, plastic casing, and metal frames. These devices contain mercury (especially in CCFL backlights), indium, and lead solder. Mercury is a potent neurotoxin that bioaccumulates in aquatic organisms, posing severe risks to humans through fish consumption. Lead in solder can leach into the ground, contaminating food crops and water sources.",
    image: "/images/blogs/blog4.jpg"
  },
  {
    paragraph: "Hard drives can be recycled for aluminum, steel, and rare earth magnets. They often contain brominated flame retardants (BFRs) in casings and lead in solder. If crushed or burned improperly, they release toxic dioxins and furans. These chemicals damage the immune system and increase the risk of cancer. Hard drive platters can also contain chromium compounds that are hazardous to respiratory health.",
    image: "/images/blogs/blog5.jpg"
  },
  {
    paragraph: "These cartridges are recyclable for plastic and residual toner or ink. Toner powder contains carbon black and sometimes heavy metals like lead or cadmium. Inhalation of toner particles can lead to respiratory issues, and dumping used cartridges releases persistent dyes and plastics that contaminate soil and groundwater.",
    image: "/images/blogs/blog6.jpg"
  },
  {
    paragraph: "These appliances have recyclable components like copper coils, compressors, and plastic panels. They contain refrigerants such as CFCs, HCFCs, or HFCs, which are potent greenhouse gases. If released into the atmosphere, these gases deplete the ozone layer and contribute to global warming. The oils and coolants may also contain PCBs, which are harmful carcinogens.",
    image: "/images/blogs/blog7.jpg"
  },
  {
    paragraph: "These contain small amounts of mercury vapor, which can be recovered during recycling. However, when broken or discarded in landfills, mercury is released into the air or leaches into groundwater. Mercury exposure can damage the brain, lungs, and kidneys, and poses a high risk to pregnant women and young children.",
    image: "/images/blogs/blog8.jpg"
  },
  {
    paragraph: "Remotes can be recycled for their plastic casing and circuit board. They contain button-cell batteries with mercury or lithium, as well as small circuit boards with lead solder. If thrown away, the batteries can leak chemicals like lithium and mercury into the soil, causing pollution and health risks for nearby populations.",
    image: "/images/blogs/blog9.jpg"
  },
  {
    paragraph: "These appliances offer recyclable components such as stainless steel drums, motors, and wiring. Some internal boards contain lead, PVC insulation, and BFRs. The insulation and coatings can emit dioxins when burned. Furthermore, these large appliances often end up in informal recycling, where burning and acid-stripping expose workers to toxic fumes and waste.",
    image: "/images/blogs/blog10.jpg"
  },
  {
    paragraph: "Plastic shells and wiring can be recovered, while internal PCBs contain lead, BFRs, and other heavy metals. These small devices are often overlooked but collectively contribute significantly to e-waste. Improper disposal leads to soil contamination, particularly from lead and antimony trioxide, which is a possible human carcinogen.",
    image: "/images/blogs/blog11.jpg"
  },
  {
    paragraph: "Recyclable for copper, aluminum, and steel, power adapters contain transformers and capacitors with potentially hazardous materials like BFRs and PCBs. Damaged adapters can leak electrolytes and emit toxic fumes if incinerated. Exposure can cause nervous system damage and increase cancer risks.",
    image: "/images/blogs/blog12.jpg"
  },
  {
    paragraph: "Found in almost all electronic devices, PCBs are valuable for their copper, gold, and silver content. However, they also contain lead, mercury, and BFRs. If melted or acid-leached without proper controls, these substances contaminate air, water, and soil. Informal recycling leads to high levels of dioxins, linked to cancer, reproductive disorders, and endocrine disruption.",
    image: "/images/blogs/blog13.jpg"
  },
  {
    paragraph: "These optical media can be recycled for their polycarbonate plastic. They may contain aluminum or gold layers for data encoding. Burning them releases toxic gases including bisphenol A (BPA), a known endocrine disruptor. Landfilling leads to microplastic contamination over time, affecting aquatic ecosystems and entering food chains.",
    image: "/images/blogs/blog14.jpg"
  },
  {
    paragraph: "Smartphones can be recycled for precious metals like gold, copper, and rare earths, and contain lithium-ion batteries. Hazardous materials include cadmium, lead solder, and flame retardants. Improper disposal can lead to toxic leachates that pollute water and air. Recyclers handling phones without protective gear risk exposure to substances linked to organ damage and cancer.",
    image: "/images/blogs/blog15.jpg"
  }
];

const Blogs = () => (
  <div className="blogs-container">
    <h1>Harmful Effects of E-Device Waste</h1>
    {blogContent.map((item, idx) => (
      <div className={`blog-section ${idx % 2 === 0 ? 'right' : 'left'}`} key={idx}>
        <img src={item.image} alt={`Blog visual ${idx + 1}`} />
        <p>{item.paragraph}</p>
      </div>
    ))}
    <section className="Footer-section">
      <Footer/>
      </section>
  </div>
);

export default Blogs; 