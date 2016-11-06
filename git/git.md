**create a new repository on the command line**
```
echo "# blog" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/wenbaofu/blog.git
git push -u origin master
```

帮你总结一下经验吧，以项目根路径下的 .gitignore 为例：
```

- 忽略一个特定的文件：/filename.extension
- 忽略所有同名的文件：filename.extension
- 忽略一个特定的目录：folder/ （这会连同其下所有子目录及文件都被忽略）
- 但是排除一个特定的模式：（在 3 的基础上）!folder/some/important/filename.extension
- 忽略指定目录下所有子目录下的特定文件：folder/**/filename.extension
- 同上，但是只匹配文件扩展名：folder/**/*.extension
- 同上，但是只匹配特定的目录：folder/**/tmp/
如果是子目录下的 .gitignore，在上述基础上记得不要在最前面加 '/'，否则会匹配到工作树的根路径，而不是子目录下的 .gitignore 的同级，就这个是一个坑，其他都一样。
```

**最后，反斜线可以转移特殊字符，比如文件名带 '!' 的，可以 \!important!.txt 这样。**

