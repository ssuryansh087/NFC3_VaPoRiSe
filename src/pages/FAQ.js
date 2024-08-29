import React from 'react';
import './styles/FAQ.css';
import Cards from '../components/FAQCard';

function FAQ() {
  const faqData = [
    { key: "1", question: "What is HumaNGO?", answer: "HumaNGO is an organization focused on empowering marginalized communities through education, skill development, and advocacy." },
    { key: "2", question: "How does HumaNGO support local communities?", answer: "HumaNGO supports local communities by offering education programs, skill development workshops, and entrepreneurship training." },
    { key: "3", question: "What are the goals of HumaNGO?", answer: "The goals of HumaNGO are to empower individuals, promote social justice, and create sustainable development opportunities." },
    { key: "4", question: "What projects does HumaNGO undertake?", answer: "HumaNGO undertakes various projects including community education, health initiatives, and economic development programs." },
    { key: "5", question: "How can I get involved with HumaNGO?", answer: "You can get involved by volunteering, donating, or participating in our community events and programs." },
    { key: "6", question: "What impact has HumaNGO made so far?", answer: "HumaNGO has made a significant impact by improving access to education, creating job opportunities, and enhancing community well-being." },
    { key: "7", question: "How does HumaNGO measure its success?", answer: "HumaNGO measures success through impact assessments, community feedback, and tracking progress against our goals." },
    { key: "8", question: "What partnerships does HumaNGO have?", answer: "HumaNGO partners with local businesses, government agencies, and other NGOs to enhance our programs and reach more people." },
    { key: "9", question: "What are the future plans for HumaNGO?", answer: "HumaNGO plans to expand our programs, reach more communities, and continue advocating for social justice and empowerment." }
  ];

  return (
    <div className='questioncontainer'>
      <h3 className='faqh3'>HumaNGO FAQ Page</h3>
      <div className='card_grid'>
        {faqData.slice(0, 3).map(faq => (
          <Cards 
            key={faq.key}
            question={faq.question} 
            answer={faq.answer} 
          />
        ))}
      </div>
      <div className='card_grid'>
        {faqData.slice(3, 6).map(faq => (
          <Cards 
            key={faq.key}
            question={faq.question} 
            answer={faq.answer} 
          />
        ))}
      </div>
      <div className='card_grid'>
        {faqData.slice(6).map(faq => (
          <Cards 
            key={faq.key}
            question={faq.question} 
            answer={faq.answer} 
          />
        ))}
      </div>
    </div>
  );
}

export default FAQ;
