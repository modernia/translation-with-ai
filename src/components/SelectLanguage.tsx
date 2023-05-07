import { $, component$ } from "@builder.io/qwik";
import { AUTO_LANG, FromLanguage, SUPPORTED_LANGUAGES } from "~/types.d";

interface SelectLanguageProps {
  isFrom?: boolean;
  onChange?: any;
  value?: FromLanguage;
}

export default component$(({isFrom, onChange, value}: SelectLanguageProps) => {

  const handleChange = $((e) => {
    onChange(e.target.value)
  })

  return (
    <select class='bg-slate-700 px-3 py-1 rounded-md' onChange$={handleChange} value={value}>
      {isFrom && <option value={AUTO_LANG}>Auto</option>}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => (
        <option value={key}>{value}</option>
      ))}
    </select>      
  )
});