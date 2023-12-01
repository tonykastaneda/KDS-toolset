import os
import shutil

# Define the directory where the script is located (and back.png is located)
script_dir = os.path.dirname(os.path.abspath(__file__))

# Define the directories where the PNG files are located
frat_png_dir = os.path.join(os.path.dirname(script_dir), "frat_mockup_export", "mockup_pngs")
soro_png_dir = os.path.join(os.path.dirname(script_dir), "soro_mockup_export", "mockup_pngs")





# Define the list of folders and corresponding PNG files
folders_and_files = {
"ALPHA CHI OMEGA": ["Alpha Chi"],
  "ALPHA DELTA PI": ["ADPI"],
  "ALPHA KAPPA DELTA PHI": ["aKDPhi"],
  "ALPHA OMICRON PI": ["Alpha Omicron Pi"],
  "ALPHA PHI": ["Alpha Phi"],
  "CHI OMEGA": ["Chi O"],
  "DELTA DELTA DELTA": ["Tri Delt"],
  "DELTA GAMMA": ["Delta Gamma"],
  "GAMMA PHI BETA": ["Gamma Phi"],
  "KAPPA ALPHA THETA": ["Theta"],
  "KAPPA DELTA": ["Kappa Delta"],
  "KAPPA KAPPA GAMMA": ["Kappa"],
  "PHI MU": ["Phi Mu"],
  "PI BETA PHI": ["Pi Phi"],
  "SIGMA KAPPA": ["Sigma Kappa"],
  "ZETA TAU ALPHA": ["Zeta"],
  "ACACIA": ["Acacia"],
  "ALPHA EPSILON PI": ["AEPI"],
  "ALPHA GAMMA RHO": ["AGR"],
  "ALPHA KAPPA LAMBDA": ["AKL"],
  "ALPHA SIGMA PHI": ["Alpha Sig"],
  "ALPHA TAU OMEGA": ["TAUS"],
  "BETA THETA PI": ["BETA"],
  "CHI PHI": ["Chi Phi"],
  "CHI PSI": ["Chi Psi"],
  "DELTA CHI": ["Delta Chi"],
  "DELTA KAPPA EPSILON": ["DEKES"],
  "DELTA SIGMA PHI": ["DELTA SIG"],
  "DELTA TAU DELTA": ["DELTS"],
  "DELTA UPSILON": ["DELTA U"],
  "KAPPA ALPHA ORDER": ["Kappa Alpha"],
  "KAPPA DELTA RHO": ["KDR"],
  "KAPPA SIGMA": ["Kappa Sig"],
  "LAMBDA CHI ALPHA": ["Lambda Chi"],
  "LAMBDA PHI EPSILON": ["LAMBDAS"],
  "PHI DELTA THETA": ["Phi Delt"],
  "PHI GAMMA DELTA": ["FIJI"],
  "PHI KAPPA PSI": ["Phi Psi"],
  "PHI KAPPA SIGMA": ["Phi Kap"],
  "PHI KAPPA TAU": ["Phi Tau"],
  "PHI KAPPA THETA": ["Phi Kapps"],
  "PHI SIGMA KAPPA": ["Phi Sig"],
  "PI LAMBDA PHI": ["Pi Lam"],
  "PI KAPPA ALPHA": ["PIKE"],
  "PI KAPPA PHI": ["Pi Kapp"],
  "PSI UPSILON": ["Psi Upsilon"],
  "SIGMA ALPHA EPSILON": ["SAE"],
  "SIGMA ALPHA MU": ["Sammy"],
  "SIGMA CHI": ["Sigma Chi"],
  "SIGMA NU": ["Sigma Nu"],
  "SIGMA PHI EPSILON": ["SIGEP"],
  "SIGMA PI": ["Sigma Pi"],
  "SIGMA TAU GAMMA": ["Sig Tau"],
  "TAU KAPPA EPSILON": ["TKE"],
  "THETA CHI": ["Theta Chi"],
  "THETA XI": ["Theta Xi"],
  "ZETA BETA TAU": ["ZEBES"],
  "THETA DELTA CHI": ["Theta Delt"],
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