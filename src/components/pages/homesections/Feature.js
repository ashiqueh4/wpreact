import React,{useEffect,useState} from 'react'
import Spinner from '../Spinner'

const Feature = () => {
    const [feature,setFeature]=useState()
    const [loading,setLoading]=useState(true)
    const getfeature=()=>{
        fetch('http://wocommercew.local/graphql/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                query: `query NewQuery {
                    pages(where: {id: 75}) {
                      edges {
                        node {
                          homeFeature {
                            heading1
                            description1
                            icon1 {
                              mediaItemUrl
                            }
                            heading2
                            description2
                            icon2 {
                              mediaItemUrl
                            }
                            heading3
                            description3
                            icon3 {
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
              setFeature(res.data.pages.edges)
              setLoading(false)
            }).catch((error) => {
              console.log(error)
            });
    }
    useEffect(()=>{
        getfeature()
    },[])

  return (
    <>
      {/* Feature Start */}
      {loading?<Spinner/>:
      <div className="container-xxl py-5">
      <div className="container py-5 px-lg-5">
            {feature && feature.map((item,index)=>{
                 const finalitem= item.node.homeFeature
                return(
            <div className="row g-4" key={ index+"feature" }>     
           <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.1s">
            <div className="feature-item bg-light rounded text-center p-4">
              <i className="fa fa-3x fa-mail-bulk text-primary mb-4" />
              <h5 className="mb-3">{ finalitem.heading1 }</h5>
              <p className="m-0">
              { finalitem.description1 }
              </p>
            </div>
          </div>
          <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.3s">
            <div className="feature-item bg-light rounded text-center p-4">
              <i className="fa fa-3x fa-search text-primary mb-4" />
              <h5 className="mb-3">{ finalitem.heading2 }</h5>
              <p className="m-0">
              { finalitem.description2 }
              </p>
            </div>
          </div>
          <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.5s">
            <div className="feature-item bg-light rounded text-center p-4">
              <i className="fa fa-3x fa-laptop-code text-primary mb-4" />
              <h5 className="mb-3"> { finalitem.heading3 }</h5>
              <p className="m-0">
              { finalitem.description3 }
              </p>
            </div>
          </div>
          </div>
        
                )
            })}
     
       
      </div>
    </div>
   }
    {/* Feature End */}
    </>
  )
}

export default Feature