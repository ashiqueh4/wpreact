import React,{useState,useEffect} from 'react'
import Spinner from '../Spinner'
import { Link } from 'react-router-dom'

const Service = () => {
    
    const [service,setService]=useState()
    const [loading,setLoading]=useState(true)
    const getservice=()=>{
        fetch('https://wocommercew.local/graphql/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                query: `query NewQuery {
                    pages(where: {id: 75}) {
                      edges {
                        node {
                          homeService {
                            topTitle
                            serviceTitle
                            itemSubTitle1
                            itemTitle1
                            itemSubTitle2
                            itemTitle2
                            itemSubTitle3
                            itemTitle3
                            itemSubTitle4
                            itemTitle4
                            itemSubTitle5
                            itemTitle5
                            itemSubTitle6
                            itemTitle6
                          }
                        }
                      }
                    }
                  }`
            })
        })
            .then(res => res.json())
            .then(res =>{
              setService(res.data.pages.edges)
              setLoading(false)
            }).catch((error) => {
              console.log(error)
            });
    }
    useEffect(()=>{
        getservice()
    },[])

  return (
    <>
        {/* Service Start */}
        {loading?<Spinner/>:service && service.map(( item,index )=>{
            const finalitem= item.node.homeService
            return(
                <div className="container-xxl py-5" key={index+"service"}>
                <div className="container py-5 px-lg-5">
                  <div className="wow fadeInUp" data-wow-delay="0.1s">
                    <p className="section-title text-secondary justify-content-center">
                      <span />
                      { finalitem.topTitle }
                      <span />
                    </p>
                    <h1 className="text-center mb-5">{ finalitem.serviceTitle }</h1>
                  </div>
                  <div className="row g-4">
                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                      <div className="service-item d-flex flex-column text-center rounded">
                        <div className="service-icon flex-shrink-0">
                          <i className="fa fa-search fa-2x" />
                        </div>
                        <h5 className="mb-3">{ finalitem.itemSubTitle1 }</h5>
                        <p className="m-0">
                          { finalitem.itemTitle1 }
                        </p>
                    
                        <Link to={'#'} className="btn btn-square"><i className="fa fa-arrow-right" /></Link>

                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                      <div className="service-item d-flex flex-column text-center rounded">
                        <div className="service-icon flex-shrink-0">
                          <i className="fa fa-laptop-code fa-2x" />
                        </div>
                        <h5 className="mb-3">{ finalitem.itemSubTitle2 }</h5>
                        <p className="m-0">
                        { finalitem.itemTitle2 }
                        </p>
                  
                        <Link to={'#'} className="btn btn-square"><i className="fa fa-arrow-right" /></Link>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                      <div className="service-item d-flex flex-column text-center rounded">
                        <div className="service-icon flex-shrink-0">
                          <i className="fab fa-facebook-f fa-2x" />
                        </div>
                        <h5 className="mb-3">{ finalitem.itemSubTitle3 }</h5>
                        <p className="m-0">
                        { finalitem.itemTitle3 }
                        </p>
                     
                        <Link to={'#'} className="btn btn-square"><i className="fa fa-arrow-right" /></Link>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                      <div className="service-item d-flex flex-column text-center rounded">
                        <div className="service-icon flex-shrink-0">
                          <i className="fa fa-mail-bulk fa-2x" />
                        </div>
                        <h5 className="mb-3">{ finalitem.itemSubTitle4 }</h5>
                        <p className="m-0">
                        { finalitem.itemTitle4 }
                        </p>
                
                        <Link to={'#'} className="btn btn-square"><i className="fa fa-arrow-right" /></Link>

                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                      <div className="service-item d-flex flex-column text-center rounded">
                        <div className="service-icon flex-shrink-0">
                          <i className="fa fa-thumbs-up fa-2x" />
                        </div>
                        <h5 className="mb-3">{ finalitem.itemSubTitle5 }</h5>
                        <p className="m-0">
                        { finalitem.itemTitle5 }
                        </p>
                    
                        <Link to={'#'} className="btn btn-square"><i className="fa fa-arrow-right" /></Link>

                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                      <div className="service-item d-flex flex-column text-center rounded">
                        <div className="service-icon flex-shrink-0">
                          <i className="fab fa-android fa-2x" />
                        </div>
                        <h5 className="mb-3">{ finalitem.itemSubTitle6 }</h5>
                        <p className="m-0">
                        { finalitem.itemTitle6 }
                        </p>
                  
                        <Link to={'#'} className="btn btn-square"><i className="fa fa-arrow-right" /></Link>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
        })}

    {/* Service End */}
    </>
  )
}

export default Service