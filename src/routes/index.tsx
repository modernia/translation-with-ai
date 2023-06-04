import { $, component$, useStore } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import translateService from '~/services/translate';

import SelectLanguage from '~/components/SelectLanguage';
import ChangeIcon from '~/components/icons/ChangeIcon';
import { AUTO_LANG, FromLanguage, Language, type State } from '~/types.d';


const API_KEY = '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'
const URL = 'https://api.openai.com/v1/images/generations'

export default component$(() => {
  const translate: State = useStore({
    fromLanguage: AUTO_LANG,
    toLanguage: 'en',
    text: '',
    translation: '',
    loading: false    
  })



  const handleInput = $((e) => {
    translate.text = e.target.value
  })


  const handleChangeLanguage = $(() => {
    if (translate.fromLanguage === AUTO_LANG) {
      alert('You must select a language')
      return
    }
    const temp = translate.fromLanguage 
    translate.fromLanguage = translate.toLanguage as FromLanguage
    translate.toLanguage = temp as Language
  })

  const handleSetToLanguage = $((lang: Language) => {
    translate.toLanguage = lang
  })

  const handleSetFromLanguage = $((lang: FromLanguage) => {
    translate.fromLanguage = lang
  })


  const handleTranslate = $(async () => {
    translate.loading = true
    translate.translation = await translateService({translate})
  })



  return (
    <main class='mx-auto w-full'>
     <h1 class='text-5xl font-bold' >Translate your phrases with AI</h1>

      <div class=' flex gap-2 w-[600px] mx-auto mt-10 justify-between' >
        <div class='flex flex-col gap-2'>
          <SelectLanguage isFrom onChange={handleSetFromLanguage} value={translate.fromLanguage}/>
          <textarea 
            class='w-60 bg-transparent border-[1px] border-gray-700 min-h-[200px] rounded-lg resize-none outline-none text-white p-2'            
            onChange$={handleInput}
          />
        </div>

        <div class='relative'> 
          <button 
            class=' px-5 py-2 cursor-pointer '
            disabled={translate.fromLanguage === AUTO_LANG}
            onClick$={handleChangeLanguage}
          ><ChangeIcon  /></button>
        </div>

        <div class='flex flex-col gap-2'>
          <SelectLanguage onChange={handleSetToLanguage} value={translate.toLanguage}/>
          <textarea
            class='w-60 bg-gray-600 border-[1px] border-gray-800 min-h-[200px] rounded-lg resize-none outline-none text-white p-2'
            value={translate.translation}
            disabled
          />
        </div>        
      </div>

      <div class='flex justify-center mt-10'>
        <button
          class='px-5 py-2 bg-slate-700 rounded-lg text-white'
          onClick$={handleTranslate}
          disabled={translate.loading}
          >Translate</button>
      </div>
      
     
    </main>
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
