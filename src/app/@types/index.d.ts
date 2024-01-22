export type Result = {
  entries: Entry[];
  meta:    ResultMeta;
}

export type Entry = {
  meta:   EntryMeta;
  fields: Fields;
}

export type Fields = {
  image: Image;
}

export type Image = {
  url:          string;
  tags:         any[];
  uuid:         string;
  title:        string;
  alt_text:     null;
  description:  null;
  content_type: string;
}

  export type EntryMeta = {
    name:              string;
    slug:              string;
    tags:              any[];
    type:              string;
    uuid:              string;
    space:             string;
    author:            Author;
    locale:            string;
    excerpt:           string;
    private:           boolean;
    category:          null;
    segments:          any[];
    created_at:        string;
    updated_at:        string;
    published_at:      string;
    unpublish_at:      null;
    version_type:      VersionType;
    category_name:     null;
    category_slug:     null;
    available_locales: string[];
  }

  export type Author = {
  }


          export type ResultMeta = {
            total_entries: number;
            per_page:      number;
            current_page:  number;
            total_pages:   number;
          }

export type Card = {
  uuid: string;
  index: number;
}
