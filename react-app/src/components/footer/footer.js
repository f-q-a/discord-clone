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
                        <img className="footerImage" src={Stephen}/>
                        <a href="https://github.com/Twprcntmlk"><i className="fab fa-github-square" /> </a>
                        <a href="https://www.linkedin.com/in/stephen-choung-275b05172/"><i className="fab fa-linkedin" /> </a>
                        Stephen Choung</p>
                    <p>
                        <img className="footerImage" src={Bill}/>
                        <a href="https://github.com/edenspring"><i className="fab fa-github-square" /> </a>
                        <a href="https://www.linkedin.com/in/bill-adams-40869120b/"><i className="fab fa-linkedin" /> </a>
                        Bill Adams </p>
                    <p>
                        <img className="footerImage" src={Felipe}/>
                        <a href="https://github.com/f-q-a/"><i className="fab fa-github-square" /> </a>
                        <a href="https://www.linkedin.com/in/felipe-q-araujo/"><i className="fab fa-linkedin" /> </a>
                        Felipe Araujo</p>

                </div>
            </div>

            <a href="https://github.com/f-q-a/discord-clone" className='footerRight'>
                <h1>Project Repo</h1>
                <i className="fab fa-github fa-2x" />
            </a>
        </div>
    )
}
