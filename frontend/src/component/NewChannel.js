import React, { useEffect, useState } from 'react'
import News from './News'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import Auth from './Auth';


const NewChannel =(props)=> {
    Auth();

const[articles,setArticles]=useState([]);
const[loading,setLoading]=useState(true);
const[page,setPage]=useState(1);
const[totalResults,setTotalResults]=useState(0);

    const updatedata = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1972426bfa74497f8459b254b675cd7a&page=${page}&pageSize=6`;
        let data = await fetch(url);
        setLoading(true)
        let parseddata = await data.json();
        console.log(parseddata);
        setArticles( parseddata.articles);
        setTotalResults( parseddata.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(()=>{
        document.title = `DailyNews- ${props.category}`
         updatedata();
         // eslint-disable-next-line react-hooks/exhaustive-deps 
    },[])
  
    const fetchMoreData= async()=>{
        console.log("fetched data");
         const nextpage=page+1;
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1972426bfa74497f8459b254b675cd7a&page=${nextpage}&pageSize=6`;
        let data = await fetch(url);
      
        let parseddata = await data.json();
        console.log(parseddata);
        setArticles( articles.concat(parseddata.articles));
        setTotalResults( parseddata.totalResults);
        setPage(nextpage);
       
    }

    // previousbutton = async () => {
    //     await this.setState({
    //         page: this.state.page - 1,
    //     })
    //     this.updatedata();

    // }

    // nextbutton = async () => {
    //     await this.setState({
    //         page: this.state.page + 1,

    //     })
    //     console.log("hii");
    //     this.updatedata();

    // }
        return (
            <div>
             

             <div className='toptitle'><h1 className='title my-5'>Daily News-Top {props.category} Headlines </h1>
                {loading && <Spinner />} </div> 
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length >= totalResults? false : true}
                    loader={loading && <Spinner/>}
                > 
                    <div className='column'>
                        {!loading && articles.map((element,index) => {
                            return <div className='a' key={index}> <News title={element.title ? element.title.slice(0, 45) + "..." : ""} desc={element.description ? element.description.slice(0, 80) : " "} src={element.urlToImage} url={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} /></div>
                        })}
                    </div>
                    {/* <div className='bottom'>
                    <button disabled={this.state.loading || this.state.page <= 1} type='button' onClick={this.previousbutton} className='btn1'> &larr; </button>
                    <button disabled={this.state.loading || this.state.page + 1 > Math.ceil(this.state.totalResults / 9)} onClick={this.nextbutton} className='btn1'> &rarr;</button>
                </div> */}
                </InfiniteScroll>

            </div>
        )
   
}
 NewChannel.defaultProps = {
    country: "in",
    category: "general"
   
}

 NewChannel.propTypes = {
    country: PropTypes.string,
   

}
export default NewChannel