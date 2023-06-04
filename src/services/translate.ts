import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from "openai"
import { AUTO_LANG, SUPPORTED_LANGUAGES, type State } from "~/types.d"

interface Translate {
  translate: State
}

const API_KEY = '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'

export default async function translateService({ translate }: Translate) {
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

  
  const text = completion.data.choices[0].message?.content || ''
  // translate.translation = text
  translate.loading = false

  return text
}