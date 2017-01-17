import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable()
export class MediumService {
  feedUrl: string = 'https://medium.com';
  token: string;
  fetchOptions: FetchOptions = {
    headers: {
      'Authorization': `Bearer ${this.token}`
    }
  };

  constructor(private http: Http) {}

  getPosts({user, limit, to, source, collectionId}: {user: string, limit?: string, to?: string, source?: string, collectionId?: string}): Observable<Post[]> {
    const params: any = Object.assign({}, arguments['0']);
    delete params.user;
    const requestUrl = `${this.feedUrl}/${user}/latest?${serialize(params)}`;
    console.log('[Medium] Getting posts for ' + user + ` from ${requestUrl}`);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({headers: headers});
    return this.http.get(requestUrl, options)
      .do(res => console.log(res))
      .map((res) => stripJSONPrefix(res))
      .map((res) => JSON.parse(res))
      .map((data) => {
        const PostObject = data.payload.references.Post;
        const posts = [];

        // Split the Post object into an array of posts
        // todo: Is there a better way to do this?
        for (let post in PostObject) {
          if (PostObject.hasOwnProperty(post)) {

            // appending accountName to post object to ease generation of post url
            posts.push(Object.assign({}, PostObject[post], {accountName: user}));
          }
        }
        return posts;
      });
  }
}

function stripJSONPrefix(response: Response): Promise<string> {
  return new Promise((resolve, reject) => {
    response.text()
      .then((prefixedString: string) => prefixedString.replace('])}while(1);</x>', ''))
      .then(resolve);
  });
}
function serialize(obj: any): string {
  const str = [];
  for (let p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
}


interface FetchOptions {
  headers: any;
  method?: 'GET' | 'POST' | 'DELETE' | 'PUT';
  redirect?: 'follow' | 'manual' | 'error';
  body?: any;
}
interface LatestResponse {
  success: boolean;
  payload: {
    user: any;
    streamItems: any;
    userMeta: any;
    userNavActiveIndex: number;
    profileTypeName: string;
    references: {
      User: any;
      Post: {
        [id: string]: Post
      };
      Social: any;
      SocialStats: any;
    };
    paging: {
      path: string;
      next: {
        limit: number;
        to: string;
        source: string;
        page: number;
      }
    }
  };
  v: number;
  b: string;
}
interface Post {
  id: string;
  versionId: string;
  creatorId: string;
  homeCollectionId: string;
  title: string;
  detectedLanguage: string;
  latestVersion: string;
  latestPublishedVersion: string;
  hasUnpublishedEdits: boolean;
  latestRev: number;
  createdAt: number;
  updatedAt: number;
  acceptedAt: number;
  firstPublishedAt: number;
  latestPublishedAt: number;
  vote: boolean;
  experimentalCss: string;
  displayAuthor: string;
  content: {
    subtitle: string;
    postDisplay: {
      coverless: boolean;
    }
  };
  virtuals: {
    createdAtRelative: string;
    updatedAtRelative: string;
    acceptedAtRelative: string;
    createdAtEnglish: string;
    updatedAtEnglish: string;
    firstPublishedAtEnglish: string;
    latestPublishedAtEnglish: string;
    allowNotes: boolean;
    snippet: string;
    previewImage: {
      imageId: string;
      filter: string;
      backgroundSize: string;
      originalWidth: number;
      originalHeight: number;
      strategy: string;
      height: number;
      width: number;
    }
    wordCount: number;
    imageCount: number;
    readingTime: number;
    subtitle: string;
    usersBySocialRecommends: any[]; // todo: find example of this field
    latestPublishedAtAbbreviated: string;
    firstPublishedAtAbbreviated: string;
    emailSnippet: string;
    recommends: number;
    isBookmarked: boolean;
    tags: Tag[];
    socialRecommendsCount: number;
    responsesCreatedCount: number;
    links: {
      entries: any[]; // todo: find example of this field
      version: string;
      generatedAt: number;
    };
    isLockedPreviewOnly: boolean;
  };
  coverless: boolean;
  slug: string;
  translationSourcePostId: string;
  translationSourceCreatorId: string;
  isApprovedTranslation: boolean;
  inResponseToPostId: string;
  inResponseToRemovedAt: number;
  isTitleSynthesized: boolean;
  allowResponses: boolean;
  importedUrl: string;
  importedPublishedAt: number;
  visibility: number;
  uniqueSlug: string;
  previewContent: {
    bodyModel: {
      paragraphs: Paragraph[];
      sections: Section[];
    }
    isFullContent: boolean;
  };
  license: number;
  inResponseToMediaResourceId: string;
  canonicalUrl: string;
  approvedHomeCollectionId: string;
  newsletterId: string;
  webCanonicalUrl: string;
  mediumUrl: string;
  migrationId: string;
  notifyFollowers: boolean;
  notifyTwitter: boolean;
  isSponsored: boolean;
  isRequestToPubDisabled: boolean;
  notifyFacebook: boolean;
  responseHiddenOnParentPostAt: boolean;
  type: string;
}
interface Tag {
  slug: string;
  name: string;
  postcount: number;
  virtuals: {
    isFollowing: boolean;
  };
  metadata: {
    followerCount: number;
    postcount: number;
    coverImage: {
      id: string;
      originalWidth?: number;
      originalHeight?: number;
      isFeatured?: boolean;
    }
  };
  type: string;
}
interface Paragraph {
  name: string;
  type: number;
  text: string;
  markups: any[]; // todo: find example of this field
  alignment: number;
}
interface Section {
  startIndex: number;
  // todo: may be more fields here?
}
