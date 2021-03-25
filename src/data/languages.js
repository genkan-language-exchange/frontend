// ISO 639-1, English readable exonym, endonym
const langPopular = [
  { code: "un", name: "Undecided", endonym: "未知" },
  { code: "en", name: "English", endonym: "English" },
  { code: "jp", name: "Japanese", endonym: "日本語" },
  { code: "zh", name: "Chinese Simplified", endonym: "中文 (简体)" },
  { code: "es", name: "Spanish", endonym: "Español" },
  { code: "ko", name: "Korean", endonym: "한국어" },
  { code: "fr", name: "French", endonym: "Français" },
  { code: "pt", name: "Portuguese", endonym: "Português" },
  { code: "de", name: "German", endonym: "Deutsch" },
  { code: "it", name: "Italian", endonym: "Italiano" },
  { code: "ru", name: "Russian", endonym: "русский" },
  { code: "ar", name: "Arabic", endonym: "العربية" },
]

const langAll = [
  { code: "af", name: "Afrikaans", endonym: "Afrikaans" },
  { code: "zz", name: "Chinese Traditional", endonym: "中文 (繁体字)" },
  { code: "cs", name: "Czech", endonym: "český jazyk" },
  { code: "da", name: "Danish", endonym: "dansk" },
  { code: "eo", name: "Esperanto", endonym: "Esperanto" },
  { code: "et", name: "Estonian", endonym: "eesti" },
  { code: "fi", name: "Finnish", endonym: "suomi" },
  { code: "gd", name: "Gaelic", endonym: "Gàidhlig" },
  { code: "el", name: "Greek", endonym: "ελληνικά" },
  { code: "ha", name: "Hawaiian", endonym: "ʻŌlelo Hawaiʻi" },
  { code: "he", name: "Hebrew", endonym: "עברית" },
  { code: "hv", name: "High Valarian", endonym: "High Valarian" },
  { code: "hi", name: "Hindi", endonym: "हिन्दी, हिंदी" },
  { code: "hu", name: "Hungarian", endonym: "magyar" },
  { code: "is", name: "Icelandic", endonym: "Íslenska" },
  { code: "ga", name: "Irish", endonym: "Gaeilge" },
  { code: "id", name: "Indonesian", endonym: "Bahasa Indonesia" },
  { code: "tt", name: "Klingon", endonym: "tlhIngan Hol" },
  { code: "la", name: "Latin", endonym: "lingua latīna" },
  { code: "nv", name: "Navajo", endonym: "Diné bizaad" },
  { code: "nd", name: "Ndebele", endonym: "isiNdebele" },
  { code: "no", name: "Norwegian", endonym: "Norsk" },
  { code: "po", name: "Polish", endonym: "polski" },
  { code: "ro", name: "Romanian", endonym: "Română" },
  { code: "so", name: "Somali", endonym: "Soomaaliga" },
  { code: "sw", name: "Swahili", endonym: "Kiswahili" },
  { code: "sv", name: "Swedish", endonym: "Svenska" },
  { code: "tl", name: "Tagalog", endonym: "Wikang Tagalog" },
  { code: "th", name: "Thai", endonym: "ภาษาไทย" },
  { code: "tr", name: "Turkish", endonym: "Türkçe" },
  { code: "uk", name: "Ukrainian", endonym: "Українська" },
  { code: "ur", name: "Urdu", endonym: "اردو" },
  { code: "vi", name: "Vietnamese", endonym: "Tiếng Việt" },
  { code: "cy", name: "Welsh", endonym: "Cymraeg" },
]

export {
  langPopular,
  langAll,
}