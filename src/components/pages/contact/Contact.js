import React, { useRef,useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
const [formerr,setFoemerr]=useState()
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_raon96v', 'template_71kna1l', form.current, 'yQ0DwNmpjpvoPlg_X')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
          setFoemerr(error.text)
      });
      e.target.reset()
  };

  return (
    <>
    {/* Contact Start */}
    <div className="container-xxl py-5">
      <div className="container py-5 px-lg-5">
        <div className="wow fadeInUp" data-wow-delay="0.1s">
          <p className="section-title text-secondary justify-content-center">
            <span />
            Contact Us
            <span />
          </p>
          <h1 className="text-center mb-5">Contact For Any Query</h1>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="wow fadeInUp" data-wow-delay="0.3s">
              {formerr && (<p className="text-center mb-4">
              { formerr }
              </p>)}
              <form ref={form} onSubmit={sendEmail} >
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                        name="user_name"
                        required
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Your Email"
                        name="user_email"
                        required
                      />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        placeholder="Subject"
                        name="user_subject"
                        required
                      />
                      <label htmlFor="subject">Subject</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Leave a message here"
                        id="message"
                        style={{ height: 150 }}
                        defaultValue={""}
                        name="user_message"
                        required
                      />
                      <label htmlFor="message">Message</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100 py-3" type="submit">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Contact End */}
  </>
  
  )
}

export default Contact