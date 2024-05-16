import json
import sys

def convert_preco_contratual_to_int(input_file, output_file):

    with open(input_file, 'r') as f:
        contracts = json.load(f)

    for contract in contracts:
        preco_contratual = contract['precoContratual']

        if isinstance(preco_contratual, (int, float)):
            continue

        preco_contratual = preco_contratual.replace(',', '')

        contract['precoContratual'] = int(float(preco_contratual))

    with open(output_file, 'w') as f:
        json.dump(contracts, f, indent=2)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python script.py input_file.json output_file.json")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    convert_preco_contratual_to_int(input_file, output_file)
    print("Conversion successful. Modified JSON written to", output_file)
