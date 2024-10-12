"""
This module is responsible for generating persona cookies based on user data and web history.

It uses the OpenAI API to create a language model that analyzes user data and web content
to generate a comprehensive user metadata object (persona cookie).

The module provides functions for:
1. Initializing the OpenAI language model
2. Creating a program to generate user metadata
3. Generating user metadata as a JSON string
4. Generating a complete persona cookie based on user data and web history

Usage:
    from generator import generate_persona_cookie

    user_data = {
        "name": "Jane Doe",
        "birthday": "1990-05-15",
        "affiliations": ["OpenAI", "Stanford University"]
    }
    urls = [
        "https://www.lesswrong.com",
        "https://news.ycombinator.com"
    ]
    
    persona_cookie = generate_persona_cookie(user_data, urls)
    print(persona_cookie)
"""

import os
import json
import logging
from dotenv import load_dotenv; load_dotenv()
from llama_index.llms.openai import OpenAI
from llama_index.program.openai import OpenAIPydanticProgram
from structs import UserMetadata, generate_user_metadata_prompt
from typing import List
from read_web import read_web

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def get_llm(model="gpt-4o-mini"):
    """
    Initialize and return an OpenAI language model.

    Args:
        model (str): The name of the OpenAI model to use. Defaults to "gpt-4-0125-preview".

    Returns:
        OpenAI: An initialized OpenAI language model.

    Raises:
        ValueError: If the OPENAI_API_KEY environment variable is not set.
    """
    logger.info(f"Initializing OpenAI LLM with model: {model}")
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    if not OPENAI_API_KEY:
        logger.error("OPENAI_API_KEY environment variable is not set")
        raise ValueError("OPENAI_API_KEY environment variable is not set")
    return OpenAI(model=model, api_key=OPENAI_API_KEY)

def create_program(llm, user_data: dict, web_content: List[dict]):
    """
    Create a program that generates a UserMetadata object.

    Args:
        llm (OpenAI): An initialized OpenAI language model.
        user_data (dict): A dictionary containing user information.
        web_content (List[dict]): A list of dictionaries containing web content information.

    Returns:
        OpenAIPydanticProgram: A program that can generate UserMetadata objects.
    """
    logger.info("Creating OpenAIPydanticProgram for generating UserMetadata")
    logger.debug(f"User data: {json.dumps(user_data, indent=2)}")
    logger.debug(f"Web content: {json.dumps(web_content, indent=2)}")
    return OpenAIPydanticProgram.from_defaults(
        output_cls=UserMetadata,
        llm=llm,
        prompt=generate_user_metadata_prompt(user_data, web_content),
        verbose=True,
    )

def generate_user_metadata_str(program, user_data: dict, web_content: List[dict]):
    """
    Generate a UserMetadata object from user data and web content.

    Args:
        program (OpenAIPydanticProgram): A program that can generate UserMetadata objects.
        user_data (dict): A dictionary containing user information.
        web_content (List[dict]): A list of dictionaries containing web content information.

    Returns:
        str: A JSON string representation of the generated UserMetadata object.
    """
    logger.info("Generating UserMetadata")
    output = program(user_data=user_data, web_content=web_content, json_schema=UserMetadata.model_json_schema())
    logger.info("UserMetadata generated successfully")
    logger.debug(f"Generated UserMetadata: {json.dumps(output.model_dump(), indent=2)}")
    return json.dumps(output.model_dump(), indent=2)

def generate_persona_cookie(user_data: dict, urls: List[str]):
    """
    Generate a persona cookie based on user data and web history.

    This function orchestrates the entire process of generating a persona cookie:
    1. Initializes the language model
    2. Fetches web content for the provided URLs
    3. Creates a program to generate user metadata
    4. Generates the persona cookie as a JSON string

    Args:
        user_data (dict): A dictionary containing user information.
        urls (List[str]): A list of URLs representing the user's web history.

    Returns:
        str: A JSON string representation of the generated persona cookie.
    """
    llm = get_llm()
    
    web_content = []
    for url in urls:
        web_content.extend(read_web(url))
    
    program = create_program(llm, user_data, web_content)
    persona_cookie = generate_user_metadata_str(program, user_data, web_content)
    
    return persona_cookie

# Example usage
if __name__ == "__main__":
    user_data = {
        "name": "Jane Doe",
        "birthday": "1990-05-15",
        "affiliations": ["OpenAI", "Stanford University"]
    }
    urls = [
        "https://www.lesswrong.com",
        "https://news.ycombinator.com"
    ]
    
    persona_cookie = generate_persona_cookie(user_data, urls)
    print(persona_cookie)
