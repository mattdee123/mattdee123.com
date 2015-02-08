all: unix.html vim.html

unix.html: unix.md doc2.css
	pandoc -s -c doc2.css --toc -o unix.html unix.md

vim.html: vim.md doc2.css
	pandoc -s -c doc2.css --toc -o vim.html vim.md
