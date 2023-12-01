import os
import shutil

# Define the directory where the script is located (and back.png is located)
script_dir = os.path.dirname(os.path.abspath(__file__))

# Define the directories where the PNG files are located
frat_png_dir = os.path.join(os.path.dirname(script_dir), "frat_mockup_export", "mockup_pngs")
soro_png_dir = os.path.join(os.path.dirname(script_dir), "soro_mockup_export", "mockup_pngs")





# Define the list of folders and corresponding PNG files
folders_and_files = {
    "ALPHA CHI OMEGA": ["Alpha Chi Omega", "Alpha Chi", "AXO"],
    "ALPHA DELTA PI": ["Alpha Delta Pi", "ADPI"],
    "ALPHA KAPPA DELTA PHI": ["alpha Kappa Delta Phi", "aKDPhi"],
    "ALPHA OMICRON PI": ["Alpha Omicron Pi", "AOII"],
    "ALPHA PHI": ["Alpha Phi"],
    "CHI OMEGA": ["Chi Omega", "Chi O"],
    "DELTA DELTA DELTA": ["Delta Delta Delta"],
    "DELTA GAMMA": ["Delta Gamma", "DG"],
    "GAMMA PHI BETA": ["Gamma Phi Beta", "Gamma Phi"],
    "KAPPA ALPHA THETA": ["Kappa Alpha Theta"],
    "KAPPA DELTA": ["Kappa Delta"],
    "KAPPA KAPPA GAMMA": ["Kappa Kappa Gamma", "Kappa"],
    "PHI MU": ["Phi Mu"],
    "PI BETA PHI": ["Pi Beta Phi", "Pi Phi"],
    "SIGMA KAPPA": ["Sigma Kappa"],
    "ZETA TAU ALPHA": ["Zeta Tau Alpha", "Zeta", "ZTA"],
    "ACACIA": ["Acacia"],
    "ALPHA EPSILON PI": ["Alpha Epsilon Pi", "AEPI"],
    "ALPHA GAMMA RHO": ["Alpha Gamma Rho", "AGR"],
    "ALPHA KAPPA LAMBDA": ["Alpha Kappa Lambda", "AKL"],
    "ALPHA SIGMA PHI": ["Alpha Sigma Phi", "Alpha Sig"],
    "ALPHA TAU OMEGA": ["Alpha Tau Omega", "TAUS"],
    "BETA THETA PI": ["Beta Theta Pi", "BETA"],
    "CHI PHI": ["Chi Phi"],
    "CHI PSI": ["Chi Psi"],
    "DELTA CHI": ["Delta Chi"],
    "DELTA KAPPA EPSILON": ["Delta Kappa Epsilon", "DEKES"],
    "DELTA SIGMA PHI": ["Delta Sigma Phi", "DELTA SIG"],
    "DELTA TAU DELTA": ["Delta Tau Delta","DELTS"],
    "DELTA UPSILON": ["Delta Upsilon", "DELTA U"],
    "KAPPA ALPHA ORDER": ["Kappa Alpha Order", "Kappa Alpha"],
    "KAPPA DELTA RHO": ["Kappa Delta Rho", "KDR"],
    "KAPPA SIGMA": ["Kappa Sigma", "Kappa Sig"],
    "LAMBDA CHI ALPHA": ["Lambda Chi Alpha", "Lambda Chi"],
    "LAMBDA PHI EPSILON": ["Lambda Phi Epsilon", "LAMBDAS"],
    "PHI DELTA THETA": ["Phi Delta Theta", "Phi Delt"],
    "PHI GAMMA DELTA": ["Phi Gamma Delta", "Phi Gam", "FIJI"],
    "PHI KAPPA PSI": ["Phi Kappa Psi", "Phi Psi"],
    "PHI KAPPA SIGMA": ["Phi Kappa Sigma", "Phi Kap", "Skulls"],
    "PHI KAPPA TAU": ["Phi Kappa Tau", "Phi Tau"],
    "PHI KAPPA THETA": ["Phi Kappa Theta", "Phi Kapps"],
    "PHI SIGMA KAPPA": ["Phi Sigma Kappa", "Phi Sig"],
    "PI LAMBDA PHI": ["Pi Lambda Phi"],
    "PI KAPPA ALPHA": ["Pi Kappa Alpha", "PIKE"],
    "PI KAPPA PHI": ["Pi Kappa Phi", "Pi Kapp"],
    "PSI UPSILON": ["Psi Upsilon"],
    "SIGMA ALPHA EPSILON": ["Sigma Alpha Epsilon", "SAE"],
    "SIGMA ALPHA MU": ["Sigma Alpha Mu", "Sammy"],
    "SIGMA CHI": ["Sigma Chi"],
    "SIGMA NU": ["Sigma Nu"],
    "SIGMA PHI EPSILON": ["Sigma Phi Epsilon", "SIGEP"],
    "SIGMA PI": ["Sigma Pi"],
    "SIGMA TAU GAMMA": ["Sigma Tau Gamma", "Sig Tau"],
    "TAU KAPPA EPSILON": ["Tau Kappa Epsilon", "TKE"],
    "THETA CHI": ["Theta Chi"],
    "THETA XI": ["Theta Xi"],
    "ZETA BETA TAU": ["Zeta Beta Tau", "ZEBES", "ZBT"],
    "THETA DELTA CHI": ["Theta Delta Chi"],
    "ZETA PSI": ["Zeta Psi"]
}





# Get the list of all PNG files in the directories
all_files = os.listdir(frat_png_dir) + os.listdir(soro_png_dir)

# Loop through each folder and its corresponding files
for folder, files in folders_and_files.items():
    # Create the folder if it doesn't exist
    folder_path = os.path.join(script_dir, folder)
    os.makedirs(folder_path, exist_ok=True)

    # Copy back.png into the folder
    shutil.copy(os.path.join(script_dir, 'back.png'), folder_path)

    # Initialize counter for multiple files
    file_counter = 0

    # Loop through each file
    for file in files:
        # Normalize the file name
        normalized_file = file.lower() + ".png"

        # Find the file in the directories
        for png_file in all_files:
            if png_file.lower() == normalized_file:
                # Define the source path
                if png_file in os.listdir(frat_png_dir):
                    src_path = os.path.join(frat_png_dir, png_file)
                else:
                    src_path = os.path.join(soro_png_dir, png_file)

                # Define the destination path
                if file_counter == 0:
                    dst_path = os.path.join(folder_path, 'front.png')
                else:
                    dst_path = os.path.join(folder_path, f'front{file_counter}.png')

                # Copy the file to the destination directory
                shutil.copy(src_path, dst_path)
                print(f"Copied {file} to {folder} as {dst_path}")
                file_counter += 1
                break
        else:
            print(f"Source file {file} does not exist")