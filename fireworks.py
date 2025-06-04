import random
import time
import os
import sys

COLORS = [
    "\033[91m",  # Red
    "\033[92m",  # Green
    "\033[93m",  # Yellow
    "\033[94m",  # Blue
    "\033[95m",  # Magenta
    "\033[96m",  # Cyan
    "\033[97m",  # White
]
RESET = "\033[0m"

def clear():
    # Works on Unix and Windows
    os.system('cls' if os.name == 'nt' else 'clear')

def print_firework(height, width, burst_size=9):
    # Choose a random horizontal position for the burst
    burst_x = random.randint(10, width - 10)
    burst_y = random.randint(3, height - 3)

    for y in range(height):
        line = ""
        if y == burst_y:
            # Firework burst
            for x in range(width):
                if abs(x - burst_x) < burst_size // 2:
                    color = random.choice(COLORS)
                    char = random.choice(["*", "+", "✦", "✨", "•"])
                    line += f"{color}{char}{RESET}"
                else:
                    line += " "
        elif y < burst_y:
            # Firework trail
            if y == burst_y - 1:
                line = " " * burst_x + "|"
            elif y == burst_y - 2:
                line = " " * burst_x + "."
            elif y == burst_y - 3:
                line = " " * burst_x + "."
            else:
                line = ""
        else:
            line = ""
        print(line)

def main():
    try:
        height = 20
        width = 60
        clear()
        print("Get ready for terminal fireworks! 🎆 (Ctrl+C to exit)\n")
        time.sleep(1)
        while True:
            clear()
            print_firework(height, width)
            time.sleep(0.5)
    except KeyboardInterrupt:
        clear()
        print("🎆 Hope you enjoyed the show! 🎆")
        sys.exit(0)

if __name__ == "__main__":
    main()