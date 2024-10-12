"""
This module defines the models, structures, and prompts used to generate user metadata.
"""

import json
import logging
from typing import List
from pydantic import BaseModel, Field
from llama_index.core.llms import ChatMessage
from llama_index.core import ChatPromptTemplate

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class UserMetadata(BaseModel):
    """Data model for user metadata."""
    description: str = Field(description="A detailed description of the user based on all provided information")
    interests: List[str] = Field(description="A comprehensive list of the user's interests")
    personality_traits: List[str] = Field(description="A list of the user's personality traits")
    career_and_business: List[str] = Field(description="A detailed list of the user's career and business ventures or interests")
    tags: List[str] = Field(description="A list of keys that best represent the user's persona for recommendation and ad targeting systems")

system_prompt = """
You are a helpful assistant that generates a persona cookie for a human.
A persona cookie is a summary of a set of web pages and other artifacts that the user has visited or interacted with on the internet.
You will be given a set of documents with information about the web pages the user visited. From these documents, generate a persona cookie as JSON.

The persona cookie should contain the following information:
- description: a detailed description of the user based on all provided information
- interests: a comprehensive list of the user's interests
- personality_traits: a list of the user's personality traits
- career_and_business: a detailed list of the user's career and business ventures or interests
- tags: a list of keys that best represent the user's persona for recommendation and ad targeting systems

Analyze all provided information thoroughly and create a comprehensive persona cookie that reflects data from all sources.
Ensure the output is a valid JSON object with the structure specified above.
Include as many relevant items in each list as you can find in the data.
The description should be a comprehensive summary of the user's profile.
"""

def generate_user_metadata_prompt(
        user_data: dict, 
        web_content: List[dict],
        json_schema: dict = UserMetadata.model_json_schema()
    ) -> ChatPromptTemplate:
    """
    Generate a prompt for the AI to create a user metadata object.

    Args:
        user_data (dict): A dictionary containing basic user information.
        web_content (List[dict]): A list of dictionaries containing web content information.
        json_schema (dict, optional): The JSON schema for the UserMetadata class. Defaults to UserMetadata.model_json_schema().

    Returns:
        ChatPromptTemplate: A prompt template for the AI to generate the user metadata.
    """
    logger.info("Generating user metadata prompt")
    logger.debug(f"User data: {json.dumps(user_data, indent=2)}")
    logger.debug(f"Web content: {json.dumps(web_content, indent=2)}")

    formatted_web_content = "\n".join([
        f"URL: {item['site_url']}\n"
        f"Short Description: {item['site_short_description']}\n"
        f"Description: {item['description']}\n"
        for item in web_content
    ])

    user_metadata_prompt = ChatPromptTemplate(
        message_templates=[
            ChatMessage(
                role="system",
                content=(system_prompt),
            ),
            ChatMessage(
                role="user",
                content=(
                    "Here is the user's information:\n"
                    "------\n"
                    f"User Data: {json.dumps(user_data, indent=2)}\n"
                    f"Web Content:\n{formatted_web_content}\n"
                    "------\n"
                    "Please generate a JSON object following this schema:\n"
                    f"{json_schema}"
                ),
            ),
        ]
    )
    logger.info("User metadata prompt generated successfully")
    return user_metadata_prompt


## example usage
if __name__ == "__main__":
    logger.info("Starting example usage of structs module")

    # Sample user data
    user_data = {
        "name": "Jane Doe",
        "birthday": "1990-05-15",
        "affiliations": ["OpenAI", "Stanford University"]
    }

    # Sample web content (simulating the output of read_web function)
    web_content = [
        {
            "site_url": "https://www.lesswrong.com",
            "site_short_description": "Less Wrong on AI Alignment",
            "description": "The website is a blog post about AI alignment featuring a discussion about the alignment problem and the role of AI safety in the development of advanced AI systems."
        },
        {
            "site_url": "https://news.ycombinator.com",
            "site_short_description": "Hacker News - a new Wearable for Glucose Monitoring",
            "description": "The website is a blog post about a new wearable for glucose monitoring."
        }
    ]

    logger.info("Generating user metadata prompt")
    # Generate the prompt
    json_schema = UserMetadata.model_json_schema()
    prompt = generate_user_metadata_prompt(user_data, web_content, json_schema)

    logger.info("Generated Prompt:")
    print(prompt)

    # Note: In a real scenario, you would pass this prompt to an AI model to generate the actual persona cookie.
    # The AI's response would then be parsed into a UserMetadata object.

    # Example of how the result might look (this is a mock result)
    mock_ai_response = {
        "description": "Jane Doe is a tech-savvy individual born in 1990 with a strong interest in AI and machine learning. She has affiliations with OpenAI and Stanford University, suggesting a career in the tech industry or academia. Jane shows interest in AI alignment and emerging technologies like wearable health devices.",
        "interests": ["Artificial Intelligence", "Machine Learning", "AI Alignment", "Emerging Technologies", "Health Tech"],
        "personality_traits": ["Intellectual", "Tech-Savvy", "Forward-thinking"],
        "career_and_business": ["AI Research", "Academia", "Technology Industry"],
        "tags": ["AI_enthusiast", "tech_professional", "academic", "health_tech_interested"]
    }

    # Creating a UserMetadata object from the mock response
    persona_cookie = UserMetadata(**mock_ai_response)
    logger.info("Generated Persona Cookie (mock):")
    print(json.dumps(persona_cookie.model_dump(), indent=2))
