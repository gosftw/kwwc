// Simple deployment script for the Kings League KWCC Tournament Bracket
const fs = require('fs');
const path = require('path');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Copy HTML file
fs.copyFileSync(
  path.join(__dirname, 'index.html'),
  path.join(distDir, 'index.html')
);

// Create directories
const directories = ['css', 'js', 'img'];
directories.forEach(dir => {
  const destDir = path.join(distDir, dir);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
  }
});

// Copy CSS files
fs.readdirSync(path.join(__dirname, 'css')).forEach(file => {
  fs.copyFileSync(
    path.join(__dirname, 'css', file),
    path.join(distDir, 'css', file)
  );
});

// Copy JavaScript files
fs.readdirSync(path.join(__dirname, 'js')).forEach(file => {
  fs.copyFileSync(
    path.join(__dirname, 'js', file),
    path.join(distDir, 'js', file)
  );
});

// Copy image files
fs.readdirSync(path.join(__dirname, 'img')).forEach(file => {
  fs.copyFileSync(
    path.join(__dirname, 'img', file),
    path.join(distDir, 'img', file)
  );
});

console.log('Build complete! Files are ready in the dist directory.');
console.log('Run "npm start" to start the local server.');
