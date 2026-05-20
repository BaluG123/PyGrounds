import os, glob
for f in glob.glob('src/content/*.ts'):
    with open(f, 'r') as file:
        content = file.read()
    content = content.replace('\\\\n', '\\n')
    with open(f, 'w') as file:
        file.write(content)
