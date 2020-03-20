# kotoba_cli
Usage:  [command] [param]

Options:
  --help                 Show help                                     [boolean]
  --version              Show version number                           [boolean]
  -s, --service_account  Path to a JSON file with your service account
                         credentials.                        [string] [required]
  -n, --node             Node collection need do export/import
                                                             [string] [required]
  -e, --export           Path to file to export a collection            [string]
  -i, --import           Path to file to import a collection            [string]

Export command sample
$node bin/index.js -s /workspace/kotoba_cli/cert/key.json -n Contents -e export.json

Import command sample
$node bin/index.js -s /workspace/kotoba_cli/cert/key.json -n Contents -i import.json
node bin/index.js -s /workspace/kotoba_cli/cert/key.json -n Contents -i MinaShokyuu_dai1ka.json
node bin/index.js -s /workspace/kotoba_cli/cert/key.json -n Contents -i Minachyuukyuu_dai1ka.json
node bin/index.js -s /workspace/kotoba_cli/cert/key.json -n Contents -i Minachyuukyuu_dai2ka.json
node bin/index.js -s /workspace/kotoba_cli/cert/key.json -n Contents -i kanji.json