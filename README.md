# Linkedin-Profile-Viewer - Scrapper
🔍 Introducing My LinkedIn Profile Data Scraper API! 🚀

Have you ever wanted to access LinkedIn profile data without notifying the user? Look no further! I've developed an API that allows you to scrape LinkedIn profile data in JSON format, all while ensuring the user remains unaware.

🔗 **How It Works:**
By utilizing the userHandle or URL, you can effortlessly retrieve LinkedIn profile data in JSON format. The best part? The user won't receive any notifications.

🍪 **LinkedIn Cookies Required:**
To set up this API, you'll need your LinkedIn cookies: li_at and JSESSIONID. These cookies are essential for seamless integration and data retrieval.

🚀 **Key Features:**
  - **Stealthy Data Retrieval:** Access LinkedIn profile data without raising any suspicion.
  - **Cookie-based Setup:** Use your li_at and JSESSIONID cookies to seamlessly set up the API.
  - **Effortless Integration:** Incorporate the API into your projects for smooth data extraction.

## Environment Variables
*NOTE: For development create `.env` file* 
```
COOKIE = 'li_at=<LI_AT>; JSESSIONID="<JSESSIONID>";'
CSRF = '<JSESSIONID>'
MONGO_URI = ""
PORT = 4000
```
- <LI_AT>: Replace with `li_at` cookie of LinkedIn
- <JSESSIONID>: Replace with `JSESSIONID` cookie of LinkedIn
- `MONGO_URI`: Mongodb Connection String

<img src="https://github.com/alumnit-bvcoenm-581b2a24b/Linkedin-Profile-Viewer/assets/69594258/e35178d5-1bf8-40ff-a7a8-37547ef0411f" alt="cookie.png" style="max-width:800px;">

# End Points

## API Endpoint: POST `/api/profile`

This endpoint retrieves a user's profile information based on the provided user handle or profile URL.

### Request Body

The request body should be a JSON object with at least one of the following properties:

- `userHandle` (string, optional): The user handle associated with the LinkedIn profile. If provided, the user's profile information will be fetched based on this handle.
- `url` (string, optional): The URL of the user's LinkedIn profile. If provided, the `userHandle` will be extracted from the URL and used to fetch the profile information.

#### Example Request Body

```json
{
    "userHandle": "lokesh-patil-77221a24a"
}
```

```json
{
    "url": "https://www.linkedin.com/in/lokesh-patil-77221a24a/"
}
```

**Note:** You can provide either the `userHandle` or the `url` in the request body. If both are provided, the `userHandle` will take precedence.

### Response

The response will contain the profile information of the requested user

```
{
    "profile": {
        "_id": "string",
        "firstName": "string",
        "lastName": "string",
        "headline": "string",
        "publicIdentifier": "string",
        "url": "string",
        "authorProfileId": "string",
        "about": "string or null",
        "skills": {
            "totalCount": "number",
            "skills": [
                {
                    "title": "string",
                    "appliedIn": [
                        {
                            "name": "string",
                            "_id": "string"
                        }
                    ],
                    "_id": "string"
                }
            ]
        },
        "experiences": [
            {
                "title": "string",
                "subtitle": "string",
                "duration": "string",
                "description": "string or null",
                "skills": ["string"],
                "image": ["string"],
                "certificates": [
                    {
                        "name": "string",
                        "url": "string",
                        "_id": "string"
                    }
                ],
                "_id": "string"
            }
        ],
        "education": [
            {
                "title": "string",
                "image": "string",
                "degree": "string",
                "duration": "string",
                "grade": "string",
                "description": "string",
                "_id": "string"
            }
        ],
        "certifications": [
            {
                "title": "string",
                "credentialID": "string or null",
                "issueDate": "string or null",
                "certificate": "string",
                "skills": ["string"],
                "_id": "string"
            }
        ],
        "posts": [
            {
                "dashEntityUrn": "string",
                "description": "string",
                "pastActivityOn": "string",
                "images": ["string"],
                "videos": ["string"],
                "likes": "number",
                "_id": "string"
            }
        ],
        "createdAt": "string (ISO 8601 date)",
        "updatedAt": "string (ISO 8601 date)",
        "__v": "number"
    }
}

```
### Response Attributes:

- **profile** (object): User profile information
  - **_id** (string): Document ID
  - **firstName** (string): User's first name
  - **lastName** (string): User's last name
  - **headline** (string): User's professional headline
  - **publicIdentifier** (string): User's public identifier
  - **url** (string): User's LinkedIn profile URL
  - **authorProfileId** (string): Author profile ID
  - **about** (string or null): User's about section
  - **skills** (object):
    - **totalCount** (number): Total count of skills
    - **skills** (array):
      - **title** (string): Skill title
      - **appliedIn** (array of objects):
        - **name** (string): Name where skill was applied
  - **experiences** (array of objects):
    - **title** (string): Experience title
    - **subtitle** (string): Experience subtitle
    - **duration** (string): Experience duration
    - **description** (string or null): Experience description
    - **skills** (array of strings): Relevant skills for the experience
    - **image** (array of strings): Experience images
    - **certificates** (array of objects):
      - **name** (string): Certificate name
      - **url** (string): Certificate URL
  - **education** (array of objects):
    - **title** (string): Education institution title
    - **image** (string): Education institution image
    - **degree** (string): Degree obtained
    - **duration** (string): Education duration
    - **grade** (string): Grade obtained
    - **description** (string): Education description
  - **certifications** (array of objects):
    - **title** (string): Certification title
    - **credentialID** (string or null): Credential ID
    - **issueDate** (string or null): Issue date of the certification
    - **certificate** (string): Certification URL
    - **skills** (array of strings): Skills related to the certification
  - **posts** (array of objects):
    - **dashEntityUrn** (string): Entity urn of the post
    - **description** (string): Post description
    - **pastActivityOn** (string): Time since the post was active
    - **images** (array of strings): Post images
    - **videos** (array of strings): Post videos
    - **likes** (number): Number of likes on the post
  - **createdAt** (string): Timestamp of profile creation (ISO 8601 date)
  - **updatedAt** (string): Timestamp of last profile update (ISO 8601 date)
  - **__v** (number): Version of the profile data

