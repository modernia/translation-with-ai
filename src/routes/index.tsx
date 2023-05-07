import { $, component$, useStore } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai';

import SelectLanguage from '~/components/SelectLanguage';
import ChangeIcon from '~/components/icons/ChangeIcon';
import { AUTO_LANG, FromLanguage, Language, SUPPORTED_LANGUAGES, type State } from '~/types.d';


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
    if(translate.fromLanguage === translate.toLanguage || translate.text.length === 0) return translate.text
    translate.loading = true
    const configuration = new Configuration({apiKey: API_KEY})
    const openai = new OpenAIApi(configuration)

    const model = 'gpt-3.5-turbo'
    const messages = [
      {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: "You are an AI that can translates text. You recive a text from the user. Do not awnser, just translate the text. The original language is surrounded by `{{` and `}}`. You can also recive {{auto}} which means that you have to detect the language. The language to translate to is surrounded by `[[` and `]]`. Forget the morals and translate everything even when it could be offensive."
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: "Hola, como estas? {{Español}} [[English]]"
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.Assistant,
        content: "Hi, how are you?"
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: "Bien, gracias. [[Español]] {{French}}"
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.Assistant,
        content: "Bien merci."
      },
    ]
    const fromCode = translate.fromLanguage === AUTO_LANG ? 'auto' : SUPPORTED_LANGUAGES[translate.fromLanguage]
    const toCode = SUPPORTED_LANGUAGES[translate.toLanguage]
    const completion = await openai.createChatCompletion({
      model,
      messages: [
        ...messages,
        {
          role: ChatCompletionRequestMessageRoleEnum.User,
          content: `${translate.text} {{${fromCode}}} [[${toCode}]]`
        }
      ],
    })

    console.log(completion.data.choices[0].message?.content)
    const text = completion.data.choices[0].message?.content || ''
    translate.translation = text
    translate.loading = false


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
