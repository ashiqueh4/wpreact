import React,{useState,useEffect} from 'react'
import Spinner from '../Spinner'
import CountUp from 'react-countup';


const Facts = () => {
  // useCountUp({
  //   ref: 'countUpRef',
  //   end: 1234567,
  //   enableScrollSpy: true,
  //   scrollSpyDelay: 1000,
  // });

    const [fact,setFact]=useState()
    const [loading,setLoading]=useState(true)
    const getfact=()=>{
        fetch('https://wocommercew.local/graphql/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                query: `query NewQuery {
                    pages(where: {id: 75}) {
                      edges {
                        node {
                          homeFacts {
                            factsNo1
                            factsText1
                            factsNo2
                            factsText2
                            factsNo3
                            factsText3
                            factsNo4
                            factsText4
                          }
                        }
                      }
                    }
                  }`
            })
        })
            .then(res => res.json())
            .then(res =>{
              setFact(res.data.pages.edges)
              setLoading(false)
            }).catch((error) => {
              console.log(error)
            });

    }
    useEffect(()=>{
        getfact()
    },[])



  return (
    <>
       {/* Facts Start */}
       {loading?<Spinner/>:fact && fact.map((item,index)=>{
        const finalitem= item.node.homeFacts
        return (
            <div
            className="container-xxl bg-primary fact py-5 wow fadeInUp"
            data-wow-delay="0.1s" key={index+"fact"}
          >
            <div className="container py-5 px-lg-5">
              <div className="row g-4">
                <div
                  className="col-md-6 col-lg-3 text-center wow fadeIn"
                  data-wow-delay="0.1s"
                >
                  <i className="fa fa-certificate fa-3x text-secondary mb-3" />
                  <h1 className="text-white mb-2" >
                    <CountUp start={15} end={finalitem.factsNo1} delay={0} enableScrollSpy >
                      {({ countUpRef }) => (
          
                          <span ref={countUpRef} />
              
                      )}
                    </CountUp>
                  </h1>
                  <p className="text-white mb-0">{ finalitem.factsText1 }</p>
                </div>

                <div
                  className="col-md-6 col-lg-3 text-center wow fadeIn"
                  data-wow-delay="0.3s"
                >
                  <i className="fa fa-users-cog fa-3x text-secondary mb-3" />
                  <h1 className="text-white mb-2">
                  <CountUp start={15} end={finalitem.factsNo2} delay={0} enableScrollSpy >
                      {({ countUpRef }) => (
          
                          <span ref={countUpRef} />
              
                      )}
                    </CountUp>
                  </h1>
                  <p className="text-white mb-0">{ finalitem.factsText2 }</p>
                </div>

                <div
                  className="col-md-6 col-lg-3 text-center wow fadeIn"
                  data-wow-delay="0.5s"
                >
                  <i className="fa fa-users fa-3x text-secondary mb-3" />
                  <h1 className="text-white mb-2" >
                  <CountUp start={15} end={finalitem.factsNo3} delay={0} enableScrollSpy >
                      {({ countUpRef }) => (
          
                          <span ref={countUpRef} />
              
                      )}
                    </CountUp>
                  </h1>
                  <p className="text-white mb-0">{ finalitem.factsText3 }</p>
                </div>

                <div
                  className="col-md-6 col-lg-3 text-center wow fadeIn"
                  data-wow-delay="0.7s"
                >
                  <i className="fa fa-check fa-3x text-secondary mb-3" />
                  <h1 className="text-white mb-2" >

                  <CountUp start={15} end={finalitem.factsNo4} delay={0} enableScrollSpy >
                      {({ countUpRef }) => (
          
                          <span ref={countUpRef} />
              
                      )}
                    </CountUp>
                  </h1>
                  <p className="text-white mb-0">{ finalitem.factsText4 }</p>
                </div>
 
              </div>
            </div>
          </div>
        )
       })}

    {/* Facts End */}
    </>
  )
}

export default Facts