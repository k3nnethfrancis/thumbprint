from firecrawl import FirecrawlApp
from typing import List, Optional
from pydantic import BaseModel, Field
import json
import os
from pathlib import Path

import dotenv; dotenv.load_dotenv()
FIRECRAWL_API_KEY = os.getenv("FIRECRAWL_API_KEY")

class WebsiteSchema(BaseModel):
    title: str = Field(description="descriptive title of the site")
    site_description: str = Field(description="the kind of site this is")
    content_description: str = Field(description="description of the site's content")
    user_analysis: str = Field(description="brief reflection and analysis of what visiting the site may suggest about the user")


class FirecrawlWrapper:
    def __init__(self, api_key, max_content_length=1000):
        self.app = FirecrawlApp(api_key=api_key)
        self.artifacts_dir = Path("artifacts")
        self.artifacts_dir.mkdir(parents=True, exist_ok=True)
        self.max_content_length = max_content_length

    def truncate_content(self, content):
        return content[:self.max_content_length] if content else ""

    def scrape_url_with_schema(self, url, save_to_file=False):
        """
        Scrape a URL with the custom schema and optionally save as markdown.
        
        :param url: The URL to scrape
        :param save_to_file: Whether to save the result to a file (default: False)
        :return: Extracted data according to the schema
        """
        data = self.app.scrape_url(url, {
            'formats': ['extract', 'markdown'],
            'extract': {
                'schema': WebsiteSchema.model_json_schema()
            }
        })
        
        extracted_data = data["extract"]
        markdown_content = data.get("markdown", "")
        
        # Truncate content
        for key in extracted_data:
            extracted_data[key] = self.truncate_content(extracted_data[key])
        
        if save_to_file:
            self.save_to_markdown(url, extracted_data, markdown_content)
        
        return extracted_data

    def save_to_markdown(self, url, extracted_data, markdown_content):
        file_name = url.split("//")[-1].replace("/", "_") + ".md"
        file_path = self.artifacts_dir / file_name
        
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(f"# {extracted_data['title']}\n\n")
            f.write(f"## Site Description\n{extracted_data['site_description']}\n\n")
            f.write(f"## Content Description\n{extracted_data['content_description']}\n\n")
            f.write(f"## User Analysis\n{extracted_data['user_analysis']}\n\n")
            f.write("## Full Content\n")
            f.write(self.truncate_content(markdown_content))
        
        print(f"Saved markdown file: {file_path}")

    def scrape_multiple_urls(self, urls, save_to_file=False):
        """
        Scrape multiple URLs and optionally save as markdown files.
        
        :param urls: List of URLs to scrape
        :param save_to_file: Whether to save the results to files (default: False)
        :return: List of extracted data for each URL
        """
        results = []
        for url in urls:
            print(f"Scraping: {url}")
            result = self.scrape_url_with_schema(url, save_to_file)
            results.append(result)
        return results

# Example usage:
if __name__ == "__main__":
    firecrawl = FirecrawlWrapper(api_key=FIRECRAWL_API_KEY, max_content_length=1000)
    
    urls_to_scrape = [
        "https://www.lesswrong.com/s/NHXY86jBahi968uW4/p/aMHq4mA2PHSM2TMoH",
        "https://shoshin.blog/"
    ]
    
    print('Scraping websites and returning JSON structure')
    print('*' * 100)
    extracted_data = firecrawl.scrape_multiple_urls(urls_to_scrape)
    print(json.dumps(extracted_data, indent=2))
    print('*' * 100)
    
    print('Scraping websites and saving as markdown')
    print('*' * 100)
    firecrawl.scrape_multiple_urls(urls_to_scrape, save_to_file=True)
    print("Scraping completed. Check the artifacts directory for the markdown files.")
    print('*' * 100)
