import React ,{useEffect,useState} from 'react'
import Spinner from '../pages/Spinner';
import { Hero } from '../pages/homesections';
import Heros from '../pages/Heros';



const Header = () => {
    const [menu,setMenu]=useState()

    const flatListToHierarchical = (
      data = [],
      {idKey='key',parentKey='parentId',childrenKey='children'} = {}
  ) => {
      const tree = [];
      const childrenOf = {};
      data.forEach((item) => {
          const newItem = {...item};
          const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;
          childrenOf[id] = childrenOf[id] || [];
          newItem[childrenKey] = childrenOf[id];
          parentId
              ? (
                  childrenOf[parentId] = childrenOf[parentId] || []
              ).push(newItem)
              : tree.push(newItem);
      });
      return tree;
  };

    const getmenu=()=>{
        fetch('https://wocommercew.local/graphql/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                query: `
                  query MENU_ITEMS {
                    menuItems(where: {location: PRIMARY}) {
                      nodes {
                        key: id
                        parentId
                        title: label
                        url
                      }
                    }
                  }`
            })
        })
            .then(res => res.json())
            .then(res =>{
              const hierarchicalList = flatListToHierarchical(res.data.menuItems.nodes);
              setMenu(hierarchicalList)
            }).catch((error) => {
              console.log(error)
            })
            ;
    }
    useEffect(()=>{
        getmenu()
    })

  return (
    <>
   <Spinner/>
    {/* Navbar & Hero Start */}
    <div className="container-xxl position-relative p-0">
      <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
        <a href="/" className="navbar-brand p-0">
          <h1 className="m-0">DGital</h1>
          {/* <img src="img/logo.png" alt="Logo"> */}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="fa fa-bars" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav mx-auto py-0">
            { menu && menu.map((items)=>{
              const check=items.children;
                return(
                
                 <div key={items.key}>
                 { check.length === 0 ?(<a  href={items.title ==="home"?"/":items.title.replaceAll(/ /g,"-")} className={`nav-item nav-link ${ items.title === "home" ?"active":"" }`}>
                    { items.title }
                  </a>):(
                      <div className="nav-item dropdown">
                      <a href="/" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">{ items.title }</a>
                      <div className="dropdown-menu m-0">
                      { check.map((childrenm)=>{
                        return(
                          <a href={childrenm.title.replaceAll(/ /g,"-")} key={childrenm.key} className="dropdown-item">{childrenm.title}</a>
                        )
                      })}
                    

                      </div>
                  </div>
                  )}
           
           </div>
                )
            })
            }

          </div>
          <a href="/" className="btn rounded-pill py-2 px-4 ms-3 d-none d-lg-block">
            Get Started
          </a>
      
        </div>
      </nav>
      { window.location.pathname ==="/" ? <Hero/>:<Heros/>}
    </div>
    {/* Navbar & Hero End */}

</>

  )
}

export default Header