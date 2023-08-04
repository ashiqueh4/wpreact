import React ,{ useState,useEffect,useRef} from 'react'
import Isotope from 'isotope-layout';

const Projects = () => {
    const [active, setActive] = useState('*')
      // init one ref to store the future isotope object
  const isotope = useRef()
  // store the filter keyword in a state
  const [filterKey, setFilterKey] = useState('*')


  // fetch:
const [project,setProject]=useState()
const [projectTopdata,setProjectTopdata]=useState({toptitle:"",title:""})
const [projectFilterdata,setProjectFilterdata]=useState()

  // handling filter key change
  useEffect(() => {
    fetch('https://wocommercew.local/graphql/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          query: `query NewQuery {
            pages(where: {id: 75}) {
              nodes {
                homeProject {
                  projectTopTitle
                  projectTitle
                  project {
                    projectTitle
                    projectSubTitle
                    projectImage {
                      mediaItemUrl
                    }
                    projectUrl
                    filterClassName
                  }
                  projectFilterText {
                    filterKeyText
                    filterText
                  }
                }
              }
            }
          }`
      })
  })
      .then(res => res.json())
      .then(res => 
        {
        setProjectFilterdata(res.data.pages.nodes[0].homeProject.projectFilterText)
        setProjectTopdata({toptitle:res.data.pages.nodes[0].homeProject.projectTopTitle,title:res.data.pages.nodes[0].homeProject.projectTitle})
        setProject(res.data.pages.nodes[0].homeProject.project)
        
        }
        ).catch((error) => {
          console.log(error)
        });
 
    isotope.current = new Isotope('.portfolio-container', {
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows',

    })
    filterKey === '*'
      ? isotope.current.arrange({filter: `*`})
      : isotope.current.arrange({filter: `.${filterKey}`})
          // cleanup
    return () => isotope.current.destroy()
  }, [filterKey])

  const handleFilterKeyChange = key => () =>{
    setFilterKey(key)
  setActive(key)
 
}

  return (
    <>
        {/* Projects Start */}
        <div className="container-xxl py-5">
      <div className="container py-5 px-lg-5">
        <div className="wow fadeInUp" data-wow-delay="0.1s">
          <p className="section-title text-secondary justify-content-center">
            <span />
            {projectTopdata ?projectTopdata.toptitle:"Our Projects"}
            <span />
          </p>
          <h1 className="text-center mb-5">{projectTopdata ?projectTopdata.title:"Recently Completed Projects"}</h1>
        </div>
        <div className="row mt-n2 wow fadeInUp" data-wow-delay="0.3s">
          <div className="col-12 text-center">
            <ul className="list-inline mb-5" id="portfolio-flters">
              { projectFilterdata && projectFilterdata.map((key,index)=>{
                return(
                  <li className={`mx-2 ${active ===key.filterKeyText && 'active'}`}   onClick={handleFilterKeyChange(key.filterKeyText)} key={index+"key"}>
                  { key.filterText}
                </li>
                )
              })}
          
            </ul>
          </div>
        </div>
        <div className="row g-4 portfolio-container" id='portfolio_container' >
        { project && project.map((item,index)=>{
          return (
            <div
            className={`col-lg-4 col-md-6 portfolio-item ${item.filterClassName} wow fadeInUp`}
            data-wow-delay="0.1s" key={index+"project"}
          >
            <div className="rounded overflow-hidden">
              <div className="position-relative overflow-hidden">
                <img
                  className="img-fluid w-100"
                  src={item.projectImage.mediaItemUrl}
                  alt=""
                />
                <div className="portfolio-overlay">
                  <a
                    className="btn btn-square btn-outline-light mx-1"
                    href={item.projectImage.mediaItemUrl}
                    data-lightbox="portfolio"
                  >
                    <i className="fa fa-eye" />
                  </a>
                  <a className="btn btn-square btn-outline-light mx-1" href={item.projectUrl}>
                    <i className="fa fa-link" />
                  </a>
                </div>
              </div>
              <div className="bg-light p-4">
                <p className="text-primary fw-medium mb-2">{item.projectSubTitle}</p>
                <h5 className="lh-base mb-0">
                {item.projectTitle}
                </h5>
              </div>
            </div>
          </div>
          )
        })}



        </div>
      </div>
    </div>

    {/* Projects End */}
    </>
  )
}

export default Projects