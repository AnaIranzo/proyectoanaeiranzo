import Navbar1 from "./Navbar"
import { useState } from 'react'


function Contact() {
    let [input, setInput] = useState("")

    let [init, setInit] = useState([])


    return (
        <>
            <Navbar1 />

            <div className="container__prod">
                <div className="card__contact">
                    <h2>Contact us</h2>
                    <h3>How can we help you?</h3>
                    <p className="p__contact">Name</p>
                    <input type="text" placeholder="name" onChange={e => setInput(e.target.value)} />

                    <p className="p__contact">Email</p>
                    <input type="email" placeholder="email" />

                    <p className="p__contact">Message</p>
                    <textarea cols="33" rows="5" type="text" placeholder="message" />
                    <div><button type="button" className="btn" onClick={() => {
                        let arrayNew = [...init, input]

                        setInit(arrayNew)
                        setInput("")
                        window.alert(`${input}, Thank you for your message, we will respond shortly`)
                    }}>Accept</button></div>

                </div>
            </div>
        </>
    )
}

export default Contact