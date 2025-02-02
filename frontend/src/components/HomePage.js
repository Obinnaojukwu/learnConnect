import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import Card from './Card';

const HomePage = () => {
    return (
        <div className="homepage">
            {/* Header Section */}
            <header className="header">
                <div className="logo-container">
                    <img src="/images/logo.JPG" alt="Rubric Logo" className="logo" />
                </div>
                <div className="header-content">
                    <h1>Welcome to <span className="highlight">Rubric</span></h1>
                    <p>Your go-to platform for learning and development.</p>
                    <div className="header-buttons">
                        <Link to="/login" className="btn">Login In</Link>
                        <Link to="/register" className="btn btn-primary">Sign Up</Link>
                    </div>
                </div>ohj\089
            </header>

            {/* Particle Effects */}
            <div className="particles">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className={`particle particle-${i + 1}`}></div>
                ))}
            </div>

            {/* Card Section */}
            <section className="card-section">
                <h2 className="section-title">Explore Our Features</h2>
                <div className="card-container">
                    <Card 
                        title="LearnConnect" 
                        description="A platform where students prepare for classes and achieve academic victory." 
                        imageUrl="https://media.istockphoto.com/id/1353041652/photo/confident-developer-holding-book-and-laptop-walking-on-urban-street-handsome-smiling-african.jpg?s=612x612&w=0&k=20&c=cU102bLuZD0b9Xs-PtBcPMeNzZM-HI8sOoOWpR8JbwU="
                    />
                    <Card 
                        title="Knowledge Hub" 
                        description="An extensive repository of resources tailored for your success." 
                        imageUrl="https://media.istockphoto.com/id/1353041652/photo/confident-developer-holding-book-and-laptop-walking-on-urban-street-handsome-smiling-african.jpg?s=612x612&w=0&k=20&c=cU102bLuZD0b9Xs-PtBcPMeNzZM-HI8sOoOWpR8JbwU="
                    />
                    <Card 
                        title="Interactive Sessions" 
                        description="Join interactive sessions and learn from industry experts." 
                        imageUrl="https://media.istockphoto.com/id/1353041652/photo/confident-developer-holding-book-and-laptop-walking-on-urban-street-handsome-smiling-african.jpg?s=612x612&w=0&k=20&c=cU102bLuZD0b9Xs-PtBcPMeNzZM-HI8sOoOWpR8JbwU="
                    />
                </div>
            </section>

            {/* Footer Section */}
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Rubric. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
