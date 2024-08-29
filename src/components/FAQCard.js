import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import './styles/FAQCard.css'; 

function FAQCard({ question, answer }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      style={{ width: '18rem', backgroundColor: "#77CCB9" }} 
      className="hover-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card.Body>
        <Card.Title>{isHovered ? answer : question}</Card.Title>
        <Card.Text>
          {!isHovered && "Hover to reveal the answer."}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default FAQCard;