
fix_index_html:
	@python -c "s=open('dist/index.html').read(); s=s.replace(' src=/', ' src=').replace(' href=/', ' href='); open('dist/index.html', 'wt').write(s);"
	@echo "success"
