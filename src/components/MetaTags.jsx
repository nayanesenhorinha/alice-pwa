import { useEffect } from "react";
import infos from "../control/book_infos";

const MetaTags = () => {
  useEffect(() => {
    document.title = infos.title;

    const updateMetaTag = (name, content) => {
      let metaTag = document.querySelector(`meta[name="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.name = name;
        document.head.appendChild(metaTag);
      }
      metaTag.content = content;
    };

    updateMetaTag("author", infos.author);
    updateMetaTag("description", infos.description);
    updateMetaTag("language", infos.language);
    updateMetaTag("copyright", infos.copyright || "Sem nome");
    updateMetaTag("identifier", infos.identifier || "2525");
    updateMetaTag("date", infos.date);
    updateMetaTag("format", infos.format);
    updateMetaTag("audience", infos.audience);
    updateMetaTag("genre", infos.genre.join(", "));

  }, []);

  return null; 
};

export default MetaTags;
