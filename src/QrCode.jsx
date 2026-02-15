import { useState } from 'react';
import './QrCode.css'
export const QrCode=()=>{


    const [img,setImg]=useState("")
    const [loading,setLoading]=useState(false)
    const [qrdata,setQrdata]=useState("joes")
    const [qrSize,setQrsize]=useState("150")

    async function generateQR(){
        setLoading(true);
        try{
            const url=`https://api.qrserver.com/v1/create-qr-code/?${qrSize}x${qrSize}&data=${encodeURIComponent(qrdata)}`;
            setImg(url);
        }catch(error){
            console.error("Error generating QR Code",error)
        }finally{
            setLoading(false);
        }
    }
    function downloadQr(){
        fetch(img)
        .then((response)=>response.blob())
        .then((blob)=>{
            const link=document.createElement("a");
            link.href=URL.createObjectURL(blob);
            link.download="qrcode.png"
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link)
        });
    }
    

    return(
        <div className="app-container"> 
        <h1> QR CODE GENERATOR</h1>
        {loading&&<p>Please Wait....</p>}
        {img && <img className="qr-code-image" src={img}/>}
            <div>
                <label htmlFor="dataInput" className="input-label">
                    Enter the data for the QR code 
                </label>
                <input type="text" id="dataInput" placeholder="Enter data for QR code" value={qrdata} onChange={(e)=>setQrdata(e.target.value)}/>
                <label htmlFor="sizeInput" className="input-label">
                    Enter the image size(e.g., 150)
                </label>
                <input type="text" id="sizeInput" placeholder="Enter image size" value={qrSize} onChange={(e)=>{setQrsize(e.target.value)}}/>
                <div className='button-group'>
                    <button className='generate-button' onClick={generateQR}
                    disabled={loading}>Generate QR Code
                    </button>
                    <button className='download-button'onClick={downloadQr}>Download QR Code
                    </button>
                </div>

            </div>
            <p className='footer'>Designed By <a href='https://chandraprakash-r-portfolio.netlify.app/'>Chan</a></p>
        </div>
    )
}