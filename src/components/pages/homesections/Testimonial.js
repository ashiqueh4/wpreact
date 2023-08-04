import React ,{useState,useEffect} from 'react'
import OwlCarousel from 'react-owl-carousel';  
import Spinner from '../Spinner';


const Testimonial = () => {

  const [testimonial,setTestimonial]=useState()
  const [loading,setLoading]=useState(true)
  const [testimonialtopdata,setTestimonialtopdata]=useState({testimonialTop: 'Our Team', testimonialTitle: 'Our Team Members'})
  const gettestimonial=()=>{
      fetch('http://wocommercew.local/graphql/', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              query: `query NewQuery {
                pages(where: {id: 75}) {
                  nodes {
                    homeTestimonial {
                      testimonialTop
                      testimonialTitle
                      testimonial {
                        testimonialImage {
                          mediaItemUrl
                        }
                        testimonialName
                        testimonialProfession
                        testimonialReview
                      }
                    }
                  }
                }
              }`
          })
      })
          .then(res => res.json())
          .then(res =>{
            if(res){
              setTestimonialtopdata({testimonialTop:res.data.pages.nodes[0].homeTestimonial.testimonialTop,testimonialTitle:res.data.pages.nodes[0].homeTestimonial.testimonialTitle})
              setTestimonial(res.data.pages.nodes[0].homeTestimonial.testimonial)
              setLoading(false)
            }
            
          }).catch((error) => {
            console.log(error)
          });
  }
  useEffect(()=>{
      gettestimonial()
  },[])




        //Owl Carousel Settings
        const options = {
            autoplay: true,
            smartSpeed: 1000,
            margin: 25,
            dots: false,
            loop: true,
            nav : true,
            navText : [
                '<i class="bi bi-chevron-left"></i>',
                '<i class="bi bi-chevron-right"></i>'
            ],
            responsive: {
                0:{
                    items:1
                },
                992:{
                    items:2
                }
            }
        };
  return (
    <>
    {/* Testimonial Start */}
    { loading ?<Spinner/>:

        <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container py-5 px-lg-5">
        <p className="section-title text-secondary justify-content-center">
          <span />
          { testimonialtopdata.testimonialTop }
          <span />
        </p>
        <h1 className="text-center mb-5">{ testimonialtopdata.testimonialTitle }</h1>
        
        <OwlCarousel className="owl-carousel testimonial-carousel"  {...options}>
          {testimonial && testimonial.map((item,index)=>{
            return(
              <div className="testimonial-item bg-light rounded my-4" key={index+"testimonial"}>
              <p className="fs-5">
                <i className="fa fa-quote-left fa-4x text-primary mt-n4 me-3" />
               { item.testimonialReview }
              </p>
              <div className="d-flex align-items-center">
                <img
                  className="img-fluid flex-shrink-0 rounded-circle"
                  src={item.testimonialImage.mediaItemUrl}
                  style={{ width: 65, height: 65 }}
                  alt='IMH'
                />
                <div className="ps-4">
                  <h5 className="mb-1">{ item.testimonialName }</h5>
                  <span>{ item.testimonialProfession }</span>
                </div>
              </div>
            </div>
            )
          })}
          </OwlCarousel>
      </div>
    </div>
      }
    {/* Testimonial End */}
    </>
  )
}

export default Testimonial