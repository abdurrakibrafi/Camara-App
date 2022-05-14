import {useRef,useState,useEffect} from 'react'
function App() {
  const videoref = useRef(null)
  const photoref =useRef (null)
  
  const[hasPhoto,sethasPhoto]=useState(false)
  
  const getVideo =()=>{
          navigator.mediaDevices
          .getUserMedia({
            video : {width:1990,height:1009}
          })
          .then( stream => {
                  let video =videoref.current;
                  video.srcObject=stream
                  video.play()
          })
          .catch(err => {
            console.error(err)
          })
  }
   
  const takePhoto =()=>{
    const width=414;
    const height= width /(16/9);

    let video =videoref.current
    let photo=photoref.current

    photo.width=width;
    photo.height=height;
    let ctx=photo.getContext('2d');
    ctx.drawImage(video,0,0,width,height);
    sethasPhoto(true)
  }

  const closePhoto=()=>{
    let photo = photoref.current

    let ctx=photo.getContext('2d')
    ctx.clearRect(0,0,photo.width,photo.height)
    sethasPhoto(false)
  
  }

    useEffect(() => {
      getVideo()
    },[videoref])

  return (
    <div className="App">
    <div className="camara">
        <video ref={videoref}>
        </video>
        <button onClick={takePhoto}>Capture</button>
    </div>
    <div className={'result' + (hasPhoto ? 'hasPhoto' : '')}   >
          <canvas ref={photoref}></canvas>
           <button onClick={closePhoto}>Close</button>
    </div>
    </div>
  );
}

export default App;
