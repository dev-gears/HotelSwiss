export interface ILanguageOption {
  code: string;
  name: string;
}

export interface ILanguageDropdown {
  options: ILanguageOption[];
  onSelect: (language: string) => void;
}
