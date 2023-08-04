import React ,{useState,useEffect}from 'react'
import Spinner from '../Spinner'

const Team = () => {

  const [team,setTeam]=useState()
  const [loading,setLoading]=useState(true)
  const getteam=()=>{
      fetch('https://wocommercew.local/graphql/', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              query: `query NewQuery {
                pages(where: {id: 75}) {
                  nodes {
                    homeTeam {
                      teamMember {
                        teamMemberName
                        teamMemberProfession
                        memberFacebook
                        memberTwitter
                        memberInstagram
                        memberLinkedin
                        memberImage {
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
             setTeam(res.data.pages.nodes[0].homeTeam.teamMember)
             setLoading(false)
            }).catch((error) => {
              console.log(error)
            });
  }
  useEffect(()=>{
      getteam()
  },[])

  return (
    <>
        {/* Team Start */}
        {loading?<Spinner/>:
        <div className="container-xxl py-5">
      <div className="container py-5 px-lg-5">
        <div className="wow fadeInUp" data-wow-delay="0.1s">
          <p className="section-title text-secondary justify-content-center">
            <span />
            Our Team
            <span />
          </p>
          <h1 className="text-center mb-5">Our Team Members</h1>
        </div>
        <div className="row g-4">
          {team && team.map((team,index)=>{
        
            return(
              <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" key={index+"team"}>
              <div className="team-item bg-light rounded">
                <div className="text-center border-bottom p-4">
                  <img
                    className="img-fluid rounded-circle mb-4"
                    src={team.memberImage.mediaItemUrl}
                    alt=""
                  />
                  <h5>{team.teamMemberName}</h5>
                  <span>{ team.teamMemberProfession }</span>
                </div>
                <div className="d-flex justify-content-center p-4">
                  <a className="btn btn-square mx-1" href={ team.memberFacebook?team.memberFacebook:"#"}>
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a className="btn btn-square mx-1" href={ team.memberTwitter?team.memberTwitter:"#"}>
                    <i className="fab fa-twitter" />
                  </a>
                  <a className="btn btn-square mx-1" href={ team.memberInstagram?team.memberInstagram:"#"}>
                    <i className="fab fa-instagram" />
                  </a>
                  <a className="btn btn-square mx-1" href={ team.memberLinkedin?team.memberLinkedin:"#"}>
                    <i className="fab fa-linkedin-in" />
                  </a>
                </div>
              </div>
            </div>
            )
          })}



        </div>
      </div>
    </div>
}
    {/* Team End */}
    </>
  )
}

export default Team