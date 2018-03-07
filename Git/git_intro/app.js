console.log("this is my great app on git!");

// Here are the commands to maintain a  git account:
// I created a directory within my workspace, not direct, but under the top file
// then i created the files that i wanted within the directory
//    mkdir Git
//      touch app.js, flowers.js, ....
//      then i edited the files and then saved.  then i saved in Git:
//
// git init
// git status 
// git add (file name) or (.)
// git commit -m "add app.js file"

// # Git check out
// git log  -(to get out, type "Q"), use committ # (key) to reference the file
// git checkout - use the committ # (to view the Head= an earlier version, Master=latest version)
//      if you want the lastest version, Master, "git checkout master"
//      if you want an earlier version:
//          git revert --no committ (hash #, like:0766c053) ..Head
//          git commit -m "revert back to hash#"
