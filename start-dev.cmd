ConEmu -reuse -Title BACK -run {Shells::PowerShell Core} -NoExit -Command cd ./backend; yarn run dev
ConEmu -reuse -Title FRONT -run {Shells::PowerShell Core} -NoExit -Command cd ./frontend; yarn run dev
REM ConEmu -reuse -Title COSMOS -run {Shells::PowerShell Core} -NoExit -Command cd ./frontend; yarn run cosmos
