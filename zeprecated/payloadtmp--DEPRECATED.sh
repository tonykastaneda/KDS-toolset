#!/bin/bash

# Define the path to the .zshrc file
ZSHRC_PATH="$HOME/.zshrc"

# Check if .zshrc exists, if not create it
[ ! -f "$ZSHRC_PATH" ] && touch "$ZSHRC_PATH"

# Get the directory of the setup.sh script itself
CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Check if the alias is already in the .zshrc file
grep -q "alias upload=" "$ZSHRC_PATH"
if [ $? -ne 0 ]; then
    # If alias isn't already there, add it
    echo "alias upload='python3 $CURRENT_DIR/up.py'" >> "$ZSHRC_PATH"
    echo "Alias added to .zshrc!"
else
    echo "Alias already exists in .zshrc."
fi


# Install Homebrew
echo "Installing Homebrew..."
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Determine the architecture
ARCHITECTURE=$(uname -m)
if [[ "$ARCHITECTURE" == "arm64" ]]; then
    echo 'export PATH="/opt/homebrew/bin:$PATH"' >> "$ZSHRC_PATH"
elif [[ "$ARCHITECTURE" == "x86_64" ]]; then
    echo 'export PATH="/usr/local/bin:$PATH"' >> "$ZSHRC_PATH"
else
    echo "Unknown architecture. Manual PATH setup might be required."
fi

# Reload .zshrc
source "$ZSHRC_PATH"

# Install the necessary brew packages
echo "Installing node and python using brew..."
brew install node
brew install python

# Install the necessary python packages
echo "Installing python dependencies..."
pip3 install requests tqdm colorama

echo "All tasks completed!"

# Countdown from 15 seconds
echo "Refreshing Terminal:"
for i in {15..1}; do
    printf "\r%2d seconds remaining" $i
    sleep 1
done


# Check if the current shell is zsh
if [ "$SHELL" != "/bin/zsh" ]; then
    echo "Setting zsh as the default shell..."
    chsh -s /bin/zsh
else
    echo "zsh is already the default shell."
fi

# Source .zshrc to make sure any new changes (like aliases) are active in the current session
source ~/.zshrc

# Change to the default user directory
cd $HOME

# Clear the terminal
clear

echo "INSTALATION COMPLETE, CMD + Q TERMINAL AND RESTART"

