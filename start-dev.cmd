ConEmu -reuse -Title BACK -run {Shells::PowerShell Core} -NoExit -Command cd ./backend; npm run dev
ConEmu -reuse -Title FRONT -run {Shells::PowerShell Core} -NoExit -Command cd ./frontend; npm run dev
ConEmu -reuse -Title COSMOS -run {Shells::PowerShell Core} -NoExit -Command cd ./frontend; npm run cosmos
