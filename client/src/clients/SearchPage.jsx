import React, {useContext, useState} from 'react'
import './SearchPage.css';
import Search from '../components/Search';
import Card from '../components/Card';
import {FaFilter } from 'react-icons/fa';
import FilterModal from '../components/FilterModal.jsx';
import {UserContext} from '../App.jsx';

const SearchPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filterOptions, setFilterOptions] = useState({});
    const [searchVal, setSearchVal] = useState('');
    const {projects} = useContext(UserContext);
    // const projects = [
    //     {
    //       id: 1,
    //       industry: "Retail",
    //       duration: 6,
    //       title: "XR Shopping with Gamified Cart",
    //       year: "2024-25",
    //       piName: "Dr. Priya R.",
    //       piEmail: "priya.r@example.com",
    //       cpiName: "Mr. Rajesh K.",
    //       cpiEmail: "rajesh.k@example.com",
    //       amtSanct: 200000,
    //       amtRecv: 180000,
    //       students: [
    //         { name: 'Sneha E', email: 'sneha@example.com' },
    //         { name: 'Shreya D', email: 'shreya@example.com' },
    //         { name: 'Kiran B', email: 'kiran@example.com' },
    //         { name: 'Anjali M', email: 'anjali@example.com' },
    //         { name: 'Ravi C', email: 'ravi@example.com' }
    //       ],
    //       summary: "The project explores how XR technologies can redefine online shopping by introducing immersive experiences and gamified cart mechanics. Customers can interact with 3D models of products, receive real-time recommendations, and earn rewards through an interactive cart system. The consulting team developed a prototype for a major retail client to analyze shopper behavior and increase conversions. Results show an enhanced user experience and improved engagement, helping brands stay competitive in a rapidly evolving e-commerce landscape.",
    //       progress: "Ongoing"
    //     },
    //     {
    //       id: 2,
    //       industry: "Healthcare",
    //       duration: 4,
    //       title: "Digital Patient Engagement Portal",
    //       year: "2024-25",
    //       piName: "Dr. Karthik S.",
    //       piEmail: "karthik.s@example.com",
    //       cpiName: "Dr. Meera D.",
    //       cpiEmail: "meera.d@example.com",
    //       amtSanct: 150000,
    //       amtRecv: 150000,
    //       students: [{ name: "Divya N", email: "divya.n@example.com" }],
    //       summary: "This project involved designing a digital engagement platform for a private hospital network to streamline patient interactions. The team implemented features like appointment tracking, symptom logging, and AI-powered health advice. The platform was customized to improve patient compliance and reduce no-shows. Consulting efforts focused on understanding patient feedback and enhancing the UI/UX. Final reports indicated significant improvements in operational efficiency and patient satisfaction within the pilot hospital units.",
    //       progress: "Completed"
    //     },
    //     {
    //       id: 3,
    //       industry: "Education",
    //       duration: 3,
    //       title: "AI Tutoring Assistant for STEM Courses",
    //       year: "2023-24",
    //       piName: "Dr. Anitha G.",
    //       piEmail: "anitha.g@example.com",
    //       cpiName: "Mr. Nikhil V.",
    //       cpiEmail: "nikhil.v@example.com",
    //       amtSanct: 120000,
    //       amtRecv: 100000,
    //       students: [
    //         { name: 'Sneha E', email: 'sneha@example.com' },
    //         { name: 'Shreya D', email: 'shreya@example.com' },
    //         { name: 'Kiran B', email: 'kiran@example.com' },
    //       ],
    //       summary: "The AI Tutoring Assistant project was aimed at helping a private edtech firm develop intelligent tutoring systems for STEM subjects. The system offered step-by-step guidance using NLP and tracked student performance over time. The consulting team contributed to backend logic, user testing, and evaluation metrics. Key achievements include improved student retention and engagement through adaptive learning techniques. Pilot programs were rolled out across several tutoring centers with positive feedback from students and parents alike.",
    //       progress: "Completed"
    //     },
    //     {
    //       id: 4,
    //       industry: "Manufacturing",
    //       duration: 5,
    //       title: "Predictive Maintenance with IoT",
    //       year: "2024-25",
    //       piName: "Dr. Ramesh B.",
    //       piEmail: "ramesh.b@example.com",
    //       cpiName: "Ms. Kavya P.",
    //       cpiEmail: "kavya.p@example.com",
    //       amtSanct: 250000,
    //       amtRecv: 220000,
    //       students: [
    //         { name: 'Sneha E', email: 'sneha@example.com' },
    //         { name: 'Shreya D', email: 'shreya@example.com' },
    //       ],
    //       summary: "This project aimed to reduce downtime in a mid-sized manufacturing plant by introducing predictive maintenance using IoT sensors. The consulting team designed sensor configurations, implemented anomaly detection algorithms, and developed a dashboard to visualize equipment health. Real-time data helped schedule maintenance only when necessary, reducing costs and improving equipment lifespan. The firm reported a 30% drop in unplanned outages. Students worked closely with on-ground engineers to fine-tune alerts and recommendations.",
    //       progress: "Ongoing"
    //     },
    //     {
    //       id: 5,
    //       industry: "Logistics",
    //       duration: 3,
    //       title: "Smart Fleet Tracking System",
    //       year: "2023-24",
    //       piName: "Dr. Reema J.",
    //       piEmail: "reema.j@example.com",
    //       cpiName: "Mr. Manoj K.",
    //       cpiEmail: "manoj.k@example.com",
    //       amtSanct: 180000,
    //       amtRecv: 180000,
    //       students: [{ name: "Kiran L", email: "kiran.l@example.com" }],
    //       summary: "For a third-party logistics firm, the team created a smart fleet tracking dashboard that integrates GPS data, route optimization, and driver performance analytics. The consulting effort focused on enhancing efficiency, reducing delivery times, and identifying bottlenecks. The platform provided real-time visibility to clients and dispatchers. Student contributors helped test mobile modules and analyze fleet telemetry. The solution demonstrated improved delivery punctuality and better fuel economy across the client's vehicle fleet.",
    //       progress: "Completed"
    //     },
    //     {
    //       id: 6,
    //       industry: "Finance",
    //       duration: 6,
    //       title: "Client Risk Profiling Tool",
    //       year: "2023-24",
    //       piName: "Dr. Rohan M.",
    //       piEmail: "rohan.m@example.com",
    //       cpiName: "Ms. Sneha R.",
    //       cpiEmail: "sneha.r@example.com",
    //       amtSanct: 220000,
    //       amtRecv: 210000,
    //       students: [
    //         { name: 'Sneha E', email: 'sneha@example.com' },
    //         { name: 'Shreya D', email: 'shreya@example.com' },
    //         { name: 'Kiran B', email: 'kiran@example.com' },
    //         { name: 'Anjali M', email: 'anjali@example.com' },
    //         { name: 'Ravi C', email: 'ravi@example.com' }
    //       ],
    //       summary: "To support a wealth management firm, this project focused on building a client risk profiling tool that used behavioral data, past investment patterns, and real-time financial indicators. The consulting team ensured compliance with regulatory norms and integrated third-party APIs for market data. The interface provided actionable insights to advisors while helping clients understand risk exposure. The prototype is undergoing internal testing and is set for client rollout next quarter.",
    //       progress: "Ongoing"
    //     },
    //     {
    //       id: 7,
    //       industry: "Real Estate",
    //       duration: 4,
    //       title: "Property Valuation Automation",
    //       year: "2023-24",
    //       piName: "Dr. Vivek H.",
    //       piEmail: "vivek.h@example.com",
    //       cpiName: "Ms. Nisha D.",
    //       cpiEmail: "nisha.d@example.com",
    //       amtSanct: 160000,
    //       amtRecv: 160000,
    //       students: [
    //         { name: 'Sneha E', email: 'sneha@example.com' },
    //         { name: 'Shreya D', email: 'shreya@example.com' },
    //         { name: 'Kiran B', email: 'kiran@example.com' },
    //       ],
    //       summary: "The project aimed to assist a real estate consulting firm in automating residential property valuation. Using historical sales data, location metrics, and construction quality indicators, the team developed an ML model that provided accurate estimates. A web-based UI enabled agents to quickly generate reports. Students assisted in model training, UI testing, and data cleaning. Early results showed valuation accuracy within 5% of actual selling prices in most regions.",
    //       progress: "Completed"
    //     },
    //     {
    //       id: 8,
    //       industry: "Tourism",
    //       duration: 2,
    //       title: "Personalized Travel Planner Bot",
    //       year: "2023-24",
    //       piName: "Dr. Sahana I.",
    //       piEmail: "sahana.i@example.com",
    //       cpiName: "Mr. Rahul F.",
    //       cpiEmail: "rahul.f@example.com",
    //       amtSanct: 90000,
    //       amtRecv: 85000,
    //       students: [{ name: "Ravi B", email: "ravi.b@example.com" }],
    //       summary: "A travel agency sought help in creating a chatbot for trip planning based on user interests and real-time factors like weather and local events. The bot, developed with NLP, recommended itineraries and offered booking suggestions. Consulting involved building the backend logic and integrating third-party APIs. The final version showed promising engagement metrics during internal pilot tests. Students helped with conversation flow design and testing.",
    //       progress: "Completed"
    //     },
    //     {
    //       id: 9,
    //       industry: "Legal",
    //       duration: 5,
    //       title: "Contract Clause Detector",
    //       year: "2023-24",
    //       piName: "Dr. Aravind J.",
    //       piEmail: "aravind.j@example.com",
    //       cpiName: "Ms. Tanya K.",
    //       cpiEmail: "tanya.k@example.com",
    //       amtSanct: 200000,
    //       amtRecv: 190000,
    //       students: [
    //         { name: 'Sneha E', email: 'sneha@example.com' },
    //         { name: 'Shreya D', email: 'shreya@example.com' },
    //         { name: 'Kiran B', email: 'kiran@example.com' },
    //         { name: 'Anjali M', email: 'anjali@example.com' },
    //         { name: 'Ravi C', email: 'ravi@example.com' }
    //       ],
    //       summary: "For a legal consultancy, this project automated the detection of key clauses in lengthy contracts using NLP. The tool highlighted risk-heavy sections and provided summaries for quicker review. Consultants ensured the model aligned with legal standards. Student team members contributed to dataset preparation and fine-tuning transformer-based models. The tool is currently being deployed internally and may soon be offered to clients as a SaaS add-on.",
    //       progress: "Ongoing"
    //     },
    //     {
    //       id: 10,
    //       industry: "Telecom",
    //       duration: 3,
    //       title: "Network Outage Prediction",
    //       year: "2023-24",
    //       piName: "Dr. Neeraj L.",
    //       piEmail: "neeraj.l@example.com",
    //       cpiName: "Mr. Arjun V.",
    //       cpiEmail: "arjun.v@example.com",
    //       amtSanct: 130000,
    //       amtRecv: 120000,
    //       students: [
    //         { name: 'Sneha E', email: 'sneha@example.com' },
    //         { name: 'Shreya D', email: 'shreya@example.com' },
    //         { name: 'Kiran B', email: 'kiran@example.com' },
    //         { name: 'Anjali M', email: 'anjali@example.com' },
    //         { name: 'Ravi C', email: 'ravi@example.com' }
    //       ],
    //       summary: "The telecom client wanted to predict and proactively address network outages. Using historical network logs and traffic data, the consulting team built a prediction engine based on time series analysis and ML. Students helped clean and prepare massive datasets, while also contributing to model testing. The client saw better uptime and reduced customer complaints. Recommendations for scalability and data refresh cycles were also delivered in the final report.",
    //       progress: "Completed"
    //     },
    //     {
    //       id: 11,
    //       industry: "E-commerce",
    //       duration: 4,
    //       title: "Product Recommendation Booster",
    //       year: "2024-25",
    //       piName: "Dr. Lakshmi P.",
    //       piEmail: "lakshmi.p@example.com",
    //       cpiName: "Mr. Gokul S.",
    //       cpiEmail: "gokul.s@example.com",
    //       amtSanct: 170000,
    //       amtRecv: 160000,
    //       students: [
    //         { name: 'Sneha E', email: 'sneha@example.com' },
    //         { name: 'Shreya D', email: 'shreya@example.com' },
    //         { name: 'Kiran B', email: 'kiran@example.com' },
    //         { name: 'Anjali M', email: 'anjali@example.com' },
    //         { name: 'Ravi C', email: 'ravi@example.com' }
    //       ],
    //       summary: "The project aimed to improve personalized recommendations for an e-commerce platform. The team developed collaborative and content-based filtering techniques to enhance user experience. Consulting involved integrating the models into the client’s existing stack and conducting A/B testing. The results showed a 12% increase in conversion rates for personalized homepages. Student contributions included similarity scoring and system integration testing across different user cohorts.",
    //       progress: "Ongoing"
    //     },
    //     {
    //       id: 12,
    //       industry: "Energy",
    //       duration: 5,
    //       title: "Smart Energy Usage Dashboard",
    //       year: "2024-25",
    //       piName: "Dr. Harini G.",
    //       piEmail: "harini.g@example.com",
    //       cpiName: "Mr. Sarvesh N.",
    //       cpiEmail: "sarvesh.n@example.com",
    //       amtSanct: 210000,
    //       amtRecv: 210000,
    //       students: [
    //         { name: 'Sneha E', email: 'sneha@example.com' },
    //         { name: 'Shreya D', email: 'shreya@example.com' },
    //         { name: 'Kiran B', email: 'kiran@example.com' },
    //         { name: 'Anjali M', email: 'anjali@example.com' },
    //       ],
    //       summary: "This project developed a smart dashboard to monitor and optimize energy usage for a commercial building client. The dashboard visualized consumption patterns, detected anomalies, and suggested energy-saving strategies. Students worked on front-end visualization and backend data processing. The consulting phase included client training, feedback integration, and documentation. Early deployment results showed a 15% reduction in peak hour energy consumption, which helped lower operational costs significantly.",
    //       progress: "Completed"
    //     }
    // ];

    const openFilterModal = ()=>{
      setIsOpen(true);
    }
    const handleSearchChange = (e) => {
      setSearchVal(e.target.value);
    };
    
  return (
    <div>
        <div className='top-title'>
            <p>Search For Consulting Projects</p>
            <div style={{display: 'flex', gap:'15px', alignItems: 'center'}}>
                <button className='filter-button' onClick={openFilterModal}><FaFilter size={15} color="white"/></button>
                <Search value={searchVal} onChange={handleSearchChange} />
            </div>
        </div>

        <div className="card-container">
            {projects.filter(project => {
              return (
                (!filterOptions.industry || project.industry === filterOptions.industry) &&
                (!filterOptions.duration || project.duration >= filterOptions.duration) &&
                (!filterOptions.year || project.year === filterOptions.year) &&
                (!filterOptions.progress || project.progress === filterOptions.progress) &&
                (filterOptions.minAmount==null || parseInt(project.amtSanct) >= parseInt(filterOptions.minAmount)) &&
                (project.title.toLowerCase().includes(searchVal.toLowerCase())) &&
                (!filterOptions.supervisor || filterOptions.supervisor === project.piName || filterOptions.supervisor == project.cpiName)
              );
            }).map((proj, i)=>(
                <Card colorIndex={i} proj={proj}/>
            ))}
        </div>

        {isOpen && <FilterModal showModalSetter={setIsOpen} projects={projects} setFilterOptions={setFilterOptions}/>}
        
    </div>
  )
}

export default SearchPage
