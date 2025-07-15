#!/bin/bash

echo "🎬 Starting Primotion Demo..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if the library is built
if [ ! -f "../dist/index.js" ]; then
    echo "🔨 Building Primotion library..."
    cd ..
    npm run build
    cd demo
    echo ""
fi

echo "🚀 Starting development server..."
echo "📱 Open your browser to http://localhost:3000"
echo ""

npm run dev 