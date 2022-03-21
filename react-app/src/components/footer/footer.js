import React from 'react'
import "../css/footer.css"
import Bill from "../../images/BillA.jpeg"
import Stephen from "../../images/stephenC.jpeg"
import Felipe from "../../images/FelipeA.jpg"
export default function Footer() {
    return (
        <div className="footerContainer">
            <div className="footerLeft">
                <h1>Created By</h1>
                <div className="namesGrid">
                    <p>
                        <img className="footerImage" src={Stephen} alt='stephen'/>
                        <a href="https://github.com/Twprcntmlk" target="_blank" rel="noopener noreferrer"><i className="fab fa-github-square" /> </a>
                        <a href="https://www.linkedin.com/in/stephen-choung-275b05172/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin" /> </a>
                        Stephen Choung</p>
                    <p>
                        <img className="footerImage" src={Bill} alt='bill' />
                        <a href="https://github.com/edenspring"  target="_blank" rel="noopener noreferrer"><i className="fab fa-github-square" /> </a>
                        <a href="https://www.linkedin.com/in/bill-adams-40869120b/"  target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin" /> </a>
                        Bill Adams </p>
                    <p>
                        <img className="footerImage" src={Felipe} alt='felipe'/>
                        <a href="https://github.com/f-q-a/" target="_blank" rel="noopener noreferrer"><i className="fab fa-github-square" /> </a>
                        <a href="https://www.linkedin.com/in/felipe-q-araujo/"  target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin" /> </a>
                        Felipe Araujo</p>

                </div>
            </div>

            <a href="https://github.com/Twprcntmlk/discord-clone"  target="_blank" rel="noopener noreferrer" className='footerRight'>
                <h1>Project Repo</h1>
                <i className="fab fa-github fa-2x" />
            </a>
        </div>
    )
}
