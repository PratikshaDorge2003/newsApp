import React from 'react'
import NewsItem from './NewsItem'
import Auth from './Auth';

const News=(props)=> {
         
        Auth();
        let { title, desc, src, url,author,publishedAt,source } = props;
       
        return (

            <>
                <div className=' newscomp mx-4'>
                    <div><img className='image' alt='' src={src?src:"https://m.media-amazon.com/images/I/71sgtpB-rxL.jpg"} /></div>
                    <div className='item'><h5>{title}</h5></div>
                    <h6 className='source'>{source}</h6>
                    <div className='my-2'>
                        <NewsItem desc={desc} />
                    </div>
                    <div className='item' ><h6>By {!author?"Unknown":author} on {new Date(publishedAt).toGMTString()} </h6>
                    
                    </div>
                    <a href={url} target="_blank" rel="noreferrer" className='newsbtn'>Read More</a>
                </div>

            </>

        )
   
}
export default News