import random

QUOTES = [
    "The best way to get started is to quit talking and begin doing. — Walt Disney",
    "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty. — Winston Churchill",
    "Don’t let yesterday take up too much of today. — Will Rogers",
    "It’s not whether you get knocked down, it’s whether you get up. — Vince Lombardi",
    "If you are working on something exciting, it will keep you motivated. — Steve Jobs",
    "Success is not in what you have, but who you are. — Bo Bennett",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
    "Dream bigger. Do bigger.",
    "Don’t watch the clock; do what it does. Keep going. — Sam Levenson",
    "Great things never come from comfort zones."
]

def main():
    print("✨ Inspiration for you:")
    print(random.choice(QUOTES))

if __name__ == "__main__":
    main()