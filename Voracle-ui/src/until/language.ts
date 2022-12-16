import data from "../i18n";
export default function f(id: string) {
  const config: any = data;
  if (!config?.[id]) return "";
  const str =  config?.[id]
  return str
}
