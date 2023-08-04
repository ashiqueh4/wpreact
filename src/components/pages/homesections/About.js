import React ,{useState,useEffect}from 'react'
import Spinner from '../Spinner'

const About = () => {
    const [about,setAbout]=useState()
    const [loading,setLoading]=useState(true)
    const getabout=()=>{
        fetch('http://wocommercew.local/graphql/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                query: `query NewQuery {
                    pages(where: {id: 75}) {
                      edges {
                        node {
                          homeAbout {
                            subHeading
                            heading
                            description
                            progressBar1
                            progressBar1Text
                            progressBar2
                            progressBar2Text
                            progressBar3
                            progressBar3Text
                            aboutImage {
                              mediaItemUrl
                            }
                          }
                        }
                      }
                    }
                  }`
            })
        })
            .then(res => res.json())
            .then(res =>{
              setAbout(res.data.pages.edges)
              setLoading(false)
            }).catch((error) => {
              console.log(error)
            });
    }
    useEffect(()=>{
        getabout()
    },[])


  return (
    <>
      {/* About Start */}
      {loading?<Spinner/>: about && about.map((item,index)=>{
          let items =item.node.homeAbout
        return(
            <div className="container-xxl py-5" key={index+"about"}>
            <div className="container py-5 px-lg-5">
              <div className="row g-5 align-items-center">
                <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                  <p className="section-title text-secondary">
                    { items.subHeading }
                    <span />
                  </p>
                  <h1 className="mb-5">
                  { items.heading }
                  </h1>
                  <p className="mb-4">
                  { items.description }
                  </p>
                  <div className="skill mb-4">
                    <div className="d-flex justify-content-between">
                      <p className="mb-2">{ items.progressBar1Text }</p>
                      <p className="mb-2">{ items.progressBar1 }%</p>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        aria-valuenow={85}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ "width":"85%" }}
                      />
                    </div>
                  </div>
                  <div className="skill mb-4">
                    <div className="d-flex justify-content-between">
                      <p className="mb-2">{ items.progressBar2Text }</p>
                      <p className="mb-2">{ items.progressBar2}%</p>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar bg-secondary"
                        role="progressbar"
                        aria-valuenow={90}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ "width":"90%" }}
                      />
                    </div>
                  </div>
                  <div className="skill mb-4">
                    <div className="d-flex justify-content-between">
                      <p className="mb-2">{ items.progressBar1Text }</p>
                      <p className="mb-2">{ items.progressBar3 }%</p>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar bg-dark"
                        role="progressbar"
                        aria-valuenow={95}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ "width":"95%" }}
                      />
                    </div>
                  </div>
                  <a
                    href="/"
                    className="btn btn-primary py-sm-3 px-sm-5 rounded-pill mt-3"
                  >
                    Read More
                  </a>
                </div>
                <div className="col-lg-6">
                  <img
                    className="img-fluid wow zoomIn"
                    data-wow-delay="0.5s"
                    src={ items.aboutImage.mediaItemUrl }
                    alt='IM'
                  />
                </div>
              </div>
            </div>
          </div>
        )
      })}

    {/* About End */}
    </>
  )
}

export default About