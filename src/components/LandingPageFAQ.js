import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import './styles/LandingPageFAQ.css';

function LandingPageFAQ() {
  return (
    <div className="faq-container">
    <Accordion defaultActiveKey="0">
      <Card>
        <Accordion.Item eventKey="0">
          <Accordion.Header>How does humaNGO contribute to addressing social issues that government agencies and private companies might overlook?</Accordion.Header>
          <Accordion.Body>
          NGOs like ours play a critical role in addressing social issues that may not be prioritized by government agencies or private companies due to a lack of political will, profit motive, or resource limitations. Our NGO focuses on human empowerment, specifically targeting marginalized communities that are often underserved. For example, while government programs might provide basic education, our NGO goes a step further by offering tailored skill development workshops, entrepreneurship training, and mentorship programs. We address the root causes of social issues, such as poverty and unemployment, by equipping individuals with the tools they need to achieve economic independence and personal growth. By filling these gaps, 
          we create opportunities for those who might otherwise be left behind, fostering a more inclusive and equitable society.          </Accordion.Body>
        </Accordion.Item>
      </Card>

      <Card>
        <Accordion.Item eventKey="1">
          <Accordion.Header>What impact does humaNGO have in your community, and how would things be different without their involvement?</Accordion.Header>
          <Accordion.Body>
          Our NGO has had a profound impact on the community by offering programs designed to uplift and empower individuals who face social and economic challenges. Through our initiatives, we have helped countless people improve their lives by providing access to education, job training, and leadership development. For instance, our entrepreneurship workshops have enabled individuals to start their own small businesses, which not only improves their financial stability but also contributes to the local economy. Our leadership programs have produced community leaders who advocate for positive change and inspire others to follow suit. Without our involvement, many of these individuals would continue to face barriers to advancement, remaining trapped in cycles of poverty and limited opportunity. The community as a whole would miss out on the
           potential contributions of these empowered individuals, leading to slower overall growth and development.
          </Accordion.Body>
        </Accordion.Item>
      </Card>

      <Card>
        <Accordion.Item eventKey="2">
          <Accordion.Header>How does humaNGO foster innovation and grassroots solutions to complex problems that often require local expertise and involvement?</Accordion.Header>
          <Accordion.Body>One of the strengths of NGOs like ours is our ability to innovate and develop grassroots solutions that are deeply rooted in local communities. We understand that complex social issues often require solutions that are tailored to the specific context and culture of the community. To achieve this, we engage directly with community members to identify their needs and challenges. For example, in a community struggling with high unemployment rates, we might collaborate with local leaders to design job training programs that are aligned with the skills in demand within the local economy. By leveraging the knowledge and expertise of local stakeholders, we create programs that are not only innovative but also sustainable and impactful.
             Our grassroots approach ensures that the solutions we develop are relevant and effective, leading to lasting positive change.
          </Accordion.Body>
        </Accordion.Item>
      </Card>

      <Card>
        <Accordion.Item eventKey="3">
          <Accordion.Header>What role does humaNGO play in advocating for and influencing public policy and social change?</Accordion.Header>
          <Accordion.Body>NGOs are key players in the realm of advocacy and public policy, often serving as the voice of marginalized communities and pushing for systemic changes that promote social justice and human rights. Our NGO is actively involved in advocating for policies that support human empowerment, such as equitable access to education, job opportunities, and social services. We conduct research to identify gaps in current policies and use this information to inform our advocacy efforts. For example, if we identify that certain groups are being excluded from educational opportunities, we might launch a campaign to raise awareness and pressure policymakers to implement inclusive education policies. Additionally, we engage in coalition-building with other NGOs, community organizations, and stakeholders to amplify our impact and create a broader movement for change. Through our advocacy work, 
            we aim to influence legislation and public policies that promote a more just and equitable society.
          </Accordion.Body>
        </Accordion.Item>
      </Card>

      <Card>
        <Accordion.Item eventKey="4">
          <Accordion.Header>Why is it important to support NGOs through donations, volunteering, or advocacy?</Accordion.Header>
          <Accordion.Body>
          Collaboration is essential for the success of NGOs, and our organization places a strong emphasis on building partnerships with other NGOs, government agencies, businesses, and community organizations. These collaborations allow us to pool resources, share expertise, and coordinate efforts to achieve our goals more effectively. For instance, we might partner with a local business to provide internships or job placements for participants in our job training programs. This collaboration benefits both the business, which gains access to a trained and motivated workforce, and the individuals, who gain valuable work experience. We also work closely with government agencies to align our programs with national development goals and secure funding or policy support. By working in collaboration with a diverse range of stakeholders,
           we are able to expand our reach, increase our impact, and ensure the sustainability of our initiatives.
          </Accordion.Body>
        </Accordion.Item>
      </Card>
    </Accordion>
    </div>
  );
}

export default LandingPageFAQ;