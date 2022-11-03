Running the Project
In the terminal, run: npm run deploy
Browse to the mission control frontend at localhost:8000 and schedule an interstellar launch!

Setting BUILD_PATH On Windows
Friendly reminder! BUILD_PATH is an environment variable, just like PORT. On Windows, with the default shell, the way we set our BUILD_PATH variable is:

set BUILD_PATH=../server/public&& react-scripts build

Rather than the bash version:

BUILD_PATH=../server/public react-scripts build

Settin Port on Windows for the server
If you're using the default Windows shell, the syntax to set an environment variable like PORT is slightly different than what we saw in the previous video. To set PORT in your package.json on Windows, you'll want to write:

"start": "set PORT=5000&& node src/server.js"

Instead of:

"start": "PORT=5000 node src/server.js"
