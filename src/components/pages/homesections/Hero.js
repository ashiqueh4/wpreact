import React,{useEffect,useState} from 'react'
import Spinner from '../Spinner'

const Hero = () => {
    const [hero,setHero]=useState()
    const [loading,setLoading]=useState(true)
    const getHero=()=>{
        fetch('https://wocommercew.local/graphql/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                query: `query NewQuery {
                    pages(where: {id: 75}) {
                      edges {
                        node {
                          id
                          hero {
                            heading
                            description
                            image {
                              altText
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
            .then(res => { 
              setHero(res.data.pages.edges)
              setLoading(false)
            }).catch((error) => {
              console.log(error)
            }).catch((error) => {
              console.log(error)
            });
    }
    useEffect(()=>{
        getHero()
    },[])

  return (
    <>
   
    { loading?<Spinner/>:hero && hero.map((hero,index)=>{
        const hero_data= hero.node.hero
        return (
            <div className="container-xxl bg-primary hero-header" key={index}>
            <div className="container px-lg-5">
              <div className="row g-5 align-items-end">
                <div className="col-lg-6 text-center text-lg-start">
                  <h1 className="text-white mb-4 animated slideInDown">
                    {hero_data.heading}
                  </h1>
                  <p className="text-white pb-3 animated slideInDown">
                    {hero_data.description}
                  </p>
                  <a
                    href="/"
                    className="btn btn-secondary py-sm-3 px-sm-5 rounded-pill me-3 animated slideInLeft"
                  >
                    Read More
                  </a>
                  <a
                    href="/contact"
                    className="btn btn-light py-sm-3 px-sm-5 rounded-pill animated slideInRight"
                  >
                    Contact Us
                  </a>
                </div>
                <div className="col-lg-6 text-center text-lg-start">
                  <img
                    className="img-fluid animated zoomIn"
                    src={hero_data.image.mediaItemUrl}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        )
    })}

    </>
  )
}

export default Hero