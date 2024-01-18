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
  content_type: ContentType;
}

export enum ContentType {
  ImageJPEG = "image/jpeg",
}

  export type EntryMeta = {
    name:              string;
    slug:              string;
    tags:              any[];
    type:              Type;
    uuid:              string;
    space:             Space;
    author:            Author;
    locale:            Locale;
    excerpt:           string;
    private:           boolean;
    category:          null;
    segments:          any[];
    created_at:        Date;
    updated_at:        Date;
    published_at:      Date;
    unpublish_at:      null;
    version_type:      VersionType;
    category_name:     null;
    category_slug:     null;
    available_locales: Locale[];
  }

  export type Author = {
  }

  export enum Locale {
    Es = "es",
  }

    export enum Space {
      Animals = "animals",
    }

      export enum Type {
        Game = "game",
      }

        export enum VersionType {
          Current = "current",
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
