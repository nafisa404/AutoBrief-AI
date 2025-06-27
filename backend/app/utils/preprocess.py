def validate_text_input(text: str):
    if not isinstance(text, str) or len(text.strip()) < 50:
        raise ValueError("Input text must be at least 50 characters.")
