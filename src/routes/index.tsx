import { $, component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

const API_KEY = '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'
const URL = 'https://api.openai.com/v1/images/generations'
/**
curl https://api.openai.com/v1/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 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" \
  -d '{
    "prompt": "a image of Modernia from the game Nikke: The Goddess of Victory",
    "n": 2,
    "size": "1024x1024"
  }' 


*/

export default component$(() => {
  const input = useSignal('')
  const image = useSignal(null)


  const handleSubmit = $(() => {
    image.value = null
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        prompt: 'an image of the space',
        n: 2,
        size: '1024x1024'
      })
    }).then(res => res.json()).then(res => image.value = res.data[0].url)
  })

  


  
  





  

  return (
    <>
     <h1>Image generator</h1>
      <input type='text' placeholder='generate an sunshine image' value={input.value} onChange$={(e) => input.value = e?.target?.value} />
      <button onClick$={handleSubmit}>Generate</button>
     {image.value && <img src={image.value} />}
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
