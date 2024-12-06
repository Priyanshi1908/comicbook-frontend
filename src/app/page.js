'use client';

   import { useState } from 'react';

   export default function Home() {
     const [openaiKey, setOpenaiKey] = useState('');
     const [togetherApiKey, setTogetherApiKey] = useState('');
     const [comicIdea, setComicIdea] = useState('');
     const [loading, setLoading] = useState(false);
     const [images, setImages] = useState([]);
     const [texts, setTexts] = useState([]);

     const handleSubmit = async (event) => {
       event.preventDefault();
       setLoading(true);

       const response = await fetch('/api/generate', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ openaiKey, togetherApiKey, comicIdea })
       });

       if (response.ok) {
         const data = await response.json();
         setImages(data.images);
         setTexts(data.texts);
       } else {
         alert('Error: ' + await response.text());
       }

       setLoading(false);
     };

     return (
       <div>
         <h1>Comic Book Image Generator</h1>
         <form onSubmit={handleSubmit}>
           <input type="text" placeholder="OpenAI API Key" value={openaiKey} onChange={(e) => setOpenaiKey(e.target.value)} required />
           <input type="text" placeholder="Together AI API Key" value={togetherApiKey} onChange={(e) => setTogetherApiKey(e.target.value)} required />
           <input type="text" placeholder="Comic Book Idea" value={comicIdea} onChange={(e) => setComicIdea(e.target.value)} required />
           <button type="submit">Generate Images</button>
         </form>
         {loading && <p>Loading...</p>}
         <div id="images">
           {images.map((base64Image, index) => (
             <div key={index} className="image-container">
               <img src={`data:image/png;base64,${base64Image}`} alt={`Comic Scene ${index + 1}`} />
               <p>{texts[index]}</p>
             </div>
           ))}
         </div>
       </div>
     );
   }