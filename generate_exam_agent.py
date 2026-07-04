import asyncio
import sys
import os
from google.antigravity import Agent, LocalAgentConfig, CapabilitiesConfig
from google.antigravity.utils.interactive import run_interactive_loop

async def main():
    print("=" * 60)
    print("🤖 STARTING IOE EXAM GENERATOR AI AGENT (ANTIGRAVITY SDK) 🤖")
    print("=" * 60)
    print("This agent can help you customize and generate model exam papers.")
    print("Ensure the NestJS backend is running on http://localhost:5000.\n")
    
    # Configure agent with system instructions and execution capabilities
    config = LocalAgentConfig(
        system_instructions=(
            "You are an expert AI Exam Assistant. Your goal is to help users generate "
            "Institute of Engineering (IOE) model entrance exam papers by communicating "
            "with the local NestJS backend API running at http://localhost:5000.\n\n"
            
            "Key API Endpoints:\n"
            "- POST http://localhost:5000/exam/generate-json : Generates and returns JSON array of questions.\n"
            "- POST http://localhost:5000/exam/generate-pdf : Generates and returns the print-ready PDF binary.\n\n"
            
            "When the user wants to generate an exam paper:\n"
            "1. Clarify which subjects they want (Physics, Mathematics, Chemistry, English).\n"
            "2. Clarify if they want standard counts (30 Physics, 30 Math, 20 Chemistry, 20 English) or custom counts.\n"
            "3. Make the API request to the backend using python `requests` library.\n"
            "4. Save the generated binary PDF as 'ioe_entrance_exam.pdf' in the local directory.\n"
            "5. Tell the user the filename and confirm the download size."
        ),
        capabilities=CapabilitiesConfig(), # Enables python execution & API communication tools
    )

    try:
        # Spawn the agent
        async with Agent(config) as agent:
            # Start the interactive terminal chat loop
            await run_interactive_loop(agent)
    except Exception as e:
        print(f"\n❌ Error starting the agent: {e}", file=sys.stderr)

if __name__ == "__main__":
    # Ensure correct asyncio loop
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(main())
