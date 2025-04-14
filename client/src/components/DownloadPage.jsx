import React from 'react';
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';
import './DownloadPage.css';


export const dwnldFileDocument = (pageId, dwnldFileName, ref1, ref2, ref3, ref4)=>{
    const input = document.getElementById(pageId);
    const downloadButton = document.getElementById("download-btn-"+pageId);

    //hide button before printing
    if (downloadButton) downloadButton.style.visibility = "hidden";
    if (ref1.current) ref1.current.style.visibility = "hidden";
    if (ref2.current) ref2.current.style.visibility = "hidden";
    if (ref3.current) ref3.current.style.visibility = "hidden";
    if (ref4.current) ref4.current.style.visibility = "hidden";

    html2canvas(input).then((canvas)=>{
        const imageData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "pt", "a4");
                
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        // Scale image to fit within PDF page while maintaining aspect ratio
        const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
        const scaledWidth = imgWidth * ratio;
        const scaledHeight = imgHeight * ratio;

        const xOffset = (pageWidth - scaledWidth) / 2;
        const yOffset = (pageHeight - scaledHeight) / 2;

        pdf.addImage(imageData, 'PNG', xOffset, yOffset, scaledWidth, scaledHeight);
        pdf.save(`${dwnldFileName}.pdf`);

        //show button again
        if (downloadButton) downloadButton.style.visibility = "visible";
        if (ref1.current) ref1.current.style.visibility = "visible";
        if (ref2.current) ref2.current.style.visibility = "visible";
        if (ref3.current) ref3.current.style.visibility = "visible";
        if (ref4.current) ref4.current.style.visibility = "visible";
    });
};

const DownloadPage = ({pageId, dwnldFileName, ref1, ref2, ref3, ref4}) => {
  return (
    <div className="dwnld-btn-outer">
        <button 
            id={`download-btn-${pageId}`} 
            onClick={()=>{dwnldFileDocument(pageId, dwnldFileName, ref1, ref2, ref3, ref4)}}
            className='download-btn'
        >
            Download Project Details
        </button>
    </div>
  );
}

export default DownloadPage;
