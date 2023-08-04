import React,{useState,useEffect} from 'react'
import Spinner from '../Spinner'

const Newsletter = () => {
        
    const [newsletter,setNewsletter]=useState()
    const [loading,setLoading]=useState(true)
    const getnewsletter=()=>{
        fetch('https://wocommercew.local/graphql/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                query: `query NewQuery {
                    pages(where: {id: 75}) {
                      edges {
                        node {
                          homeNewsletter {
                            newsletterTopTitle
                            newsletterTitle
                            newsletterDescription
                          }
                        }
                      }
                    }
                  }`
            })
        })
            .then(res => res.json())
            .then(res =>{ 
              setNewsletter(res.data.pages.edges)
              setLoading(false)
            }).catch((error) => {
              console.log(error)
            });
    }
    useEffect(()=>{
        getnewsletter()
    },[])

  return (
    <>
        {/* Newsletter Start */}
        { loading ?<Spinner/>:newsletter && newsletter.map((item,index)=>{
            const finalitem= item.node.homeNewsletter
            return(
                <div
                className="container-xxl bg-primary newsletter py-5 wow fadeInUp"
                data-wow-delay="0.1s" key={index+"newsletter"}
              >
                <div className="container py-5 px-lg-5">
                  <div className="row justify-content-center">
                    <div className="col-lg-7 text-center">
                      <p className="section-title text-white justify-content-center">
                        <span />
                        { finalitem.newsletterTopTitle }
                        <span />
                      </p>
                      <h1 className="text-center text-white mb-4">
                      { finalitem.newsletterTitle }
                      </h1>
                      <p className="text-white mb-4">
                      { finalitem.newsletterDescription }
                      </p>
                      <div className="position-relative w-100 mt-3">
                        <input
                          className="form-control border-0 rounded-pill w-100 ps-4 pe-5"
                          type="text"
                          placeholder="Enter Your Email"
                          style={{ height: 48 }}
                        />
                        <button
                          type="button"
                          className="btn shadow-none position-absolute top-0 end-0 mt-1 me-2"
                        >
                          <i className="fa fa-paper-plane text-primary fs-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            )
        })}

    {/* Newsletter End */}
    </>
  )
}

export default Newsletter