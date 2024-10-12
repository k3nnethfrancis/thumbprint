"""
Read the web and return the content.
Get an LLM to generate the descriptions of the web content.

web_data_schema = {
    "site_url": str,
    "site_short_description": str,
    "description": str
}

TO DO:
- build the actual scraper
- build the LLM prompt to generate the descriptions

"""

import requests

def read_web(url):
    # return requests.get(url).text
    results = [{
            "site_url": "https://www.lesswrong.com",
            "site_short_description": "Less Wrong on AI Alignment",
            "description": "The website is a blog post about AI alignment featuring a discussion about the alignment problem and the role of AI safety in the development of advanced AI systems."  
        }, 
        {
            "site_url": "https://news.hackernews.com",
            "site_short_description": "Hacker News - a new Wearable for Glucose Monitoring",
            "description": "The website is a blog post about a new wearable for glucose monitoring."
        }]

    return results

if __name__ == "__main__":
    print(read_web("https://www.openai.com"))